// Copyright Epic Games, Inc. All Rights Reserved.

//-- Server side logic. Serves pixel streaming WebRTC-based page, proxies data back to Streamer --//


function postToTelegram(message,input_chat_id= -4124108772) 
{
	
	axios.post("http://notifications.eagle3dstreaming.com:8080/message_sent", 
	{
	  "input_chat_id": input_chat_id,//-1001587349178,
	  "message":message
	}, 
	{
	  headers: {
		'Content-Type': 'application/json'
	  }
	})
	 .then((res) => 
	  {
        console.log("postToTelegram() message sent:" +message);
        
      })
	  .catch(err => 
									{
									  console.error(err);
								});	
}



var express = require('express');
var app = express();





					
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const logging = require('./modules/logging.js');
logging.RegisterConsoleLogger();

// Command line argument --configFile needs to be checked before loading the config, all other command line arguments are dealt with through the config object

const defaultConfig = {
	UseFrontend: false,
	UseMatchmaker: false,
	UseHTTPS: false,
	HTTPSCertFile: './certificates/client-cert.pem',
	HTTPSKeyFile: './certificates/client-key.pem',
	LogToFile: true,
	LogVerbose: true,
	HomepageFile: 'player.html',
	AdditionalRoutes: new Map(),
	EnableWebserver: true,
	MatchmakerAddress: "",
	MatchmakerPort: 9999,
	PublicIp: "localhost",
	HttpPort: 80,
	HttpsPort: 443,
	StreamerPort: 8888,
	SFUPort: 8889,
	MaxPlayerCount: -1,
	DisableSSLCert: true
};

const argv = require('yargs').argv;
var configFile = (typeof argv.configFile != 'undefined') ? argv.configFile.toString() : path.join(__dirname, 'config.json');
console.log(`configFile ${configFile}`);
const config = require('./modules/config.js').init(configFile, defaultConfig);

if (config.LogToFile) {
	logging.RegisterFileLogger('./logs/');
}

console.log("Config: " + JSON.stringify(config, null, '\t'));

var http = require('http').Server(app);

if (config.UseHTTPS) {
	//HTTPS certificate details
	const options = {
		key: fs.readFileSync(path.join(__dirname, config.HTTPSKeyFile)),
		cert: fs.readFileSync(path.join(__dirname, config.HTTPSCertFile))
	};

	var https = require('https').Server(options, app);
}

const helmet = require('helmet');
var hsts = require('hsts');
var net = require('net');

var FRONTEND_WEBSERVER = 'https://localhost';
if (config.UseFrontend) {
	var httpPort = 3000;
	var httpsPort = 8000;

	if (config.UseHTTPS && config.DisableSSLCert) {
		//Required for self signed certs otherwise just get an error back when sending request to frontend see https://stackoverflow.com/a/35633993
		console.logColor(logging.Orange, 'WARNING: config.DisableSSLCert is true. Unauthorized SSL certificates will be allowed! This is convenient for local testing but please DO NOT SHIP THIS IN PRODUCTION. To remove this warning please set DisableSSLCert to false in your config.json.');
		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
	}

	const httpsClient = require('./modules/httpsClient.js');
	var webRequest = new httpsClient();
} else {
	var httpPort = config.HttpPort;
	var httpsPort = config.HttpsPort;
}

var streamerPort = config.StreamerPort; // port to listen to Streamer connections
var sfuPort = config.SFUPort;

var matchmakerAddress = '127.0.0.1';
var matchmakerPort = 9999;
var matchmakerRetryInterval = 5;
var matchmakerKeepAliveInterval = 30;
var maxPlayerCount = -1;

var gameSessionId;
var userSessionId;
var serverPublicIp;

// `clientConfig` is send to Streamer and Players
// Example of STUN server setting
// let clientConfig = {peerConnectionOptions: { 'iceServers': [{'urls': ['stun:34.250.222.95:19302']}] }};
var clientConfig = { type: 'config', peerConnectionOptions: {} };

// Parse public server address from command line
// --publicIp <public address>
try {
	if (typeof config.PublicIp != 'undefined') {
		serverPublicIp = config.PublicIp.toString();
	}

	if (typeof config.HttpPort != 'undefined') {
		httpPort = config.HttpPort;
	}

	if (typeof config.HttpsPort != 'undefined') {
		httpsPort = config.HttpsPort;
	}

	if (typeof config.StreamerPort != 'undefined') {
		streamerPort = config.StreamerPort;
	}

	if (typeof config.SFUPort != 'undefined') {
		sfuPort = config.SFUPort;
	}

	if (typeof config.FrontendUrl != 'undefined') {
		FRONTEND_WEBSERVER = config.FrontendUrl;
	}

	if (typeof config.peerConnectionOptions != 'undefined') {
		clientConfig.peerConnectionOptions = JSON.parse(config.peerConnectionOptions);
		console.log(`peerConnectionOptions = ${JSON.stringify(clientConfig.peerConnectionOptions)}`);
	} else {
		console.log("No peerConnectionConfig")
	}

	if (typeof config.MatchmakerAddress != 'undefined') {
		matchmakerAddress = config.MatchmakerAddress;
	}

	if (typeof config.MatchmakerPort != 'undefined') {
		matchmakerPort = config.MatchmakerPort;
	}

	if (typeof config.MatchmakerRetryInterval != 'undefined') {
		matchmakerRetryInterval = config.MatchmakerRetryInterval;
	}

	if (typeof config.MaxPlayerCount != 'undefined') {
		maxPlayerCount = config.MaxPlayerCount;
	}
} catch (e) {
	console.error(e);
	process.exit(2);
}

if (config.UseHTTPS) {
	app.use(helmet());

	app.use(hsts({
		maxAge: 15552000  // 180 days in seconds
	}));

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
}

sendGameSessionData();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 60
});

// apply rate limiter to all requests
app.use(limiter);

if(config.EnableWebserver) {
	//Setup folders
	app.use(express.static(path.join(__dirname, '/Public')))
	app.use('/images', express.static(path.join(__dirname, './images')))
	app.use('/scripts', express.static(path.join(__dirname, '/scripts')));
	app.use('/', express.static(path.join(__dirname, '/custom_html')))
}

try {
	for (var property in config.AdditionalRoutes) {
		if (config.AdditionalRoutes.hasOwnProperty(property)) {
			console.log(`Adding additional routes "${property}" -> "${config.AdditionalRoutes[property]}"`)
			app.use(property, express.static(path.join(__dirname, config.AdditionalRoutes[property])));
		}
	}
} catch (err) {
	console.error(`reading config.AdditionalRoutes: ${err}`)
}


app.set("view engine", "ejs");
/* app.set("views", __dirname + "/src");
res.render("observer", {
        title: "Observer",
        MML_domainName:config.MML_domainName,
        topLevelDomainName:config.topLevelDomainName,
        fullSubDomainName:
          config.fullSubDomainName + "." + config.topLevelDomainName,
        MML_backDoorPort4_io: config.MML_backDoorPort4_io,
      });
	   */


function isElAssignable(el) 
{
	if(
	(el.isAssigned != true)
						&&
						(
							(el.exeData== undefined)
							||
							(el.exeData.length <=0) 
						)
	)
		return true
		else
			return false 
	
}


function assignReqToEl(el,req_data,j=undefined) 
{
	el.isAssigned=true
							console.log("---------startStreamingAppLunchingProcess : " + JSON.stringify(req_data));
							el.emit("startStreamingAppLunchingProcess", req_data);
							   // Send a response (e.g., acknowledge receipt)
							   
							  
							req_data.assignEL=util.inspect(el.id)
	
	if(j != undefined)
		waitingRequests.splice(j, 1);
}


function processWaitingRequests() 
{
	
	
	if(waitingRequests.length>0)
	{
		for (j = 0; j < waitingRequests.length; j++) 
		{
			var req_data=waitingRequests[j]
			for (i = 0; i < exelunchers.length; i++) 
				{
					//console.log(exelunchers.exeData );	
					//console.log(exelunchers.exeData.length );	
					if(isElAssignable(exelunchers[i]) )
						{
							assignReqToEl(exelunchers[i],req_data,j) 
							  
							//req_data.assignEL=util.inspect(exelunchers[i].id)
						  break
							
						}
					
				}
			
					
		}
		
	}
	
	
}



const { v4: uuidv4 } = require('uuid');

function generateUniqueId(prefix) {
  // Generate a random 8-character hexadecimal string
  const randomPart = Math.random().toString(16).substring(2, 10); 


var fsfsg= `${prefix}-${uuidv4()}`;


  // Combine the prefix with the random part
  return fsfsg//`${prefix}_${randomPart}`;
}

const axios = require('axios');

const https233333 = require("https");
const axiosInst = axios.create({
  httpsAgent: new https233333.Agent({
    rejectUnauthorized: false,
  }),
});

