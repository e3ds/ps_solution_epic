// Copyright Epic Games, Inc. All Rights Reserved.
var enableRedirectionLinks = true;
var enableRESTAPI = true;

const defaultConfig = {
	// The port clients connect to the matchmaking service over HTTP
	HttpPort: 80,
	UseHTTPS: false,
	// The matchmaking port the signaling service connects to the matchmaker
	MatchmakerPort: 9999,

	// Log to file
	LogToFile: true,
	
	EnableWebserver: true,
};

// Similar to the Signaling Server (SS) code, load in a config.json file for the MM parameters
const argv = require('yargs').argv;

var configFile = (typeof argv.configFile != 'undefined') ? argv.configFile.toString() : 'config.json';
console.log(`configFile ${configFile}`);
const config = require('./modules/config.js').init(configFile, defaultConfig);
console.log("Config: " + JSON.stringify(config, null, '\t'));

const express = require('express');
var cors = require('cors');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const logging = require('./modules/logging.js');
logging.RegisterConsoleLogger();

if (config.LogToFile) {
	logging.RegisterFileLogger('./logs');
}

// A list of all the Cirrus server which are connected to the Matchmaker.
var cirrusServers = new Map();

//
// Parse command line.
//

if (typeof argv.HttpPort != 'undefined') {
	config.HttpPort = argv.HttpPort;
}
if (typeof argv.MatchmakerPort != 'undefined') {
	config.MatchmakerPort = argv.MatchmakerPort;
}

http.listen(config.HttpPort, () => {
    console.log('HTTP listening on *:' + config.HttpPort);
});


if (config.UseHTTPS) {
	//HTTPS certificate details
	const options = {
		key: fs.readFileSync(path.join(__dirname, './certificates/client-key.pem')),
		cert: fs.readFileSync(path.join(__dirname, './certificates/client-cert.pem'))
	};

	var https = require('https').Server(options, app);

	//Setup http -> https redirect
	console.log('Redirecting http->https');
	app.use(function (req, res, next) {
		if (!req.secure) {
			if (req.get('Host')) {
				var hostAddressParts = req.get('Host').split(':');
				var hostAddress = hostAddressParts[0];
				if (httpsPort != 443) {
					hostAddress = `${hostAddress}:${httpsPort}`;
				}
				return res.redirect(['https://', hostAddress, req.originalUrl].join(''));
			} else {
				console.error(`unable to get host name from header. Requestor ${req.ip}, url path: '${req.originalUrl}', available headers ${JSON.stringify(req.headers)}`);
				return res.status(400).send('Bad Request');
			}
		}
		next();
	});

	https.listen(443, function () {
		console.log('Https listening on 443');
	});
}

let htmlDirectory = 'html/sample'
if(config.EnableWebserver) {
	// Setup folders

	if (fs.existsSync('html/custom')) {
		app.use(express.static(path.join(__dirname, '/html/custom')))
		htmlDirectory = 'html/custom'
	} else {
		app.use(express.static(path.join(__dirname, '/html/sample')))
	}
}

// No servers are available so send some simple JavaScript to the client to make
// it retry after a short period of time.
function sendRetryResponse(res) {
	// find check if a custom template should be used or the sample one
	let html = fs.readFileSync(`${htmlDirectory}/queue/queue.html`, { encoding: 'utf8' })
	html = html.replace(/\$\{cirrusServers\.size\}/gm, cirrusServers.size)

	res.setHeader('content-type', 'text/html')
	res.send(html)
}

// Get a Cirrus server if there is one available which has no clients connected.
function getAvailableCirrusServer() {
	for (cirrusServer of cirrusServers.values()) {
		if (cirrusServer.numConnectedClients === 0 && cirrusServer.ready === true) {

			// Check if we had at least 10 seconds since the last redirect, avoiding the 
			// chance of redirecting 2+ users to the same SS before they click Play.
			// In other words, give the user 10 seconds to click play button the claim the server.
			if( cirrusServer.hasOwnProperty('lastRedirect')) {
				if( ((Date.now() - cirrusServer.lastRedirect) / 1000) < 10 )
					continue;
			}
			cirrusServer.lastRedirect = Date.now();

			return cirrusServer;
		}
	}
	
	console.log('WARNING: No empty Cirrus servers are available');
	return undefined;
}

