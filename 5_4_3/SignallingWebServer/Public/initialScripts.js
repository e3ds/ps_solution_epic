var timeRecords = {};
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