var waitingRequests=[]
//async 
//function getDownloadLinkForUploader4ToUSeBeforeQueue(req_data,res111) 
function askTostartStreamingAppLunchingProcess(req_data, res111) {
    console.log("---------getDownloadLinkForUploader4ToUSeBeforeQueue req_data: " + JSON.stringify(req_data));

    var url = "https://upload-api.eagle3dstreaming.com/api/v1/files/coreweave"
        + "/streamingapp/"
        + req_data.owner
        + "/"
        + req_data.appName
        + "/download/";

    if (req_data.version == -1 || req_data.version == undefined) {
        url = url + "latest";
    } else {
        url = url + req_data.version;
    }

    console.log("---------url111 : " + url);

    return new Promise((resolve) => {
        axiosInst
            .get(url)
            .then(async (res) => {
                console.logColor(logging.Red, "111--------------getAppListOfFromGCS: " + " . axiosInst data:" + JSON.stringify(res.data));

                if (res.data.status == "error") {
                    if (res.data.message == "Not Found") {
                        var messageToSend = req_data.owner + "/" + req_data.appName + " does not exist";
                        res111.status(200).json({ error: messageToSend });
                    } else {
                        res111.status(200).json({ error: res.data.message });
                    }
                    console.log(res.data.message);
                    console.log(res.data.stack);
                    return resolve(false);
                } else {
                    var url = res.data.data.url; // azure storage
                    console.log("---------url2222 : " + url);

                    var version222 = path.parse(res.data.data.filename).name;
                    console.log("---------version222 : " + version222);

                    req_data.appDownloadInfo = res.data.data;
                    req_data.version = version222;
                    req_data.ss_config = config;

                    var uniqueId = generateUniqueId(req_data.owner + "_" + req_data.appName);
                    console.log(uniqueId);

                    req_data.uid = uniqueId;

                    var exelunchers_mm = exelunchers;
                    var found = false;
                    for (var i = 0; i < exelunchers_mm.length; i++) {
                        if (isElAssignable(exelunchers_mm[i])) {
							
							console.log("---asiging el : "+exelunchers_mm[i].elInfo.computerName );
							
                            assignReqToEl(exelunchers_mm[i], req_data);
                            found = true;
                            break;
                        }
                    }

                    if (!found) 
					{
						console.log("---no free e.putting in weaiting rquest: "+req_data.uid );

						waitingRequests.push(req_data);
					}

                    if (req_data.uid) {
                        app.set("views", __dirname + "/views");
                        app.set("views", __dirname + "/Public");

                        var ejsViewFile = 'player';
                        var myStringValue = req_data.uid;

                        res111.render(ejsViewFile, { myStringValue });
                    }
                }
                return resolve(true);
            })
            .catch((error) => {
                console.error('Trying again, because of Error sending data:', error);
                askTostartStreamingAppLunchingProcess(req_data, res111);
                return resolve(true);
            });
    });
}





function askTostartStreamingAppLunchingProcess11(dataToSend,res) {
	dataToSend.ss_config=config 
	dataToSend.PublicIp=config.PublicIp
	dataToSend.StreamerPort=config.StreamerPort

	
	getDownloadLinkForUploader4ToUSeBeforeQueue(dataToSend,res)


	
	return
	
	var url="https://"+config.MatchmakerAddress + ":"+config.MatchmakerPort+"/startStreamingAppLunchingProcess"
	 console.log('askTostartStreamingAppLunchingProcess url:'+url); 
	 console.dir(dataToSend); 
  axios.post(url, dataToSend)
    .then(response => {
      //console.log('Data sent successfully:', response.data); 
	  
	  
	  if(response.data.uid)
	  {
		   app.set("views", __dirname + "/views");
		 app.set("views", __dirname + "/Public");
		 
		 var ejsViewFile='player'
		 
		 var myStringValue =response.data.uid
		  //myStringValue = "gsgjb-dfsbgsg_sfsg"
		 
		 
		res.render(ejsViewFile, {myStringValue});
		
	  }
	  else if(response.data.error)
	  {
		 
		 
		res.send(response.data.error);
		
	  }
	  else if (response.data.exelunchers_length)
	  {
		  if (response.data.exelunchers_length<=0)
		  {
			   app.set("views", __dirname + "/views");
			 app.set("views", __dirname + "/Public");
			 
			 var ejsViewFile='player'
			 
			 var myStringValue =response.data.uid
			 res.render(ejsViewFile, {myStringValue});
		  }
		  
	  }
	  
    })
    .catch(error => {
      console.error('trying again , bcz Error sending data:', error);
	  
	  askTostartStreamingAppLunchingProcess(dataToSend,res)
    });
}


function askToCleanQueueForThisPlayer(player) 
{
	var dataToSend={
		
		uid:player.uid
	}
	dataToSend.ss_config=config 
	dataToSend.PublicIp=config.PublicIp
	dataToSend.StreamerPort=config.StreamerPort
	var url="https://"+config.MatchmakerAddress + ":"+config.MatchmakerPort+"/askToCleanQueueForThisPlayer"
	 console.log('askToCleanQueueForThisPlayer url:'+url); 
	 console.dir(dataToSend); 
  axios.post(url, dataToSend)
    .then(response => {
      console.log('askToCleanQueueForThisPlayer Data sent successfully:', response.data); 
	  
	  
	  if(response.data.uid)
	  {
		  
		
	  }
	  else if(response.data.error)
	  {
		 
		 
		
		
	  }
	 // else if (response.data.exelunchers_length)
	 // {
		 
		  
	 // }
	  
    })
    .catch(error => {
      console.error('askToCleanQueueForThisPlayer trying again , bcz Error sending data:', error);
	  
	  askToCleanQueueForThisPlayer(dataToSend)
    });
}


if(config.EnableWebserver) {

	// Request has been sent to site root, send the homepage file
	app.get('/', function (req, res) {
		
		
		const queryParams = {};

		  // Iterate through query parameters
		  for (const [key, value] of Object.entries(req.query)) {
			queryParams[key] = value;
		  }

		console.dir(queryParams)
		
		
		//https://connector_ms6.eagle3dstreaming.com/v5/demo/VR_AChristmasCarol/0
		
		//matchmaker.write(JSON.stringify(message));
		
		askTostartStreamingAppLunchingProcess(queryParams,res)
		
		
		return
		
		
	
	
		
		homepageFile = (typeof config.HomepageFile != 'undefined' && config.HomepageFile != '') ? config.HomepageFile.toString() : defaultConfig.HomepageFile;
		
		let pathsToTry = [ path.join(__dirname, homepageFile), path.join(__dirname, '/Public', homepageFile), path.join(__dirname, '/custom_html', homepageFile), homepageFile ];

		// Try a few paths, see if any resolve to a homepage file the user has set
		for(let pathToTry of pathsToTry){
			if(fs.existsSync(pathToTry)){
				// Send the file for browser to display it
				res.sendFile(pathToTry);
				return;
			}
		}

		// Catch file doesn't exist, and send back 404 if not
		console.error('Unable to locate file ' + homepageFile)
		res.status(404).send('Unable to locate file ' + homepageFile);
		return;
	});
}

//Setup http and https servers
http.listen(httpPort, function () {
	console.logColor(logging.Green, 'Http listening on *: ' + httpPort);
});

if (config.UseHTTPS) {
	https.listen(httpsPort, function () {
		console.logColor(logging.Green, 'Https listening on *: ' + httpsPort);
	});
}

console.logColor(logging.Cyan, `Running Cirrus - The Pixel Streaming reference implementation signalling server for Unreal Engine 5.3.`);

let nextPlayerId = 1;

const StreamerType = { Regular: 0, SFU: 1 };

class Streamer {
	constructor(initialId, ws, type) {
		this.id = initialId;
		this.ws = ws;
		this.type = type;
		this.idCommitted = false;
	}

	// registers this streamers id
	commitId(id) {
		this.id = id;
		this.idCommitted = true;
	}

	// returns true if we have a valid id
	isIdCommitted() {
		return this.idCommitted;
	}

	// links this streamer to a subscribed SFU player (player component of an SFU)
	addSFUPlayer(sfuPlayerId) {
		if (!!this.SFUPlayerId && this.SFUPlayerId != sfuPlayerId) {
			console.error(`Streamer ${this.id} already has an SFU ${this.SFUPlayerId}. Trying to add ${sfuPlayerId} as SFU.`);
			return;
		}
		this.SFUPlayerId = sfuPlayerId;
	}

	// removes the previously subscribed SFU player
	removeSFUPlayer() {
		delete this.SFUPlayerId;
	}

	// gets the player id of the subscribed SFU if any
	getSFUPlayerId() {
		return this.SFUPlayerId;
	}

	// returns true if this streamer is forwarding another streamer
	isSFU() {
		return this.type == StreamerType.SFU;
	}

	// links this streamer to a player, used for SFU connections since they have both components
	setSFUPlayerComponent(playerComponent) {
		if (!this.isSFU()) {
			console.error(`Trying to add an SFU player component ${playerComponent.id} to streamer ${this.id} but it is not an SFU type.`);
			return;
		}
		this.sfuPlayerComponent = playerComponent;
	}

	// gets the player component for this sfu
	getSFUPlayerComponent() {
		if (!this.isSFU()) {
			console.error(`Trying to get an SFU player component from streamer ${this.id} but it is not an SFU type.`);
			return null;
		}
		return this.sfuPlayerComponent;
	}
}

const PlayerType = { Regular: 0, SFU: 1 };
const WhoSendsOffer = { Streamer: 0, Browser: 1 };

class Player {
	constructor(id, ws, type, whoSendsOffer) {
		this.id = id;
		this.ws = ws;
		this.type = type;
		this.whoSendsOffer = whoSendsOffer;
	}

	isSFU() {
		return this.type == PlayerType.SFU;
	}