if(enableRESTAPI) {
	// Handle REST signalling server only request.
	app.options('/signallingserver', cors())
	app.get('/signallingserver', cors(),  (req, res) => {
		cirrusServer = getAvailableCirrusServer();
		if (cirrusServer != undefined) {
			res.json({ signallingServer: `${cirrusServer.address}:${cirrusServer.port}`});
			console.log(`Returning ${cirrusServer.address}:${cirrusServer.port}`);
		} else {
			res.json({ signallingServer: '', error: 'No signalling servers available'});
		}
	});
}
function generateUniqueId(prefix) {
  // Generate a random 8-character hexadecimal string
  const randomPart = Math.random().toString(16).substring(2, 10); 

  // Combine the prefix with the random part
  return `${prefix}-${randomPart}`;
}


if(enableRedirectionLinks) {
	// Handle standard URL.
	/* app.get('/', (req, res) => {
		cirrusServer = getAvailableCirrusServer();
		if (cirrusServer != undefined) {
			res.redirect(`http://${cirrusServer.address}:${cirrusServer.port}/`);
			//console.log(req);
			console.log(`Redirect to ${cirrusServer.address}:${cirrusServer.port}`);
		} else {
			sendRetryResponse(res);
		}
	}); */


app.get('/', (req, res) => {
  cirrusServer = getAvailableCirrusServer();
  if (cirrusServer != undefined) 
  {
	  const myPrefix = ""; 
	 const StreamerId = req.params.StreamerId; 
	  if (StreamerId) 
	  {
		// User ID exists
		console.log(`StreamerId: ${StreamerId}`);
		myPrefix=StreamerId
		// Process the request with the user ID
		// ...
	  } 
  
//https://mp1.eagle3dstreaming.com/?HoveringMouse=true&AutoPlayVideo=true&StreamerId=vr_ps_52 
	  // Example usage:
		
		var uniqueId = generateUniqueId(myPrefix); 
		console.log(uniqueId); // Output: myUniquePrefix-a74c35f2
	  
	  
    const fullUrl = new URL(req.originalUrl, `http://${req.headers.host}`); 
    const redirectUrl = new URL(fullUrl.pathname + fullUrl.search, `http://${cirrusServer.address}:${cirrusServer.port}`);
	
	
	 redirectUrl.searchParams.append('uniqueId', uniqueId); // Add the uniqueId parameter



    res.redirect(redirectUrl.toString()); 
    console.log(`Redirect to ${redirectUrl.toString()}`);
  } else {
    sendRetryResponse(res);
  }
});

	// Handle URL with custom HTML.
	app.get('/custom_html/:htmlFilename', (req, res) => {
		cirrusServer = getAvailableCirrusServer();
		if (cirrusServer != undefined) {
			res.redirect(`http://${cirrusServer.address}:${cirrusServer.port}/custom_html/${req.params.htmlFilename}`);
			console.log(`Redirect to ${cirrusServer.address}:${cirrusServer.port}`);
		} else {
			sendRetryResponse(res);
		}
	});
}

//
// Connection to Cirrus.
//

const net = require('net');

function disconnect(connection) {
	console.log(`Ending connection to remote address ${connection.remoteAddress}`);
	connection.end();
}

