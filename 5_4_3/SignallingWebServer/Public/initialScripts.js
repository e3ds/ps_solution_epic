var timeRecords = {};
var ss_list = [
		{
			"ss_url": "asia1.eagle3dstreaming.com:4430",
			//"ss_url": "usa_mp1.eagle3dstreaming.com:4430",
			"latitude": 32.01,
			"longitude": -102.11,
		},
		{
			"ss_url": "asia1.eagle3dstreaming.com:4430",
			"latitude": 35.652832,  
			"longitude": 139.839478,
		},
		{
			"ss_url": "frank.eagle3dstreaming.com:4430",
			"latitude": 50.11,  
			"longitude": 8.68,
		},
	];
var hasVideoStreamStarted2 =false ;
var skipReporting =0 ;
function getCurrentDate() {
	//return new Date(Date.now()).toISOString()
	return new Date()
}

function postToTelegram(message, input_chat_id)
{
	//return
	//if(skipReporting==true)
	//	return
	 //@Eagle3dStreaming_bot give me chat id
//if (isAdminDebugging == 1)
        console.log("postToTelegram(): " + message);
	
		if (typeof postToTelegramBody == 'function') 
		{
			
			postToTelegramBody(message, input_chat_id);
		}
}


function postToTelegramBody(message, input_chat_id = -4659092962) 
{
	if(skipReporting==1)
		return
	
	
    fetch("https://notifications.eagle3dstreaming.com/message_sent", 
	{
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify({
                input_chat_id: input_chat_id,
                message: message
            })
        })
        .then(response => 
		{

            //if (isAdminDebugging == 1)
              //  console.log(response);


        })
        .catch(err => {
            console.error(err);
        });

}


timeRecords.jsFileExecutionStartedAt=  getCurrentDate();


function e3ds_onLoad() 
{							
							
							
							 
			var streamingVideo = document.getElementById("streamingVideo");
		   if(streamingVideo)
		   {					 
				streamingVideo.addEventListener('playing', (event) => 
																	{
																		timeRecords.videoPlayingEventCalledAt=  getCurrentDate();
																	  console.log('Video is no longer paused');
																	  hasVideoStreamStarted2 = true;
																	  
																	 // processStarted = new Date();
																		//var sfsg=new Date()-processStarted
																		var sfsg=getCurrentDate()-timeRecords.jsFileExecutionStartedAt

																
																						var fsfsf=sfsg/1000
																						loadTime = fsfsf;
																						
																			
																				var sfsgsg="video stream took:"+ fsfsf + " sec.  Url: "+ window.location.href
																				
																				postToTelegram(sfsgsg,-4659092962  )
																	  
																	}
										)
		   }
		   else
		   {
			   setTimeout(function() {
				   e3ds_onLoad()
				   return
			   },500)
			   
		   }
  
}


async function getIPGeolocation() {
  try {
    const apiKey = '667cb95019b04ea5beaa7c935dc5ce37'; // Replace with your actual API key
    const apiUrl = `https://ipgeolocation.abstractapi.com/v1/?api_key=${apiKey}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    return data; 
  } catch (error) 
  {
	 
    console.error('Error fetching IP geolocation data:', error);
	
	setTimeout(function() 
	{
				    getIPGeolocation()
				   
			   },500)
			  
			  
    return null; 
  }
}

var geoInfo=undefined
// Example usage:
getIPGeolocation()
  .then(data => {
    if (data) {
      console.log(data); 
	  geoInfo=data
	  
	  const nearestServer = findNearestServer(ss_list, data.latitude, data.longitude);

		if (nearestServer) {
		  console.log('Nearest server:', nearestServer);
		   //wss_url="wss://"+cirrusServer.domain+"/ws/"+cirrusServer.httpsPort+"/";
		 
		  window.ss_url = "wss://"+nearestServer.ss_url
		  console.log('window.ss_url:'+window.ss_url);
		  
		  //&ss=sfsfsfsf
		} else {
		  console.log('No server found in the list.');
		}  


    } else {
      console.error('Failed to retrieve IP details.');
    }
  });
  
  
  
  
function findNearestServer(ss_list, userLatitude, userLongitude) {
  // Input validation (optional)
  if (!Array.isArray(ss_list) || !ss_list.length) {
    console.error('Invalid server list: must be a non-empty array');
    return null;
  }

  if (isNaN(userLatitude) || isNaN(userLongitude)) {
    console.error('Invalid user coordinates: must be numbers');
    return null;
  }

  // Calculate distances using Haversine formula for more accurate results
  function calculateDistance(serverLat, serverLon) {
    const earthRadius = 6371; // Kilometers

    const lat1Rad = userLatitude * Math.PI / 180;
    const lat2Rad = serverLat * Math.PI / 180;
    const dLatRad = (serverLat - userLatitude) * Math.PI / 180;
    const dLonRad = (serverLon - userLongitude) * Math.PI / 180;

    const a = Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLonRad / 2) * Math.sin(dLonRad / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  // Find the server with the minimum distance
  let nearestServer = null;
  let minDistance = Infinity;

  for (const server of ss_list) {
    const distance = calculateDistance(server.latitude, server.longitude);
    if (distance < minDistance) {
      minDistance = distance;
      nearestServer = server;
    }
  }

  return nearestServer;
}