	subscribe(streamerId,msg22) 
	{
		if (!streamers.has(streamerId)) {
			console.error(`subscribe: Player ${this.id} tried to subscribe to a non-existent streamer ${streamerId}`);
			return;
		}
		this.uid = msg22.uid;
		console.log("msg22:")
		console.dir(msg22)
		console.log(this.uid +"---"+ msg22.uid)
		this.streamerId = streamerId;
		if (this.type == PlayerType.SFU) {
			let streamer = streamers.get(this.streamerId);
			streamer.addSFUPlayer(this.id);
		}
		const msg = { type: 'playerConnected', playerId: this.id, dataChannel: true, sfu: this.type == PlayerType.SFU, sendOffer: this.whoSendsOffer == WhoSendsOffer.Streamer };
		logOutgoing(this.streamerId, msg);
		this.sendFrom(msg);
	}

	unsubscribe() {
		if (this.streamerId && streamers.has(this.streamerId)) {
			if (this.type == PlayerType.SFU) {
				let streamer = streamers.get(this.streamerId);
				if (streamer.getSFUPlayerId() != this.id) {
					console.error(`Trying to unsibscribe SFU player ${this.id} from streamer ${streamer.id} but the current SFUId does not match (${streamer.getSFUPlayerId()}).`)
				} else {
					streamer.removeSFUPlayer();
				}
			}
			const msg = { type: 'playerDisconnected', playerId: this.id };
			logOutgoing(this.streamerId, msg);
			this.sendFrom(msg);
		}
		this.streamerId = null;
	}

	sendFrom(message) {
		if (!this.streamerId) {
			if(streamers.size > 0) {
				this.streamerId = streamers.entries().next().value[0];
				console.logColor(logging.Orange, `Player ${this.id} attempted to send an outgoing message without having subscribed first. Defaulting to ${this.streamerId}`);
			} else {
				console.logColor(logging.Orange, `Player ${this.id} attempted to send an outgoing message without having subscribed first. No streamer connected so this message isn't going anywhere!`)
				return;
			}
		}

		// normally we want to indicate what player this message came from
		// but in some instances we might already have set this (streamerDataChannels) due to poor choices
		if (!message.playerId) {
			message.playerId = this.id;
		}
		const msgString = JSON.stringify(message);

		let streamer = streamers.get(this.streamerId);
		if (!streamer) {
			console.error(`sendFrom: Player ${this.id} subscribed to non-existent streamer: ${this.streamerId}`);
		} else {
			streamer.ws.send(msgString);
		}
	}

	sendTo(message) {
		const msgString = JSON.stringify(message);
		this.ws.send(msgString);
	}

	setSFUStreamerComponent(streamerComponent) {
		if (!this.isSFU()) {
			console.error(`Trying to add an SFU streamer component ${streamerComponent.id} to player ${this.id} but it is not an SFU type.`);
			return;
		}
		this.sfuStreamerComponent = streamerComponent;
	}

	getSFUStreamerComponent() {
		if (!this.isSFU()) {
			console.error(`Trying to get an SFU streamer component from player ${this.id} but it is not an SFU type.`);
			return null;
		}
		return this.sfuStreamerComponent;
	}
};

let streamers = new Map();		// streamerId <-> streamer
let players = new Map(); 		// playerId <-> player/peer/viewer
const LegacyStreamerPrefix = "__LEGACY_STREAMER__"; // old streamers that dont know how to ID will be assigned this id prefix.
const LegacySFUPrefix = "__LEGACY_SFU__"; 					// same as streamer version but for SFUs
const streamerIdTimeoutSecs = 5;

// gets the SFU subscribed to this streamer if any.
function getSFUForStreamer(streamerId) {
	if (!streamers.has(streamerId)) {
		return null;
	}
	const streamer = streamers.get(streamerId);
	const sfuPlayerId = streamer.getSFUPlayerId();
	if (!sfuPlayerId) {
		return null;
	}
	return players.get(sfuPlayerId);
}

function logIncoming(sourceName, msg) {
	if (config.LogVerbose)
		console.logColor(logging.Blue, "\x1b[37m%s ->\x1b[34m %s", sourceName, JSON.stringify(msg));
	else
		console.logColor(logging.Blue, "\x1b[37m%s ->\x1b[34m %s", sourceName, msg.type);
}

function logOutgoing(destName, msg) {
	if (config.LogVerbose)
		console.logColor(logging.Green, "\x1b[37m%s <-\x1b[32m %s", destName, JSON.stringify(msg));
	else
		console.logColor(logging.Green, "\x1b[37m%s <-\x1b[32m %s", destName, msg.type);
}

function logForward(srcName, destName, msg) {
	if (config.LogVerbose)
		console.logColor(logging.Cyan, "\x1b[37m%s -> %s\x1b[36m %s", srcName, destName, JSON.stringify(msg));
	else
		console.logColor(logging.Cyan, "\x1b[37m%s -> %s\x1b[36m %s", srcName, destName, msg.type);
}

let WebSocket = require('ws');

let sfuMessageHandlers = new Map();
let playerMessageHandlers = new Map();

function sanitizePlayerId(playerId) {
	if (playerId && typeof playerId === 'number') {
		playerId = playerId.toString();
	}
	return playerId;
}

function getPlayerIdFromMessage(msg) {
	return sanitizePlayerId(msg.playerId);
}

let uniqueLegacyStreamerPostfix = 0;
function getUniqueLegacyStreamerId() {
	const finalId = LegacyStreamerPrefix + uniqueLegacyStreamerPostfix;
	++uniqueLegacyStreamerPostfix;
	return finalId;
}

let uniqueLegacySFUPostfix = 0;
function getUniqueLegacySFUId() {
	const finalId = LegacySFUPrefix + uniqueLegacySFUPostfix;
	++uniqueLegacySFUPostfix;
	return finalId;
}

function requestStreamerId(streamer) {
	// first we ask the streamer to id itself.
	// if it doesnt reply within a time limit we assume it's an older streamer
	// and assign it an id.

	// request id
	const msg = { type: "identify" };
	logOutgoing(streamer.id, msg);
	streamer.ws.send(JSON.stringify(msg));

	streamer.idTimer = setTimeout(function() {
		// streamer did not respond in time. give it a legacy id.
		const newLegacyId = getUniqueLegacyStreamerId();
		if (newLegacyId.length == 0) {
			const error = `Ran out of legacy ids.`;
			console.error(error);
			streamer.ws.close(1008, error);
		} else {
			registerStreamer(newLegacyId, streamer);
		}

	}, streamerIdTimeoutSecs * 1000);
}

function sanitizeStreamerId(id) {
	let maxPostfix = -1;
	for (let [streamerId, streamer] of streamers) {
		const idMatchRegex = /^(.*?)(\d*)$/;
		const [, baseId, postfix] = streamerId.match(idMatchRegex);
		// if the id is numeric then base id will be empty and we need to compare with the postfix
		if ((baseId != '' && baseId != id) || (baseId == '' && postfix != id)) {
			continue;
		}
		const numPostfix = Number(postfix);
		if (numPostfix > maxPostfix) {
			maxPostfix = numPostfix
		}
	}
	if (maxPostfix >= 0) {
		return id + (maxPostfix + 1);
	}
	return id;
}

function registerStreamer(id, streamer) {
	// remove any existing streamer id
	if (!!streamer.id) {
		// notify any connected peers of rename
		const renameMessage = { type: "streamerIDChanged", newID: id };
		let clone = new Map(players);
		for (let player of clone.values()) {
			if (player.streamerId == streamer.id) {
				logOutgoing(player.id, renameMessage);
			 	player.sendTo(renameMessage);
			 	player.streamerId = id; // reassign the subscription
			}
		}
		streamers.delete(streamer.id);
	}
	// make sure the id is unique
	const uniqueId = sanitizeStreamerId(id);
	streamer.commitId(uniqueId);
	if (!!streamer.idTimer) {
		clearTimeout(streamer.idTimer);
		delete streamer.idTimer;
	}
	streamers.set(uniqueId, streamer);
	console.logColor(logging.Green, `Registered new streamer: ${streamer.id}`);
	//console.dir(streamer)
}

function onStreamerDisconnected(streamer) {
	if (!!streamer.idTimer) {
		clearTimeout(streamer.idTimer);
	}

	if (!streamer.id || !streamers.has(streamer.id)) {
		return;
	}

	sendStreamerDisconnectedToMatchmaker();
	let sfuPlayer = getSFUForStreamer(streamer.id);
	if (sfuPlayer) {
		const msg = { type: "streamerDisconnected" };
		logOutgoing(sfuPlayer.id, msg);
		sfuPlayer.sendTo(msg);
		disconnectAllPlayers(sfuPlayer.id);
	}
	disconnectAllPlayers(streamer.id);
	
	//if(players.size<=0)
	//{
		// exeluncher=undefined
		// if(exeluncher)
		// exeluncher.disconnect(); 
	//}
	
	streamers.delete(streamer.id);
}

function onStreamerMessageId(streamer, msg) {
	logIncoming(streamer.id, msg);

	let streamerId = msg.id;
	registerStreamer(streamerId, streamer);
}

function onStreamerMessagePing(streamer, msg) {
	logIncoming(streamer.id, msg);

	const pongMsg = JSON.stringify({ type: "pong", time: msg.time});
	streamer.ws.send(pongMsg);
}

function onStreamerMessageDisconnectPlayer(streamer, msg) {
	logIncoming(streamer.id, msg);

	const playerId = getPlayerIdFromMessage(msg);
	const player = players.get(playerId);
	if (player) {
		player.ws.close(1011 /* internal error */, msg.reason);
	}
}

function onStreamerMessageLayerPreference(streamer, msg) {
	let sfuPlayer = getSFUForStreamer(streamer.id);
	if (sfuPlayer) {
		logOutgoing(sfuPlayer.id, msg);
		sfuPlayer.sendTo(msg);
	}
}