const matchmaker = net.createServer((connection) => {
	connection.on('data', (data) => {
		try {
			message = JSON.parse(data);

			if(message)
				console.log(`Message TYPE: ${message.type}`);
		} catch(e) {
			console.log(`ERROR (${e.toString()}): Failed to parse Cirrus information from data: ${data.toString()}`);
			disconnect(connection);
			return;
		}
		if (message.type === 'connect') {
			// A Cirrus server connects to this Matchmaker server.
			cirrusServer = {
				address: message.address,
				port: message.port,
				numConnectedClients: 0,
				lastPingReceived: Date.now()
			};
			cirrusServer.ready = message.ready === true;

			// Handles disconnects between MM and SS to not add dupes with numConnectedClients = 0 and redirect users to same SS
			// Check if player is connected and doing a reconnect. message.playerConnected is a new variable sent from the SS to
			// help track whether or not a player is already connected when a 'connect' message is sent (i.e., reconnect).
			if(message.playerConnected == true) {
				cirrusServer.numConnectedClients = 1;
			}

			// Find if we already have a ciruss server address connected to (possibly a reconnect happening)
			let server = [...cirrusServers.entries()].find(([key, val]) => val.address === cirrusServer.address && val.port === cirrusServer.port);

			// if a duplicate server with the same address isn't found -- add it to the map as an available server to send users to.
			if (!server || server.size <= 0) {
				console.log(`Adding connection for ${cirrusServer.address.split(".")[0]} with playerConnected: ${message.playerConnected}`)
				cirrusServers.set(connection, cirrusServer);
            } else {
				console.log(`RECONNECT: cirrus server address ${cirrusServer.address.split(".")[0]} already found--replacing. playerConnected: ${message.playerConnected}`)
				var foundServer = cirrusServers.get(server[0]);
				
				// Make sure to retain the numConnectedClients from the last one before the reconnect to MM
				if (foundServer) {					
					cirrusServers.set(connection, cirrusServer);
					console.log(`Replacing server with original with numConn: ${cirrusServer.numConnectedClients}`);
					cirrusServers.delete(server[0]);
				} else {
					cirrusServers.set(connection, cirrusServer);
					console.log("Connection not found in Map() -- adding a new one");
				}
			}
		} else if (message.type === 'streamerConnected') {
			// The stream connects to a Cirrus server and so is ready to be used
			cirrusServer = cirrusServers.get(connection);
			if(cirrusServer) {
				cirrusServer.ready = true;
				console.log(`Cirrus server ${cirrusServer.address}:${cirrusServer.port} ready for use`);
			} else {
				disconnect(connection);
			}
		} else if (message.type === 'streamerDisconnected') {
			// The stream connects to a Cirrus server and so is ready to be used
			cirrusServer = cirrusServers.get(connection);
			if(cirrusServer) {
				cirrusServer.ready = false;
				console.log(`Cirrus server ${cirrusServer.address}:${cirrusServer.port} no longer ready for use`);
			} else {
				disconnect(connection);
			}
		} else if (message.type === 'clientConnected') {
			// A client connects to a Cirrus server.
			cirrusServer = cirrusServers.get(connection);
			if(cirrusServer) {
				cirrusServer.numConnectedClients++;
				console.log(`Client connected to Cirrus server ${cirrusServer.address}:${cirrusServer.port}`);
			} else {
				disconnect(connection);
			}
		} else if (message.type === 'clientDisconnected') {
			// A client disconnects from a Cirrus server.
			cirrusServer = cirrusServers.get(connection);
			if(cirrusServer) {
				cirrusServer.numConnectedClients--;
				console.log(`Client disconnected from Cirrus server ${cirrusServer.address}:${cirrusServer.port}`);
				if(cirrusServer.numConnectedClients === 0) {
					// this make this server immediately available for a new client
					cirrusServer.lastRedirect = 0;
				}
			} else {				
				disconnect(connection);
			}
		} else if (message.type === 'ping') {
			cirrusServer = cirrusServers.get(connection);
			if(cirrusServer) {
				cirrusServer.lastPingReceived = Date.now();
			} else {				
				disconnect(connection);
			}
		} else {
			console.log('ERROR: Unknown data: ' + JSON.stringify(message));
			disconnect(connection);
		}
	});

	// A Cirrus server disconnects from this Matchmaker server.
	connection.on('error', () => {
		cirrusServer = cirrusServers.get(connection);
		if(cirrusServer) {
			cirrusServers.delete(connection);
			console.log(`Cirrus server ${cirrusServer.address}:${cirrusServer.port} disconnected from Matchmaker`);
		} else {
			console.log(`Disconnected machine that wasn't a registered cirrus server, remote address: ${connection.remoteAddress}`);
		}
	});
});

matchmaker.listen(config.MatchmakerPort, () => {
	console.log('Matchmaker listening on *:' + config.MatchmakerPort);
});





//******************************************************************exeluncher
/* 

const socketio = require('socket.io');


const server = require('http').createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('Message from client:', msg);
    io.emit('broadcast', msg); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

 */
