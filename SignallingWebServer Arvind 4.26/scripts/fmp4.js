
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  var verbose = false;
            // var verbose = true; // enable for saturating the console ..
  var buffering_sec = 1; // use some reasonable value

  var buffering_sec_seek = buffering_sec*0.9; 
  // ..seek the stream if it's this much away or
  // from the last available timestamp
  var buffering_sec_seek_distance = buffering_sec*0.5; 
  // .. jump to this distance from the last avail. timestamp

  // *** INTERNAL PARAMETERS ***
  // set mimetype and codec
  var mimeType = "video/mp4";
 // var codecs = "avc1.4D401F"; // https://wiki.whatwg.org/wiki/Video_type_parameters
  // if your stream has audio, remember to include it in these definitions.. otherwise your mse goes sour
  // 
  //var codecs = "avc1.4D401F, mp4a.40.2";
  //       for game avc1.42c034 

  var codecs = "avc1.42c034";

  var codecPars = mimeType+';codecs="'+codecs+'"';
  
  var stream_started = false; // is the source_buffer updateend callback active nor not
  
  // create media source instance
  var ms = new MediaSource();
  
  // queue for incoming media packets
  var queue = [];
  
  var stream_live; // the HTMLMediaElement (i.e. <video> element)
  var ws; // websocket
  var seeked = false; // have have seeked manually once ..
  var cc = 0;
  
  var source_buffer; // source_buffer instance
  
  var pass = 0;
        





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


   
 
  // jsut call startup(); on peer connection


    // if (sourceBuffer != null) {
    //   sourceBuffer.appendBuffer(e.data);
    // } else {
    //   console.log("Got data but sourceBuffer is null");
    // }

    // putPacket(e.data);  // on message

///////////////////////////////////////////////////////////////////////////////////////////

   
// *** MP4 Box manipulation functions ***
// taken from here: https://stackoverflow.com/questions/54186634/sending-periodic-metadata-in-fragmented-live-mp4-stream/

function toInt(arr, index) { // From bytes to big-endian 32-bit integer.  Input: Uint8Array, index
  var dv = new DataView(arr.buffer, 0);
  return dv.getInt32(index, false); // big endian
}

function toString(arr, fr, to) { // From bytes to string.  Input: Uint8Array, start index, stop index.
  // https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  return String.fromCharCode.apply(null, arr.slice(fr,to));
}

function getBox(arr, i) { // input Uint8Array, start index
  return [toInt(arr, i), toString(arr, i+4, i+8)]
}

function getSubBox(arr, box_name) { // input Uint8Array, box name
  var i = 0;
  res = getBox(arr, i);
  main_length = res[0]; name = res[1]; // this boxes length and name
  i = i + 8;
  
  var sub_box = null;
  
  while (i < main_length) {
      res = getBox(arr, i);
      l = res[0]; name = res[1];
      
      if (box_name == name) {
          sub_box = arr.slice(i, i+l)
      }
      i = i + l;
  }
  return sub_box;
}

function hasFirstSampleFlag(arr) { // input Uint8Array
  // [moof [mfhd] [traf [tfhd] [tfdt] [trun]]]
  
  var traf = getSubBox(arr, "traf");
  if (traf==null) { return false; }
  
  var trun = getSubBox(traf, "trun");
  if (trun==null) { return false; }
  
  // ISO/IEC 14496-12:2012(E) .. pages 5 and 57
  // bytes: (size 4), (name 4), (version 1 + tr_flags 3)
  var flags = trun.slice(10,13); // console.log(flags);
  f = flags[1] & 4; // console.log(f);
  return f == 4;
}


// consider these callbacks:
// - putPacket : called when websocket receives data
// - loadPacket : called when source_buffer is ready for more data
// Both operate on a common fifo

function putPacket(arr) { 
  // receives ArrayBuffer.  Called when websocket gets more data
  // first packet ever to arrive: write directly to source_buffer
  // source_buffer ready to accept: write directly to source_buffer
  // otherwise insert it to queue
  
  var memview   = new Uint8Array(arr);
  if (verbose) { console.log("got", arr.byteLength, "bytes.  Values=", memview[0], memview[1], memview[2], memview[3], memview[4]); }

  res = getBox(memview, 0);
  main_length = res[0]; name = res[1]; // this boxes length and name
  
  if ((name=="ftyp") && (pass==0)) {
      pass = pass + 1;
      console.log("got ftyp");
  }
  else if ((name=="moov") && (pass==1)) {
      pass = pass + 1;
      console.log("got moov");
  }
  else if ((name=="moof") && (pass==2)) {
      if (hasFirstSampleFlag(memview)) {
          pass = pass + 1;
          console.log("got that special moof");
      }
      else {
          return;
      }
  }
  else if (pass < 3) {
      return;
  }
  
  // keep the latency to minimum
  let latest = stream_live.duration;
  if ((stream_live.duration >= buffering_sec) && 
      ((latest - stream_live.currentTime) > buffering_sec_seek)) {
      console.log("seek from ", stream_live.currentTime, " to ", latest);
      df = (stream_live.duration - stream_live.currentTime); // this much away from the last available frame
      if ((df > buffering_sec_seek)) {
          seek_to = stream_live.duration - buffering_sec_seek_distance;
          stream_live.currentTime = seek_to;
          }
  }

  data = arr;
  if (!stream_started) {
      if (verbose) {console.log("Streaming started: ", memview[0], memview[1], memview[2], memview[3], memview[4]);}
      source_buffer.appendBuffer(data);
      stream_started = true;
      cc = cc + 1;
      return;
  }
  
  queue.push(data); // add to the end
  if (verbose) { console.log("queue push:", queue.length); }
}


function loadPacket() { // called when source_buffer is ready for more
 if (!source_buffer.updating) { // really, really ready
      if (queue.length>0) {
      
          inp = queue.shift(); // pop from the beginning
          if (verbose) { console.log("queue pop:", queue.length); }
      
          var memview = new Uint8Array(inp);
          
          if (verbose) { console.log(" ==> writing buffer with", memview[0], memview[1], memview[2], memview[3]); }
          
          source_buffer.appendBuffer(inp);
          cc = cc + 1;
          }
      else { // the queue runs empty, so the next packet is fed directly
          stream_started = false;
      }
  }
  else { // so it was not?
  }
}


 function opened() 
 { // MediaSource object is ready to go
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaSource/duration
  ms.duration = buffering_sec;
  source_buffer = ms.addSourceBuffer(codecPars);
  
  // https://developer.mozilla.org/en-US/docs/Web/API/source_buffer/mode
  var myMode = source_buffer.mode;
  source_buffer.mode = 'sequence';
  // source_buffer.mode = 'segments';
  
  source_buffer.addEventListener("updateend",loadPacket);

  
}

function startup() {
  ms.addEventListener('sourceopen',opened,false);
  
  // get reference to video
  stream_live = document.getElementById('stream_live');

  // set mediasource as source of video
  stream_live.src = window.URL.createObjectURL(ms);
}