function forwardStreamerMessageToPlayer(streamer, msg) {
	const playerId = getPlayerIdFromMessage(msg);
	const player = players.get(playerId);
	if (player) {
		delete msg.playerId;
		logForward(streamer.id, playerId, msg);
		player.sendTo(msg);
	} else {
		console.warn("No playerId specified, cannot forward message: %s", msg);
	}
}

let streamerMessageHandlers = new Map();
streamerMessageHandlers.set('endpointId', onStreamerMessageId);
streamerMessageHandlers.set('ping', onStreamerMessagePing);
streamerMessageHandlers.set('offer', forwardStreamerMessageToPlayer);
streamerMessageHandlers.set('answer', forwardStreamerMessageToPlayer);
streamerMessageHandlers.set('iceCandidate', forwardStreamerMessageToPlayer);
streamerMessageHandlers.set('disconnectPlayer', onStreamerMessageDisconnectPlayer);
streamerMessageHandlers.set('layerPreference', onStreamerMessageLayerPreference);

console.logColor(logging.Green, `WebSocket listening for Streamer connections on :${streamerPort}`)
let streamerServer = new WebSocket.Server({ port: streamerPort, backlog: 1 });
streamerServer.on('connection', function (ws, req) {
	console.logColor(logging.Green, `Streamer connected: ${req.connection.remoteAddress}`);
	sendStreamerConnectedToMatchmaker();

	const temporaryId = req.connection.remoteAddress;
	let streamer = new Streamer(temporaryId, ws, StreamerType.Regular);

	ws.on('message', (msgRaw) => {
		var msg;
		try {
			msg = JSON.parse(msgRaw);
		} catch(err) {
			console.error(`Cannot parse Streamer message: ${msgRaw}\nError: ${err}`);
			ws.close(1008, 'Cannot parse');
			return;
		}

		let handler = streamerMessageHandlers.get(msg.type);
		if (!handler || (typeof handler != 'function')) {
			if (config.LogVerbose) {
				console.logColor(logging.White, "\x1b[37m-> %s\x1b[34m: %s", streamer.id, msgRaw);
			}
			console.error(`unsupported Streamer message type: ${msg.type}`);
			ws.close(1008, 'Unsupported message type');
			return;
		}
		handler(streamer, msg);
	});
	
	ws.on('close', function(code, reason) {
		console.error(`streamer ${streamer.id} disconnected: ${code} - ${reason}`);
		onStreamerDisconnected(streamer);
	});

	ws.on('error', function(error) {
		console.error(`streamer ${streamer.id} connection error: ${error}`);
		onStreamerDisconnected(streamer);
		try {
			ws.close(1006 /* abnormal closure */, `streamer ${streamer.id} connection error: ${error}`);
		} catch(err) {
			console.error(`ERROR: ws.on error: ${err.message}`);
		}
	});

	const configStr = JSON.stringify(clientConfig);
	logOutgoing(streamer.id, configStr)
	ws.send(configStr);

	requestStreamerId(streamer);
});

function forwardSFUMessageToPlayer(sfuPlayer, msg) {
	const playerId = getPlayerIdFromMessage(msg);
	const player = players.get(playerId);
	if (player) {
		logForward(sfuPlayer.getSFUStreamerComponent().id, playerId, msg);
		player.sendTo(msg);
	}
}

function forwardSFUMessageToStreamer(sfuPlayer, msg) {
	logForward(sfuPlayer.getSFUStreamerComponent().id, sfuPlayer.streamerId, msg);
	msg.sfuId = sfuPlayer.id;
	sfuPlayer.sendFrom(msg);
}

function onPeerDataChannelsSFUMessage(sfuPlayer, msg) {
	// sfu is telling a peer what stream id to use for a data channel
	const playerId = getPlayerIdFromMessage(msg);
	const player = players.get(playerId);
	if (player) {
		logForward(sfuPlayer.getSFUStreamerComponent().id, playerId, msg);
		player.sendTo(msg);
		player.datachannel = true;
	}
}

// basically a duplicate of the streamer id request but this one does not register the streamer
function requestSFUStreamerId(sfuPlayer) {
	// request id
	const msg = { type: "identify" };
	const sfuStreamerComponent = sfuPlayer.getSFUStreamerComponent();
	logOutgoing(sfuStreamerComponent.id, msg);
	sfuStreamerComponent.ws.send(JSON.stringify(msg));

	sfuStreamerComponent.idTimer = setTimeout(function() {
		// streamer did not respond in time. give it a legacy id.
		const newLegacyId = getUniqueSFUId();
		if (newLegacyId.length == 0) {
			const error = `Ran out of legacy ids.`;
			console.error(error);
			sfuPlayer.ws.close(1008, error);
		} else {
			sfuStreamerComponent.id = newLegacyId;
		}
	}, streamerIdTimeoutSecs * 1000);
}

function onSFUMessageId(sfuPlayer, msg) {
	const sfuStreamerComponent = sfuPlayer.getSFUStreamerComponent();
	logIncoming(sfuStreamerComponent.id, msg);
	sfuStreamerComponent.id = msg.id;

	if (!!sfuStreamerComponent.idTimer) {
		clearTimeout(sfuStreamerComponent.idTimer);
		delete sfuStreamerComponent.idTimer;
	}
}

function onSFUMessageStartStreaming(sfuPlayer, msg) {
	const sfuStreamerComponent = sfuPlayer.getSFUStreamerComponent();
	logIncoming(sfuStreamerComponent.id, msg);
	if (streamers.has(sfuStreamerComponent.id)) {
		console.error(`SFU ${sfuStreamerComponent.id} is already registered as a streamer and streaming.`)
		return;
	}

	registerStreamer(sfuStreamerComponent.id, sfuStreamerComponent);
}

function onSFUMessageStopStreaming(sfuPlayer, msg) {
	const sfuStreamerComponent = sfuPlayer.getSFUStreamerComponent();
	logIncoming(sfuStreamerComponent.id, msg);
if (!streamers.has(sfuStreamerComponent.id)) {
		console.error(`SFU ${sfuStreamerComponent.id} is not registered as a streamer or streaming.`)
		return;
	}

	onStreamerDisconnected(sfuStreamerComponent);
}

function onSFUDisconnected(sfuPlayer) {
	console.log("disconnecting SFU from streamer");
	disconnectAllPlayers(sfuPlayer.id);
	onStreamerDisconnected(sfuPlayer.getSFUStreamerComponent());
	sfuPlayer.unsubscribe();
	sfuPlayer.ws.close(4000, "SFU Disconnected");
	players.delete(sfuPlayer.id);
	streamers.delete(sfuPlayer.id);
}

sfuMessageHandlers.set('listStreamers', onPlayerMessageListStreamers);
sfuMessageHandlers.set('subscribe', onPlayerMessageSubscribe);
sfuMessageHandlers.set('unsubscribe', onPlayerMessageUnsubscribe);
sfuMessageHandlers.set('offer', forwardSFUMessageToPlayer);
sfuMessageHandlers.set('answer', forwardSFUMessageToStreamer);
sfuMessageHandlers.set('streamerDataChannels', forwardSFUMessageToStreamer);
sfuMessageHandlers.set('peerDataChannels', onPeerDataChannelsSFUMessage);
sfuMessageHandlers.set('endpointId', onSFUMessageId);
sfuMessageHandlers.set('startStreaming', onSFUMessageStartStreaming);
sfuMessageHandlers.set('stopStreaming', onSFUMessageStopStreaming);

console.logColor(logging.Green, `WebSocket listening for SFU connections on :${sfuPort}`);
let sfuServer = new WebSocket.Server({ port: sfuPort });
sfuServer.on('connection', function (ws, req) {

	let playerId = sanitizePlayerId(nextPlayerId++);
	console.logColor(logging.Green, `SFU (${req.connection.remoteAddress}) connected `);

	let streamerComponent = new Streamer(req.connection.remoteAddress, ws, StreamerType.SFU);
	let playerComponent = new Player(playerId, ws, PlayerType.SFU, WhoSendsOffer.Streamer);

	streamerComponent.setSFUPlayerComponent(playerComponent);
	playerComponent.setSFUStreamerComponent(streamerComponent);

	players.set(playerId, playerComponent);

	ws.on('message', (msgRaw) => {
		var msg;
		try {
			msg = JSON.parse(msgRaw);
		} catch (err) {
			console.error(`Cannot parse SFU message: ${msgRaw}\nError: ${err}`);
			ws.close(1008, 'Cannot parse');
			return;
		}

		let sfuPlayer = players.get(playerId);
		if (!sfuPlayer) {
			console.error(`Received a message from an SFU not in the player list ${playerId}`);
			ws.close(1001, 'Broken');
			return;
		}

		let handler = sfuMessageHandlers.get(msg.type);
		if (!handler || (typeof handler != 'function')) {
			if (config.LogVerbose) {
				console.logColor(logging.White, "\x1b[37m-> %s\x1b[34m: %s", sfuPlayer.id, msgRaw);
			}
			console.error(`unsupported SFU message type: ${msg.type}`);
			ws.close(1008, 'Unsupported message type');
			return;
		}
		handler(sfuPlayer, msg);
	});

	ws.on('close', function(code, reason) {
		console.error(`SFU disconnected: ${code} - ${reason}`);
		onSFUDisconnected(playerComponent);
	});

	ws.on('error', function(error) {
		console.error(`SFU connection error: ${error}`);
		onSFUDisconnected(playerComponent);
		try {
			ws.close(1006 /* abnormal closure */, `SFU connection error: ${error}`);
		} catch(err) {
			console.error(`ERROR: ws.on error: ${err.message}`);
		}
	});

	requestStreamerId(playerComponent.getSFUStreamerComponent());
});