///////////////////////exeluncher
var exeluncherPort=4567
var exelunchers = [];
var app_exeluncher = require("express")();
var http_exeluncher = require("http").Server(app_exeluncher);
var io_exeluncher = require("socket.io")(http_exeluncher);
var util = require("util");
function startio_exeluncher() {
  io_exeluncher.on("connection", function (socket)
  {
    console.log(
      "exeluncher connected id:" +
      util.inspect(socket.id) +
      ", total: " +
      exelunchers.length
    );
    //exelunchers.push(socket)
    socket.send(
      "you are conneted to MMLineker.js   as exeluncher id:" +
      util.inspect(socket.id)
    );

    //////////////////////////////upload
    
    socket.on("sendmeafile", function (data)
    {
		const ss = require("socket.io-stream");
      // data-->	appName: appName //"DHP_Config_Desktop"
      // ,version: version //"DHP_Config_Desktop"
      // ,SSAddress: serverPublicIp
      // ,ue4StreamerToSS: streamerPort

      console.log(
        "11111111111111 Exeluncher--> MMLineker sendmeafile " +
        JSON.stringify(data)
      );

      //file

      var filePath =
        exeDirectory + "\\" + data.owner + "\\" + data.appName + "\\";
      var filename = data.version + ".zip"; //'macthMakerNormal.7z';

      var fullFilePath = filePath + filename;

      console.log("searching for:" + fullFilePath);

      if (!fs.existsSync(fullFilePath))
      {
        console.log("FileDoesNotExist :" + fullFilePath);
        console.log(
          "11111111111111 MMLineker-->Exeluncher FileDoesNotExist " +
          JSON.stringify(data)
        );

        socket.emit("FileDoesNotExist", data);
        return;
      }
      console.log(
        "path.basename(path.dirname(filename)) : " +
        path.basename(path.dirname(fullFilePath))
      );
      console.log("sendmeafile : " + fullFilePath);

      var stats = fs.statSync(fullFilePath);
      var fileSizeInBytes = stats["size"];

      //console.log('111111111111 stats["size"]: '+stats["size"]);
      //console.log('111111111111 stats.size: '+stats.size);

      var zipSize = stats.size;
      var uploadedSize = 0;

      //fs to read file
      var zipReadStream = fs.createReadStream(fullFilePath);

      zipReadStream.on("data", function (buffer)
      {
        var segmentLength = buffer.length;

        // Increment the uploaded data counter
        uploadedSize += segmentLength;

        // Display the upload percentage

        var ttt = ((uploadedSize / zipSize) * 100).toFixed(2) + "%";
        //console.log("Progress:\t",ttt);
        process.stdout.write("uploaded " + ttt + " \r");
      });

      // Some other events you might want for your code
      zipReadStream.on("end", function ()
      {
        console.log("zipReadStream : end");
      });
      zipReadStream.on("close", function ()
      {
        console.log("zipReadStream : close");
      });

      //socket.io-stream
      var stream = ss.createStream(); //createStream() returns a new stream which can be sent by emit().

      stream.on("end", function ()
      {
        console.log("111111111111socket.io-stream: stream end");
      });
      ss(socket).emit("sending", stream, {
        filename: filename,
        fileSize: zipSize,
        parentFolder: path.basename(path.dirname(fullFilePath)),
        AppInfoRequested2Linker: data,
      });

      //combine operation

      zipReadStream.pipe(stream);

      /*
															//Upload progress
															var blobStream = ss.createBlobReadStream(filePath+filename);//createStream() returns a new stream which can be sent by emit().

															blobStream.on('end', function ()
																				{
																					console.log('111111111111 blobStream file sent');
																				}
																	  );


															var size = 0;


															blobStream.on('data', function(chunk)
																					{
																						size += chunk.length;
																						console.log(Math.floor(size / file.size * 100) + '%');
																						// -> e.g. '42%'
																					}
																		 );
															blobStream.pipe(stream); */
    });

    //////////////////////////////upload

    socket.on("sendMMlinkerInfo", function (obj)
    {
		//if(obj.el_version== config.el_version)
			//socket.emit("taskeMMlinkerInfo", MMLinkerInfo);
		//else
		//	socket.emit("secretKeyMismatched");
    });

    socket.on("sendSslunchersList", function ()
    {
      //console.logColor(logging.Blue,"Exeluncher--> MMLineker sendSslunchersList ");

     return

      // console.log(sslunchers  );
      var temp = [];
      var toremove = [];
      for (i = 0; i < sslunchers.length; i++)
      {
        var entry = sslunchers[i];

        if (
          entry.socket !== undefined && //checking if by any chance if this ssluncher is dead one and somehow wasskipped removeFromArray
          entry.socket.connected &&
          !entry.socket.disconnected
        )
        {
          var tt = {
            ssluncher_ip: entry.ssluncher_ip,
            exeluncherPort: entry.exeluncherPort,
            SSNum: entry.SSNum,
            queue: entry.queue
          };
          temp.push(tt);
        }
        else
        {
          console.log(
            "sendSslunchersList: found an dead ssluncher: " +
            entry.ssluncher_ip +
            ":" +
            entry.exeluncherPort +
            " , id: " +
            entry.socket.id
          );
          //2do-should we rrmoave this from list. or keep it for futurte tarcking purpose to find out why they skippedin removeFromArray
		  toremove.push(i);
		   
        }
      }

	for (i = 0; i < toremove.length; i++)
      {
		sslunchers.splice(toremove[i], 1);
	  }

      //console.log(temp  );

      //socket.emit("taskeSSLuncherArray",sslunchers);
      socket.emit("taskeSSLuncherArray", temp);
	  // console.log("MMLineker--> Exeluncher taskeSSLuncherArray "+JSON.stringify(temp));
    });



  
    socket.on("disconnect", function (reason)
    {
      /* var i=0
																 exelunchers.forEach(function(c){

																	if(c.id == socket.id)
																		exelunchers.splice(i,1)

																	i++

																}); */

      console.log(
        "exeluncher disconnected " +
        util.inspect(socket.id) +
        ", exelunchers.length: " +
        exelunchers.length
      );
      console.log("io_exeluncher: disconnect reason: " + reason);
    });

    //????????????????????????????????????????????????????
    socket.on("error", (error) =>
    {
      console.log("io_exeluncher reconnect_error : ", error);
    });

    socket.on("connect", () =>
    {
      console.log(
        "---------------io_exeluncher connect 22222222222222222222do"
      );
    });

    socket.on("connect_timeout", (timeout) =>
    {
      console.log("io_exeluncher connect_timeout: " + timeout);
    });

    socket.on("connect_error", (error) =>
    {
      console.log("io_exeluncher connect_error: ", error);
    });

    //Fired upon a successful reconnection.
    socket.on("reconnect", (attemptNumber) =>
    {
      console.log("io_exeluncher reconnect attemptNumber: " + attemptNumber);
    });

    socket.on("reconnect_attempt", (attemptNumber) =>
    {
      console.log(
        "io_exeluncher reconnect_attempt attemptNumber: " + attemptNumber
      );
    });

    socket.on("reconnecting", (attemptNumber) =>
    {
      console.log("io_exeluncher reconnecting attemptNumber: " + attemptNumber);
    });

    socket.on("reconnect_error", (error) =>
    {
      console.log("io_exeluncher reconnect_error : ", error);
    });

    socket.on("reconnect_failed", () =>
    {
      console.log("io_exeluncher reconnect_failed  ");
    });


 socket.on('ping4MMLineker', () => {
    console.log('Received ping4MMLineker from client');
    socket.emit('pong4MMLineker');
  });
  
    socket.on("ping", () =>
    {
      console.log("io_exeluncher ping ");
    });

    socket.on("pong", (latency) =>
    {
      console.log("io_exeluncher pong latency: ", latency);
    });

    socket.on("isCcuLimitExceeded", async (obj)=>{
      const responseEvent = `isCcuLimitExceededResponse`;
      if(obj && obj.owner && obj.owner.length){
        const config = {
          method: 'get',
          url: `https://controlpanel.eagle3dstreaming.com/${obj.owner}/getUsersinfo`
        }
        try{
          let response = await axios(config);
          response = response.data;
          const maxCcuLimit = response.maxUserLimit;
          if(!maxCcuLimit || maxCcuLimit == undefined || maxCcuLimit <= 0){
            return socket.emit(responseEvent, {error: `Failed to fetch maxUserLimit for user ${obj.owner}`, meta: {maxCcuLimit}});
          }

          let i = 0;
          while(!cirrusServers_io.size && !cirrusServers.size && i<10){
            await new Promise((resolve) => setTimeout(resolve, 2000));
            i++;
          }
          //START
          console.log(cirrusServers_io.size)
          console.log(cirrusServers.size)

          if (matchmakerType == 2) 
		        cirrusServersT = cirrusServers_io;
          else 
		        cirrusServersT = cirrusServers;

          console.logColor(logging.White, "isCcuLimitExceeded")
          console.log(JSON.stringify(cirrusServersT.size));

          let count = 0;
          for (const cirrusServer223 of cirrusServersT.values()){
            if (cirrusServer223.owner == obj.owner ||cirrusServer223.temp_OwnerOfLastAssignedPlayer == obj.owner || (cirrusServer223.elInfo && cirrusServer223.elInfo.preAllocateApp_owner == obj.owner))
              count++;
              console.log("count-->")
              console.log(count)
              console.log(JSON.stringify(cirrusServer223))
          }
    
          if (count >= maxCcuLimit){
            return socket.emit(responseEvent, {data: {status: true, count: {count, maxCcuLimit}}});
          } else {
            return socket.emit(responseEvent, {data: {status: false, count: {count, maxCcuLimit}}});
	        }
          //END
        }catch(err){
          return socket.emit(responseEvent, {error: `Critical error in fetching maxUserLimit for user ${obj.owner}`, meta: {object: err, string: err.toString(), stringified: JSON.stringify(err)}});
        }
        
      }
		//if(obj.el_version== config.el_version)
			socket.emit("taskeMMlinkerInfo", MMLinkerInfo);
		//else
		//	socket.emit("secretKeyMismatched");
    });

    //????????????????????????????????????????????????????
  });

  http_exeluncher.listen(exeluncherPort, function ()
  {
    console.logColor(
      logging.Red,
      " listening on *:" + exeluncherPort + " for exeLuncher"
    );
  });
}


startio_exeluncher()