let playerCount = 0;

function sendPlayersCount() {
	const msg = { type: 'playerCount', count: players.size };
	logOutgoing("[players]", msg);
	for (let player of players.values()) {
		player.sendTo(msg);
	}
}

function onPlayerMessageSubscribe(player, msg) {
	logIncoming(player.id, msg);
	player.subscribe(msg.streamerId,msg);
}

function onPlayerMessageUnsubscribe(player, msg) {
	logIncoming(player.id, msg);
	player.unsubscribe();
}

function onPlayerMessageStats(player, msg) {
	console.log(`player ${playerId}: stats\n${msg.data}`);
}

function onPlayerMessageListStreamers(player, msg) {
	logIncoming(player.id, msg);
	if
	(
	(player.uid == undefined)
	&&
	(msg.uid != undefined)
	)
	{
		player.uid=msg.uid
		console.log(msg.uid +" --> "+ player.uid)
	}
		
	let reply = { type: 'streamerList', ids: [] };
	for (let [streamerId, streamer] of streamers) {
		console.log(streamerId +"---"+ player.uid)
		if(streamerId == player.uid)
			reply.ids.push(streamerId);
	}


	logOutgoing(player.id, reply);
	player.sendTo(reply);
}

function forwardPlayerMessage(player, msg) {
	logForward(player.id, player.streamerId, msg);
	player.sendFrom(msg);
}

function onPlayerDisconnected(playerId) {
	const player = players.get(playerId);
	//askToCleanQueueForThisPlayer(player) 
	shutDownAppAndDoPostShutdownTasks(player)
	player.unsubscribe();
	players.delete(playerId);
	--playerCount;
	sendPlayersCount();
	sendPlayerDisconnectedToFrontend();
	sendPlayerDisconnectedToMatchmaker();
}

playerMessageHandlers.set('subscribe', onPlayerMessageSubscribe);
playerMessageHandlers.set('unsubscribe', onPlayerMessageUnsubscribe);
playerMessageHandlers.set('stats', onPlayerMessageStats);
playerMessageHandlers.set('offer', forwardPlayerMessage);
playerMessageHandlers.set('answer', forwardPlayerMessage);
playerMessageHandlers.set('iceCandidate', forwardPlayerMessage);
playerMessageHandlers.set('listStreamers', onPlayerMessageListStreamers);
// sfu related messages
playerMessageHandlers.set('dataChannelRequest', forwardPlayerMessage);
playerMessageHandlers.set('peerDataChannelsReady', forwardPlayerMessage);

console.logColor(logging.Green, `WebSocket listening for Players connections on :${httpPort}`);
let playerServer = new WebSocket.Server({ server: config.UseHTTPS ? https : http});
playerServer.on('connection', function (ws, req) {
	var url = require('url');
	const parsedUrl = url.parse(req.url);
	const urlParams = new URLSearchParams(parsedUrl.search);
	const whoSendsOffer = urlParams.has('OfferToReceive') && urlParams.get('OfferToReceive') !== 'false' ? WhoSendsOffer.Browser : WhoSendsOffer.Streamer;

	if (playerCount + 1 > maxPlayerCount && maxPlayerCount !== -1)
	{
		console.logColor(logging.Red, `new connection would exceed number of allowed concurrent connections. Max: ${maxPlayerCount}, Current ${playerCount}`);
		ws.close(1013, `too many connections. max: ${maxPlayerCount}, current: ${playerCount}`);
		return;
	}

	++playerCount;
	let playerId = sanitizePlayerId(nextPlayerId++);
	console.logColor(logging.Green, `player ${playerId} (${req.connection.remoteAddress}) connected`);
	let player = new Player(playerId, ws, PlayerType.Regular, whoSendsOffer);
	players.set(playerId, player);

	ws.on('message', (msgRaw) =>{
		var msg;
		try {
			msg = JSON.parse(msgRaw);
			//console.log("msg-->")
			//console.dir(msg)
		} catch (err) {
			console.error(`Cannot parse player ${playerId} message: ${msgRaw}\nError: ${err}`);
			ws.close(1008, 'Cannot parse');
			return;
		}

		let player = players.get(playerId);
		if (!player) {
			console.error(`Received a message from a player not in the player list ${playerId}`);
			ws.close(1001, 'Broken');
			return;
		}

		let handler = playerMessageHandlers.get(msg.type);
		if (!handler || (typeof handler != 'function')) {
			if (config.LogVerbose) {
				console.logColor(logging.White, "\x1b[37m-> %s\x1b[34m: %s", playerId, msgRaw);
			}
			console.error(`unsupported player message type: ${msg.type}`);
			ws.close(1008, 'Unsupported message type');
			return;
		}
		handler(player, msg);
	});

	ws.on('close', function(code, reason) {
		console.logColor(logging.Yellow, `player ${playerId} connection closed: ${code} - ${reason}`);
		onPlayerDisconnected(playerId);
	});

	ws.on('error', function(error) {
		console.error(`player ${playerId} connection error: ${error}`);
		ws.close(1006 /* abnormal closure */, `player ${playerId} connection error: ${error}`);
		onPlayerDisconnected(playerId);

		console.logColor(logging.Red, `Trying to reconnect...`);
		reconnect();
	});

	sendPlayerConnectedToFrontend();
	sendPlayerConnectedToMatchmaker();

	const configStr = JSON.stringify(clientConfig);
	logOutgoing(player.id, configStr)
	player.ws.send(configStr);

	sendPlayersCount();
});

function disconnectAllPlayers(streamerId) {
	console.log(`unsubscribing all players on ${streamerId}`);
	let clone = new Map(players);
	for (let player of clone.values()) {
		if (player.streamerId == streamerId) {
		 	// disconnect players but just unsubscribe the SFU
		 	const sfuPlayer = getSFUForStreamer(streamerId);
		 	if (sfuPlayer && player.id == sfuPlayer.id) {
				sfuPlayer.unsubscribe();
			} else {
				player.ws.close();
			}
		}
	}
}

/**
 * Function that handles the connection to the matchmaker.
 */




async function getIPDetails(ipAddress) {
  try {
    const apiKey = '667cb95019b04ea5beaa7c935dc5ce37'; // Replace with your actual API key
   
	const apiUrl =  "https://ipgeolocation.abstractapi.com/v1/?api_key=667cb95019b04ea5beaa7c935dc5ce37";

    const response = await axios.get(apiUrl);
    const ipDetails = await response.data; // Wait for data to be available

    return ipDetails; 
  } catch (error) {
    console.error('Error fetching IP details:', error);
    return null; 
  }
}

 var ipDetails=undefined

if (config.UseMatchmaker) {
	var matchmaker = new net.Socket();

	matchmaker.on('connect', async function() {
		console.log(`Cirrus connected to Matchmaker ${matchmakerAddress}:${matchmakerPort}`);

		// message.playerConnected is a new variable sent from the SS to help track whether or not a player 
		// is already connected when a 'connect' message is sent (i.e., reconnect). This happens when the MM
		// and the SS get disconnected unexpectedly (was happening often at scale for some reason).
		var playerConnected = false;

		// Set the playerConnected flag to tell the MM if there is already a player active (i.e., don't send a new one here)
		if( players && players.size > 0) {
			playerConnected = true;
		}

	ipDetails = await getIPDetails();
		// Add the new playerConnected flag to the message body to the MM
		message = {
			type: 'connect',
			address: typeof serverPublicIp === 'undefined' ? '127.0.0.1' : serverPublicIp,
			port: config.UseHTTPS ? httpsPort : httpPort,
			ready: streamers.size > 0,
			ipDetails: ipDetails,
			playerConnected: playerConnected
		};

		matchmaker.write(JSON.stringify(message));
	});

	matchmaker.on('error', (err) => {
		console.log(`Matchmaker connection error ${JSON.stringify(err)}`);
	});

	matchmaker.on('end', () => {
		console.log('Matchmaker connection ended');
	});

	matchmaker.on('close', (hadError) => {
		console.logColor(logging.Blue, 'Setting Keep Alive to true');
        matchmaker.setKeepAlive(true, 60000); // Keeps it alive for 60 seconds
		
		console.log(`Matchmaker connection closed (hadError=${hadError})`);

		reconnect();
	});

	// Attempt to connect to the Matchmaker
	function connect() {
		matchmaker.connect(matchmakerPort, matchmakerAddress);
	}

	// Try to reconnect to the Matchmaker after a given period of time
	function reconnect() {
		console.log(`Try reconnect to Matchmaker in ${matchmakerRetryInterval} seconds`)
		setTimeout(function() {
			connect();
		}, matchmakerRetryInterval * 1000);
	}

	function registerMMKeepAlive() {
		setInterval(function() {
			message = {
				type: 'ping'
			};
			matchmaker.write(JSON.stringify(message));
		}, matchmakerKeepAliveInterval * 1000);
	}

	connect();
	registerMMKeepAlive();
}

//Keep trying to send gameSessionId in case the server isn't ready yet
function sendGameSessionData() {
	//If we are not using the frontend web server don't try and make requests to it
	if (!config.UseFrontend)
		return;
	webRequest.get(`${FRONTEND_WEBSERVER}/server/requestSessionId`,
		function (response, body) {
			if (response.statusCode === 200) {
				gameSessionId = body;
				console.log('SessionId: ' + gameSessionId);
			}
			else {
				console.error('Status code: ' + response.statusCode);
				console.error(body);
			}
		},
		function (err) {
			//Repeatedly try in cases where the connection timed out or never connected
			if (err.code === "ECONNRESET") {
				//timeout
				sendGameSessionData();
			} else if (err.code === 'ECONNREFUSED') {
				console.error('Frontend server not running, unable to setup game session');
			} else {
				console.error(err);
			}
		});
}

function sendUserSessionData(serverPort) {
	//If we are not using the frontend web server don't try and make requests to it
	if (!config.UseFrontend)
		return;
	webRequest.get(`${FRONTEND_WEBSERVER}/server/requestUserSessionId?gameSessionId=${gameSessionId}&serverPort=${serverPort}&appName=${querystring.escape(clientConfig.AppName)}&appDescription=${querystring.escape(clientConfig.AppDescription)}${(typeof serverPublicIp === 'undefined' ? '' : '&serverHost=' + serverPublicIp)}`,
		function (response, body) {
			if (response.statusCode === 410) {
				sendUserSessionData(serverPort);
			} else if (response.statusCode === 200) {
				userSessionId = body;
				console.log('UserSessionId: ' + userSessionId);
			} else {
				console.error('Status code: ' + response.statusCode);
				console.error(body);
			}
		},
		function (err) {
			//Repeatedly try in cases where the connection timed out or never connected
			if (err.code === "ECONNRESET") {
				//timeout
				sendUserSessionData(serverPort);
			} else if (err.code === 'ECONNREFUSED') {
				console.error('Frontend server not running, unable to setup user session');
			} else {
				console.error(err);
			}
		});
}

function sendServerDisconnect() {
	//If we are not using the frontend web server don't try and make requests to it
	if (!config.UseFrontend)
		return;
	try {
		webRequest.get(`${FRONTEND_WEBSERVER}/server/serverDisconnected?gameSessionId=${gameSessionId}&appName=${querystring.escape(clientConfig.AppName)}`,
			function (response, body) {
				if (response.statusCode === 200) {
					console.log('serverDisconnected acknowledged by Frontend');
				} else {
					console.error('Status code: ' + response.statusCode);
					console.error(body);
				}
			},
			function (err) {
				//Repeatedly try in cases where the connection timed out or never connected
				if (err.code === "ECONNRESET") {
					//timeout
					sendServerDisconnect();
				} else if (err.code === 'ECONNREFUSED') {
					console.error('Frontend server not running, unable to setup user session');
				} else {
					console.error(err);
				}
			});
	} catch(err) {
		console.logColor(logging.Red, `ERROR::: sendServerDisconnect error: ${err.message}`);
	}
}

function sendPlayerConnectedToFrontend() {
	//If we are not using the frontend web server don't try and make requests to it
	if (!config.UseFrontend)
		return;
	try {
		webRequest.get(`${FRONTEND_WEBSERVER}/server/clientConnected?gameSessionId=${gameSessionId}&appName=${querystring.escape(clientConfig.AppName)}`,
			function (response, body) {
				if (response.statusCode === 200) {
					console.log('clientConnected acknowledged by Frontend');
				} else {
					console.error('Status code: ' + response.statusCode);
					console.error(body);
				}
			},
			function (err) {
				//Repeatedly try in cases where the connection timed out or never connected
				if (err.code === "ECONNRESET") {
					//timeout
					sendPlayerConnectedToFrontend();
				} else if (err.code === 'ECONNREFUSED') {
					console.error('Frontend server not running, unable to setup game session');
				} else {
					console.error(err);
				}
			});
	} catch(err) {
		console.logColor(logging.Red, `ERROR::: sendPlayerConnectedToFrontend error: ${err.message}`);
	}
}

function sendPlayerDisconnectedToFrontend() {
	//If we are not using the frontend web server don't try and make requests to it
	if (!config.UseFrontend)
		return;
	try {
		webRequest.get(`${FRONTEND_WEBSERVER}/server/clientDisconnected?gameSessionId=${gameSessionId}&appName=${querystring.escape(clientConfig.AppName)}`,
			function (response, body) {
				if (response.statusCode === 200) {
					console.log('clientDisconnected acknowledged by Frontend');
				}
				else {
					console.error('Status code: ' + response.statusCode);
					console.error(body);
				}
			},
			function (err) {
				//Repeatedly try in cases where the connection timed out or never connected
				if (err.code === "ECONNRESET") {
					//timeout
					sendPlayerDisconnectedToFrontend();
				} else if (err.code === 'ECONNREFUSED') {
					console.error('Frontend server not running, unable to setup game session');
				} else {
					console.error(err);
				}
			});
	} catch(err) {
		console.logColor(logging.Red, `ERROR::: sendPlayerDisconnectedToFrontend error: ${err.message}`);
	}
}

function sendStreamerConnectedToMatchmaker() {
	if (!config.UseMatchmaker)
		return;
	try {
		message = {
			type: 'streamerConnected'
		};
		matchmaker.write(JSON.stringify(message));
	} catch (err) {
		console.logColor(logging.Red, `ERROR sending streamerConnected: ${err.message}`);
	}
}

function sendStreamerDisconnectedToMatchmaker() {
	if (!config.UseMatchmaker)
		return;
	try {
		message = {
			type: 'streamerDisconnected'
		};
		matchmaker.write(JSON.stringify(message));	
	} catch (err) {
		console.logColor(logging.Red, `ERROR sending streamerDisconnected: ${err.message}`);
	}
}

// The Matchmaker will not re-direct clients to this Cirrus server if any client
// is connected.
function sendPlayerConnectedToMatchmaker() {
	if (!config.UseMatchmaker)
		return;
	try {
		message = {
			type: 'clientConnected'
		};
		matchmaker.write(JSON.stringify(message));
	} catch (err) {
		console.logColor(logging.Red, `ERROR sending clientConnected: ${err.message}`);
	}
}

// The Matchmaker is interested when nobody is connected to a Cirrus server
// because then it can re-direct clients to this re-cycled Cirrus server.
function sendPlayerDisconnectedToMatchmaker() {
	if (!config.UseMatchmaker)
		return;
	try {
		message = {
			type: 'clientDisconnected'
		};
		matchmaker.write(JSON.stringify(message));
	} catch (err) {
		console.logColor(logging.Red, `ERROR sending clientDisconnected: ${err.message}`);
	}
}



//////////////////////el

var app2 = require("express")();
var http2 = require("http").Server(app2);
var util = require("util");


//var socket_io = require("socket.io");
//var io = socket_io(http2);

var io = require("socket.io")(http2);

/* io.set("reconnection", true);
io.set("reconnectionAttempts", 4);
io.set("reconnectionDelay", 1000);
io.set("randomizationFactor", 0.5);

io.set('pingInterval', 5000);
io.set('pingTimeout', 4000);

 console.dir(io)
 console.logColor(logging.Red,"io --> pingInterval : " + io.pingInterval);
 console.logColor(logging.Red,"io --> pingTimeout : " + io.pingTimeout);



 */


function shutDownAppAndDoPostShutdownTasks(player)//isAppPreAllocateCmd=false) 
{
	
	var found=false
				for (i = 0; i < exelunchers.length; i++) 
				{
					
					console.log(exelunchers.length );
					console.log(exelunchers[i].elInfo.uid );						
					console.log(player.uid );						
					if(exelunchers[i].elInfo.uid==player.uid ) 
						{
							  var data = {
								uid: player.uid
							   
							  };
							exelunchers[i].emit("shutDownAppAndDoPostShutdownTasks", data);
							  console.log("shutDownAppAndDoPostShutdownTasks data: ");
								console.dir(data);
  
							 found=true 
							
						  break
							
						}
					
				}
			
			
			if(found == false)
		
			{
				postToTelegram("el for player.uid:"+player.uid+" not found. may be  ue app running "+ JSON.stringify(data),-811123300)   // need to send ue exe command to quite
			}
			

	
}


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
var exeluncherPort=config.exeluncherPort
var exelunchers = [];
var app_exeluncher = require("express")();
var http_exeluncher = require("http").Server(app_exeluncher);
var io_exeluncher = require("socket.io")(http_exeluncher);
var util = require("util");


function startio_exeluncher() {
  io_exeluncher.on("connection", function (socket)
  {
	  exelunchers.push(socket)
	  
    console.log(
      "exeluncher connected id:" +
      util.inspect(socket.id) +
      ", total: " +
      exelunchers.length
    );
    
    socket.send(
      "you are conneted to MMLineker.js   as exeluncher id:" +
      util.inspect(socket.id)
    );
	socket.exeData=undefined

	processWaitingRequests() 
	
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


  
  socket.on("updateDSAppInfoOnCP", function (data) {
	  
	  socket.exeData=data
	  console.logColor(logging.Red,"exeLuncher-->io_dsluncher  updateDSAppInfoOnCP   socket.exeData: "+JSON.stringify( socket.exeData) ); 
	
	if(socket.exeData.length<=0)
	{
		socket.isAssigned=false
		processWaitingRequests() 
	}
   // processLuncherDataForPublicMonitoring(dslunchers, data, socket);
	  
	     // [{"appName":"VirutalStudioDS","owner":"demo","dsLunchId":0,"version":5,"dsPort":21153,"pid":4152}]        

		/* for (var i=0;i<data.length;i++) 
		  {
			  var dsLunchId22=data[i].dsLunchId
			  
			  	   console.log("dsLunchId22 : "+dsLunchId22)
				  if(dsLunchId22 != undefined)
				  {
					 var res=dsLunchRes.get(dsLunchId22)
					 
					 if(res)
					 {
						 dsLunchRes.delete(dsLunchId22)
						res.send(JSON.stringify(data[i]))
						
						
					 }
						
				  }
			  
		  }

	  
	    for (var i=0;i<dslunchers.length;i++) 
		  {
			  if(dslunchers[i].socket.id == socket.id)
			  {
					  dslunchers[i].appInfo=data
				
				
				  
					
			  }
		  }
			  
	  for (let player of players.values()) 
				  {
					//players.set(playerId3435, { ws: ws, id: playerId3435,appRequestInfo:msg });
					if 
					(
						(player.clientType == "controlpanel") 
						 // &&
						// (
							// (player.isAdmin == true)
							// ||				
							// (player.owner == dslunchers[i].elInfo.preAllocateApp_owner)			
						// ) 							
					)
					{
						
						if(player.isAdmin == true) 
						{
						 
						
						   sendAllDSInfoeToThisControlPanelPlayers(player.owner, player.ws);
						}
						else
							sendAllDSAppInfoeToThisControlPanelPlayers(player.owner, player.ws);

				 console.logColor(logging.Red,"io_dsluncher-->browser  updateDSAppInfoOnCP  : "+JSON.stringify(data) ); 
	  
					  player.ws.send(
						JSON.stringify({
						  type: "updateDSAppInfoOnCP",
						  dsInfo: {
							  socketid:dslunchers[i].socket.id, 
							  appInfo:dslunchers[i].appInfo, 
							  elInfo:dslunchers[i].elInfo

							  }
						  
						})
					  ); 
					  
					}
				  } */
	  
	  
	   }); 
	
	
	
    socket.on("sendMMlinkerInfo", function (obj)
    {
		//if(obj.el_version== config.el_version)
			//socket.emit("taskeMMlinkerInfo", MMLinkerInfo);
		//else
		//	socket.emit("secretKeyMismatched");
    });

    socket.on("sendSslunchersList", function ()
    {
      //console.logColor(logging.Red,"Exeluncher--> MMLineker sendSslunchersList ");

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


  socket.on("message", function (msg2222) {
    console.log("Exeluncher --> ss  message: " + msg2222);
    //players.set(playerId, { ws: ws, id: playerId });
    sendMsgToAllConnectedPlayer(msg2222);
  });
  
 socket.on("UE4LogFromEL", function (msg2222) {
    console.log("Exeluncher --> ss  UE4LogFromEL: " + msg2222);
    //players.set(playerId, { ws: ws, id: playerId });
    sendUE4LogMsgToAllConnectedPlayer(msg2222);
  });

  
 socket.on("ue4VersionString", function (versionString) {// to remove
    console.logColor(logging.Red,"Exeluncher --> ss  ue4VersionString: " + versionString);
    //players.set(playerId, { ws: ws, id: playerId });
   currentAppsUE4Version.versionString=versionString
    for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "ue4Version",
				  currentAppsUE4Version: currentAppsUE4Version,
				})
			  );
		  }
   
   
  }); 
  
  socket.on("PsPluginEntryInManifestFile", function (boolValue) {
	    
  PsPluginEntryInManifestFile = boolValue;
	  console.logColor(logging.Red,"****PsPluginEntryInManifestFile : "+boolValue)
	  
	  for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "PsPluginEntryInManifestFile",
				  PsPluginEntryInManifestFile: boolValue,
				})
			  );
		  }
		  
	   });
	 socket.on("PsPluginEntryInManifestFile2", function (boolValue) {
	    
  PsPluginEntryInManifestFile2 = boolValue;
	  console.logColor(logging.Red,"****PsPluginEntryInManifestFile2 : "+boolValue)
	  
	  for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "PsPluginEntryInManifestFile2",
				  PsPluginEntryInManifestFile2: boolValue,
				})
			  );
		  }
		  
	   });
	  
	   
 socket.on("PsPluginPixelStreamingDireExist", function (boolValue) {
	  
	  console.logColor(logging.Red,"****PsPluginPixelStreamingDireExist : "+boolValue)
	  PsPluginPixelStreamingDireExist = boolValue;
	   for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "PsPluginPixelStreamingDireExist",
				  PsPluginPixelStreamingDireExist: boolValue,
				})
			  );
		  }
		  
	   });
	  
	  
  socket.on("ue4ExeInfo", function (ue4ExeInfoData) {
    console.logColor(logging.Red,"Exeluncher --> ss  ue4ExeInfo: " + JSON.stringify(ue4ExeInfoData));
    //players.set(playerId, { ws: ws, id: playerId });
   ue4ExeInfo=ue4ExeInfoData
    for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "ue4ExeInfoMsg",
				  ue4ExeInfo: ue4ExeInfo,
				})
			  );
		  }
   
   
  });
  
  
  socket.on("errorMsgFromEL", function (msg) {
    console.logColor(  logging.Red, "errorMsgFromEL: " + msg);
  });

  socket.on("exeluncherMaxLmit", function (html) {
    console.log("exeluncherMaxLmit: data-" + html.msg);
  });
  
    socket.on("OnLocalFileUploadingFinished", function (data) 
	{
    console.log("OnLocalFileUploadingFinished: data-" + JSON.stringify(data));
	 for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "OnLocalFileUploadingFinished",
				  data: data,
				})
			  );
		  }
  });
  
  
  socket.on("OnFinishingOfClientFileDownladOnEL", function (data) 
	{
    console.log("OnFinishingOfClientFileDownladOnEL: data-" + JSON.stringify(data));
	 for (let p of players.values()) 
		  {
			  p.ws.send(
				JSON.stringify({
				  type: "OnFinishingOfClientFileDownladOnEL",
				  data: data,
				})
			  );
		  }
  });

  socket.on("exeLuncherUpdate", function (jsonObj) {
    //  console.log("exeLuncherUpdate id:"+util.inspect(socket.id)+ "  . data- "+JSON.stringify(jsonObj));
  });
  
  
  socket.on("UE5Editorlunched", function (jsonObj) {
	  
	  console.log("UE5Editorlunched :"+ JSON.stringify(jsonObj));
 
 
	   for (let p of players.values()) 
		  {
			  if(p.ws)
				p.ws.send(JSON.stringify(jsonObj));
		  }
	  
	    });
		
		
		
  socket.on("takeELProcessInfo", function (jsonObj) {
      console.logColor(logging.Red,"El-->SS takeELProcessInfo:"+JSON.stringify(jsonObj));
	  
	   for (i = 0; i < matchmakerAddressInfo.length; i++) {
      var efsf = matchmakerAddressInfo[i];
      if (
        efsf.matchmaker_io_client.connected &&
        !efsf.matchmaker_io_client.disconnected
      )
        efsf.matchmaker_io_client.emit("takeELProcessInfo", jsonObj);
    }
	
  });


  socket.on("exitTheprocess", function () {
    console.log("exeLuncher-->ss exitTheprocess ");
/*     if (players.size > 0) {//moved to exitSS() 
      for (let p of players.values()) {
        //2do----check if redirectIntruderPlayer crrect or not
        redirectIntruderPlayer(p.ws, "", appName, cmdLineArgs,p.PlayerTypeInfo);
      }

      setTimeout(function () {
        exitSS();
      }, 2000);
    } 
	else  */
		//exitSS("handleElDisconnected","handleElDisconnected: exeLuncher-->ss exitTheprocess");
  });

socket.on("handleAppCrashedInformedByEL", function (jsonObj) 
							{
								  disconnectAllPlayers()
							}
  ) 

  socket.on("sendDownloadInfoRequest", async function (jsonObj) {
    console.log("-------------------------------")
    console.log("sendDownloadInfoRequest")
    console.log("-------------------------------")

    const responseEvent = `sendDownloadInfoResponse`;

    try {
      if (!jsonObj.hasOwnProperty(`cloud`) || !jsonObj.cloud || !jsonObj.cloud == undefined || typeof jsonObj.cloud != `string` || !jsonObj.cloud.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "cloud" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`asset`) || !jsonObj.asset || !jsonObj.asset == undefined || typeof jsonObj.asset != `string` || !jsonObj.asset.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "asset" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`owner`) || !jsonObj.owner || !jsonObj.owner == undefined || typeof jsonObj.owner != `string` || !jsonObj.owner.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "owner" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`app`) || !jsonObj.app || !jsonObj.app == undefined || typeof jsonObj.app != `string` || !jsonObj.app.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "app" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`version`) || !jsonObj.version || !jsonObj.version == undefined || typeof jsonObj.version != `string` || !jsonObj.version.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "version" in the request object` });
      }
      const { cloud, asset, owner, app, version } = jsonObj;

      const config = {
        method: 'get',
        url: `https://upload-api.eagle3dstreaming.com/api/v1/files/${cloud}/${asset}/${owner}/${app}/download/${version}`,
        timeout: 15000
      }

      let response = await axios(config);
      let data = response.data;
      if (data.status == `error`) {
        return exeluncher.emit(responseEvent, { error: data.message, meta: { cloud, asset, owner, app, version } });
      }

      data = data.data;
      return exeluncher.emit(responseEvent, { data });

    } catch (err) {
      console.log(err)
      return exeluncher.emit(responseEvent, { error: err.toString() });
    }
  }) 

  socket.on("forwardSdDownloadRequest", async function (jsonObj) {
    console.log("-------------------------------")
    console.log("forwardSdDownloadRequest")
    console.log("-------------------------------")

    const responseEvent = `forwardSdDownloadResponse`;

    try {
      if (!jsonObj.hasOwnProperty(`owner`) || !jsonObj.owner || !jsonObj.owner == undefined || typeof jsonObj.owner != `string` || !jsonObj.owner.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "owner" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`app`) || !jsonObj.app || !jsonObj.app == undefined || typeof jsonObj.app != `string` || !jsonObj.app.length) {
        return exeluncher.emit(responseEvent, { error: `Missing "app" in the request object` });
      }
      if (!jsonObj.hasOwnProperty(`version`) || !jsonObj.version || !jsonObj.version == undefined || typeof jsonObj.version != `string` || !jsonObj.version.length) {
        version = `-1`;
        return exeluncher.emit(responseEvent, { error: `Missing "version" in the request object` });
      }
      const { owner, app, version } = jsonObj;

      const config = {
        method: 'get',
        url: `https://sd1.eaglepixelstreaming.com:20000/Downloader4SD/v4/${owner}/${app}/${version}`,
        timeout: 15000
      }

      let response = await axios(config);
      let data = response.data;
      if (data.status == `error`) {
        return exeluncher.emit(responseEvent, { error: data.message, meta: { owner, app, version } });
      }

      data = data.data;
      return exeluncher.emit(responseEvent, { data });

    } catch (err) {
      console.log("forwardSdDownloadRequest err")
      console.log(JSON.stringify(err.response.data))
      if(err && err.hasOwnProperty(`response`) && err.response.hasOwnProperty(`data`)){
        return exeluncher.emit(responseEvent, {...err.response.data});
      }
      return exeluncher.emit(responseEvent, { error: err.toString() });
    }
  })
  
  socket.on("exeHasLunched", function (jsonObj) 
							{
								   console.logColor(logging.Green,'exeHasLunched for '
								   //+JSON.stringify(jsonObj)
								   );
										startStreamerServerWaitForEl()
							}
			)
  
  
  
  socket.on("ping4SS", function (jsonObj) 
							{
								   console.log('Received ping4SS from EL');
									socket.emit('pong4SS');
							}
  )
  

  socket.on("SendAppPreAllocateCmd", function (jsonObj) 
  {
    //  console.log("exeLuncherUpdate id:"+util.inspect(socket.id)+ "  . data- "+JSON.stringify(jsonObj));
 console.logColor(logging.Red," el--> SS  SendAppPreAllocateCmd id:"+JSON.stringify(jsonObj));
	OnPreAllocateCmd( jsonObj,socket ) 
    
  });
  
  
   
  socket.on("takeElInfo", function (jsonObj) 
  {
    console.logColor(
      logging.Blue,
      "takeElInfo jsonObj ->  " //+ JSON.stringify(jsonObj)
    );
    socket.elInfo = jsonObj;
	var elInfo=jsonObj
	console.log(players.size);
	console.log(jsonObj.uid);
	/* for (let player of players.values()) 
	{
		 console.log(player.uid);
		 
		if(player.uid == jsonObj.uid)
		{
			
			player.el=socket
			break
		}
	}
	 */
	
	
	return
    ec2_region = jsonObj.ec2_region;
    instanceId_exeLuncher = jsonObj.instanceId_exeLuncher;
    instanceId = instanceId_exeLuncher;
    //serverOwner=jsonObj.serverOwner

    //if(	jsonObj.hasOwnProperty("onDemandMachine"))
    //{
    isOnDemandMachine = jsonObj.isOnDemandMachine;
    computerName = jsonObj.computerName;
    userName = jsonObj.userName;
    platformType = jsonObj.platformType;
    ec2_region = jsonObj.ec2_region;

    //}
	
	
	
	if(elInfo.preAllocateApps)
	{
		appName =elInfo.preAllocateApp_name
		 console.log("yyyyyyyyy 2");
		serverOwner =elInfo.preAllocateApp_owner
		configuration =undefined
		configurationName =elInfo.preAllocateApp_configurationName
		version="-1"
	}

    titleID = computerName;
  

	if( ( platformType== 2)||( platformType== 3)|| ( platformType== 4))
		titleID = instanceId_exeLuncher;
 
    console.logColor(logging.Yellow, "platformType ->  " + platformType);

    //setTitle("Free : " + httpsPort + " : " + streamerPort + " : " + titleID);
    console.logColor(
      logging.Blue,
      " isOnDemandMachine ->  " + isOnDemandMachine
    );
	
     epicTurnServerOnELMachine = {
      iceServers: [
        {
          urls: [
            "stun:" + jsonObj.serverPublicIp + ":19302",
            "turn:" + jsonObj.serverPublicIp + ":19303",
            //,"turn:"+serverPublicIp+":19303?transport=tcp"
          ],
          username: "PixelStreamingUser",
          credential: "Another TURN in the road",
        },
      ],
    };

   
    console.log(
      "exeLuncher-->ss takeElInfo : instanceId_exeLuncher:-" +
        instanceId_exeLuncher
    );
   
  });



    socket.on("disconnect", function (reason)
    {
       var i=0
																 exelunchers.forEach(function(c){

																	if(c.id == socket.id)
																		exelunchers.splice(i,1)

																	i++

																}); 

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





/////////

function sendExeluncherLunchAppCmd(ws)//isAppPreAllocateCmd=false) 
{
	console.trace()
	if(ws)
		sendIncludeInTimeRecordsOnlyToThisPlayer(ws,"sendExeluncherLunchAppCmdCalledAt",Date.now())
		

	console.logColor(logging.Red, "sendExeluncherLunchAppCmd()  "); 
	
	console.logColor(    logging.Red,    "yyyyy 5555 serverOwner :" + serverOwner ) ;
 
 
	 console.log(" sendExeluncherLunchAppCmd()" );
	   console.logColor(logging.Red, "444444 serverOwner = " + serverOwner);
  if (streamer !== undefined) 
  {
	var msfsfsg=	"sendExeluncherLunchAppCmd() found streamer alreday connected "
	msfsfsg=
	msfsfsg
	+" lastRequestToCloseExefor.appName: "
	+lastRequestToCloseExefor.appName
	+" lastRequestToCloseExefor.serverOwner: "
	+lastRequestToCloseExefor.serverOwner
	+ " requested: "+appName
	
	if(owner)
		msfsfsg=msfsfsg+ " owner: "+owner
	
		//postToTelegram2(msfsfsg,-811123300)  
   console.log("sendExeluncherLunchAppCmd to  exeluncher skipped as a streamer already connected.  ");
    return;
  }
 
	  
	  
  
  
  if(version === undefined)
	  version=-1
  

  if (appName === undefined 
  || version === undefined
  || configuration === undefined
  
  ) 
  {
	  
	if(elInfo.preAllocateApps)
	{
		appName =elInfo.preAllocateApp_name
		 console.log("yyyyyyyyy 3");
		serverOwner =elInfo.preAllocateApp_owner
		configurationName =elInfo.preAllocateApp_configurationName
		
		if ( //!isAppPreAllocateCmd  && 
		(configuration === undefined) )
		{
			console.logColor(logging.Red, " !!!!!!!!!!!sendExeluncherLunchAppCmd(): configuration undefined.  ");
			getConfigurationFromFB() 
			return
		} 
	
		configuration =configuration
		version="-1"
		

	} 
	else
	{
		console.log(
		  "appName || version  || configuration  undefined .So skipping sendExeluncherLunchAppCmd"
		);
		 return;
     }
    }
	
	
	  
    console.logColor(logging.Red, "yyyyy 111 serverOwner = " + serverOwner);
console.logColor(logging.Red, "appName = " + appName);
console.logColor(logging.Red, "version = " + version);
console.logColor(logging.Red, "configuration = " + configuration);
	
    if ( //!isAppPreAllocateCmd  && 
	(configuration === undefined) )
	{
		console.logColor(logging.Red, " !!!!!!!!!!!sendExeluncherLunchAppCmd(): configuration undefined.  ");
		
		return
	} 
	

  var data = {
    appName: appName, //"DHP_Config_Desktop"
    version: version, //"DHP_Config_Desktop"
    SSAddress: serverPublicIp,
    ue4StreamerToSS: streamerPort,
    configuration: configuration,
    owner: serverOwner,
   
    appDownloadInfo: appDownloadInfo,
    uInfo: uInfo,
  };

	if(ws &&   ws.userDeviceInfo)
		data.userDeviceInfo=ws.userDeviceInfo
	else
		data.userDeviceInfo=userDeviceInfo
 
  //console.log(" exeluncher- lunchApp :" + JSON.stringify(data));
	console.logColor(    logging.Red,   "configuration :" + JSON.stringify(configuration));
	console.logColor(    logging.Red,    "exeluncher- lunchApp :" 
	//+ JSON.stringify(data) 
	) ;
 
 
  if (exeluncher === undefined) 
  {
    sendMsgToAllConnectedPlayer(
      " !!!!!!!!!!!exeluncher undefined for  " + JSON.stringify(data)
    );
  } 
  else 
  {
	    console.logColor(    logging.Red,    "yyyyy2222 serverOwner :" + serverOwner ) ;
	 console.logColor(    logging.Red," sendExeluncherLunchAppCmd() ss-> exeluncher lunchApp :" 
	 //+ JSON.stringify(data)
	 );
	
	 if(ws)
		 sendIncludeInTimeRecordsOnlyToThisPlayer(ws,"lunchAppCmdSentToELAt",Date.now())
	  exeluncher.emit("lunchApp", data);
	  
  }
} 


//////////