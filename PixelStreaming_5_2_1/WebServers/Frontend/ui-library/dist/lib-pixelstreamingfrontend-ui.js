(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@epicgames-ps/lib-pixelstreamingfrontend-ue5.2"), require("jss"), require("jss-plugin-global"), require("jss-plugin-camel-case"));
	else if(typeof define === 'function' && define.amd)
		define(["@epicgames-ps/lib-pixelstreamingfrontend-ue5.2", "jss", "jss-plugin-global", "jss-plugin-camel-case"], factory);
	else if(typeof exports === 'object')
		exports["lib-pixelstreamingfrontend-ui"] = factory(require("@epicgames-ps/lib-pixelstreamingfrontend-ue5.2"), require("jss"), require("jss-plugin-global"), require("jss-plugin-camel-case"));
	else
		root["lib-pixelstreamingfrontend-ui"] = factory(root["@epicgames-ps/lib-pixelstreamingfrontend-ue5.2"], root["jss"], root["jss-plugin-global"], root["jss-plugin-camel-case"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_2__, __WEBPACK_EXTERNAL_MODULE_jss__, __WEBPACK_EXTERNAL_MODULE_jss_plugin_global__, __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Application/Application.ts":
/*!****************************************!*\
  !*** ./src/Application/Application.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Application": () => (/* binding */ Application)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Overlay/ConnectOverlay */ "./src/Overlay/ConnectOverlay.ts");
/* harmony import */ var _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Overlay/DisconnectOverlay */ "./src/Overlay/DisconnectOverlay.ts");
/* harmony import */ var _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Overlay/PlayOverlay */ "./src/Overlay/PlayOverlay.ts");
/* harmony import */ var _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Overlay/InfoOverlay */ "./src/Overlay/InfoOverlay.ts");
/* harmony import */ var _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Overlay/ErrorOverlay */ "./src/Overlay/ErrorOverlay.ts");
/* harmony import */ var _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Overlay/AFKOverlay */ "./src/Overlay/AFKOverlay.ts");
/* harmony import */ var _UI_Controls__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../UI/Controls */ "./src/UI/Controls.ts");
/* harmony import */ var _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../UI/LabelledButton */ "./src/UI/LabelledButton.ts");
/* harmony import */ var _UI_SettingsPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UI/SettingsPanel */ "./src/UI/SettingsPanel.ts");
/* harmony import */ var _UI_StatsPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UI/StatsPanel */ "./src/UI/StatsPanel.ts");
/* harmony import */ var _UI_VideoQpIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../UI/VideoQpIndicator */ "./src/UI/VideoQpIndicator.ts");
/* harmony import */ var _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config/ConfigUI */ "./src/Config/ConfigUI.ts");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
/* harmony import */ var _UI_FullscreenIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../UI/FullscreenIcon */ "./src/UI/FullscreenIcon.ts");
// Copyright Epic Games, Inc. All Rights Reserved.















/**
 * An Application is a combination of UI elements to display and manage a WebRTC Pixel Streaming
 * connection. It includes features for controlling a stream with mouse and keyboard,
 * managing connection endpoints, as well as displaying stats and other information about it.
 */
class Application {
    /**
     * @param options - Initialization options
     */
    constructor(options) {
        this._options = options;
        this.stream = options.stream;
        this.onColorModeChanged = options.onColorModeChanged;
        this.configUI = new _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.ConfigUI(this.stream.config);
        this.createOverlays();
        if ((0,_UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.isPanelEnabled)(options.statsPanelConfig)) {
            // Add stats panel
            this.statsPanel = new _UI_StatsPanel__WEBPACK_IMPORTED_MODULE_3__.StatsPanel();
            this.uiFeaturesElement.appendChild(this.statsPanel.rootElement);
        }
        if ((0,_UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.isPanelEnabled)(options.settingsPanelConfig)) {
            // Add settings panel
            this.settingsPanel = new _UI_SettingsPanel__WEBPACK_IMPORTED_MODULE_4__.SettingsPanel();
            this.uiFeaturesElement.appendChild(this.settingsPanel.rootElement);
            this.configureSettings();
        }
        if (!options.videoQpIndicatorConfig || !options.videoQpIndicatorConfig.disableIndicator) {
            // Add the video stream QP indicator
            this.videoQpIndicator = new _UI_VideoQpIndicator__WEBPACK_IMPORTED_MODULE_5__.VideoQpIndicator();
            this.uiFeaturesElement.appendChild(this.videoQpIndicator.rootElement);
        }
        this.createButtons();
        this.registerCallbacks();
        this.showConnectOrAutoConnectOverlays();
        this.setColorMode(this.configUI.isCustomFlagEnabled(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode));
    }
    createOverlays() {
        // build all of the overlays
        this.disconnectOverlay = new _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__.DisconnectOverlay(this.stream.videoElementParent);
        this.connectOverlay = new _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_7__.ConnectOverlay(this.stream.videoElementParent);
        this.playOverlay = new _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_8__.PlayOverlay(this.stream.videoElementParent);
        this.infoOverlay = new _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_9__.InfoOverlay(this.stream.videoElementParent);
        this.errorOverlay = new _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_10__.ErrorOverlay(this.stream.videoElementParent);
        this.afkOverlay = new _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_11__.AFKOverlay(this.stream.videoElementParent);
        this.disconnectOverlay.onAction(() => this.stream.reconnect());
        // Build the webRtc connect overlay Event Listener and show the connect overlay
        this.connectOverlay.onAction(() => this.stream.connect());
        // set up the play overlays action
        this.playOverlay.onAction(() => this.stream.play());
    }
    /**
     * Set up button click functions and button functionality
     */
    createButtons() {
        const controlsUIConfig = {
            statsButtonType: !!this._options.statsPanelConfig
                ? this._options.statsPanelConfig.visibilityButtonConfig
                : undefined,
            settingsButtonType: !!this._options.settingsPanelConfig
                ? this._options.settingsPanelConfig.visibilityButtonConfig
                : undefined,
            fullscreenButtonType: this._options.fullScreenControlsConfig,
            xrIconType: this._options.xrControlsConfig
        };
        // Setup controls
        const controls = new _UI_Controls__WEBPACK_IMPORTED_MODULE_12__.Controls(controlsUIConfig);
        this.uiFeaturesElement.appendChild(controls.rootElement);
        // When we fullscreen we want this element to be the root
        const fullScreenButton = 
        // Depending on if we're creating an internal button, or using an external one
        (!!this._options.fullScreenControlsConfig
            && this._options.fullScreenControlsConfig.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.UIElementCreationMode.UseCustomElement)
            // Either create a fullscreen class based on the external button
            ? new _UI_FullscreenIcon__WEBPACK_IMPORTED_MODULE_13__.FullScreenIconExternal(this._options.fullScreenControlsConfig.customElement)
            // Or use the one created by the Controls initializer earlier
            : controls.fullscreenIcon;
        if (fullScreenButton) {
            fullScreenButton.fullscreenElement = /iPhone|iPod/.test(navigator.userAgent) ? this.stream.videoElementParent.getElementsByTagName("video")[0] : this.rootElement;
        }
        // Add settings button to controls
        const settingsButton = !!controls.settingsIcon ? controls.settingsIcon.rootElement :
            this._options.settingsPanelConfig.visibilityButtonConfig.customElement;
        if (!!settingsButton)
            settingsButton.onclick = () => this.settingsClicked();
        if (!!this.settingsPanel)
            this.settingsPanel.settingsCloseButton.onclick = () => this.settingsClicked();
        // Add WebXR button to controls
        const xrButton = !!controls.xrIcon ? controls.xrIcon.rootElement :
            this._options.xrControlsConfig.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.UIElementCreationMode.UseCustomElement ?
                this._options.xrControlsConfig.customElement : undefined;
        if (!!xrButton)
            xrButton.onclick = () => this.stream.toggleXR();
        // setup the stats/info button
        const statsButton = !!controls.statsIcon ? controls.statsIcon.rootElement :
            this._options.statsPanelConfig.visibilityButtonConfig.customElement;
        if (!!statsButton)
            statsButton.onclick = () => this.statsClicked();
        if (!!this.statsPanel) {
            this.statsPanel.statsCloseButton.onclick = () => this.statsClicked();
        }
        // Add command buttons (if we have somewhere to add them to)
        if (!!this.settingsPanel) {
            // Add button for toggle fps
            const showFPSButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Show FPS', 'Toggle');
            showFPSButton.addOnClickListener(() => {
                this.stream.requestShowFps();
            });
            // Add button for restart stream
            const restartStreamButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Restart Stream', 'Restart');
            restartStreamButton.addOnClickListener(() => {
                this.stream.reconnect();
            });
            // Add button for request keyframe
            const requestKeyframeButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Request keyframe', 'Request');
            requestKeyframeButton.addOnClickListener(() => {
                this.stream.requestIframe();
            });
            const commandsSectionElem = this.configUI.buildSectionWithHeading(this.settingsPanel.settingsContentElement, 'Commands');
            commandsSectionElem.appendChild(showFPSButton.rootElement);
            commandsSectionElem.appendChild(requestKeyframeButton.rootElement);
            commandsSectionElem.appendChild(restartStreamButton.rootElement);
        }
    }
    /**
     * Configure the settings with on change listeners and any additional per experience settings.
     */
    configureSettings() {
        // This builds all the settings sections and flags under this `settingsContent` element.
        this.configUI.populateSettingsElement(this.settingsPanel.settingsContentElement);
        this.configUI.addCustomFlagOnSettingChangedListener(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode, (isLightMode) => {
            this.configUI.setCustomFlagLabel(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode, `Color Scheme: ${isLightMode ? 'Light' : 'Dark'} Mode`);
            this.setColorMode(isLightMode);
        });
    }
    registerCallbacks() {
        this.stream.addEventListener('afkWarningActivate', ({ data: { countDown, dismissAfk } }) => this.showAfkOverlay(countDown, dismissAfk));
        this.stream.addEventListener('afkWarningUpdate', ({ data: { countDown } }) => this.afkOverlay.updateCountdown(countDown));
        this.stream.addEventListener('afkWarningDeactivate', () => this.afkOverlay.hide());
        this.stream.addEventListener('afkTimedOut', () => this.afkOverlay.hide());
        this.stream.addEventListener('videoEncoderAvgQP', ({ data: { avgQP } }) => this.onVideoEncoderAvgQP(avgQP));
        this.stream.addEventListener('webRtcSdp', () => this.onWebRtcSdp());
        this.stream.addEventListener('webRtcAutoConnect', () => this.onWebRtcAutoConnect());
        this.stream.addEventListener('webRtcConnecting', () => this.onWebRtcConnecting());
        this.stream.addEventListener('webRtcConnected', () => this.onWebRtcConnected());
        this.stream.addEventListener('webRtcFailed', () => this.onWebRtcFailed());
        this.stream.addEventListener('webRtcDisconnected', ({ data: { eventString, showActionOrErrorOnDisconnect } }) => this.onDisconnect(eventString, showActionOrErrorOnDisconnect));
        this.stream.addEventListener('videoInitialized', () => this.onVideoInitialized());
        this.stream.addEventListener('streamLoading', () => this.onStreamLoading());
        this.stream.addEventListener('playStreamError', ({ data: { message } }) => this.onPlayStreamError(message));
        this.stream.addEventListener('playStream', () => this.onPlayStream());
        this.stream.addEventListener('playStreamRejected', ({ data: { reason } }) => this.onPlayStreamRejected(reason));
        this.stream.addEventListener('loadFreezeFrame', ({ data: { shouldShowPlayOverlay } }) => this.onLoadFreezeFrame(shouldShowPlayOverlay));
        this.stream.addEventListener('statsReceived', ({ data: { aggregatedStats } }) => this.onStatsReceived(aggregatedStats));
        this.stream.addEventListener('latencyTestResult', ({ data: { latencyTimings } }) => this.onLatencyTestResults(latencyTimings));
        this.stream.addEventListener('streamerListMessage', ({ data: { messageStreamerList, autoSelectedStreamerId } }) => this.handleStreamerListMessage(messageStreamerList, autoSelectedStreamerId));
        this.stream.addEventListener('settingsChanged', (event) => this.configUI.onSettingsChanged(event));
    }
    /**
     * Gets the rootElement of the application, video stream and all UI are children of this element.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'playerUI';
            this._rootElement.classList.add('noselect');
            this._rootElement.appendChild(this.stream.videoElementParent);
            this._rootElement.appendChild(this.uiFeaturesElement);
        }
        return this._rootElement;
    }
    /**
     * Gets the element that contains all the UI features, like the stats and settings panels.
     */
    get uiFeaturesElement() {
        if (!this._uiFeatureElement) {
            this._uiFeatureElement = document.createElement('div');
            this._uiFeatureElement.id = 'uiFeatures';
        }
        return this._uiFeatureElement;
    }
    /**
     * Shows the disconnect overlay
     * @param updateText - the text that will be displayed in the overlay
     */
    showDisconnectOverlay(updateText) {
        this.hideCurrentOverlay();
        this.updateDisconnectOverlay(updateText);
        this.disconnectOverlay.show();
        this.currentOverlay = this.disconnectOverlay;
    }
    /**
     * Update the disconnect overlays span text
     * @param updateText - the new countdown number
     */
    updateDisconnectOverlay(updateText) {
        this.disconnectOverlay.update(updateText);
    }
    /**
     * Activates the disconnect overlays action
     */
    onDisconnectionAction() {
        this.disconnectOverlay.activate();
    }
    /**
     * Hides the current overlay
     */
    hideCurrentOverlay() {
        if (this.currentOverlay != null) {
            this.currentOverlay.hide();
            this.currentOverlay = null;
        }
    }
    /**
     * Shows the connect overlay
     */
    showConnectOverlay() {
        this.hideCurrentOverlay();
        this.connectOverlay.show();
        this.currentOverlay = this.connectOverlay;
    }
    /**
     * Shows the play overlay
     */
    showPlayOverlay() {
        this.hideCurrentOverlay();
        this.playOverlay.show();
        this.currentOverlay = this.playOverlay;
    }
    /**
     * Shows the text overlay
     * @param text - the text that will be shown in the overlay
     */
    showTextOverlay(text) {
        this.hideCurrentOverlay();
        this.infoOverlay.update(text);
        this.infoOverlay.show();
        this.currentOverlay = this.infoOverlay;
    }
    /**
     * Shows the error overlay
     * @param text - the text that will be shown in the overlay
     */
    showErrorOverlay(text) {
        this.hideCurrentOverlay();
        this.errorOverlay.update(text);
        this.errorOverlay.show();
        this.currentOverlay = this.errorOverlay;
    }
    /**
     * Shows or hides the settings panel if clicked
     */
    settingsClicked() {
        this.statsPanel.hide();
        this.settingsPanel.toggleVisibility();
    }
    /**
     * Shows or hides the stats panel if clicked
     */
    statsClicked() {
        this.settingsPanel.hide();
        this.statsPanel.toggleVisibility();
    }
    /**
     * Activates the connect overlays action
     */
    onConnectAction() {
        this.connectOverlay.activate();
    }
    /**
     * Activates the play overlays action
     */
    onPlayAction() {
        this.playOverlay.activate();
    }
    /**
     * Shows the afk overlay
     * @param countDown - the countdown number for the afk countdown
     */
    showAfkOverlay(countDown, dismissAfk) {
        this.hideCurrentOverlay();
        this.afkOverlay.updateCountdown(countDown);
        this.afkOverlay.onAction(() => dismissAfk());
        this.afkOverlay.show();
        this.currentOverlay = this.afkOverlay;
    }
    /**
     * Show the Connect Overlay or auto connect
     */
    showConnectOrAutoConnectOverlays() {
        // set up if the auto play will be used or regular click to start
        if (!this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoConnect)) {
            this.showConnectOverlay();
        }
    }
    /**
     * Show the webRtcAutoConnect Overlay and connect
     */
    onWebRtcAutoConnect() {
        this.showTextOverlay('Auto Connecting Now');
    }
    /**
     * Set up functionality to happen when receiving a webRTC answer
     */
    onWebRtcSdp() {
        this.showTextOverlay('WebRTC Connection Negotiated');
    }
    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    onStreamLoading() {
        // build the spinner span
        const spinnerSpan = document.createElement('span');
        spinnerSpan.className = 'visually-hidden';
        spinnerSpan.innerHTML = 'Loading...';
        // build the spinner div
        const spinnerDiv = document.createElement('div');
        spinnerDiv.id = 'loading-spinner';
        spinnerDiv.className = 'spinner-border ms-2';
        spinnerDiv.setAttribute('role', 'status');
        // append the spinner to the element
        spinnerDiv.appendChild(spinnerSpan);
        this.showTextOverlay('Loading Stream ' + spinnerDiv.outerHTML);
    }
    /**
     * Event fired when the video is disconnected - displays the error overlay and resets the buttons stream tools upon disconnect
     * @param eventString - the event text that will be shown in the overlay
     */
    onDisconnect(eventString, showActionOrErrorOnDisconnect) {
        if (showActionOrErrorOnDisconnect == false) {
            this.showErrorOverlay(`Disconnected: ${eventString}`);
        }
        else {
            this.showDisconnectOverlay(`Disconnected: ${eventString}  <div class="clickableState">Click To Restart</div>`);
        }
        // disable starting a latency check
        this.statsPanel.latencyTest.latencyTestButton.onclick = () => {
            // do nothing
        };
    }
    /**
     * Handles when Web Rtc is connecting
     */
    onWebRtcConnecting() {
        this.showTextOverlay('Starting connection to server, please wait');
    }
    /**
     * Handles when Web Rtc has connected
     */
    onWebRtcConnected() {
        this.showTextOverlay('WebRTC connected, waiting for video');
    }
    /**
     * Handles when Web Rtc fails to connect
     */
    onWebRtcFailed() {
        this.showErrorOverlay('Unable to setup video');
    }
    onLoadFreezeFrame(shouldShowPlayOverlay) {
        if (shouldShowPlayOverlay === true) {
            _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), 'showing play overlay');
            this.showPlayOverlay();
        }
    }
    onPlayStream() {
        this.hideCurrentOverlay();
    }
    onPlayStreamError(message) {
        this.showErrorOverlay(message);
    }
    onPlayStreamRejected(onRejectedReason) {
        this.showPlayOverlay();
    }
    onVideoInitialized() {
        if (!this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoPlayVideo)) {
            this.showPlayOverlay();
        }
        // starting a latency check
        this.statsPanel.latencyTest.latencyTestButton.onclick = () => {
            this.stream.requestLatencyTest();
        };
    }
    /**
     * Set up functionality to happen when calculating the average video encoder qp
     * @param QP - the quality number of the stream
     */
    onVideoEncoderAvgQP(QP) {
        // Update internal QP indicator if one is present
        if (!!this.videoQpIndicator) {
            this.videoQpIndicator.updateQpTooltip(QP);
        }
    }
    onInitialSettings(settings) {
        if (settings.PixelStreamingSettings) {
            const disableLatencyTest = settings.PixelStreamingSettings.DisableLatencyTest;
            if (disableLatencyTest) {
                this.statsPanel.latencyTest.latencyTestButton.disabled = true;
                this.statsPanel.latencyTest.latencyTestButton.title =
                    'Disabled by -PixelStreamingDisableLatencyTester=true';
                _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Info(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), '-PixelStreamingDisableLatencyTester=true, requesting latency report from the the browser to UE is disabled.');
            }
        }
    }
    onStatsReceived(aggregatedStats) {
        // Grab all stats we can off the aggregated stats
        this.statsPanel.handleStats(aggregatedStats);
    }
    onLatencyTestResults(latencyTimings) {
        this.statsPanel.latencyTest.handleTestResult(latencyTimings);
    }
    handleStreamerListMessage(messageStreamingList, autoSelectedStreamerId) {
        if (autoSelectedStreamerId === null) {
            if (messageStreamingList.ids.length === 0) {
                this.showDisconnectOverlay('No streamers connected. <div class="clickableState">Click To Restart</div>');
            }
            else {
                this.showTextOverlay('Multiple streamers detected. Use the dropdown in the settings menu to select the streamer');
            }
        }
    }
    /**
     * Set light/dark color mode
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode) {
        if (this.onColorModeChanged) {
            this.onColorModeChanged(isLightMode);
        }
    }
}


/***/ }),

/***/ "./src/Config/ConfigUI.ts":
/*!********************************!*\
  !*** ./src/Config/ConfigUI.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigUI": () => (/* binding */ ConfigUI),
/* harmony export */   "LightMode": () => (/* binding */ LightMode)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingUIFlag */ "./src/Config/SettingUIFlag.ts");
/* harmony import */ var _SettingUINumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingUINumber */ "./src/Config/SettingUINumber.ts");
/* harmony import */ var _SettingUIText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingUIText */ "./src/Config/SettingUIText.ts");
/* harmony import */ var _SettingUIOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SettingUIOption */ "./src/Config/SettingUIOption.ts");
// Copyright Epic Games, Inc. All Rights Reserved.





const LightMode = 'LightMode';
class ConfigUI {
    // ------------ Settings -----------------
    constructor(config) {
        this.customFlags = new Map();
        /* A map of flags that can be toggled - options that can be set in the application - e.g. Use Mic? */
        this.flagsUi = new Map();
        /* A map of numerical settings - options that can be in the application - e.g. MinBitrate */
        this.numericParametersUi = new Map();
        /* A map of text settings - e.g. signalling server url */
        this.textParametersUi = new Map();
        /* A map of enum based settings - e.g. preferred codec */
        this.optionParametersUi = new Map();
        this.createCustomUISettings(config.useUrlParams);
        this.registerSettingsUIComponents(config);
    }
    /**
     * Create custom UI settings that are not provided by the Pixel Streaming library.
     */
    createCustomUISettings(useUrlParams) {
        this.customFlags.set(LightMode, new _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.SettingFlag(LightMode, 'Color Scheme: Dark Mode', 'Page styling will be either light or dark', false /*if want to use system pref: (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)*/, useUrlParams, (isLightMode, setting) => {
            setting.label = `Color Scheme: ${isLightMode ? 'Light' : 'Dark'} Mode`;
        }));
    }
    /**
     * Creates UI wrapper components for each setting element in config.
     * @param config
     */
    registerSettingsUIComponents(config) {
        for (const setting of config.getFlags()) {
            this.flagsUi.set(setting.id, new _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__.SettingUIFlag(setting));
        }
        for (const setting of Array.from(this.customFlags.values())) {
            this.flagsUi.set(setting.id, new _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__.SettingUIFlag(setting));
        }
        for (const setting of config.getTextSettings()) {
            this.textParametersUi.set(setting.id, new _SettingUIText__WEBPACK_IMPORTED_MODULE_2__.SettingUIText(setting));
        }
        for (const setting of config.getNumericSettings()) {
            this.numericParametersUi.set(setting.id, new _SettingUINumber__WEBPACK_IMPORTED_MODULE_3__.SettingUINumber(setting));
        }
        for (const setting of config.getOptionSettings()) {
            this.optionParametersUi.set(setting.id, new _SettingUIOption__WEBPACK_IMPORTED_MODULE_4__.SettingUIOption(setting));
        }
    }
    /**
     * Make DOM elements for a settings section with a heading.
     * @param settingsElem The parent container for our DOM elements.
     * @param sectionHeading The heading element to go into the section.
     * @returns The constructed DOM element for the section.
     */
    buildSectionWithHeading(settingsElem, sectionHeading) {
        // make section element
        const sectionElem = document.createElement('section');
        sectionElem.classList.add('settingsContainer');
        // make section heading
        const psSettingsHeader = document.createElement('div');
        psSettingsHeader.classList.add('settingsHeader');
        psSettingsHeader.classList.add('settings-text');
        psSettingsHeader.textContent = sectionHeading;
        // add section and heading to parent settings element
        sectionElem.appendChild(psSettingsHeader);
        settingsElem.appendChild(sectionElem);
        return sectionElem;
    }
    /**
     * Setup flags with their default values and add them to the `Config.flags` map.
     * @param settingsElem - The element that contains all the individual settings sections, flags, and so on.
     */
    populateSettingsElement(settingsElem) {
        /* Setup all Pixel Streaming specific settings */
        const psSettingsSection = this.buildSectionWithHeading(settingsElem, 'Pixel Streaming');
        // make settings show up in DOM
        this.addSettingText(psSettingsSection, this.textParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.TextParameters.SignallingServerUrl));
        this.addSettingOption(psSettingsSection, this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.StreamerId));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoConnect));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoPlayVideo));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.BrowserSendOffer));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.UseMic));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.StartVideoMuted));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.PreferSFU));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.IsQualityController));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.ForceMonoAudio));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.ForceTURN));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.SuppressBrowserKeys));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.AFKDetection));
        this.addSettingNumeric(psSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.AFKTimeoutSecs));
        this.addSettingNumeric(psSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MaxReconnectAttempts));
        /* Setup all view/ui related settings under this section */
        const viewSettingsSection = this.buildSectionWithHeading(settingsElem, 'UI');
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.MatchViewportResolution));
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.HoveringMouseMode));
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(LightMode));
        /* Setup all encoder related settings under this section */
        const inputSettingsSection = this.buildSectionWithHeading(settingsElem, 'Input');
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.KeyboardInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.MouseInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.TouchInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.GamepadInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Flags.XRControllerInput));
        /* Setup all encoder related settings under this section */
        const encoderSettingsSection = this.buildSectionWithHeading(settingsElem, 'Encoder');
        this.addSettingNumeric(encoderSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MinQP));
        this.addSettingNumeric(encoderSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MaxQP));
        const preferredCodecOption = this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.PreferredCodec);
        this.addSettingOption(encoderSettingsSection, this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.PreferredCodec));
        if (preferredCodecOption &&
            [...preferredCodecOption.selector.options]
                .map((o) => o.value)
                .includes('Only available on Chrome')) {
            preferredCodecOption.disable();
        }
        /* Setup all webrtc related settings under this section */
        const webrtcSettingsSection = this.buildSectionWithHeading(settingsElem, 'WebRTC');
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCFPS));
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCMinBitrate));
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCMaxBitrate));
    }
    /**
     * Add a SettingText element to a particular settings section in the DOM and registers that text in the text settings map.
     * @param settingsSection The settings section HTML element.
     * @param settingText The textual settings object.
     */
    addSettingText(settingsSection, settingText) {
        if (settingText) {
            settingsSection.appendChild(settingText.rootElement);
            this.textParametersUi.set(settingText.setting.id, settingText);
        }
    }
    /**
     * Add a SettingFlag element to a particular settings section in the DOM and registers that flag in the Config.flag map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingFlag(settingsSection, settingFlag) {
        if (settingFlag) {
            settingsSection.appendChild(settingFlag.rootElement);
            this.flagsUi.set(settingFlag.setting.id, settingFlag);
        }
    }
    /**
     * Add a numeric setting element to a particular settings section in the DOM and registers that flag in the Config.numericParameters map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingNumeric(settingsSection, setting) {
        if (setting) {
            settingsSection.appendChild(setting.rootElement);
            this.numericParametersUi.set(setting.setting.id, setting);
        }
    }
    /**
     * Add an enum based settings element to a particular settings section in the DOM and registers that flag in the Config.enumParameters map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingOption(settingsSection, setting) {
        if (setting) {
            settingsSection.appendChild(setting.rootElement);
            this.optionParametersUi.set(setting.setting.id, setting);
        }
    }
    onSettingsChanged({ data: { id, target, type } }) {
        if (type === 'flag') {
            const _id = id;
            const _target = target;
            const setting = this.flagsUi.get(_id);
            if (setting) {
                if (setting.flag !== _target.flag) {
                    setting.flag = _target.flag;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'number') {
            const _id = id;
            const _target = target;
            const setting = this.numericParametersUi.get(_id);
            if (setting) {
                if (setting.number !== _target.number) {
                    setting.number = _target.number;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'text') {
            const _id = id;
            const _target = target;
            const setting = this.textParametersUi.get(_id);
            if (setting) {
                if (setting.text !== _target.text) {
                    setting.text = _target.text;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'option') {
            const _id = id;
            const _target = target;
            const setting = this.optionParametersUi.get(_id);
            if (setting) {
                const uiOptions = setting.options;
                const targetOptions = _target.options;
                if (uiOptions.length !== targetOptions.length ||
                    !uiOptions.every((value) => targetOptions.includes(value))) {
                    setting.options = _target.options;
                }
                if (setting.selected !== _target.selected) {
                    setting.selected = _target.selected;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
    }
    /**
     * Add a callback to fire when the flag is toggled.
     * @param id The id of the flag.
     * @param onChangeListener The callback to fire when the value changes.
     */
    addCustomFlagOnSettingChangedListener(id, onChangeListener) {
        if (this.customFlags.has(id)) {
            this.customFlags.get(id).onChange = onChangeListener;
        }
    }
    /**
     * Set the label for the flag.
     * @param id The id of the flag.
     * @param label The new label to use for the flag.
     */
    setCustomFlagLabel(id, label) {
        if (!this.customFlags.has(id)) {
            _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Warning(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `Cannot set label for flag called ${id} - it does not exist in the Config.flags map.`);
        }
        else {
            this.customFlags.get(id).label = label;
            this.flagsUi.get(id).label = label;
        }
    }
    /**
     * Get the value of the configuration flag which has the given id.
     * @param id The unique id for the flag.
     * @returns True if the flag is enabled.
     */
    isCustomFlagEnabled(id) {
        return this.customFlags.get(id).flag;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIBase.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIBase.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIBase": () => (/* binding */ SettingUIBase)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Base class for a setting that has a text label, an arbitrary setting value it stores, an a HTML element that represents this setting.
 */
class SettingUIBase {
    constructor(setting) {
        this._setting = setting;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIFlag.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIFlag.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIFlag": () => (/* binding */ SettingUIFlag)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIFlag extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = setting.label;
        this.flag = setting.flag;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting._label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get checkbox() {
        if (!this._checkbox) {
            this._checkbox = document.createElement('input');
            this._checkbox.type = 'checkbox';
        }
        return this._checkbox;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            wrapperLabel.classList.add('tgl-switch');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.checkbox.title = this.setting.description;
            this.checkbox.classList.add('tgl');
            this.checkbox.classList.add('tgl-flat');
            const slider = document.createElement('div');
            slider.classList.add('tgl-slider');
            wrapperLabel.appendChild(this.checkbox);
            wrapperLabel.appendChild(slider);
            // setup on change from checkbox
            this.checkbox.addEventListener('change', () => {
                if (this.setting.flag !== this.checkbox.checked) {
                    this.setting.flag = this.checkbox.checked;
                    this.setting.updateURLParams();
                }
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set flag(inValue) {
        this.checkbox.checked = inValue;
    }
    /**
     * Get value
     */
    get flag() {
        return this.checkbox.checked;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Config/SettingUINumber.ts":
/*!***************************************!*\
  !*** ./src/Config/SettingUINumber.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUINumber": () => (/* binding */ SettingUINumber)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.


/**
 * A number spinner with a text label beside it.
 */
class SettingUINumber extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_1__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.number = this.setting.number;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('label');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    /**
     * Get the HTMLInputElement for the button.
     */
    get spinner() {
        if (!this._spinner) {
            this._spinner = document.createElement('input');
            this._spinner.type = 'number';
            this._spinner.min = this.setting.min.toString();
            this._spinner.max = this.setting.max.toString();
            this._spinner.value = this.setting.number.toString();
            this._spinner.title = this.setting.description;
            this._spinner.classList.add('form-control');
        }
        return this._spinner;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('setting');
            this._rootElement.classList.add('form-group');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            this._rootElement.appendChild(this.spinner);
            // setup onchange
            this.spinner.onchange = (event) => {
                const inputElem = event.target;
                const parsedValue = Number.parseInt(inputElem.value);
                if (Number.isNaN(parsedValue)) {
                    _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Warning(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `Could not parse value change into a valid number - value was ${inputElem.value}, resetting value to ${this.setting.min}`);
                    if (this.setting.number !== this.setting.min) {
                        this.setting.number = this.setting.min;
                    }
                }
                else {
                    if (this.setting.number !== parsedValue) {
                        this.setting.number = parsedValue;
                        this.setting.updateURLParams();
                    }
                }
            };
        }
        return this._rootElement;
    }
    /**
     * Set the number in the spinner (will be clamped within range).
     */
    set number(newNumber) {
        this.spinner.value = this.setting.clamp(newNumber).toString();
    }
    /**
     * Get value
     */
    get number() {
        return +this.spinner.value;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIOption.ts":
/*!***************************************!*\
  !*** ./src/Config/SettingUIOption.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIOption": () => (/* binding */ SettingUIOption)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIOption extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.options = this.setting.options;
        this.selected = this.setting.selected;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get selector() {
        if (!this._selector) {
            this._selector = document.createElement('select');
            this._selector.classList.add('form-control');
            this._selector.classList.add('settings-option');
        }
        return this._selector;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            this._rootElement.classList.add('form-group');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            this._rootElement.appendChild(wrapperLabel);
            // create select element
            this.selector.title = this.setting.description;
            wrapperLabel.appendChild(this.selector);
            // setup on change from selector
            this.selector.onchange = () => {
                if (this.setting.selected !== this.selector.value) {
                    this.setting.selected = this.selector.value;
                    this.setting.updateURLParams();
                }
            };
        }
        return this._rootElement;
    }
    set options(values) {
        for (let i = this.selector.options.length - 1; i >= 0; i--) {
            this.selector.remove(i);
        }
        values.forEach((value) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = value;
            this.selector.appendChild(opt);
        });
    }
    get options() {
        return [...this.selector.options].map((o) => o.value);
    }
    set selected(value) {
        // A user may not specify the full possible value so we instead use the closest match.
        // eg ?xxx=H264 would select 'H264 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f'
        const filteredList = this.options.filter((option) => option.indexOf(value) !== -1);
        if (filteredList.length) {
            this.selector.value = filteredList[0];
        }
    }
    get selected() {
        return this.selector.value;
    }
    disable() {
        this.selector.disabled = true;
    }
    enable() {
        this.selector.disabled = false;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIText.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIText.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIText": () => (/* binding */ SettingUIText)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIText extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.text = this.setting.text;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get textbox() {
        if (!this._textbox) {
            this._textbox = document.createElement('input');
            this._textbox.classList.add('form-control');
            this._textbox.type = 'textbox';
        }
        return this._textbox;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.textbox.title = this.setting.description;
            wrapperLabel.appendChild(this.textbox);
            // setup on change from checkbox
            this.textbox.addEventListener('input', () => {
                if (this.setting.text !== this.textbox.value) {
                    this.setting.text = this.textbox.value;
                    this.setting.updateURLParams();
                }
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set text(inValue) {
        this.textbox.value = inValue;
    }
    /**
     * Get value
     */
    get text() {
        return this.textbox.value;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Overlay/AFKOverlay.ts":
/*!***********************************!*\
  !*** ./src/Overlay/AFKOverlay.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AFKOverlay": () => (/* binding */ AFKOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Show an overlay for when the session is unattended, it begins a countdown timer, which when elapsed will disconnect the stream.
 */
class AFKOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const afkOverlayHtml = document.createElement('div');
        afkOverlayHtml.id = 'afkOverlay';
        afkOverlayHtml.className = 'clickableState';
        return afkOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain some text for an afk count down.
     */
    static createContentElement() {
        const afkOverlayHtmlInner = document.createElement('div');
        afkOverlayHtmlInner.id = 'afkOverlayInner';
        afkOverlayHtmlInner.innerHTML =
            '<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber"></span> seconds<br>Click to continue<br></center>';
        return afkOverlayHtmlInner;
    }
    /**
     * Construct an Afk overlay
     * @param parentElement the element this overlay will be inserted into
     */
    constructor(rootDiv) {
        super(rootDiv, AFKOverlay.createRootElement(), AFKOverlay.createContentElement());
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
    /**
     * Update the count down spans number for the overlay
     * @param countdown the count down number to be inserted into the span for updating
     */
    updateCountdown(countdown) {
        this.textElement.innerHTML = `<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber">${countdown}</span> seconds<br>Click to continue<br></center>`;
    }
}


/***/ }),

/***/ "./src/Overlay/ActionOverlay.ts":
/*!**************************************!*\
  !*** ./src/Overlay/ActionOverlay.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionOverlay": () => (/* binding */ ActionOverlay)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BaseOverlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.


/**
 * Class for the base action overlay structure
 */
class ActionOverlay extends _BaseOverlay__WEBPACK_IMPORTED_MODULE_1__.OverlayBase {
    /**
     * Construct an action overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param contentElement an element that contains text for the action overlay
     */
    constructor(rootDiv, rootElement, contentElement) {
        super(rootDiv, rootElement, contentElement);
        this.onActionCallback = () => {
            /* do nothing */ _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Info(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), 'Did you forget to set the onAction callback in your overlay?');
        };
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text) {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    }
    /**
     * Set a method as an event emitter callback
     * @param callBack the method that is to be called when the event is emitted
     */
    onAction(callBack) {
        this.onActionCallback = callBack;
    }
    /**
     * Activate an event that is attached to the event emitter
     */
    activate() {
        this.onActionCallback();
    }
}


/***/ }),

/***/ "./src/Overlay/BaseOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/BaseOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverlayBase": () => (/* binding */ OverlayBase)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Class for the base overlay structure
 */
class OverlayBase {
    /**
     * Construct an overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     */
    constructor(rootDiv, rootElement, textElement) {
        this.rootDiv = rootDiv;
        this.rootElement = rootElement;
        this.textElement = textElement;
        this.rootElement.appendChild(this.textElement);
        this.hide();
        this.rootDiv.appendChild(this.rootElement);
    }
    /**
     * Show the overlay
     */
    show() {
        this.rootElement.classList.remove('hiddenState');
    }
    /**
     * Hide the overlay
     */
    hide() {
        this.rootElement.classList.add('hiddenState');
    }
}


/***/ }),

/***/ "./src/Overlay/ConnectOverlay.ts":
/*!***************************************!*\
  !*** ./src/Overlay/ConnectOverlay.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectOverlay": () => (/* binding */ ConnectOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown during connection, has a button that can be clicked to initiate a connection.
 */
class ConnectOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const connectElem = document.createElement('div');
        connectElem.id = 'connectOverlay';
        connectElem.className = 'clickableState';
        return connectElem;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const connectContentElem = document.createElement('div');
        connectContentElem.id = 'connectButton';
        connectContentElem.innerHTML = 'Click to start';
        return connectContentElem;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ConnectOverlay.createRootElement(), ConnectOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/DisconnectOverlay.ts":
/*!******************************************!*\
  !*** ./src/Overlay/DisconnectOverlay.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisconnectOverlay": () => (/* binding */ DisconnectOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown during disconnection, has a reconnection element that can be clicked to reconnect.
 */
class DisconnectOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const disconnectOverlayHtml = document.createElement('div');
        disconnectOverlayHtml.id = 'disconnectOverlay';
        disconnectOverlayHtml.className = 'clickableState';
        return disconnectOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        // build the inner html container
        const disconnectOverlayHtmlContainer = document.createElement('div');
        disconnectOverlayHtmlContainer.id = 'disconnectButton';
        disconnectOverlayHtmlContainer.innerHTML = 'Click To Restart';
        return disconnectOverlayHtmlContainer;
    }
    /**
     * Construct a disconnect overlay with a retry connection icon.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, DisconnectOverlay.createRootElement(), DisconnectOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/ErrorOverlay.ts":
/*!*************************************!*\
  !*** ./src/Overlay/ErrorOverlay.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorOverlay": () => (/* binding */ ErrorOverlay)
/* harmony export */ });
/* harmony import */ var _TextOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextOverlay */ "./src/Overlay/TextOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Generic overlay used to show textual error info to the user.
 */
class ErrorOverlay extends _TextOverlay__WEBPACK_IMPORTED_MODULE_0__.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const errorOverlayHtml = document.createElement('div');
        errorOverlayHtml.id = 'errorOverlay';
        errorOverlayHtml.className = 'textDisplayState';
        return errorOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const errorOverlayHtmlInner = document.createElement('div');
        errorOverlayHtmlInner.id = 'errorOverlayInner';
        return errorOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ErrorOverlay.createRootElement(), ErrorOverlay.createContentElement());
    }
}


/***/ }),

/***/ "./src/Overlay/InfoOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/InfoOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoOverlay": () => (/* binding */ InfoOverlay)
/* harmony export */ });
/* harmony import */ var _TextOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextOverlay */ "./src/Overlay/TextOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Generic overlay used to show textual info to the user.
 */
class InfoOverlay extends _TextOverlay__WEBPACK_IMPORTED_MODULE_0__.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const infoOverlayHtml = document.createElement('div');
        infoOverlayHtml.id = 'infoOverlay';
        infoOverlayHtml.className = 'textDisplayState';
        return infoOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const infoOverlayHtmlInner = document.createElement('div');
        infoOverlayHtmlInner.id = 'messageOverlayInner';
        return infoOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, InfoOverlay.createRootElement(), InfoOverlay.createContentElement());
    }
}


/***/ }),

/***/ "./src/Overlay/PlayOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/PlayOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayOverlay": () => (/* binding */ PlayOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown when stream is ready to play.
 */
class PlayOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const playElem = document.createElement('div');
        playElem.id = 'playOverlay';
        playElem.className = 'clickableState';
        return playElem;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        // todo: change this to an svg
        const playOverlayHtmlInner = document.createElement('img');
        playOverlayHtmlInner.id = 'playButton';
        playOverlayHtmlInner.src =
            'data:image/png;base64,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';
        playOverlayHtmlInner.alt = 'Start Streaming';
        return playOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, PlayOverlay.createRootElement(), PlayOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/TextOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/TextOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextOverlay": () => (/* binding */ TextOverlay)
/* harmony export */ });
/* harmony import */ var _BaseOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Class for the text overlay base
 */
class TextOverlay extends _BaseOverlay__WEBPACK_IMPORTED_MODULE_0__.OverlayBase {
    /**
     * Construct a text overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     */
    constructor(rootDiv, rootElement, textElement) {
        super(rootDiv, rootElement, textElement);
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text) {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    }
}


/***/ }),

/***/ "./src/Styles/PixelStreamingApplicationStyles.ts":
/*!*******************************************************!*\
  !*** ./src/Styles/PixelStreamingApplicationStyles.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PixelStreamingApplicationStyle": () => (/* binding */ PixelStreamingApplicationStyle)
/* harmony export */ });
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jss */ "jss");
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jss-plugin-global */ "jss-plugin-global");
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jss-plugin-camel-case */ "jss-plugin-camel-case");
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__);
/* Copyright Epic Games, Inc. All Rights Reserved. */



class PixelStreamingApplicationStyle {
    constructor(options) {
        this.defaultLightModePalette = {
            '--color0': '#e2e0dd80',
            '--color1': '#FFFFFF',
            '--color2': '#000000',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#e1e2dd',
            '--color7': '#c3c4bf'
        };
        this.defaultDarkModePalette = {
            '--color0': '#1D1F2280',
            '--color1': '#000000',
            '--color2': '#FFFFFF',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#1e1d22',
            '--color7': '#3c3b40'
        };
        this.defaultStyles = {
            ':root': {
                '--color0': '#1D1F2280',
                '--color1': '#000000',
                '--color2': '#FFFFFF',
                '--color3': '#0585fe',
                '--color4': '#35b350',
                '--color5': '#ffab00',
                '--color6': '#1e1d22',
                '--color7': '#3c3b40',
                '--color8': '#41008c',
                '--color9': '#3e0070',
                '--color10': '#2e0052',
                '--color11': 'rgba(65,0,139,1)'
            },
            '.noselect': {
                userSelect: 'none'
            },
            '#playerUI': {
                width: '100%',
                height: '100%',
                position: 'relative'
            },
            '#videoElementParent': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'var(--color1)'
            },
            '#uiFeatures': {
                width: '100%',
                height: '100%',
                zIndex: '30',
                position: 'relative',
                color: 'var(--color2)',
                pointerEvents: 'none',
                overflow: 'hidden'
            },
            '.UiTool .tooltiptext': {
                visibility: 'hidden',
                width: 'auto',
                color: 'var(--color2)',
                textAlign: 'center',
                borderRadius: '15px',
                padding: '0px 10px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.75px',
                position: 'absolute',
                top: '0',
                transform: 'translateY(25%)',
                left: '125%',
                zIndex: '20'
            },
            '.UiTool:hover .tooltiptext': {
                visibility: 'visible',
                backgroundColor: 'var(--color7)'
            },
            '#connection .tooltiptext': {
                top: '125%',
                transform: 'translateX(-25%)',
                left: '0',
                zIndex: '20',
                padding: '5px 10px'
            },
            '#connection': {
                position: 'absolute',
                bottom: '8%',
                left: '5%',
                fontFamily: "'Michroma', sans-serif",
                height: '3rem',
                width: '3rem',
                pointerEvents: 'all'
            },
            '#settings-panel .tooltiptext': {
                display: 'block',
                top: '125%',
                transform: 'translateX(-50%)',
                left: '0',
                zIndex: '20',
                padding: '5px 10px',
                border: '3px solid var(--color3)',
                width: 'max-content',
                fallbacks: [
                    {
                        width: 'max-content'
                    },
                    {
                        border: '3px solid var(--color3)'
                    },
                    {
                        padding: '5px 10px'
                    },
                    {
                        zIndex: '20'
                    },
                    {
                        left: '0'
                    },
                    {
                        transform: 'translateX(-50%)'
                    },
                    {
                        top: '125%'
                    },
                    {
                        display: 'block'
                    }
                ]
            },
            '#controls': {
                position: 'absolute',
                top: '3%',
                left: '2%',
                fontFamily: "'Michroma', sans-serif",
                pointerEvents: 'all',
                display: 'block'
            },
            '#controls>*': {
                marginBottom: '0.5rem',
                borderRadius: '50%',
                display: 'block',
                height: '2rem',
                lineHeight: '1.75rem',
                padding: '0.5rem'
            },
            '#controls #additionalinfo': {
                textAlign: 'center',
                fontFamily: "'Montserrat', sans-serif"
            },
            '#fullscreen-btn': {
                padding: '0.6rem !important'
            },
            '#minimizeIcon': {
                display: 'none'
            },
            '#settingsBtn, #statsBtn': {
                cursor: 'pointer'
            },
            '#uiFeatures button': {
                backgroundColor: 'var(--color7)',
                border: '1px solid var(--color7)',
                color: 'var(--color2)',
                position: 'relative',
                width: '3rem',
                height: '3rem',
                padding: '0.5rem',
                textAlign: 'center'
            },
            '#uiFeatures button:hover': {
                backgroundColor: 'var(--color3)',
                border: '3px solid var(--color3)',
                transition: '0.25s ease',
                paddingLeft: '0.55rem',
                paddingTop: '0.55rem'
            },
            '#uiFeatures button:active': {
                border: '3px solid var(--color3)',
                backgroundColor: 'var(--color7)',
                paddingLeft: '0.55rem',
                paddingTop: '0.55rem'
            },
            '.btn-flat': {
                backgroundColor: 'transparent',
                color: 'var(--color2)',
                fontFamily: "'Montserrat'",
                fontWeight: 'bold',
                border: '3px solid var(--color3)',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                cursor: 'pointer',
                textAlign: 'center'
            },
            '.btn-flat:hover': {
                backgroundColor: 'var(--color3)',
                transition: 'ease 0.3s'
            },
            '.btn-flat:disabled': {
                background: 'var(--color7)',
                borderColor: 'var(--color3)',
                color: 'var(--color3)',
                cursor: 'default'
            },
            '.btn-flat:active': {
                backgroundColor: 'transparent'
            },
            '.btn-flat:focus': {
                outline: 'none'
            },
            '#uiFeatures img': {
                width: '100%',
                height: '100%'
            },
            '.panel-wrap': {
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                height: '100%',
                minWidth: '20vw',
                maxWidth: '100vw',
                transform: 'translateX(100%)',
                transition: '.3s ease-out',
                pointerEvents: 'all',
                backdropFilter: 'blur(10px)',
                webkitBackdropFilter: 'blur(10px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: 'var(--color0)'
            },
            '.panel-wrap-visible': {
                transform: 'translateX(0%)'
            },
            '.panel': {
                overflowY: 'auto',
                padding: '1em'
            },
            '#settingsHeading, #statsHeading': {
                display: 'inline-block',
                fontSize: '2em',
                marginBlockStart: '0.67em',
                marginBlockEnd: '0.67em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                position: 'relative',
                padding: '0 0 0 2rem'
            },
            '#settingsClose, #statsClose': {
                margin: '0.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingRight: '0.5rem',
                fontSize: '2em',
                float: 'right'
            },
            '#settingsClose:after, #statsClose:after': {
                paddingLeft: '0.5rem',
                display: 'inline-block',
                content: '"\\00d7"'
            },
            '#settingsClose:hover, #statsClose:hover': {
                color: 'var(--color3)',
                transition: 'ease 0.3s'
            },
            '#settingsContent, #statsContent': {
                marginLeft: '2rem',
                marginRight: '2rem'
            },
            '.setting': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0.15rem 10px 0.15rem 10px'
            },
            '.settings-text': {
                color: 'var(--color2)',
                verticalAlign: 'middle',
                fontWeight: 'normal'
            },
            '.settings-option': {
                width: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            },
            '#connectOverlay, #playOverlay, #infoOverlay, #errorOverlay, #afkOverlay, #disconnectOverlay': {
                zIndex: '30',
                position: 'absolute',
                color: 'var(--color2)',
                fontSize: '1.8em',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color1)',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase'
            },
            '.clickableState': {
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                cursor: 'pointer'
            },
            '.textDisplayState': {
                display: 'flex'
            },
            '.hiddenState': {
                display: 'none'
            },
            '#playButton, #connectButton': {
                display: 'inline-block',
                height: 'auto',
                zIndex: '30'
            },
            'img#playButton': {
                maxWidth: '241px',
                width: '10%'
            },
            '#uiInteraction': {
                position: 'fixed'
            },
            '#UIInteractionButtonBoundary': {
                padding: '2px'
            },
            '#UIInteractionButton': {
                cursor: 'pointer'
            },
            '#hiddenInput': {
                position: 'absolute',
                left: '-10%',
                width: '0px',
                opacity: '0'
            },
            '#editTextButton': {
                position: 'absolute',
                height: '40px',
                width: '40px'
            },
            '.btn-overlay': {
                verticalAlign: 'middle',
                display: 'inline-block'
            },
            '.tgl-switch': {
                verticalAlign: 'middle',
                display: 'inline-block'
            },
            '.tgl-switch .tgl': {
                display: 'none'
            },
            '.tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl+.tgl-slider': {
                webkitBoxSizing: 'border-box',
                boxSizing: 'border-box'
            },
            '.tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl *::-moz-selection, .tgl *:after::-moz-selection, .tgl *:before::-moz-selection, .tgl+.tgl-slider::-moz-selection': {
                background: 'none'
            },
            '.tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl+.tgl-slider::selection': {
                background: 'none'
            },
            '.tgl-slider': {},
            '.tgl+.tgl-slider': {
                outline: '0',
                display: 'block',
                width: '40px',
                height: '18px',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none'
            },
            '.tgl+.tgl-slider:after, .tgl+.tgl-slider:before': {
                position: 'relative',
                display: 'block',
                content: '""',
                width: '50%',
                height: '100%'
            },
            '.tgl+.tgl-slider:after': {
                left: '0'
            },
            '.tgl+.tgl-slider:before': {
                display: 'none'
            },
            '.tgl-flat+.tgl-slider': {
                padding: '2px',
                webkitTransition: 'all .2s ease',
                transition: 'all .2s ease',
                background: 'var(--color6)',
                border: '3px solid var(--color7)',
                borderRadius: '2em'
            },
            '.tgl-flat+.tgl-slider:after': {
                webkitTransition: 'all .2s ease',
                transition: 'all .2s ease',
                background: 'var(--color7)',
                content: '""',
                borderRadius: '1em'
            },
            '.tgl-flat:checked+.tgl-slider': {
                border: '3px solid var(--color3)'
            },
            '.tgl-flat:checked+.tgl-slider:after': {
                left: '50%',
                background: 'var(--color3)'
            },
            '.btn-apply': {
                display: 'block !important',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '40%'
            },
            '.form-control': {
                backgroundColor: 'var(--color7)',
                border: '2px solid var(--color7)',
                borderRadius: '4px',
                color: 'var(--color2)',
                textAlign: 'right',
                fontFamily: 'inherit'
            },
            '.form-control:hover': {
                borderColor: 'var(--color7)'
            },
            '.form-group': {
                paddingTop: '4px',
                display: 'grid',
                gridTemplateColumns: '80% 20%',
                rowGap: '4px',
                paddingRight: '10px',
                paddingLeft: '10px'
            },
            '.form-group label': {
                verticalAlign: 'middle',
                fontWeight: 'normal'
            },
            '.settingsContainer': {
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid var(--color7)',
                paddingTop: '10px',
                paddingBottom: '10px'
            },
            '.settingsContainer> :first-child': {
                marginTop: '4px',
                marginBottom: '4px',
                fontWeight: 'bold',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline'
            },
            '.collapse': {
                paddingLeft: '5%'
            },
            '#streamTools': {
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px',
                userSelect: 'none',
                position: 'absolute',
                top: '0',
                right: '2%',
                zIndex: '100',
                border: '4px solid var(--colour8)',
                borderTopWidth: '0px'
            },
            '.settingsHeader': {
                fontStyle: 'italic'
            },
            '#streamToolsHeader': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--colour8)',
                backgroundColor: 'var(--color7)'
            },
            '.streamTools': {
                backgroundColor: 'var(--color2)',
                fontFamily: 'var(--buttonFont)',
                fontWeight: 'lighter',
                color: 'var(--color7)'
            },
            '.streamTools-shown>#streamToolsSettings, .streamTools-shown>#streamToolsStats': {
                display: 'block'
            },
            '#streamToolsToggle': {
                width: '100%'
            },
            '#qualityStatus': {
                fontSize: '37px',
                paddingRight: '4px'
            },
            '.svgIcon': {
                fill: 'var(--color2)'
            }
        };
        const { customStyles, lightModePalette, darkModePalette } = options !== null && options !== void 0 ? options : {};
        // One time setup with default plugins and settings.
        const jssOptions = {
            // JSS has many interesting plugins we may wish to turn on
            //plugins: [functions(), template(), global(), extend(), nested(), compose(), camelCase(), defaultUnit(options.defaultUnit), expand(), vendorPrefixer(), propsSort()]
            plugins: [jss_plugin_global__WEBPACK_IMPORTED_MODULE_1___default()(), jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2___default()()]
        };
        jss__WEBPACK_IMPORTED_MODULE_0___default().setup(jssOptions);
        this.customStyles = customStyles;
        this.lightModePalette =
            lightModePalette !== null && lightModePalette !== void 0 ? lightModePalette : this.defaultLightModePalette;
        this.darkModePalette = darkModePalette !== null && darkModePalette !== void 0 ? darkModePalette : this.defaultDarkModePalette;
    }
    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();
        // attach generated style sheet to page
        jss__WEBPACK_IMPORTED_MODULE_0___default().createStyleSheet({
            '@global': Object.assign(Object.assign({}, this.defaultStyles), this.customStyles)
        }).attach();
    }
    applyPalette(palette) {
        const rootElement = document.querySelector(':root');
        rootElement.style.setProperty('--color0', palette['--color0']);
        rootElement.style.setProperty('--color1', palette['--color1']);
        rootElement.style.setProperty('--color2', palette['--color2']);
        rootElement.style.setProperty('--color3', palette['--color3']);
        rootElement.style.setProperty('--color4', palette['--color4']);
        rootElement.style.setProperty('--color5', palette['--color5']);
        rootElement.style.setProperty('--color6', palette['--color6']);
        rootElement.style.setProperty('--color7', palette['--color7']);
    }
    /**
     * Update the players color variables
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode) {
        if (isLightMode) {
            this.applyPalette(this.lightModePalette);
        }
        else {
            this.applyPalette(this.darkModePalette);
        }
    }
}


/***/ }),

/***/ "./src/UI/Controls.ts":
/*!****************************!*\
  !*** ./src/UI/Controls.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controls": () => (/* binding */ Controls)
/* harmony export */ });
/* harmony import */ var _FullscreenIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FullscreenIcon */ "./src/UI/FullscreenIcon.ts");
/* harmony import */ var _SettingsIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingsIcon */ "./src/UI/SettingsIcon.ts");
/* harmony import */ var _StatsIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatsIcon */ "./src/UI/StatsIcon.ts");
/* harmony import */ var _XRIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./XRIcon */ "./src/UI/XRIcon.ts");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
// Copyright Epic Games, Inc. All Rights Reserved.





// If there isn't a type provided, default behaviour is to create the element.
function shouldCreateButton(type) {
    return (type == undefined) ? true : (type.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_0__.UIElementCreationMode.CreateDefaultElement);
}
/**
 * Element containing various controls like stats, settings, fullscreen.
 */
class Controls {
    /**
     * Construct the controls
     */
    constructor(config) {
        if (!config || shouldCreateButton(config.statsButtonType)) {
            this.statsIcon = new _StatsIcon__WEBPACK_IMPORTED_MODULE_1__.StatsIcon();
        }
        if (!config || shouldCreateButton(config.settingsButtonType)) {
            this.settingsIcon = new _SettingsIcon__WEBPACK_IMPORTED_MODULE_2__.SettingsIcon();
        }
        if (!config || shouldCreateButton(config.fullscreenButtonType)) {
            this.fullscreenIcon = new _FullscreenIcon__WEBPACK_IMPORTED_MODULE_3__.FullScreenIcon();
        }
        if (!config || shouldCreateButton(config.xrIconType)) {
            this.xrIcon = new _XRIcon__WEBPACK_IMPORTED_MODULE_4__.XRIcon();
        }
    }
    /**
     * Get the element containing the controls.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'controls';
            if (!!this.fullscreenIcon) {
                this._rootElement.appendChild(this.fullscreenIcon.rootElement);
            }
            if (!!this.settingsIcon) {
                this._rootElement.appendChild(this.settingsIcon.rootElement);
            }
            if (!!this.statsIcon) {
                this._rootElement.appendChild(this.statsIcon.rootElement);
            }
            if (!!this.xrIcon) {
                this._rootElement.appendChild(this.xrIcon.rootElement);
                /* WebXRController.isSessionSupported('immersive-vr').then(
                (supported: boolean) => {
                    if (supported) {
                        this._rootElement.appendChild(this.xrIcon.rootElement);
                    }
                }); */
            }
            ;
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/UI/FullscreenIcon.ts":
/*!**********************************!*\
  !*** ./src/UI/FullscreenIcon.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullScreenIcon": () => (/* binding */ FullScreenIcon),
/* harmony export */   "FullScreenIconBase": () => (/* binding */ FullScreenIconBase),
/* harmony export */   "FullScreenIconExternal": () => (/* binding */ FullScreenIconExternal)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Base class for an element (i.e. button) that, when clicked, will toggle fullscreen of a given element.
 * Can be initialized with any HTMLElement, if it is set as rootElement in the constructor.
 */
class FullScreenIconBase {
    get rootElement() {
        return this._rootElement;
    }
    set rootElement(element) {
        element.onclick = () => this.toggleFullscreen();
        this._rootElement = element;
    }
    constructor() {
        this.isFullscreen = false;
        // set up the full screen events
        document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('fullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange(), false);
    }
    /**
     * Makes the document or fullscreenElement fullscreen.
     */
    toggleFullscreen() {
        // if already full screen; exit
        // else go fullscreen
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else {
            const element = this.fullscreenElement;
            if (!element) {
                return;
            }
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullscreen) {
                element.mozRequestFullscreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            else if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen(); //for iphone this code worked
            }
        }
        this.onFullscreenChange();
    }
    /**
     * Handles the fullscreen button on change
     */
    onFullscreenChange() {
        this.isFullscreen =
            document.webkitIsFullScreen ||
                document.mozFullScreen ||
                (document.msFullscreenElement &&
                    document.msFullscreenElement !== null) ||
                (document.fullscreenElement && document.fullscreenElement !== null);
    }
}
/**
 * An implementation of FullScreenIconBase that uses an externally
 * provided HTMLElement for toggling full screen.
 */
class FullScreenIconExternal extends FullScreenIconBase {
    constructor(externalButton) {
        super();
        this.rootElement = externalButton;
    }
}
/**
 * The default fullscreen icon that contains a button and svgs for each state.
 */
class FullScreenIcon extends FullScreenIconBase {
    constructor() {
        super();
        const createdButton = document.createElement('button');
        createdButton.type = 'button';
        createdButton.classList.add('UiTool');
        createdButton.id = 'fullscreen-btn';
        createdButton.appendChild(this.maximizeIcon);
        createdButton.appendChild(this.minimizeIcon);
        createdButton.appendChild(this.tooltipText);
        this.rootElement = createdButton;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Fullscreen';
        }
        return this._tooltipText;
    }
    get maximizeIcon() {
        if (!this._maximizeIcon) {
            this._maximizeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._maximizeIcon.setAttributeNS(null, 'id', 'maximizeIcon');
            this._maximizeIcon.setAttributeNS(null, 'x', '0px');
            this._maximizeIcon.setAttributeNS(null, 'y', '0px');
            this._maximizeIcon.setAttributeNS(null, 'viewBox', '0 0 384.97 384.97');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._maximizeIcon.appendChild(svgGroup);
            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M384.97,12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833,0-11.922,5.39-11.934,12.223c0,6.821,5.101,11.838,11.934,11.838h96.062l-0.193,96.519c0,6.833,5.197,12.03,12.03,12.03c6.833-0.012,12.03-5.197,12.03-12.03l0.193-108.369c0-0.036-0.012-0.06-0.012-0.084C384.958,12.09,384.97,12.066,384.97,12.03z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M120.496,0H12.403c-0.036,0-0.06,0.012-0.096,0.012C12.283,0.012,12.247,0,12.223,0C5.51,0,0.192,5.317,0.192,12.03L0,120.399c0,6.833,5.39,11.934,12.223,11.934c6.821,0,11.838-5.101,11.838-11.934l0.192-96.339h96.242c6.833,0,12.03-5.197,12.03-12.03C132.514,5.197,127.317,0,120.496,0z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M120.123,360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0,257.833,0,264.667v108.092c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096c0,6.713,5.317,12.03,12.03,12.03h108.092c6.833,0,11.922-5.39,11.934-12.223C132.057,365.926,126.956,360.909,120.123,360.909z');
            const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path4.setAttributeNS(null, 'd', 'M372.747,252.913c-6.833,0-11.85,5.101-11.838,11.934v96.062h-96.242c-6.833,0-12.03,5.197-12.03,12.03s5.197,12.03,12.03,12.03h108.092c0.036,0,0.06-0.012,0.084-0.012c0.036-0.012,0.06,0.012,0.096,0.012c6.713,0,12.03-5.317,12.03-12.03V264.847C384.97,258.014,379.58,252.913,372.747,252.913z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
        }
        return this._maximizeIcon;
    }
    get minimizeIcon() {
        if (!this._minimizeIcon) {
            this._minimizeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._minimizeIcon.setAttributeNS(null, 'id', 'minimizeIcon');
            this._minimizeIcon.setAttributeNS(null, 'x', '0px');
            this._minimizeIcon.setAttributeNS(null, 'y', '0px');
            this._minimizeIcon.setAttributeNS(null, 'viewBox', '0 0 385.331 385.331');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._minimizeIcon.appendChild(svgGroup);
            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z');
            const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path4.setAttributeNS(null, 'd', 'M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
        }
        return this._minimizeIcon;
    }
    onFullscreenChange() {
        super.onFullscreenChange();
        const minimize = this.minimizeIcon;
        const maximize = this.maximizeIcon;
        if (this.isFullscreen) {
            minimize.style.display = 'inline';
            //ios disappearing svg fix
            minimize.style.transform = 'translate(0, 0)';
            maximize.style.display = 'none';
        }
        else {
            minimize.style.display = 'none';
            maximize.style.display = 'inline';
            //ios disappearing svg fix
            maximize.style.transform = 'translate(0, 0)';
        }
    }
}


/***/ }),

/***/ "./src/UI/LabelledButton.ts":
/*!**********************************!*\
  !*** ./src/UI/LabelledButton.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelledButton": () => (/* binding */ LabelledButton)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A button with a text label beside it.
 */
class LabelledButton {
    constructor(label, buttonText) {
        this._label = label;
        this._buttonText = buttonText;
    }
    /**
     * Add a click listener to the button element.
     */
    addOnClickListener(onClickFunc) {
        this.button.addEventListener('click', onClickFunc);
    }
    /**
     * Get the HTMLInputElement for the button.
     */
    get button() {
        if (!this._button) {
            this._button = document.createElement('input');
            this._button.type = 'button';
            this._button.value = this._buttonText;
            this._button.classList.add('overlay-button');
            this._button.classList.add('btn-flat');
        }
        return this._button;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            const settingsTextElem = document.createElement('div');
            settingsTextElem.innerText = this._label;
            this._rootElement.appendChild(settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            wrapperLabel.classList.add('btn-overlay');
            this._rootElement.appendChild(wrapperLabel);
            wrapperLabel.appendChild(this.button);
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/UI/LatencyTest.ts":
/*!*******************************!*\
  !*** ./src/UI/LatencyTest.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LatencyTest": () => (/* binding */ LatencyTest)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Latency test UI elements and results handling.
 */
class LatencyTest {
    /**
     * Get the the button containing the stats icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('section');
            this._rootElement.classList.add('settingsContainer');
            // make heading
            const heading = document.createElement('div');
            heading.id = 'latencyTestHeader';
            heading.classList.add('settings-text');
            heading.classList.add('settingsHeader');
            this._rootElement.appendChild(heading);
            const headingText = document.createElement('div');
            headingText.innerHTML = 'Latency Test';
            heading.appendChild(headingText);
            heading.appendChild(this.latencyTestButton);
            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'latencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);
            resultsParentElem.appendChild(this.latencyTestResultsElement);
        }
        return this._rootElement;
    }
    get latencyTestResultsElement() {
        if (!this._latencyTestResultsElement) {
            this._latencyTestResultsElement = document.createElement('div');
            this._latencyTestResultsElement.id = 'latencyStatsResults';
            this._latencyTestResultsElement.classList.add('StatsResult');
        }
        return this._latencyTestResultsElement;
    }
    get latencyTestButton() {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');
        }
        return this._latencyTestButton;
    }
    /**
     * Populate the UI based on the latency test's results.
     * @param latencyTimings The latency test results.
     */
    handleTestResult(latencyTimings) {
        _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), latencyTimings.toString(), 6);
        let latencyStatsInnerHTML = '';
        latencyStatsInnerHTML +=
            '<div>Net latency RTT (ms): ' +
                latencyTimings.networkLatency +
                '</div>';
        latencyStatsInnerHTML +=
            '<div>UE Encode (ms): ' + latencyTimings.EncodeMs + '</div>';
        latencyStatsInnerHTML +=
            '<div>UE Capture (ms): ' +
                latencyTimings.CaptureToSendMs +
                '</div>';
        latencyStatsInnerHTML +=
            '<div>Browser send latency (ms): ' +
                latencyTimings.browserSendLatency +
                '</div>';
        latencyStatsInnerHTML +=
            latencyTimings.frameDisplayDeltaTimeMs &&
                latencyTimings.browserReceiptTimeMs
                ? '<div>Browser receive latency (ms): ' +
                    latencyTimings.frameDisplayDeltaTimeMs +
                    '</div>'
                : '';
        latencyStatsInnerHTML +=
            '<div>Total latency (excluding browser) (ms): ' +
                latencyTimings.latencyExcludingDecode +
                '</div>';
        latencyStatsInnerHTML += latencyTimings.endToEndLatency
            ? '<div>Total latency (ms): ' +
                latencyTimings.endToEndLatency +
                '</div>'
            : '';
        this.latencyTestResultsElement.innerHTML = latencyStatsInnerHTML;
    }
}


/***/ }),

/***/ "./src/UI/SettingsIcon.ts":
/*!********************************!*\
  !*** ./src/UI/SettingsIcon.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsIcon": () => (/* binding */ SettingsIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Settings icon that can be clicked.
 */
class SettingsIcon {
    /**
     * Get the the button containing the settings icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'settingsBtn';
            this._rootElement.appendChild(this.settingsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Settings';
        }
        return this._tooltipText;
    }
    get settingsIcon() {
        if (!this._settingsIcon) {
            this._settingsIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._settingsIcon.setAttributeNS(null, 'id', 'settingsIcon');
            this._settingsIcon.setAttributeNS(null, 'x', '0px');
            this._settingsIcon.setAttributeNS(null, 'y', '0px');
            this._settingsIcon.setAttributeNS(null, 'viewBox', '0 0 478.703 478.703');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._settingsIcon.appendChild(svgGroup);
            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8\
			c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2\
			c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8\
			c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1\
			c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8\
			c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5\
			l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6\
			c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1\
			l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1\
			C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9\
			c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8\
			c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42\
			c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8\
			c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8\
			c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2\
			c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42\
			c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6\
			c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1\
			c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8\
			c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7\
			c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
        }
        return this._settingsIcon;
    }
}


/***/ }),

/***/ "./src/UI/SettingsPanel.ts":
/*!*********************************!*\
  !*** ./src/UI/SettingsPanel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPanel": () => (/* binding */ SettingsPanel)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A UI component containing all the settings for the application.
 */
class SettingsPanel {
    constructor() {
        this._rootElement = null;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'settings-panel';
            this._rootElement.classList.add('panel-wrap');
            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);
            const settingsHeading = document.createElement('div');
            settingsHeading.id = 'settingsHeading';
            settingsHeading.textContent = 'Settings';
            panelElem.appendChild(settingsHeading);
            panelElem.appendChild(this.settingsCloseButton);
            panelElem.appendChild(this.settingsContentElement);
        }
        return this._rootElement;
    }
    get settingsContentElement() {
        if (!this._settingsContentElement) {
            this._settingsContentElement = document.createElement('div');
            this._settingsContentElement.id = 'settingsContent';
        }
        return this._settingsContentElement;
    }
    get settingsCloseButton() {
        if (!this._settingsCloseButton) {
            this._settingsCloseButton = document.createElement('div');
            this._settingsCloseButton.id = 'settingsClose';
        }
        return this._settingsCloseButton;
    }
    /**
     * Show settings panel.
     */
    show() {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }
    /**
     * Toggle the visibility of the settings panel.
     */
    toggleVisibility() {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }
    /**
     * Hide settings panel.
     */
    hide() {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
}


/***/ }),

/***/ "./src/UI/StatsIcon.ts":
/*!*****************************!*\
  !*** ./src/UI/StatsIcon.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsIcon": () => (/* binding */ StatsIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Stats icon that can be clicked.
 */
class StatsIcon {
    /**
     * Get the the button containing the stats icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'statsBtn';
            this._rootElement.appendChild(this.statsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Information';
        }
        return this._tooltipText;
    }
    get statsIcon() {
        if (!this._statsIcon) {
            this._statsIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._statsIcon.setAttributeNS(null, 'id', 'statsIcon');
            this._statsIcon.setAttributeNS(null, 'x', '0px');
            this._statsIcon.setAttributeNS(null, 'y', '0px');
            this._statsIcon.setAttributeNS(null, 'viewBox', '0 0 330 330');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._statsIcon.appendChild(svgGroup);
            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983C180,136.725,173.284,130.008,165,130.008z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61C172.81,71.61,168.95,70.011,165,70.011z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
        }
        return this._statsIcon;
    }
}


/***/ }),

/***/ "./src/UI/StatsPanel.ts":
/*!******************************!*\
  !*** ./src/UI/StatsPanel.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stat": () => (/* binding */ Stat),
/* harmony export */   "StatsPanel": () => (/* binding */ StatsPanel)
/* harmony export */ });
/* harmony import */ var _LatencyTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LatencyTest */ "./src/UI/LatencyTest.ts");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Util_MathUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Util/MathUtils */ "./src/Util/MathUtils.ts");
// Copyright Epic Games, Inc. All Rights Reserved.



/**
 * A stat structure, an id, the stat string, and the element where it is rendered.
 */
class Stat {
}
/**
 * A UI component containing all the stats for the application.
 */
class StatsPanel {
    constructor() {
        /* A map stats we are storing/rendering */
        this.statsMap = new Map();
        this.latencyTest = new _LatencyTest__WEBPACK_IMPORTED_MODULE_1__.LatencyTest();
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'stats-panel';
            this._rootElement.classList.add('panel-wrap');
            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);
            const statsHeading = document.createElement('div');
            statsHeading.id = 'statsHeading';
            statsHeading.textContent = 'Information';
            panelElem.appendChild(statsHeading);
            panelElem.appendChild(this.statsCloseButton);
            panelElem.appendChild(this.statsContentElement);
        }
        return this._rootElement;
    }
    get statsContentElement() {
        if (!this._statsContentElement) {
            this._statsContentElement = document.createElement('div');
            this._statsContentElement.id = 'statsContent';
            const streamToolStats = document.createElement('div');
            streamToolStats.id = 'streamToolsStats';
            streamToolStats.classList.add('container');
            const controlStats = document.createElement('div');
            controlStats.id = 'ControlStats';
            controlStats.classList.add('row');
            const statistics = document.createElement('section');
            statistics.id = 'statistics';
            statistics.classList.add('settingsContainer');
            const statisticsHeader = document.createElement('div');
            statisticsHeader.id = 'statisticsHeader';
            statisticsHeader.classList.add('settings-text');
            statisticsHeader.classList.add('settingsHeader');
            const sessionStats = document.createElement('div');
            sessionStats.innerHTML = 'Session Stats';
            this._statsContentElement.appendChild(streamToolStats);
            streamToolStats.appendChild(controlStats);
            controlStats.appendChild(statistics);
            statistics.appendChild(statisticsHeader);
            statisticsHeader.appendChild(sessionStats);
            statistics.appendChild(this.statisticsContainer);
            controlStats.appendChild(this.latencyTest.rootElement);
        }
        return this._statsContentElement;
    }
    get statisticsContainer() {
        if (!this._statisticsContainer) {
            this._statisticsContainer = document.createElement('div');
            this._statisticsContainer.id = 'statisticsContainer';
            this._statisticsContainer.classList.add('d-none');
            this._statisticsContainer.appendChild(this.statsResult);
        }
        return this._statisticsContainer;
    }
    get statsResult() {
        if (!this._statsResult) {
            this._statsResult = document.createElement('div');
            this._statsResult.id = 'statisticsResult';
            this._statsResult.classList.add('StatsResult');
        }
        return this._statsResult;
    }
    get statsCloseButton() {
        if (!this._statsCloseButton) {
            this._statsCloseButton = document.createElement('div');
            this._statsCloseButton.id = 'statsClose';
        }
        return this._statsCloseButton;
    }
    /**
     * Show stats panel.
     */
    show() {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }
    /**
     * Toggle the visibility of the stats panel.
     */
    toggleVisibility() {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }
    /**
     * Hide the stats panel.
     */
    hide() {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
    /**
     * Handle stats coming in from browser/UE
     * @param stats the stats structure
     */
    handleStats(stats) {
        var _a, _b, _c, _d, _e;
        // format numbering based on the browser language
        const numberFormat = new Intl.NumberFormat(window.navigator.language, {
            maximumFractionDigits: 0
        });
        // Inbound data
        const inboundData = _Util_MathUtils__WEBPACK_IMPORTED_MODULE_2__.MathUtils.formatBytes(stats.inboundVideoStats.bytesReceived, 2);
        this.addOrUpdateStat('InboundDataStat', 'Received', inboundData);
        // Packets lost
        const packetsLostStat = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'packetsLost')
            ? numberFormat.format(stats.inboundVideoStats.packetsLost)
            : 'Chrome only';
        this.addOrUpdateStat('PacketsLostStat', 'Packets Lost', packetsLostStat);
        // Bitrate
        if (stats.inboundVideoStats.bitrate) {
            this.addOrUpdateStat('VideoBitrateStat', 'Video Bitrate (kbps)', stats.inboundVideoStats.bitrate.toString());
        }
        if (stats.inboundAudioStats.bitrate) {
            this.addOrUpdateStat('AudioBitrateStat', 'Audio Bitrate (kbps)', stats.inboundAudioStats.bitrate.toString());
        }
        // Video resolution
        const resStat = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'frameWidth') &&
            stats.inboundVideoStats.frameWidth &&
            Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'frameHeight') &&
            stats.inboundVideoStats.frameHeight
            ? stats.inboundVideoStats.frameWidth +
                'x' +
                stats.inboundVideoStats.frameHeight
            : 'Chrome only';
        this.addOrUpdateStat('VideoResStat', 'Video resolution', resStat);
        // Frames decoded
        const framesDecoded = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'framesDecoded')
            ? numberFormat.format(stats.inboundVideoStats.framesDecoded)
            : 'Chrome only';
        this.addOrUpdateStat('FramesDecodedStat', 'Frames Decoded', framesDecoded);
        // Framerate
        if (stats.inboundVideoStats.framesPerSecond) {
            this.addOrUpdateStat('FramerateStat', 'Framerate', stats.inboundVideoStats.framesPerSecond.toString());
        }
        // Frames dropped
        this.addOrUpdateStat('FramesDroppedStat', 'Frames dropped', (_a = stats.inboundVideoStats.framesDropped) === null || _a === void 0 ? void 0 : _a.toString());
        if (stats.inboundVideoStats.codecId) {
            this.addOrUpdateStat('VideoCodecStat', 'Video codec', 
            // Split the codec to remove the Fmtp line
            (_c = (_b = stats.codecs
                .get(stats.inboundVideoStats.codecId)) === null || _b === void 0 ? void 0 : _b.split(' ')[0]) !== null && _c !== void 0 ? _c : '');
        }
        if (stats.inboundAudioStats.codecId) {
            this.addOrUpdateStat('AudioCodecStat', 'Audio codec', 
            // Split the codec to remove the Fmtp line
            (_e = (_d = stats.codecs
                .get(stats.inboundAudioStats.codecId)) === null || _d === void 0 ? void 0 : _d.split(' ')[0]) !== null && _e !== void 0 ? _e : '');
        }
        // RTT
        const netRTT = Object.prototype.hasOwnProperty.call(stats.candidatePair, 'currentRoundTripTime') && stats.isNumber(stats.candidatePair.currentRoundTripTime)
            ? numberFormat.format(stats.candidatePair.currentRoundTripTime * 1000)
            : "Can't calculate";
        this.addOrUpdateStat('RTTStat', 'Net RTT (ms)', netRTT);
        this.addOrUpdateStat('DurationStat', 'Duration', stats.sessionStats.runTime);
        this.addOrUpdateStat('ControlsInputStat', 'Controls stream input', stats.sessionStats.controlsStreamInput);
        // QP
        this.addOrUpdateStat('QPStat', 'Video quantization parameter', stats.sessionStats.videoEncoderAvgQP.toString());
        // todo:
        //statsText += `<div>Browser receive to composite (ms): ${stats.inboundVideoStats.receiveToCompositeMs}</div>`;
        _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `--------- Stats ---------\n ${stats}\n------------------------`, 6);
    }
    /**
     * Adds a new stat to the stats results in the DOM or updates an exiting stat.
     * @param id The id of the stat to add/update.
     * @param stat The contents of the stat.
     */
    addOrUpdateStat(id, statLabel, stat) {
        const statHTML = `${statLabel}: ${stat}`;
        if (!this.statsMap.has(id)) {
            // create the stat
            const newStat = new Stat();
            newStat.id = id;
            newStat.stat = stat;
            newStat.title = statLabel;
            newStat.element = document.createElement('div');
            newStat.element.innerHTML = statHTML;
            // add the stat to the dom
            this.statsResult.appendChild(newStat.element);
            this.statsMap.set(id, newStat);
        }
        // update the existing stat
        else {
            const value = this.statsMap.get(id);
            if (value !== undefined) {
                value.element.innerHTML = statHTML;
            }
        }
    }
}


/***/ }),

/***/ "./src/UI/UIConfigurationTypes.ts":
/*!****************************************!*\
  !*** ./src/UI/UIConfigurationTypes.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIElementCreationMode": () => (/* binding */ UIElementCreationMode),
/* harmony export */   "isPanelEnabled": () => (/* binding */ isPanelEnabled)
/* harmony export */ });
/** Whether a stream UI element is internally made, externally provided, or disabled. */
var UIElementCreationMode;
(function (UIElementCreationMode) {
    UIElementCreationMode[UIElementCreationMode["CreateDefaultElement"] = 0] = "CreateDefaultElement";
    UIElementCreationMode[UIElementCreationMode["UseCustomElement"] = 1] = "UseCustomElement";
    UIElementCreationMode[UIElementCreationMode["Disable"] = 2] = "Disable";
})(UIElementCreationMode || (UIElementCreationMode = {}));
function isPanelEnabled(config) {
    return !config || (!!config && config.isEnabled);
}


/***/ }),

/***/ "./src/UI/VideoQpIndicator.ts":
/*!************************************!*\
  !*** ./src/UI/VideoQpIndicator.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoQpIndicator": () => (/* binding */ VideoQpIndicator)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A UI element showing the QP (quantization parameter) of the video stream at the last encoded frame (well, last transmitted QP really).
 * A blockier encoding will have a higher QP and this will make the indicator turn more red.
 * A non-blocky stream will have a lower QP and this will make the indicator turn more green.
 * The QP indicator is represented visually using a WiFi icon.
 */
class VideoQpIndicator {
    constructor() {
        this.videoEncoderAvgQP = -1;
        // non html elements
        this.statsText = '';
        this.color = '';
        // qp colors
        this.orangeQP = 26;
        this.redQP = 35;
    }
    /**
     * Get the root element of the QP indicator.
     */
    get rootElement() {
        if (!this._rootElement) {
            // make the root element that contains the svg for the connection
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'connection';
            this._rootElement.classList.add('UiTool');
            // add svg icon for the connection strength
            this._rootElement.appendChild(this.qualityStatus);
            // add the text underneath the connection
            this._rootElement.appendChild(this.qualityText);
            // set colors to not connected initially
            this.updateQpTooltip(-1);
        }
        return this._rootElement;
    }
    /**
     * Get the text that displays under the icon.
     */
    get qualityText() {
        if (!this._qualityText) {
            this._qualityText = document.createElement('span');
            this._qualityText.id = 'qualityText';
            this._qualityText.classList.add('tooltiptext');
        }
        return this._qualityText;
    }
    /**
     * Get the icon.
     */
    get qualityStatus() {
        if (!this._qualityStatus) {
            this._qualityStatus = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._qualityStatus.setAttributeNS(null, 'id', 'connectionStrength');
            this._qualityStatus.setAttributeNS(null, 'x', '0px');
            this._qualityStatus.setAttributeNS(null, 'y', '0px');
            this._qualityStatus.setAttributeNS(null, 'viewBox', '0 0 494.45 494.45');
            // build wifi icon
            this.qualityStatus.appendChild(this.dot);
            this.qualityStatus.appendChild(this.middle);
            this.qualityStatus.appendChild(this.outer);
            this.qualityStatus.appendChild(this.inner);
        }
        return this._qualityStatus;
    }
    /**
     * Get the dot at the bottom of the wifi icon.
     */
    get dot() {
        if (!this._dot) {
            this._dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this._dot.setAttributeNS(null, 'id', 'dot');
            this._dot.setAttributeNS(null, 'cx', '247.125');
            this._dot.setAttributeNS(null, 'cy', '398.925');
            this._dot.setAttributeNS(null, 'r', '35.3');
        }
        return this._dot;
    }
    /**
     * Get the outer arc of the wifi icon.
     */
    get outer() {
        if (!this._outer) {
            this._outer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._outer.setAttributeNS(null, 'id', 'outer');
            this._outer.setAttributeNS(null, 'd', 'M467.925,204.625c-6.8,0-13.5-2.6-18.7-7.8c-111.5-111.4-292.7-111.4-404.1,0c-10.3,10.3-27.1,10.3-37.4,0s-10.3-27.1,0-37.4c64-64,149-99.2,239.5-99.2s175.5,35.2,239.5,99.2c10.3,10.3,10.3,27.1,0,37.4C481.425,202.025,474.625,204.625,467.925,204.625z');
        }
        return this._outer;
    }
    /**
     * Get the middle arc of the wifi icon.
     */
    get middle() {
        if (!this._middle) {
            this._middle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._middle.setAttributeNS(null, 'id', 'middle');
            this._middle.setAttributeNS(null, 'd', 'M395.225,277.325c-6.8,0-13.5-2.6-18.7-7.8c-71.4-71.3-187.4-71.3-258.8,0c-10.3,10.3-27.1,10.3-37.4,0s-10.3-27.1,0-37.4c92-92,241.6-92,333.6,0c10.3,10.3,10.3,27.1,0,37.4C408.725,274.725,401.925,277.325,395.225,277.325z');
        }
        return this._middle;
    }
    /**
     * Get the inner arc of the wifi icon.
     */
    get inner() {
        if (!this._inner) {
            this._inner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._inner.setAttributeNS(null, 'id', 'inner');
            this._inner.setAttributeNS(null, 'd', 'M323.625,348.825c-6.8,0-13.5-2.6-18.7-7.8c-15.4-15.4-36-23.9-57.8-23.9s-42.4,8.5-57.8,23.9c-10.3,10.3-27.1,10.3-37.4,0c-10.3-10.3-10.3-27.1,0-37.4c25.4-25.4,59.2-39.4,95.2-39.4s69.8,14,95.2,39.5c10.3,10.3,10.3,27.1,0,37.4C337.225,346.225,330.425,348.825,323.625,348.825z');
        }
        return this._inner;
    }
    /**
     * Used to set the speed of the status light.
     * @param speed - Set the speed of the blink, higher numbers make the status light blink faster.
     */
    blinkVideoQualityStatus(speed) {
        let iteration = speed;
        let opacity = 1;
        const tickID = setInterval(() => {
            opacity -= 0.1;
            this.qualityText.style.opacity = String(Math.abs((opacity - 0.5) * 2));
            if (opacity <= 0.1) {
                if (--iteration == 0) {
                    clearInterval(tickID);
                }
                else {
                    opacity = 1;
                }
            }
        }, 100 / speed);
    }
    /**
     * updates the QP tooltip by converting the Video Encoder QP to a color light
     * @param QP - The video encoder QP number needed to find the average
     */
    updateQpTooltip(QP) {
        this.videoEncoderAvgQP = QP;
        if (QP > this.redQP) {
            this.color = 'red';
            this.blinkVideoQualityStatus(2);
            this.statsText = `<div style="color: ${this.color}">Poor encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', '#3c3b40');
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        else if (QP > this.orangeQP) {
            this.color = 'orange';
            this.blinkVideoQualityStatus(1);
            this.statsText = `<div style="color: ${this.color}">Blocky encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', this.color);
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        else if (QP <= 0) {
            this.color = '#b0b0b0';
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', '#3c3b40');
            this.inner.setAttributeNS(null, 'fill', '#3c3b40');
            this.dot.setAttributeNS(null, 'fill', '#3c3b40');
            this.statsText = `<div style="color: ${this.color}">Not connected</div>`;
        }
        else {
            this.color = 'lime';
            this.qualityStatus.style.opacity = '1';
            this.statsText = `<div style="color: ${this.color}">Clear encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', this.color);
            this.middle.setAttributeNS(null, 'fill', this.color);
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        this.qualityText.innerHTML = this.statsText;
    }
}


/***/ }),

/***/ "./src/UI/XRIcon.ts":
/*!**************************!*\
  !*** ./src/UI/XRIcon.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XRIcon": () => (/* binding */ XRIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * XR icon that can be clicked.
 */
class XRIcon {
    /**
     * Get the the button containing the XR icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'xrBtn';
            this._rootElement.appendChild(this.xrIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'XR';
        }
        return this._tooltipText;
    }
    get xrIcon() {
        if (!this._xrIcon) {
            this._xrIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._xrIcon.setAttributeNS(null, 'id', 'xrIcon');
            this._xrIcon.setAttributeNS(null, 'x', '0px');
            this._xrIcon.setAttributeNS(null, 'y', '0px');
            this._xrIcon.setAttributeNS(null, 'viewBox', '0 0 100 100');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._xrIcon.appendChild(svgGroup);
            // create paths for the icon itself, the path of the xr headset
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'd', 'M29 41c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm42-14c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm12-31H17c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h14.5c3.5 0 6.8-1.5 9-4.1l3.5-4c1.5-1.7 3.7-2.7 6-2.7s4.5 1 6 2.7l3.5 4c2.3 2.6 5.6 4.1 9 4.1H83c6.6 0 12-5.4 12-12V36c0-6.6-5.4-12-12-12zm8 40c0 4.4-3.6 8-8 8H68.5c-2.3 0-4.5-1-6-2.7l-3.5-4c-2.3-2.6-5.6-4.1-9-4.1-3.5 0-6.8 1.5-9 4.1l-3.5 4C36 71 33.8 72 31.5 72H17c-4.4 0-8-3.6-8-8V36c0-4.4 3.6-8 8-8h66c4.4 0 8 3.6 8 8v28z');
            svgGroup.appendChild(path);
        }
        return this._xrIcon;
    }
}


/***/ }),

/***/ "./src/Util/MathUtils.ts":
/*!*******************************!*\
  !*** ./src/Util/MathUtils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathUtils": () => (/* binding */ MathUtils)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
class MathUtils {
    /**
     * formats Bytes coming in for video stats
     * @param bytes number to convert
     * @param decimals number of decimal places
     */
    static formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0';
        }
        const factor = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = [
            'Bytes',
            'KiB',
            'MiB',
            'GiB',
            'TiB',
            'PiB',
            'EiB',
            'ZiB',
            'YiB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(factor));
        return (parseFloat((bytes / Math.pow(factor, i)).toFixed(dm)) +
            ' ' +
            sizes[i]);
    }
}


/***/ }),

/***/ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2":
/*!*****************************************************************!*\
  !*** external "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2" ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_2__;

/***/ }),

/***/ "jss":
/*!**********************!*\
  !*** external "jss" ***!
  \**********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss__;

/***/ }),

/***/ "jss-plugin-camel-case":
/*!****************************************!*\
  !*** external "jss-plugin-camel-case" ***!
  \****************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case__;

/***/ }),

/***/ "jss-plugin-global":
/*!************************************!*\
  !*** external "jss-plugin-global" ***!
  \************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_global__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/pixelstreamingfrontend-ui.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AFKOverlay": () => (/* reexport safe */ _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_2__.AFKOverlay),
/* harmony export */   "ActionOverlay": () => (/* reexport safe */ _Overlay_ActionOverlay__WEBPACK_IMPORTED_MODULE_3__.ActionOverlay),
/* harmony export */   "Application": () => (/* reexport safe */ _Application_Application__WEBPACK_IMPORTED_MODULE_0__.Application),
/* harmony export */   "ConfigUI": () => (/* reexport safe */ _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_11__.ConfigUI),
/* harmony export */   "ConnectOverlay": () => (/* reexport safe */ _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_5__.ConnectOverlay),
/* harmony export */   "DisconnectOverlay": () => (/* reexport safe */ _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__.DisconnectOverlay),
/* harmony export */   "ErrorOverlay": () => (/* reexport safe */ _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_7__.ErrorOverlay),
/* harmony export */   "InfoOverlay": () => (/* reexport safe */ _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_8__.InfoOverlay),
/* harmony export */   "OverlayBase": () => (/* reexport safe */ _Overlay_BaseOverlay__WEBPACK_IMPORTED_MODULE_4__.OverlayBase),
/* harmony export */   "PixelStreamingApplicationStyle": () => (/* reexport safe */ _Styles_PixelStreamingApplicationStyles__WEBPACK_IMPORTED_MODULE_1__.PixelStreamingApplicationStyle),
/* harmony export */   "PlayOverlay": () => (/* reexport safe */ _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_9__.PlayOverlay),
/* harmony export */   "SettingUIBase": () => (/* reexport safe */ _Config_SettingUIBase__WEBPACK_IMPORTED_MODULE_12__.SettingUIBase),
/* harmony export */   "SettingUIFlag": () => (/* reexport safe */ _Config_SettingUIFlag__WEBPACK_IMPORTED_MODULE_13__.SettingUIFlag),
/* harmony export */   "SettingUINumber": () => (/* reexport safe */ _Config_SettingUINumber__WEBPACK_IMPORTED_MODULE_14__.SettingUINumber),
/* harmony export */   "SettingUIOption": () => (/* reexport safe */ _Config_SettingUIOption__WEBPACK_IMPORTED_MODULE_15__.SettingUIOption),
/* harmony export */   "SettingUIText": () => (/* reexport safe */ _Config_SettingUIText__WEBPACK_IMPORTED_MODULE_16__.SettingUIText),
/* harmony export */   "TextOverlay": () => (/* reexport safe */ _Overlay_TextOverlay__WEBPACK_IMPORTED_MODULE_10__.TextOverlay),
/* harmony export */   "UIElementCreationMode": () => (/* reexport safe */ _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_17__.UIElementCreationMode)
/* harmony export */ });
/* harmony import */ var _Application_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application/Application */ "./src/Application/Application.ts");
/* harmony import */ var _Styles_PixelStreamingApplicationStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles/PixelStreamingApplicationStyles */ "./src/Styles/PixelStreamingApplicationStyles.ts");
/* harmony import */ var _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overlay/AFKOverlay */ "./src/Overlay/AFKOverlay.ts");
/* harmony import */ var _Overlay_ActionOverlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Overlay/ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
/* harmony import */ var _Overlay_BaseOverlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Overlay/BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
/* harmony import */ var _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Overlay/ConnectOverlay */ "./src/Overlay/ConnectOverlay.ts");
/* harmony import */ var _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Overlay/DisconnectOverlay */ "./src/Overlay/DisconnectOverlay.ts");
/* harmony import */ var _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Overlay/ErrorOverlay */ "./src/Overlay/ErrorOverlay.ts");
/* harmony import */ var _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Overlay/InfoOverlay */ "./src/Overlay/InfoOverlay.ts");
/* harmony import */ var _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Overlay/PlayOverlay */ "./src/Overlay/PlayOverlay.ts");
/* harmony import */ var _Overlay_TextOverlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Overlay/TextOverlay */ "./src/Overlay/TextOverlay.ts");
/* harmony import */ var _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Config/ConfigUI */ "./src/Config/ConfigUI.ts");
/* harmony import */ var _Config_SettingUIBase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Config/SettingUIBase */ "./src/Config/SettingUIBase.ts");
/* harmony import */ var _Config_SettingUIFlag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Config/SettingUIFlag */ "./src/Config/SettingUIFlag.ts");
/* harmony import */ var _Config_SettingUINumber__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Config/SettingUINumber */ "./src/Config/SettingUINumber.ts");
/* harmony import */ var _Config_SettingUIOption__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Config/SettingUIOption */ "./src/Config/SettingUIOption.ts");
/* harmony import */ var _Config_SettingUIText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Config/SettingUIText */ "./src/Config/SettingUIText.ts");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
// Copyright Epic Games, Inc. All Rights Reserved.



















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLGtEQUFrRDtBQVVNO0FBSUc7QUFDTTtBQUNaO0FBQ0E7QUFDRTtBQUNKO0FBQ2dCO0FBQ2I7QUFDRjtBQUNOO0FBQ1k7QUFDRDtBQU10QjtBQUMrQztBQW1DbEY7Ozs7R0FJRztBQUNJLE1BQU0sV0FBVztJQTJCcEI7O09BRUc7SUFDSCxZQUFZLE9BQWtCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxzREFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksd0VBQWMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUMxQyxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHNEQUFVLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkU7UUFFRCxJQUFJLHdFQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDN0MscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0REFBYSxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ25FLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyRixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksa0VBQWdCLEVBQUUsQ0FBQztZQUMvQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6RTtRQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsdURBQVMsQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVNLGNBQWM7UUFDakIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHlFQUFpQixDQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLG1FQUFjLENBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksNkRBQVcsQ0FDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw2REFBVyxDQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGdFQUFZLENBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQ2pDLENBQUM7UUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksNERBQVUsQ0FDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRS9ELCtFQUErRTtRQUMvRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFMUQsa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxhQUFhO1FBQ2hCLE1BQU0sZ0JBQWdCLEdBQTZCO1lBQy9DLGVBQWUsRUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7Z0JBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQjtnQkFDdkQsQ0FBQyxDQUFDLFNBQVM7WUFDZixrQkFBa0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUI7Z0JBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQjtnQkFDMUQsQ0FBQyxDQUFDLFNBQVM7WUFDZixvQkFBb0IsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QjtZQUM1RCxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0I7U0FDN0M7UUFDRCxpQkFBaUI7UUFDakIsTUFBTSxRQUFRLEdBQUcsSUFBSSxtREFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFekQseURBQXlEO1FBQ3pELE1BQU0sZ0JBQWdCO1FBQ2xCLDhFQUE4RTtRQUM5RSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QjtlQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLFlBQVksS0FBSyw0RkFBc0MsQ0FBQztZQUN0RyxnRUFBZ0U7WUFDaEUsQ0FBQyxDQUFDLElBQUksdUVBQXNCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxhQUFhLENBQUM7WUFDbEYsNkRBQTZEO1lBQzdELENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBQzlCLElBQUksZ0JBQWdCLEVBQUU7WUFDbEIsZ0JBQWdCLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDcks7UUFFRCxrQ0FBa0M7UUFDbEMsTUFBTSxjQUFjLEdBQ2hCLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDO1FBQzNFLElBQUksQ0FBQyxDQUFDLGNBQWM7WUFBRSxjQUFjLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUNoRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FDNUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRTNCLCtCQUErQjtRQUMvQixNQUFNLFFBQVEsR0FDVixDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFlBQVksS0FBSyw0RkFBc0MsQ0FBQyxDQUFDO2dCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQzdELElBQUksQ0FBQyxDQUFDLFFBQVE7WUFBRSxRQUFRLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTNCLDhCQUE4QjtRQUM5QixNQUFNLFdBQVcsR0FDYixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQztRQUN4RSxJQUFJLENBQUMsQ0FBQyxXQUFXO1lBQUUsV0FBVyxDQUFDLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1FBRWxFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3hFO1FBRUQsNERBQTREO1FBQzVELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsNEJBQTRCO1lBQzVCLE1BQU0sYUFBYSxHQUFHLElBQUksK0RBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0QsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILGdDQUFnQztZQUNoQyxNQUFNLG1CQUFtQixHQUFHLElBQUksK0RBQWMsQ0FDMUMsZ0JBQWdCLEVBQ2hCLFNBQVMsQ0FDWixDQUFDO1lBQ0YsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBRUgsa0NBQWtDO1lBQ2xDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSwrREFBYyxDQUM1QyxrQkFBa0IsRUFDbEIsU0FBUyxDQUNaLENBQUM7WUFDRixxQkFBcUIsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQzdELElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLEVBQ3pDLFVBQVUsQ0FDYixDQUFDO1lBQ0YsbUJBQW1CLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMzRCxtQkFBbUIsQ0FBQyxXQUFXLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBQ2Isd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQzVDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUMvQyx1REFBUyxFQUNULENBQUMsV0FBb0IsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQzVCLHVEQUFTLEVBQ1QsaUJBQWlCLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDeEIsb0JBQW9CLEVBQ3BCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUNqRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDeEIsa0JBQWtCLEVBQ2xCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FDeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUN4QixzQkFBc0IsRUFDdEIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FDL0IsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDeEIsbUJBQW1CLEVBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQzNELENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUNyQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FDbkQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQzdCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUNsRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FDNUIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQ2pELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUMzQixDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQzlDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FDeEIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQ3hCLG9CQUFvQixFQUNwQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLDZCQUE2QixFQUFFLEVBQUUsRUFBRSxFQUFFLENBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLDZCQUE2QixDQUFDLENBQ3BFLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUNsRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FDNUIsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxDQUMvQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQ3pCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUN4QixpQkFBaUIsRUFDakIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FDN0QsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQ3RCLENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUN4QixvQkFBb0IsRUFDcEIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FDOUQsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQ3hCLGlCQUFpQixFQUNqQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUscUJBQXFCLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQ3BELENBQUM7UUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUN4QixlQUFlLEVBQ2YsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLGVBQWUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUM1QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDeEIsbUJBQW1CLEVBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxjQUFjLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FDN0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUNoRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDeEIscUJBQXFCLEVBQ3JCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUMxRCxJQUFJLENBQUMseUJBQXlCLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FDbEYsQ0FBQztRQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQ3hCLGlCQUFpQixFQUNqQixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FDcEQsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FDakMsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3pEO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsaUJBQWlCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUM7U0FDNUM7UUFDRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQXFCLENBQUMsVUFBa0I7UUFDcEMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQXVCLENBQUMsVUFBa0I7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBcUI7UUFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNkLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNkLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDWCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsZUFBZSxDQUFDLElBQVk7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILGdCQUFnQixDQUFDLElBQVk7UUFDekIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZUFBZTtRQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsY0FBYyxDQUFDLFNBQWlCLEVBQUUsVUFBc0I7UUFDcEQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQ0FBZ0M7UUFDNUIsaUVBQWlFO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsNkZBQWlCLENBQUMsRUFBRTtZQUN0RCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILG1CQUFtQjtRQUNmLElBQUksQ0FBQyxlQUFlLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7T0FFRztJQUNILGVBQWU7UUFDWCx5QkFBeUI7UUFDekIsTUFBTSxXQUFXLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEUsV0FBVyxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztRQUMxQyxXQUFXLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUVyQyx3QkFBd0I7UUFDeEIsTUFBTSxVQUFVLEdBQW1CLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakUsVUFBVSxDQUFDLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUNsQyxVQUFVLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLFVBQVUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTFDLG9DQUFvQztRQUNwQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUMsV0FBbUIsRUFBRSw2QkFBc0M7UUFDcEUsSUFBSSw2QkFBNkIsSUFBSSxLQUFLLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixXQUFXLEVBQUUsQ0FBQyxDQUFDO1NBQ3pEO2FBQU07WUFDSCxJQUFJLENBQUMscUJBQXFCLENBQ3RCLGlCQUFpQixXQUFXLHNEQUFzRCxDQUNyRixDQUFDO1NBQ0w7UUFDRCxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUN6RCxhQUFhO1FBQ2pCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsNENBQTRDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxxQkFBOEI7UUFDNUMsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7WUFDaEMsc0ZBQVUsQ0FBQyxnR0FBb0IsRUFBRSxFQUFFLHNCQUFzQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBZTtRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELG9CQUFvQixDQUFDLGdCQUF5QjtRQUMxQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsK0ZBQW1CLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7UUFFRCwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRTtZQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDckMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNILG1CQUFtQixDQUFDLEVBQVU7UUFDMUIsaURBQWlEO1FBQ2pELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzdDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLFFBQXlCO1FBQ3ZDLElBQUksUUFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQ2pDLE1BQU0sa0JBQWtCLEdBQ3BCLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQztZQUN2RCxJQUFJLGtCQUFrQixFQUFFO2dCQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO29CQUMvQyxzREFBc0QsQ0FBQztnQkFDM0QsdUZBQVcsQ0FDUCxnR0FBb0IsRUFBRSxFQUN0Qiw2R0FBNkcsQ0FDaEgsQ0FBQzthQUNMO1NBQ0o7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLGVBQWdDO1FBQzVDLGlEQUFpRDtRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsY0FBa0M7UUFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHlCQUF5QixDQUFDLG9CQUF5QyxFQUFFLHNCQUFxQztRQUN0RyxJQUFJLHNCQUFzQixLQUFLLElBQUksRUFBRTtZQUNqQyxJQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMscUJBQXFCLENBQ3RCLDRFQUE0RSxDQUMvRSxDQUFDO2FBQ0w7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLGVBQWUsQ0FDaEIsMkZBQTJGLENBQzlGLENBQUM7YUFDTDtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQVksQ0FBQyxXQUFvQjtRQUM3QixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvcUJELGtEQUFrRDtBQW1CTTtBQUNSO0FBQ0k7QUFDSjtBQUNJO0FBRTdDLE1BQU0sU0FBUyxHQUFHLFdBQW9CLENBQUM7QUFJdkMsTUFBTSxRQUFRO0lBMkJqQiwwQ0FBMEM7SUFFMUMsWUFBWSxNQUFjO1FBNUJsQixnQkFBVyxHQUFHLElBQUksR0FBRyxFQUcxQixDQUFDO1FBRUoscUdBQXFHO1FBQzdGLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFHdEIsQ0FBQztRQUVKLDRGQUE0RjtRQUNwRix3QkFBbUIsR0FBRyxJQUFJLEdBQUcsRUFHbEMsQ0FBQztRQUVKLHlEQUF5RDtRQUNqRCxxQkFBZ0IsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUV2RSx5REFBeUQ7UUFDakQsdUJBQWtCLEdBQUcsSUFBSSxHQUFHLEVBR2pDLENBQUM7UUFLQSxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBc0IsQ0FBQyxZQUFxQjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FDaEIsU0FBUyxFQUNULElBQUksdUZBQVcsQ0FDWCxTQUFTLEVBQ1QseUJBQXlCLEVBQ3pCLDJDQUEyQyxFQUMzQyxLQUFLLENBQUMsaUhBQWlILEVBQ3ZILFlBQVksRUFDWixDQUFDLFdBQW9CLEVBQUUsT0FBb0IsRUFBRSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLE9BQU8sQ0FBQztRQUMzRSxDQUFDLENBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNILDRCQUE0QixDQUFDLE1BQWM7UUFDdkMsS0FBSyxNQUFNLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLHlEQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUM1RDtRQUNELEtBQUssTUFBTSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ1osT0FBTyxDQUFDLEVBQUUsRUFDVixJQUFJLHlEQUFhLENBQW1CLE9BQU8sQ0FBQyxDQUMvQyxDQUFDO1NBQ0w7UUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSx5REFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDckU7UUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxFQUFFO1lBQy9DLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQ3hCLE9BQU8sQ0FBQyxFQUFFLEVBQ1YsSUFBSSw2REFBZSxDQUFDLE9BQU8sQ0FBQyxDQUMvQixDQUFDO1NBQ0w7UUFDRCxLQUFLLE1BQU0sT0FBTyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQ3ZCLE9BQU8sQ0FBQyxFQUFFLEVBQ1YsSUFBSSw2REFBZSxDQUFDLE9BQU8sQ0FBQyxDQUMvQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx1QkFBdUIsQ0FBQyxZQUF5QixFQUFFLGNBQXNCO1FBQ3JFLHVCQUF1QjtRQUN2QixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RELFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFL0MsdUJBQXVCO1FBQ3ZCLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNoRCxnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBRTlDLHFEQUFxRDtRQUNyRCxXQUFXLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDMUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUJBQXVCLENBQUMsWUFBeUI7UUFDN0MsaURBQWlEO1FBQ2pELE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUNsRCxZQUFZLEVBQ1osaUJBQWlCLENBQ3BCLENBQUM7UUFFRiwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyw4R0FBa0MsQ0FBQyxDQUNoRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixDQUNqQixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyx1R0FBMkIsQ0FBQyxDQUMzRCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkZBQWlCLENBQUMsQ0FDdEMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQ2YsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtGQUFtQixDQUFDLENBQ3hDLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxDQUNmLGlCQUFpQixFQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrR0FBc0IsQ0FBQyxDQUMzQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0ZBQVksQ0FBQyxDQUNqQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUdBQXFCLENBQUMsQ0FDMUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQ2YsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDJGQUFlLENBQUMsQ0FDcEMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQ2YsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHFHQUF5QixDQUFDLENBQzlDLENBQUM7UUFDRixJQUFJLENBQUMsY0FBYyxDQUNmLGlCQUFpQixFQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnR0FBb0IsQ0FBQyxDQUN6QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkZBQWUsQ0FBQyxDQUNwQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGNBQWMsQ0FDZixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUdBQXlCLENBQUMsQ0FDOUMsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQ2YsaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhGQUFrQixDQUFDLENBQ3ZDLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQ2xCLGlCQUFpQixFQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLDRHQUFnQyxDQUFDLENBQ2pFLENBQUM7UUFDRixJQUFJLENBQUMsaUJBQWlCLENBQ2xCLGlCQUFpQixFQUNqQixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGtIQUFzQyxDQUFDLENBQ3ZFLENBQUM7UUFFRiwyREFBMkQ7UUFDM0QsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQ3BELFlBQVksRUFDWixJQUFJLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxjQUFjLENBQ2YsbUJBQW1CLEVBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHlHQUE2QixDQUFDLENBQ2xELENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUNmLG1CQUFtQixFQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtR0FBdUIsQ0FBQyxDQUM1QyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRXRFLDJEQUEyRDtRQUMzRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FDckQsWUFBWSxFQUNaLE9BQU8sQ0FDVixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FDZixvQkFBb0IsRUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0ZBQW1CLENBQUMsQ0FDeEMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQ2Ysb0JBQW9CLEVBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRGQUFnQixDQUFDLENBQ3JDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUNmLG9CQUFvQixFQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0RkFBZ0IsQ0FBQyxDQUNyQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsQ0FDZixvQkFBb0IsRUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEZBQWtCLENBQUMsQ0FDdkMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQ2Ysb0JBQW9CLEVBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1HQUF1QixDQUFDLENBQzVDLENBQUM7UUFFRiwyREFBMkQ7UUFDM0QsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQ3ZELFlBQVksRUFDWixTQUFTLENBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FDbEIsc0JBQXNCLEVBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsbUdBQXVCLENBQUMsQ0FDeEQsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FDbEIsc0JBQXNCLEVBQ3RCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsbUdBQXVCLENBQUMsQ0FDeEQsQ0FBQztRQUVGLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FDcEQsMkdBQStCLENBQ2xDLENBQUM7UUFDRixJQUFJLENBQUMsZ0JBQWdCLENBQ2pCLHNCQUFzQixFQUN0QixJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLDJHQUErQixDQUFDLENBQy9ELENBQUM7UUFDRixJQUNJLG9CQUFvQjtZQUNwQixDQUFDLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztpQkFDckMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2lCQUNuQixRQUFRLENBQUMsMEJBQTBCLENBQUMsRUFDM0M7WUFDRSxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNsQztRQUVELDBEQUEwRDtRQUMxRCxNQUFNLHFCQUFxQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FDdEQsWUFBWSxFQUNaLFFBQVEsQ0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixDQUNsQixxQkFBcUIsRUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyx1R0FBMkIsQ0FBQyxDQUM1RCxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUNsQixxQkFBcUIsRUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyw4R0FBa0MsQ0FBQyxDQUNuRSxDQUFDO1FBQ0YsSUFBSSxDQUFDLGlCQUFpQixDQUNsQixxQkFBcUIsRUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyw4R0FBa0MsQ0FBQyxDQUNuRSxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQ1YsZUFBNEIsRUFDNUIsV0FBMkI7UUFFM0IsSUFBSSxXQUFXLEVBQUU7WUFDYixlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxjQUFjLENBQ1YsZUFBNEIsRUFDNUIsV0FBNkM7UUFFN0MsSUFBSSxXQUFXLEVBQUU7WUFDYixlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUN6RDtJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsaUJBQWlCLENBQ2IsZUFBNEIsRUFDNUIsT0FBeUI7UUFFekIsSUFBSSxPQUFPLEVBQUU7WUFDVCxlQUFlLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxnQkFBZ0IsQ0FDWixlQUE0QixFQUM1QixPQUF5QjtRQUV6QixJQUFJLE9BQU8sRUFBRTtZQUNULGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUQ7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUF3QjtRQUNsRSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsTUFBTSxHQUFHLEdBQUcsRUFBYyxDQUFDO1lBQzNCLE1BQU0sT0FBTyxHQUFHLE1BQXFCLENBQUM7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ2pDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztpQkFDakM7YUFDSjtTQUNKO2FBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzFCLE1BQU0sR0FBRyxHQUFHLEVBQTBCLENBQUM7WUFDdkMsTUFBTSxPQUFPLEdBQUcsTUFBdUIsQ0FBQztZQUN4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELElBQUksT0FBTyxFQUFFO2dCQUNULElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxFQUFFO29CQUNuQyxPQUFPLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7aUJBQ25DO2dCQUNELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUNqQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7aUJBQ2pDO2FBQ0o7U0FDSjthQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN4QixNQUFNLEdBQUcsR0FBRyxFQUF1QixDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFHLE1BQXFCLENBQUM7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQyxJQUFJLE9BQU8sRUFBRTtnQkFDVCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTtvQkFDL0IsT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUMvQjtnQkFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDakMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUNqQzthQUNKO1NBQ0o7YUFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDMUIsTUFBTSxHQUFHLEdBQUcsRUFBeUIsQ0FBQztZQUN0QyxNQUFNLE9BQU8sR0FBRyxNQUF1QixDQUFDO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakQsSUFBSSxPQUFPLEVBQUU7Z0JBQ1QsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDdEMsSUFDSSxTQUFTLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxNQUFNO29CQUN6QyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDNUQ7b0JBQ0UsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO2lCQUNyQztnQkFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBRTtvQkFDdkMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUN2QztnQkFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDakMsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUNqQzthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILHFDQUFxQyxDQUNqQyxFQUFjLEVBQ2QsZ0JBQWlEO1FBRWpELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0IsQ0FBQyxFQUFjLEVBQUUsS0FBYTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDM0IsMEZBQWMsQ0FDVixnR0FBb0IsRUFBRSxFQUN0QixvQ0FBb0MsRUFBRSwrQ0FBK0MsQ0FDeEYsQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILG1CQUFtQixDQUFDLEVBQWM7UUFDOUIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFlLENBQUM7SUFDcEQsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNuZEQsa0RBQWtEO0FBSWxEOztHQUVHO0FBQ0ksTUFBTSxhQUFhO0lBSXRCLFlBQVksT0FBb0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0JELGtEQUFrRDtBQU1GO0FBRXpDLE1BQU0sYUFFWCxTQUFRLHlEQUFhO0lBU25CLFlBQVksT0FBK0I7UUFDdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFrQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxtREFBbUQ7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFckQsOENBQThDO1lBQzlDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFNUMsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4QyxZQUFZLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWpDLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQzFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO29CQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUNsQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsSUFBSSxDQUFDLE9BQWdCO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNwQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFXLEtBQUssQ0FBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JIRCxrREFBa0Q7QUFNc0I7QUFDeEI7QUFFaEQ7O0dBRUc7QUFDSSxNQUFNLGVBRVgsU0FBUSx5REFBYTtJQU1uQixZQUFZLE9BQWlDO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFvQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsT0FBTztRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7WUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFOUMsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJELDhDQUE4QztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUMsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUEwQixDQUFDO2dCQUVuRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFckQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUMzQiwwRkFBYyxDQUNWLGdHQUFvQixFQUFFLEVBQ3RCLGdFQUFnRSxTQUFTLENBQUMsS0FBSyx3QkFBd0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FDNUgsQ0FBQztvQkFDRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFO3dCQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztxQkFDMUM7aUJBQ0o7cUJBQU07b0JBQ0gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQzt3QkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztxQkFDbEM7aUJBQ0o7WUFDTCxDQUFDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU0sQ0FBQyxTQUFpQjtRQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU07UUFDYixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsS0FBSyxDQUFDLE9BQWU7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJRCxrREFBa0Q7QUFNRjtBQUV6QyxNQUFNLGVBRVgsU0FBUSx5REFBYTtJQU9uQixZQUFZLE9BQWlDO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQW9DLENBQUM7SUFDckQsQ0FBQztJQUVELElBQVcsUUFBUTtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQVcsZ0JBQWdCO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN0RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQVcsS0FBSyxDQUFDLE9BQWU7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFOUMsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJELDhDQUE4QztZQUM5QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTVDLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUMvQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV4QyxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO2dCQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDbEM7WUFDTCxDQUFDLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsTUFBcUI7UUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNsQixHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxJQUFXLFFBQVEsQ0FBQyxLQUFhO1FBQzdCLHNGQUFzRjtRQUN0RiwwR0FBMEc7UUFDMUcsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ3BDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUNuRCxDQUFDO1FBQ0YsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN6QztJQUNMLENBQUM7SUFFRCxJQUFXLFFBQVE7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQy9CLENBQUM7SUFFTSxPQUFPO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ25DLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ3pJRCxrREFBa0Q7QUFNRjtBQUV6QyxNQUFNLGFBRVgsU0FBUSx5REFBYTtJQU9uQixZQUFZLE9BQStCO1FBQ3ZDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE9BQU87UUFDZCxPQUFPLElBQUksQ0FBQyxRQUFrQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDdEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRCxJQUFXLE9BQU87UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztTQUNsQztRQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsMkNBQTJDO1lBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFM0MsbURBQW1EO1lBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXJELDhDQUE4QztZQUM5QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRTVDLDZCQUE2QjtZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUM5QyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV2QyxnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztpQkFDbEM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFXLElBQUksQ0FBQyxPQUFlO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLElBQUk7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFXLEtBQUssQ0FBQyxPQUFlO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNaLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5R0Qsa0RBQWtEO0FBRUY7QUFFaEQ7O0dBRUc7QUFDSSxNQUFNLFVBQVcsU0FBUSx5REFBYTtJQUN6Qzs7T0FFRztJQUNJLE1BQU0sQ0FBQyxpQkFBaUI7UUFDM0IsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRCxjQUFjLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUNqQyxjQUFjLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBQzVDLE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxvQkFBb0I7UUFDOUIsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFELG1CQUFtQixDQUFDLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxtQkFBbUIsQ0FBQyxTQUFTO1lBQ3pCLGtJQUFrSSxDQUFDO1FBQ3ZJLE9BQU8sbUJBQW1CLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQW1CLE9BQW9CO1FBQ25DLEtBQUssQ0FDRCxPQUFPLEVBQ1AsVUFBVSxDQUFDLGlCQUFpQixFQUFFLEVBQzlCLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxDQUNwQyxDQUFDO1FBRUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzVDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7O09BR0c7SUFDSSxlQUFlLENBQUMsU0FBaUI7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsa0ZBQWtGLFNBQVMsbURBQW1ELENBQUM7SUFDaEwsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwREQsa0RBQWtEO0FBRXNCO0FBRTVCO0FBRTVDOztHQUVHO0FBQ0ksTUFBTSxhQUFjLFNBQVEscURBQVc7SUFHMUM7Ozs7O09BS0c7SUFDSCxZQUNJLE9BQW9CLEVBQ3BCLFdBQXdCLEVBQ3hCLGNBQTJCO1FBRTNCLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxHQUFHLEVBQUU7WUFDekIsZ0JBQWdCLENBQUMsdUZBQVcsQ0FDeEIsZ0dBQW9CLEVBQUUsRUFDdEIsOERBQThELENBQ2pFLENBQUM7UUFDTixDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLElBQVk7UUFDdEIsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3JDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxRQUErQjtRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3hERCxrREFBa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLFdBQVc7SUFLcEI7Ozs7T0FJRztJQUNILFlBQ0ksT0FBb0IsRUFDcEIsV0FBd0IsRUFDeEIsV0FBd0I7UUFFeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1AsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbEQsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDekNELGtEQUFrRDtBQUVGO0FBRWhEOztHQUVHO0FBQ0ksTUFBTSxjQUFlLFNBQVEseURBQWE7SUFDN0M7O09BRUc7SUFDSSxNQUFNLENBQUMsaUJBQWlCO1FBQzNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEQsV0FBVyxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUNsQyxXQUFXLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLE9BQU8sV0FBVyxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxvQkFBb0I7UUFDOUIsTUFBTSxrQkFBa0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELGtCQUFrQixDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUM7UUFDeEMsa0JBQWtCLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBQ2hELE9BQU8sa0JBQWtCLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQW1CLFVBQXVCO1FBQ3RDLEtBQUssQ0FDRCxVQUFVLEVBQ1YsY0FBYyxDQUFDLGlCQUFpQixFQUFFLEVBQ2xDLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxDQUN4QyxDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0Qsa0RBQWtEO0FBRUY7QUFFaEQ7O0dBRUc7QUFDSSxNQUFNLGlCQUFrQixTQUFRLHlEQUFhO0lBQ2hEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLGlCQUFpQjtRQUMzQixNQUFNLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQscUJBQXFCLENBQUMsRUFBRSxHQUFHLG1CQUFtQixDQUFDO1FBQy9DLHFCQUFxQixDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUNuRCxPQUFPLHFCQUFxQixDQUFDO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxvQkFBb0I7UUFDOUIsaUNBQWlDO1FBQ2pDLE1BQU0sOEJBQThCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSw4QkFBOEIsQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLENBQUM7UUFDdkQsOEJBQThCLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO1FBRTlELE9BQU8sOEJBQThCLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQW1CLFVBQXVCO1FBQ3RDLEtBQUssQ0FDRCxVQUFVLEVBQ1YsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsRUFDckMsaUJBQWlCLENBQUMsb0JBQW9CLEVBQUUsQ0FDM0MsQ0FBQztRQUVGLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDOUNELGtEQUFrRDtBQUVOO0FBRTVDOztHQUVHO0FBQ0ksTUFBTSxZQUFhLFNBQVEscURBQVc7SUFDekM7O09BRUc7SUFDSSxNQUFNLENBQUMsaUJBQWlCO1FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztRQUNoRCxPQUFPLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxvQkFBb0I7UUFDOUIsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVELHFCQUFxQixDQUFDLEVBQUUsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxPQUFPLHFCQUFxQixDQUFDO0lBQ2pDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFtQixVQUF1QjtRQUN0QyxLQUFLLENBQ0QsVUFBVSxFQUNWLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUNoQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FDdEMsQ0FBQztJQUNOLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDRCxrREFBa0Q7QUFFTjtBQUU1Qzs7R0FFRztBQUNJLE1BQU0sV0FBWSxTQUFRLHFEQUFXO0lBQ3hDOztPQUVHO0lBQ0ksTUFBTSxDQUFDLGlCQUFpQjtRQUMzQixNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELGVBQWUsQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBQ25DLGVBQWUsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7UUFDL0MsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLG9CQUFvQjtRQUM5QixNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0Qsb0JBQW9CLENBQUMsRUFBRSxHQUFHLHFCQUFxQixDQUFDO1FBQ2hELE9BQU8sb0JBQW9CLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILFlBQW1CLFVBQXVCO1FBQ3RDLEtBQUssQ0FDRCxVQUFVLEVBQ1YsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEVBQy9CLFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxDQUNyQyxDQUFDO0lBQ04sQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENELGtEQUFrRDtBQUVGO0FBRWhEOztHQUVHO0FBQ0ksTUFBTSxXQUFZLFNBQVEseURBQWE7SUFDMUM7O09BRUc7SUFDSSxNQUFNLENBQUMsaUJBQWlCO1FBQzNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsUUFBUSxDQUFDLEVBQUUsR0FBRyxhQUFhLENBQUM7UUFDNUIsUUFBUSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQztRQUN0QyxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsb0JBQW9CO1FBQzlCLDhCQUE4QjtRQUM5QixNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0Qsb0JBQW9CLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUN2QyxvQkFBb0IsQ0FBQyxHQUFHO1lBQ3BCLHc0TUFBdzRNLENBQUM7UUFDNzRNLG9CQUFvQixDQUFDLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQztRQUM3QyxPQUFPLG9CQUFvQixDQUFDO0lBQ2hDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFtQixVQUF1QjtRQUN0QyxLQUFLLENBQ0QsVUFBVSxFQUNWLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxFQUMvQixXQUFXLENBQUMsb0JBQW9CLEVBQUUsQ0FDckMsQ0FBQztRQUVGLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDL0NELGtEQUFrRDtBQUVOO0FBRTVDOztHQUVHO0FBQ0ksTUFBTSxXQUFZLFNBQVEscURBQVc7SUFDeEM7Ozs7O09BS0c7SUFDSCxZQUNJLE9BQW9CLEVBQ3BCLFdBQXdCLEVBQ3hCLFdBQXdCO1FBRXhCLEtBQUssQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsSUFBWTtRQUN0QixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtZQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDckM7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CRCxxREFBcUQ7QUFFbkI7QUFDSztBQUNPO0FBYXZDLE1BQU0sOEJBQThCO0lBMmZ2QyxZQUFZLE9BSVg7UUE5ZkQsNEJBQXVCLEdBQWlCO1lBQ3BDLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFVBQVUsRUFBRSxTQUFTO1NBQ3hCLENBQUM7UUFFRiwyQkFBc0IsR0FBaUI7WUFDbkMsVUFBVSxFQUFFLFdBQVc7WUFDdkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7U0FDeEIsQ0FBQztRQUVGLGtCQUFhLEdBQUc7WUFDWixPQUFPLEVBQUU7Z0JBQ0wsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixVQUFVLEVBQUUsU0FBUztnQkFDckIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixVQUFVLEVBQUUsU0FBUztnQkFDckIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixVQUFVLEVBQUUsU0FBUztnQkFDckIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFdBQVcsRUFBRSxTQUFTO2dCQUN0QixXQUFXLEVBQUUsa0JBQWtCO2FBQ2xDO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFVBQVUsRUFBRSxNQUFNO2FBQ3JCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxVQUFVO2FBQ3ZCO1lBQ0QscUJBQXFCLEVBQUU7Z0JBQ25CLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixlQUFlLEVBQUUsZUFBZTthQUNuQztZQUNELGFBQWEsRUFBRTtnQkFDWCxLQUFLLEVBQUUsTUFBTTtnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsSUFBSTtnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLGFBQWEsRUFBRSxNQUFNO2dCQUNyQixRQUFRLEVBQUUsUUFBUTthQUNyQjtZQUNELHNCQUFzQixFQUFFO2dCQUNwQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFNBQVMsRUFBRSxRQUFRO2dCQUNuQixZQUFZLEVBQUUsTUFBTTtnQkFDcEIsT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLFVBQVUsRUFBRSwwQkFBMEI7Z0JBQ3RDLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFNBQVMsRUFBRSxpQkFBaUI7Z0JBQzVCLElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxJQUFJO2FBQ2Y7WUFDRCw0QkFBNEIsRUFBRTtnQkFDMUIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLGVBQWUsRUFBRSxlQUFlO2FBQ25DO1lBQ0QsMEJBQTBCLEVBQUU7Z0JBQ3hCLEdBQUcsRUFBRSxNQUFNO2dCQUNYLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLElBQUksRUFBRSxHQUFHO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixNQUFNLEVBQUUsSUFBSTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixVQUFVLEVBQUUsd0JBQXdCO2dCQUNwQyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsTUFBTTtnQkFDYixhQUFhLEVBQUUsS0FBSzthQUN2QjtZQUNELDhCQUE4QixFQUFFO2dCQUM1QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsR0FBRyxFQUFFLE1BQU07Z0JBQ1gsU0FBUyxFQUFFLGtCQUFrQjtnQkFDN0IsSUFBSSxFQUFFLEdBQUc7Z0JBQ1QsTUFBTSxFQUFFLElBQUk7Z0JBQ1osT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLE1BQU0sRUFBRSx5QkFBeUI7Z0JBQ2pDLEtBQUssRUFBRSxhQUFhO2dCQUNwQixTQUFTLEVBQUU7b0JBQ1A7d0JBQ0ksS0FBSyxFQUFFLGFBQWE7cUJBQ3ZCO29CQUNEO3dCQUNJLE1BQU0sRUFBRSx5QkFBeUI7cUJBQ3BDO29CQUNEO3dCQUNJLE9BQU8sRUFBRSxVQUFVO3FCQUN0QjtvQkFDRDt3QkFDSSxNQUFNLEVBQUUsSUFBSTtxQkFDZjtvQkFDRDt3QkFDSSxJQUFJLEVBQUUsR0FBRztxQkFDWjtvQkFDRDt3QkFDSSxTQUFTLEVBQUUsa0JBQWtCO3FCQUNoQztvQkFDRDt3QkFDSSxHQUFHLEVBQUUsTUFBTTtxQkFDZDtvQkFDRDt3QkFDSSxPQUFPLEVBQUUsT0FBTztxQkFDbkI7aUJBQ0o7YUFDSjtZQUNELFdBQVcsRUFBRTtnQkFDVCxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsVUFBVSxFQUFFLHdCQUF3QjtnQkFDcEMsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFlBQVksRUFBRSxRQUFRO2dCQUN0QixZQUFZLEVBQUUsS0FBSztnQkFDbkIsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELDJCQUEyQixFQUFFO2dCQUN6QixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsVUFBVSxFQUFFLDBCQUEwQjthQUN6QztZQUNELGlCQUFpQixFQUFFO2dCQUNmLE9BQU8sRUFBRSxtQkFBbUI7YUFDL0I7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCx5QkFBeUIsRUFBRTtnQkFDdkIsTUFBTSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLE1BQU0sRUFBRSx5QkFBeUI7Z0JBQ2pDLEtBQUssRUFBRSxlQUFlO2dCQUN0QixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFNBQVMsRUFBRSxRQUFRO2FBQ3RCO1lBQ0QsMEJBQTBCLEVBQUU7Z0JBQ3hCLGVBQWUsRUFBRSxlQUFlO2dCQUNoQyxNQUFNLEVBQUUseUJBQXlCO2dCQUNqQyxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsV0FBVyxFQUFFLFNBQVM7Z0JBQ3RCLFVBQVUsRUFBRSxTQUFTO2FBQ3hCO1lBQ0QsMkJBQTJCLEVBQUU7Z0JBQ3pCLE1BQU0sRUFBRSx5QkFBeUI7Z0JBQ2pDLGVBQWUsRUFBRSxlQUFlO2dCQUNoQyxXQUFXLEVBQUUsU0FBUztnQkFDdEIsVUFBVSxFQUFFLFNBQVM7YUFDeEI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsZUFBZSxFQUFFLGFBQWE7Z0JBQzlCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixVQUFVLEVBQUUsY0FBYztnQkFDMUIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLE1BQU0sRUFBRSx5QkFBeUI7Z0JBQ2pDLFlBQVksRUFBRSxNQUFNO2dCQUNwQixRQUFRLEVBQUUsU0FBUztnQkFDbkIsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLFlBQVksRUFBRSxRQUFRO2dCQUN0QixNQUFNLEVBQUUsU0FBUztnQkFDakIsU0FBUyxFQUFFLFFBQVE7YUFDdEI7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixlQUFlLEVBQUUsZUFBZTtnQkFDaEMsVUFBVSxFQUFFLFdBQVc7YUFDMUI7WUFDRCxvQkFBb0IsRUFBRTtnQkFDbEIsVUFBVSxFQUFFLGVBQWU7Z0JBQzNCLFdBQVcsRUFBRSxlQUFlO2dCQUM1QixLQUFLLEVBQUUsZUFBZTtnQkFDdEIsTUFBTSxFQUFFLFNBQVM7YUFDcEI7WUFDRCxrQkFBa0IsRUFBRTtnQkFDaEIsZUFBZSxFQUFFLGFBQWE7YUFDakM7WUFDRCxpQkFBaUIsRUFBRTtnQkFDZixPQUFPLEVBQUUsTUFBTTthQUNsQjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLEtBQUssRUFBRSxNQUFNO2dCQUNiLE1BQU0sRUFBRSxNQUFNO2FBQ2pCO1lBQ0QsYUFBYSxFQUFFO2dCQUNYLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixHQUFHLEVBQUUsR0FBRztnQkFDUixNQUFNLEVBQUUsR0FBRztnQkFDWCxLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsTUFBTTtnQkFDZCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFNBQVMsRUFBRSxrQkFBa0I7Z0JBQzdCLFVBQVUsRUFBRSxjQUFjO2dCQUMxQixhQUFhLEVBQUUsS0FBSztnQkFDcEIsY0FBYyxFQUFFLFlBQVk7Z0JBQzVCLG9CQUFvQixFQUFFLFlBQVk7Z0JBQ2xDLFNBQVMsRUFBRSxNQUFNO2dCQUNqQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsZUFBZSxFQUFFLGVBQWU7YUFDbkM7WUFDRCxxQkFBcUIsRUFBRTtnQkFDbkIsU0FBUyxFQUFFLGdCQUFnQjthQUM5QjtZQUNELFFBQVEsRUFBRTtnQkFDTixTQUFTLEVBQUUsTUFBTTtnQkFDakIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxpQ0FBaUMsRUFBRTtnQkFDL0IsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLGdCQUFnQixFQUFFLFFBQVE7Z0JBQzFCLGNBQWMsRUFBRSxRQUFRO2dCQUN4QixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixlQUFlLEVBQUUsS0FBSztnQkFDdEIsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsNkJBQTZCLEVBQUU7Z0JBQzNCLE1BQU0sRUFBRSxRQUFRO2dCQUNoQixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLFlBQVksRUFBRSxRQUFRO2dCQUN0QixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsT0FBTzthQUNqQjtZQUNELHlDQUF5QyxFQUFFO2dCQUN2QyxXQUFXLEVBQUUsUUFBUTtnQkFDckIsT0FBTyxFQUFFLGNBQWM7Z0JBQ3ZCLE9BQU8sRUFBRSxVQUFVO2FBQ3RCO1lBQ0QseUNBQXlDLEVBQUU7Z0JBQ3ZDLEtBQUssRUFBRSxlQUFlO2dCQUN0QixVQUFVLEVBQUUsV0FBVzthQUMxQjtZQUNELGlDQUFpQyxFQUFFO2dCQUMvQixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsV0FBVyxFQUFFLE1BQU07YUFDdEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGNBQWMsRUFBRSxlQUFlO2dCQUMvQixPQUFPLEVBQUUsMkJBQTJCO2FBQ3ZDO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixVQUFVLEVBQUUsUUFBUTthQUN2QjtZQUNELGtCQUFrQixFQUFFO2dCQUNoQixLQUFLLEVBQUUsTUFBTTtnQkFDYixZQUFZLEVBQUUsVUFBVTtnQkFDeEIsVUFBVSxFQUFFLFFBQVE7YUFDdkI7WUFDRCw2RkFBNkYsRUFDekY7Z0JBQ0ksTUFBTSxFQUFFLElBQUk7Z0JBQ1osUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixRQUFRLEVBQUUsT0FBTztnQkFDakIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixjQUFjLEVBQUUsUUFBUTtnQkFDeEIsYUFBYSxFQUFFLFdBQVc7YUFDN0I7WUFDTCxpQkFBaUIsRUFBRTtnQkFDZixVQUFVLEVBQUUsUUFBUTtnQkFDcEIsY0FBYyxFQUFFLFFBQVE7Z0JBQ3hCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLE1BQU0sRUFBRSxTQUFTO2FBQ3BCO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsY0FBYyxFQUFFO2dCQUNaLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0QsNkJBQTZCLEVBQUU7Z0JBQzNCLE9BQU8sRUFBRSxjQUFjO2dCQUN2QixNQUFNLEVBQUUsTUFBTTtnQkFDZCxNQUFNLEVBQUUsSUFBSTthQUNmO1lBQ0QsZ0JBQWdCLEVBQUU7Z0JBQ2QsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2FBQ2Y7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDZCxRQUFRLEVBQUUsT0FBTzthQUNwQjtZQUNELDhCQUE4QixFQUFFO2dCQUM1QixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELHNCQUFzQixFQUFFO2dCQUNwQixNQUFNLEVBQUUsU0FBUzthQUNwQjtZQUNELGNBQWMsRUFBRTtnQkFDWixRQUFRLEVBQUUsVUFBVTtnQkFDcEIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEtBQUs7Z0JBQ1osT0FBTyxFQUFFLEdBQUc7YUFDZjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNELGNBQWMsRUFBRTtnQkFDWixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsT0FBTyxFQUFFLGNBQWM7YUFDMUI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsYUFBYSxFQUFFLFFBQVE7Z0JBQ3ZCLE9BQU8sRUFBRSxjQUFjO2FBQzFCO1lBQ0Qsa0JBQWtCLEVBQUU7Z0JBQ2hCLE9BQU8sRUFBRSxNQUFNO2FBQ2xCO1lBQ0Qsc0ZBQXNGLEVBQ2xGO2dCQUNJLGVBQWUsRUFBRSxZQUFZO2dCQUM3QixTQUFTLEVBQUUsWUFBWTthQUMxQjtZQUNMLHNNQUFzTSxFQUNsTTtnQkFDSSxVQUFVLEVBQUUsTUFBTTthQUNyQjtZQUNMLG1LQUFtSyxFQUMvSjtnQkFDSSxVQUFVLEVBQUUsTUFBTTthQUNyQjtZQUNMLGFBQWEsRUFBRSxFQUFFO1lBQ2pCLGtCQUFrQixFQUFFO2dCQUNoQixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsT0FBTztnQkFDaEIsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsUUFBUSxFQUFFLFVBQVU7Z0JBQ3BCLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixVQUFVLEVBQUUsTUFBTTthQUNyQjtZQUNELGlEQUFpRCxFQUFFO2dCQUMvQyxRQUFRLEVBQUUsVUFBVTtnQkFDcEIsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLEtBQUssRUFBRSxLQUFLO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2FBQ2pCO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxHQUFHO2FBQ1o7WUFDRCx5QkFBeUIsRUFBRTtnQkFDdkIsT0FBTyxFQUFFLE1BQU07YUFDbEI7WUFDRCx1QkFBdUIsRUFBRTtnQkFDckIsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsZ0JBQWdCLEVBQUUsY0FBYztnQkFDaEMsVUFBVSxFQUFFLGNBQWM7Z0JBQzFCLFVBQVUsRUFBRSxlQUFlO2dCQUMzQixNQUFNLEVBQUUseUJBQXlCO2dCQUNqQyxZQUFZLEVBQUUsS0FBSzthQUN0QjtZQUNELDZCQUE2QixFQUFFO2dCQUMzQixnQkFBZ0IsRUFBRSxjQUFjO2dCQUNoQyxVQUFVLEVBQUUsY0FBYztnQkFDMUIsVUFBVSxFQUFFLGVBQWU7Z0JBQzNCLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFlBQVksRUFBRSxLQUFLO2FBQ3RCO1lBQ0QsK0JBQStCLEVBQUU7Z0JBQzdCLE1BQU0sRUFBRSx5QkFBeUI7YUFDcEM7WUFDRCxxQ0FBcUMsRUFBRTtnQkFDbkMsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsVUFBVSxFQUFFLGVBQWU7YUFDOUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLGtCQUFrQjtnQkFDM0IsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFdBQVcsRUFBRSxNQUFNO2dCQUNuQixLQUFLLEVBQUUsS0FBSzthQUNmO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLGVBQWUsRUFBRSxlQUFlO2dCQUNoQyxNQUFNLEVBQUUseUJBQXlCO2dCQUNqQyxZQUFZLEVBQUUsS0FBSztnQkFDbkIsS0FBSyxFQUFFLGVBQWU7Z0JBQ3RCLFNBQVMsRUFBRSxPQUFPO2dCQUNsQixVQUFVLEVBQUUsU0FBUzthQUN4QjtZQUNELHFCQUFxQixFQUFFO2dCQUNuQixXQUFXLEVBQUUsZUFBZTthQUMvQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxVQUFVLEVBQUUsS0FBSztnQkFDakIsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsbUJBQW1CLEVBQUUsU0FBUztnQkFDOUIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsWUFBWSxFQUFFLE1BQU07Z0JBQ3BCLFdBQVcsRUFBRSxNQUFNO2FBQ3RCO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCLGFBQWEsRUFBRSxRQUFRO2dCQUN2QixVQUFVLEVBQUUsUUFBUTthQUN2QjtZQUNELG9CQUFvQixFQUFFO2dCQUNsQixPQUFPLEVBQUUsTUFBTTtnQkFDZixhQUFhLEVBQUUsUUFBUTtnQkFDdkIsWUFBWSxFQUFFLHlCQUF5QjtnQkFDdkMsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLGFBQWEsRUFBRSxNQUFNO2FBQ3hCO1lBQ0Qsa0NBQWtDLEVBQUU7Z0JBQ2hDLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixZQUFZLEVBQUUsS0FBSztnQkFDbkIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLGNBQWMsRUFBRSxlQUFlO2dCQUMvQixPQUFPLEVBQUUsTUFBTTtnQkFDZixhQUFhLEVBQUUsS0FBSztnQkFDcEIsVUFBVSxFQUFFLFVBQVU7YUFDekI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFLElBQUk7YUFDcEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osdUJBQXVCLEVBQUUsS0FBSztnQkFDOUIsc0JBQXNCLEVBQUUsS0FBSztnQkFDN0IsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixHQUFHLEVBQUUsR0FBRztnQkFDUixLQUFLLEVBQUUsSUFBSTtnQkFDWCxNQUFNLEVBQUUsS0FBSztnQkFDYixNQUFNLEVBQUUsMEJBQTBCO2dCQUNsQyxjQUFjLEVBQUUsS0FBSzthQUN4QjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFNBQVMsRUFBRSxRQUFRO2FBQ3RCO1lBQ0Qsb0JBQW9CLEVBQUU7Z0JBQ2xCLE9BQU8sRUFBRSxNQUFNO2dCQUNmLGFBQWEsRUFBRSxLQUFLO2dCQUNwQixjQUFjLEVBQUUsZUFBZTtnQkFDL0IsWUFBWSxFQUFFLDBCQUEwQjtnQkFDeEMsZUFBZSxFQUFFLGVBQWU7YUFDbkM7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osZUFBZSxFQUFFLGVBQWU7Z0JBQ2hDLFVBQVUsRUFBRSxtQkFBbUI7Z0JBQy9CLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixLQUFLLEVBQUUsZUFBZTthQUN6QjtZQUNELCtFQUErRSxFQUMzRTtnQkFDSSxPQUFPLEVBQUUsT0FBTzthQUNuQjtZQUNMLG9CQUFvQixFQUFFO2dCQUNsQixLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNELGdCQUFnQixFQUFFO2dCQUNkLFFBQVEsRUFBRSxNQUFNO2dCQUNoQixZQUFZLEVBQUUsS0FBSzthQUN0QjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBZTthQUN4QjtTQUNKLENBQUM7UUFXRSxNQUFNLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxHQUNyRCxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQUM7UUFDbEIsb0RBQW9EO1FBQ3BELE1BQU0sVUFBVSxHQUFHO1lBQ2YsMERBQTBEO1lBQzFELHFLQUFxSztZQUNySyxPQUFPLEVBQUUsQ0FBQyx3REFBTSxFQUFFLEVBQUUsNERBQVMsRUFBRSxDQUFDO1NBQ25DLENBQUM7UUFFRixnREFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0I7WUFDakIsZ0JBQWdCLGFBQWhCLGdCQUFnQixjQUFoQixnQkFBZ0IsR0FBSSxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLGFBQWYsZUFBZSxjQUFmLGVBQWUsR0FBSSxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDMUUsQ0FBQztJQUVELGVBQWU7UUFDWCwyRkFBMkY7UUFDM0Ysd0VBQXdFO1FBRXhFLHVDQUF1QztRQUN2QywyREFBb0IsQ0FBQztZQUNqQixTQUFTLGtDQUNGLElBQUksQ0FBQyxhQUFhLEdBQ2xCLElBQUksQ0FBQyxZQUFZLENBQ3ZCO1NBQ0osQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBcUI7UUFDOUIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQWdCLENBQUM7UUFDbkUsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvRCxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMvRCxXQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsV0FBVyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQy9ELFdBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWSxDQUFDLFdBQW9CO1FBQzdCLElBQUksV0FBVyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdGtCRCxrREFBa0Q7QUFFQTtBQUNKO0FBQ047QUFDTjtBQUVpRDtBQWVuRiw4RUFBOEU7QUFDOUUsU0FBUyxrQkFBa0IsQ0FBQyxJQUFrQztJQUMxRCxPQUFPLENBQUMsSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxnR0FBMEMsQ0FBQyxDQUFDO0FBQzNHLENBQUM7QUFFRDs7R0FFRztBQUNJLE1BQU0sUUFBUTtJQVFqQjs7T0FFRztJQUNILFlBQVksTUFBaUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGlEQUFTLEVBQUUsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQUM7WUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLHVEQUFZLEVBQUUsQ0FBQztTQUMxQztRQUNELElBQUksQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDJEQUFjLEVBQUUsQ0FBQztTQUM5QztRQUNELElBQUksQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSwyQ0FBTSxFQUFFLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUNsQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNoRTtZQUNELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0Q7WUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUMxQjtnQkFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUU1Qzs7Ozs7c0JBS007YUFDVDtZQUFBLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZELGtEQUFrRDtBQTBCbEQ7OztHQUdHO0FBQ0ksTUFBTSxrQkFBa0I7SUFNM0IsSUFBVyxXQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxXQUFXLENBQUMsT0FBTztRQUMxQixPQUFPLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO0lBQ2hDLENBQUM7SUFFRDtRQWRBLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBZWpCLGdDQUFnQztRQUNoQyxRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLHdCQUF3QixFQUN4QixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDL0IsS0FBSyxDQUNSLENBQUM7UUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLHFCQUFxQixFQUNyQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDL0IsS0FBSyxDQUNSLENBQUM7UUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLGtCQUFrQixFQUNsQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDL0IsS0FBSyxDQUNSLENBQUM7UUFDRixRQUFRLENBQUMsZ0JBQWdCLENBQ3JCLG9CQUFvQixFQUNwQixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFDL0IsS0FBSyxDQUNSLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0I7UUFDWiwrQkFBK0I7UUFDL0IscUJBQXFCO1FBQ3JCLElBQ0ksUUFBUSxDQUFDLGlCQUFpQjtZQUMxQixRQUFRLENBQUMsdUJBQXVCO1lBQ2hDLFFBQVEsQ0FBQyxvQkFBb0I7WUFDN0IsUUFBUSxDQUFDLG1CQUFtQixFQUM5QjtZQUNFLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRTtnQkFDekIsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO2dCQUNyQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUNsQztpQkFBTSxJQUFJLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDdEMsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDbkM7aUJBQU0sSUFBSSxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2xDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQy9CO1NBQ0o7YUFBTTtZQUNILE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUV2QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLE9BQU87YUFDVjtZQUNELElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO2dCQUMzQixPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUMvQjtpQkFBTSxJQUFJLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRTtnQkFDckMsT0FBTyxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDbEM7aUJBQU0sSUFBSSxPQUFPLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQ3JDO2lCQUFNLElBQUksT0FBTyxDQUFDLG1CQUFtQixFQUFFO2dCQUNwQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUNqQztpQkFBTSxJQUFJLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyw2QkFBNkI7YUFDakU7U0FDSjtRQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNkLElBQUksQ0FBQyxZQUFZO1lBQ2IsUUFBUSxDQUFDLGtCQUFrQjtnQkFDM0IsUUFBUSxDQUFDLGFBQWE7Z0JBQ3RCLENBQUMsUUFBUSxDQUFDLG1CQUFtQjtvQkFDekIsUUFBUSxDQUFDLG1CQUFtQixLQUFLLElBQUksQ0FBQztnQkFDMUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLElBQUksUUFBUSxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDO0lBQzVFLENBQUM7Q0FDSjtBQUVEOzs7R0FHRztBQUNJLE1BQU0sc0JBQXVCLFNBQVEsa0JBQWtCO0lBRTFELFlBQVksY0FBNEI7UUFDcEMsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztJQUN0QyxDQUFDO0NBRUo7QUFFRDs7R0FFRztBQUNJLE1BQU0sY0FBZSxTQUFRLGtCQUFrQjtJQUtsRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBRVIsTUFBTSxhQUFhLEdBQXVCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0UsYUFBYSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFDOUIsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsYUFBYSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUNwQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBQzlDO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFlBQVk7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUN6Qyw0QkFBNEIsRUFDNUIsS0FBSyxDQUNSLENBQUM7WUFDRixJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FDN0IsSUFBSSxFQUNKLFNBQVMsRUFDVCxtQkFBbUIsQ0FDdEIsQ0FBQztZQUVGLGlDQUFpQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNyQyw0QkFBNEIsRUFDNUIsR0FBRyxDQUNOLENBQUM7WUFDRixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV6Qyx3REFBd0Q7WUFDeEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbEMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDVCxDQUFDO1lBQ0YsS0FBSyxDQUFDLGNBQWMsQ0FDaEIsSUFBSSxFQUNKLEdBQUcsRUFDSCw2U0FBNlMsQ0FDaFQsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLEtBQUssQ0FBQyxjQUFjLENBQ2hCLElBQUksRUFDSixHQUFHLEVBQ0gsdVJBQXVSLENBQzFSLENBQUM7WUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNsQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFDRixLQUFLLENBQUMsY0FBYyxDQUNoQixJQUFJLEVBQ0osR0FBRyxFQUNILHNSQUFzUixDQUN6UixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbEMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDVCxDQUFDO1lBQ0YsS0FBSyxDQUFDLGNBQWMsQ0FDaEIsSUFBSSxFQUNKLEdBQUcsRUFDSCw4UkFBOFIsQ0FDalMsQ0FBQztZQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELElBQVcsWUFBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ3pDLDRCQUE0QixFQUM1QixLQUFLLENBQ1IsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUM3QixJQUFJLEVBQ0osU0FBUyxFQUNULHFCQUFxQixDQUN4QixDQUFDO1lBRUYsaUNBQWlDO1lBQ2pDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ3JDLDRCQUE0QixFQUM1QixHQUFHLENBQ04sQ0FBQztZQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpDLHdEQUF3RDtZQUN4RCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNsQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFDRixLQUFLLENBQUMsY0FBYyxDQUNoQixJQUFJLEVBQ0osR0FBRyxFQUNILDRSQUE0UixDQUMvUixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbEMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDVCxDQUFDO1lBQ0YsS0FBSyxDQUFDLGNBQWMsQ0FDaEIsSUFBSSxFQUNKLEdBQUcsRUFDSCw2UkFBNlIsQ0FDaFMsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLEtBQUssQ0FBQyxjQUFjLENBQ2hCLElBQUksRUFDSixHQUFHLEVBQ0gscVNBQXFTLENBQ3hTLENBQUM7WUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNsQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFDRixLQUFLLENBQUMsY0FBYyxDQUNoQixJQUFJLEVBQ0osR0FBRyxFQUNILHVSQUF1UixDQUMxUixDQUFDO1lBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBRUQsa0JBQWtCO1FBQ2QsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFM0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNuQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7WUFDbEMsMEJBQTBCO1lBQzFCLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1lBQzdDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztTQUNuQzthQUFNO1lBQ0gsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQztZQUNsQywwQkFBMEI7WUFDMUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0NBRUo7Ozs7Ozs7Ozs7Ozs7OztBQzNVRCxrREFBa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLGNBQWM7SUFNdkIsWUFBWSxLQUFhLEVBQUUsVUFBa0I7UUFDekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksa0JBQWtCLENBQUMsV0FBdUI7UUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxNQUFNO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQiwyQ0FBMkM7WUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxtREFBbUQ7WUFDbkQsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELGdCQUFnQixDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFaEQsOENBQThDO1lBQzlDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckQsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFNUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDekM7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVERCxrREFBa0Q7QUFHc0I7QUFFeEU7O0dBRUc7QUFDSSxNQUFNLFdBQVc7SUFLcEI7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXJELGVBQWU7WUFDZixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzlDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsbUJBQW1CLENBQUM7WUFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUV2QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELFdBQVcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1lBQ3ZDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUU1Qyw0QkFBNEI7WUFDNUIsTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELGlCQUFpQixDQUFDLEVBQUUsR0FBRyxzQkFBc0IsQ0FBQztZQUM5QyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFakQsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLHlCQUF5QjtRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLDBCQUEwQixFQUFFO1lBQ2xDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLEdBQUcscUJBQXFCLENBQUM7WUFDM0QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDaEU7UUFDRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQztJQUMzQyxDQUFDO0lBRUQsSUFBVyxpQkFBaUI7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxHQUFHLHdCQUF3QixDQUFDO1lBQ3RELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksZ0JBQWdCLENBQUMsY0FBa0M7UUFDdEQsc0ZBQVUsQ0FBQyxnR0FBb0IsRUFBRSxFQUFFLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQztRQUMvQixxQkFBcUI7WUFDakIsNkJBQTZCO2dCQUM3QixjQUFjLENBQUMsY0FBYztnQkFDN0IsUUFBUSxDQUFDO1FBQ2IscUJBQXFCO1lBQ2pCLHVCQUF1QixHQUFHLGNBQWMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pFLHFCQUFxQjtZQUNqQix3QkFBd0I7Z0JBQ3hCLGNBQWMsQ0FBQyxlQUFlO2dCQUM5QixRQUFRLENBQUM7UUFDYixxQkFBcUI7WUFDakIsa0NBQWtDO2dCQUNsQyxjQUFjLENBQUMsa0JBQWtCO2dCQUNqQyxRQUFRLENBQUM7UUFDYixxQkFBcUI7WUFDakIsY0FBYyxDQUFDLHVCQUF1QjtnQkFDdEMsY0FBYyxDQUFDLG9CQUFvQjtnQkFDL0IsQ0FBQyxDQUFDLHFDQUFxQztvQkFDckMsY0FBYyxDQUFDLHVCQUF1QjtvQkFDdEMsUUFBUTtnQkFDVixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2IscUJBQXFCO1lBQ2pCLCtDQUErQztnQkFDL0MsY0FBYyxDQUFDLHNCQUFzQjtnQkFDckMsUUFBUSxDQUFDO1FBQ2IscUJBQXFCLElBQUksY0FBYyxDQUFDLGVBQWU7WUFDbkQsQ0FBQyxDQUFDLDJCQUEyQjtnQkFDM0IsY0FBYyxDQUFDLGVBQWU7Z0JBQzlCLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1QsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztJQUNyRSxDQUFDO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3hHRCxrREFBa0Q7QUFFbEQ7O0dBRUc7QUFDSSxNQUFNLFlBQVk7SUFLckI7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxZQUFZO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDekMsNEJBQTRCLEVBQzVCLEtBQUssQ0FDUixDQUFDO1lBQ0YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQzdCLElBQUksRUFDSixTQUFTLEVBQ1QscUJBQXFCLENBQ3hCLENBQUM7WUFFRixpQ0FBaUM7WUFDakMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDckMsNEJBQTRCLEVBQzVCLEdBQUcsQ0FDTixDQUFDO1lBQ0YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFekMsb0VBQW9FO1lBQ3BFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLEtBQUssQ0FBQyxjQUFjLENBQ2hCLElBQUksRUFDSixHQUFHLEVBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FHQW9CcUYsQ0FDeEYsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLEtBQUssQ0FBQyxjQUFjLENBQ2hCLElBQUksRUFDSixHQUFHLEVBQ0gsd09BQXdPLENBQzNPLENBQUM7WUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUN2R0Qsa0RBQWtEO0FBRWxEOztHQUVHO0FBQ0ksTUFBTSxhQUFhO0lBS3RCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxXQUFXO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztZQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFOUMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUV6QyxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELGVBQWUsQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7WUFDdkMsZUFBZSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDekMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUV2QyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDdEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsc0JBQXNCO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDL0IsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQztTQUN2RDtRQUNELE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFXLG1CQUFtQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzVCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDO1NBQ2xEO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUN4RDtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNJLGdCQUFnQjtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxJQUFJO1FBQ1AsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsRUFBRTtZQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDOUVELGtEQUFrRDtBQUVsRDs7R0FFRztBQUNJLE1BQU0sU0FBUztJQUtsQjs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuRDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxXQUFXO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUN0Qyw0QkFBNEIsRUFDNUIsS0FBSyxDQUNSLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBRS9ELGlDQUFpQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNyQyw0QkFBNEIsRUFDNUIsR0FBRyxDQUNOLENBQUM7WUFDRixRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0QyxvRUFBb0U7WUFDcEUsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbEMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDVCxDQUFDO1lBQ0YsS0FBSyxDQUFDLGNBQWMsQ0FDaEIsSUFBSSxFQUNKLEdBQUcsRUFDSCxrUkFBa1IsQ0FDclIsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLEtBQUssQ0FBQyxjQUFjLENBQ2hCLElBQUksRUFDSixHQUFHLEVBQ0gsb0lBQW9JLENBQ3ZJLENBQUM7WUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNsQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFDRixLQUFLLENBQUMsY0FBYyxDQUNoQixJQUFJLEVBQ0osR0FBRyxFQUNILGlQQUFpUCxDQUNwUCxDQUFDO1lBRUYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFGRCxrREFBa0Q7QUFFTjtBQUM0QjtBQUUxQjtBQUU5Qzs7R0FFRztBQUNJLE1BQU0sSUFBSTtDQUtoQjtBQUVEOztHQUVHO0FBQ0ksTUFBTSxVQUFVO0lBWW5CO1FBSEEsMENBQTBDO1FBQzFDLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztRQUcvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUkscURBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUU5QyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXpDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkQsWUFBWSxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUM7WUFDakMsWUFBWSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7WUFDekMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVwQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsbUJBQW1CO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUM7WUFFOUMsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0RCxlQUFlLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDO1lBQ3hDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkQsWUFBWSxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUM7WUFDakMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRCxVQUFVLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztZQUM3QixVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRTlDLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsa0JBQWtCLENBQUM7WUFDekMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRCxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFakQsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxZQUFZLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQztZQUV6QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZELGVBQWUsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxVQUFVLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDekMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzNDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFFakQsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsbUJBQW1CO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsR0FBRyxxQkFBcUIsQ0FBQztZQUNyRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLGtCQUFrQixDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN6QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxHQUFHLFlBQVksQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNJLElBQUk7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxnQkFBZ0I7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0ksSUFBSTtRQUNQLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7WUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDM0Q7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksV0FBVyxDQUFDLEtBQXNCOztRQUNyQyxpREFBaUQ7UUFDakQsTUFBTSxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ2xFLHFCQUFxQixFQUFFLENBQUM7U0FDM0IsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLE1BQU0sV0FBVyxHQUFHLGtFQUFxQixDQUNyQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUNyQyxDQUFDLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRWpFLGVBQWU7UUFDZixNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ3hELEtBQUssQ0FBQyxpQkFBaUIsRUFDdkIsYUFBYSxDQUNoQjtZQUNHLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7WUFDMUQsQ0FBQyxDQUFDLGFBQWEsQ0FBQztRQUNwQixJQUFJLENBQUMsZUFBZSxDQUNoQixpQkFBaUIsRUFDakIsY0FBYyxFQUNkLGVBQWUsQ0FDbEIsQ0FBQztRQUVGLFVBQVU7UUFDVixJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FDaEIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QixLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUM3QyxDQUFDO1NBQ0w7UUFFRCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FDaEIsa0JBQWtCLEVBQ2xCLHNCQUFzQixFQUN0QixLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUM3QyxDQUFDO1NBQ0w7UUFFRCxtQkFBbUI7UUFDbkIsTUFBTSxPQUFPLEdBQ1QsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUNoQyxLQUFLLENBQUMsaUJBQWlCLEVBQ3ZCLFlBQVksQ0FDZjtZQUNELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO1lBQ2xDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDaEMsS0FBSyxDQUFDLGlCQUFpQixFQUN2QixhQUFhLENBQ2hCO1lBQ0QsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFdBQVc7WUFDL0IsQ0FBQyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVO2dCQUNsQyxHQUFHO2dCQUNILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXO1lBQ3JDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFDeEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbEUsaUJBQWlCO1FBQ2pCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDdEQsS0FBSyxDQUFDLGlCQUFpQixFQUN2QixlQUFlLENBQ2xCO1lBQ0csQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztZQUM1RCxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQ2hCLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDaEIsYUFBYSxDQUNoQixDQUFDO1FBRUYsWUFBWTtRQUNaLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRTtZQUN6QyxJQUFJLENBQUMsZUFBZSxDQUNoQixlQUFlLEVBQ2YsV0FBVyxFQUNYLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQ3JELENBQUM7U0FDTDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLENBQUMsZUFBZSxDQUNoQixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLFdBQUssQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLDBDQUFFLFFBQVEsRUFBRSxDQUNwRCxDQUFDO1FBRUYsSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxlQUFlLENBQ2hCLGdCQUFnQixFQUNoQixhQUFhO1lBQ2IsMENBQTBDO1lBQzFDLGlCQUFLLENBQUMsTUFBTTtpQkFDUCxHQUFHLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQywwQ0FDbkMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsbUNBQUksRUFBRSxDQUM1QixDQUFDO1NBQ0w7UUFFRCxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxDQUFDLGVBQWUsQ0FDaEIsZ0JBQWdCLEVBQ2hCLGFBQWE7WUFDYiwwQ0FBMEM7WUFDMUMsaUJBQUssQ0FBQyxNQUFNO2lCQUNQLEdBQUcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLDBDQUNuQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQzVCLENBQUM7U0FDTDtRQUVELE1BQU07UUFDTixNQUFNLE1BQU0sR0FDUixNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQ2hDLEtBQUssQ0FBQyxhQUFhLEVBQ25CLHNCQUFzQixDQUN6QixJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztZQUN6RCxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FDZixLQUFLLENBQUMsYUFBYSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FDbEQ7WUFDSCxDQUFDLENBQUMsaUJBQWlCLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyxlQUFlLENBQ2hCLGNBQWMsRUFDZCxVQUFVLEVBQ1YsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQzdCLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxDQUNoQixtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLEtBQUssQ0FBQyxZQUFZLENBQUMsbUJBQW1CLENBQ3pDLENBQUM7UUFFRixLQUFLO1FBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FDaEIsUUFBUSxFQUNSLDhCQUE4QixFQUM5QixLQUFLLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUNsRCxDQUFDO1FBRUYsUUFBUTtRQUNSLCtHQUErRztRQUUvRyxzRkFBVSxDQUNOLGdHQUFvQixFQUFFLEVBQ3RCLCtCQUErQixLQUFLLDRCQUE0QixFQUNoRSxDQUFDLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZUFBZSxDQUFDLEVBQVUsRUFBRSxTQUFpQixFQUFFLElBQVk7UUFDOUQsTUFBTSxRQUFRLEdBQUcsR0FBRyxTQUFTLEtBQUssSUFBSSxFQUFFLENBQUM7UUFFekMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3hCLGtCQUFrQjtZQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzNCLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoRCxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDckMsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbEM7UUFDRCwyQkFBMkI7YUFDdEI7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQzthQUN0QztTQUNKO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FDOVVELHdGQUF3RjtBQUN4RixJQUFZLHFCQUlYO0FBSkQsV0FBWSxxQkFBcUI7SUFDN0IsaUdBQW9CO0lBQ3BCLHlGQUFnQjtJQUNoQix1RUFBTztBQUNYLENBQUMsRUFKVyxxQkFBcUIsS0FBckIscUJBQXFCLFFBSWhDO0FBeUJNLFNBQVMsY0FBYyxDQUFDLE1BQXVDO0lBQ2xFLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNyRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNoQ0Qsa0RBQWtEO0FBRWxEOzs7OztHQUtHO0FBQ0ksTUFBTSxnQkFBZ0I7SUFBN0I7UUFDSSxzQkFBaUIsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QixvQkFBb0I7UUFDcEIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNmLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxZQUFZO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxFQUFFLENBQUM7SUFtTnhCLENBQUM7SUF6TUc7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsR0FBRyxZQUFZLENBQUM7WUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTFDLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbEQseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVoRCx3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRDtRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLGFBQWE7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsZUFBZSxDQUMxQyw0QkFBNEIsRUFDNUIsS0FBSyxDQUNSLENBQUM7WUFDRixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxFQUNKLElBQUksRUFDSixvQkFBb0IsQ0FDdkIsQ0FBQztZQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxFQUNKLFNBQVMsRUFDVCxtQkFBbUIsQ0FDdEIsQ0FBQztZQUVGLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFDRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxHQUFHO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2hDLDRCQUE0QixFQUM1QixRQUFRLENBQ1gsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ2xDLDRCQUE0QixFQUM1QixNQUFNLENBQ1QsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQ3RCLElBQUksRUFDSixHQUFHLEVBQ0gsc1BBQXNQLENBQ3pQLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFXLE1BQU07UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FDbkMsNEJBQTRCLEVBQzVCLE1BQU0sQ0FDVCxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FDdkIsSUFBSSxFQUNKLEdBQUcsRUFDSCwwTkFBME4sQ0FDN04sQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQVcsS0FBSztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNsQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUN0QixJQUFJLEVBQ0osR0FBRyxFQUNILGdSQUFnUixDQUNuUixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVCQUF1QixDQUFDLEtBQWE7UUFDakMsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNoQixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQzVCLE9BQU8sSUFBSSxHQUFHLENBQUM7WUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNoQyxDQUFDO1lBQ0YsSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO2dCQUNoQixJQUFJLEVBQUUsU0FBUyxJQUFJLENBQUMsRUFBRTtvQkFDbEIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUN6QjtxQkFBTTtvQkFDSCxPQUFPLEdBQUcsQ0FBQyxDQUFDO2lCQUNmO2FBQ0o7UUFDTCxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxlQUFlLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLElBQUksQ0FBQyxLQUFLLCtCQUErQixDQUFDO1lBQ2pGLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRDthQUFNLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDdEIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLElBQUksQ0FBQyxLQUFLLGlDQUFpQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckQ7YUFBTSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLHNCQUFzQixJQUFJLENBQUMsS0FBSyx1QkFBdUIsQ0FBQztTQUM1RTthQUFNO1lBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUN2QyxJQUFJLENBQUMsU0FBUyxHQUFHLHNCQUFzQixJQUFJLENBQUMsS0FBSyxnQ0FBZ0MsQ0FBQztZQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDaEQsQ0FBQztDQUNKOzs7Ozs7Ozs7Ozs7Ozs7QUNwT0Qsa0RBQWtEO0FBRWxEOztHQUVHO0FBQ0ksTUFBTSxNQUFNO0lBS2Y7O09BRUc7SUFDSCxJQUFXLFdBQVc7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQVcsV0FBVztRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNwQixJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN0QztRQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ25DLDRCQUE0QixFQUM1QixLQUFLLENBQ1IsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFFNUQsaUNBQWlDO1lBQ2pDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQ3JDLDRCQUE0QixFQUM1QixHQUFHLENBQ04sQ0FBQztZQUNGLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRW5DLCtEQUErRDtZQUMvRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsZUFBZSxDQUNqQyw0QkFBNEIsRUFDNUIsTUFBTSxDQUNULENBQUM7WUFFRixJQUFJLENBQUMsY0FBYyxDQUNmLElBQUksRUFDSixHQUFHLEVBQ0gsMmpCQUEyakIsQ0FDOWpCLENBQUM7WUFFRixRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7Ozs7O0FDckVELGtEQUFrRDtBQUUzQyxNQUFNLFNBQVM7SUFDbEI7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQzlDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNiLE9BQU8sR0FBRyxDQUFDO1NBQ2Q7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxFQUFFLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUc7WUFDVixPQUFPO1lBQ1AsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztZQUNMLEtBQUs7U0FDUixDQUFDO1FBRUYsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUc7WUFDSCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1gsQ0FBQztJQUNOLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7QUNuQ0Q7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkEsa0RBQWtEO0FBRXlDO0FBRUQ7QUFFeEM7QUFDTTtBQUNKO0FBQ007QUFDTTtBQUNWO0FBQ0Y7QUFDQTtBQUNBO0FBQ1A7QUFDVTtBQUNBO0FBQ0k7QUFDQTtBQUNKO0FBQytDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL0FwcGxpY2F0aW9uL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL0NvbmZpZy9Db25maWdVSS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9Db25maWcvU2V0dGluZ1VJQmFzZS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9Db25maWcvU2V0dGluZ1VJRmxhZy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9Db25maWcvU2V0dGluZ1VJTnVtYmVyLnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlPcHRpb24udHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvQ29uZmlnL1NldHRpbmdVSVRleHQudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9BRktPdmVybGF5LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvQWN0aW9uT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L0Jhc2VPdmVybGF5LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvQ29ubmVjdE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9EaXNjb25uZWN0T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L0Vycm9yT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L0luZm9PdmVybGF5LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvUGxheU92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9UZXh0T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9TdHlsZXMvUGl4ZWxTdHJlYW1pbmdBcHBsaWNhdGlvblN0eWxlcy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9Db250cm9scy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9GdWxsc2NyZWVuSWNvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9MYWJlbGxlZEJ1dHRvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9MYXRlbmN5VGVzdC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9TZXR0aW5nc0ljb24udHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvU2V0dGluZ3NQYW5lbC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9TdGF0c0ljb24udHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvU3RhdHNQYW5lbC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9WaWRlb1FwSW5kaWNhdG9yLnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL1VJL1hSSWNvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VdGlsL01hdGhVdGlscy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS9leHRlcm5hbCB1bWQgXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yXCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzXCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzLXBsdWdpbi1nbG9iYWxcIiIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL3BpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMlwiKSwgcmVxdWlyZShcImpzc1wiKSwgcmVxdWlyZShcImpzcy1wbHVnaW4tZ2xvYmFsXCIpLCByZXF1aXJlKFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjJcIiwgXCJqc3NcIiwgXCJqc3MtcGx1Z2luLWdsb2JhbFwiLCBcImpzcy1wbHVnaW4tY2FtZWwtY2FzZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJsaWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjJcIiksIHJlcXVpcmUoXCJqc3NcIiksIHJlcXVpcmUoXCJqc3MtcGx1Z2luLWdsb2JhbFwiKSwgcmVxdWlyZShcImpzcy1wbHVnaW4tY2FtZWwtY2FzZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWlcIl0gPSBmYWN0b3J5KHJvb3RbXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yXCJdLCByb290W1wianNzXCJdLCByb290W1wianNzLXBsdWdpbi1nbG9iYWxcIl0sIHJvb3RbXCJqc3MtcGx1Z2luLWNhbWVsLWNhc2VcIl0pO1xufSkodGhpcywgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2VwaWNnYW1lc19wc19saWJfcGl4ZWxzdHJlYW1pbmdmcm9udGVuZF91ZTVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fZ2xvYmFsX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX3BsdWdpbl9jYW1lbF9jYXNlX18pID0+IHtcbnJldHVybiAiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQge1xuICAgIFBpeGVsU3RyZWFtaW5nLFxuICAgIEZsYWdzLFxuICAgIExvZ2dlcixcbiAgICBBZ2dyZWdhdGVkU3RhdHMsXG4gICAgTGF0ZW5jeVRlc3RSZXN1bHRzLFxuICAgIEluaXRpYWxTZXR0aW5ncyxcbiAgICBNZXNzYWdlU3RyZWFtZXJMaXN0XG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0FjdGlvbk92ZXJsYXknO1xuaW1wb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L1RleHRPdmVybGF5JztcbmltcG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9Db25uZWN0T3ZlcmxheSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvRGlzY29ubmVjdE92ZXJsYXknO1xuaW1wb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L1BsYXlPdmVybGF5JztcbmltcG9ydCB7IEluZm9PdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9JbmZvT3ZlcmxheSc7XG5pbXBvcnQgeyBFcnJvck92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0Vycm9yT3ZlcmxheSc7XG5pbXBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9BRktPdmVybGF5JztcbmltcG9ydCB7IENvbnRyb2xzLCBDb250cm9sc1VJQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL1VJL0NvbnRyb2xzJztcbmltcG9ydCB7IExhYmVsbGVkQnV0dG9uIH0gZnJvbSAnLi4vVUkvTGFiZWxsZWRCdXR0b24nO1xuaW1wb3J0IHsgU2V0dGluZ3NQYW5lbCB9IGZyb20gJy4uL1VJL1NldHRpbmdzUGFuZWwnO1xuaW1wb3J0IHsgU3RhdHNQYW5lbCB9IGZyb20gJy4uL1VJL1N0YXRzUGFuZWwnO1xuaW1wb3J0IHsgVmlkZW9RcEluZGljYXRvciB9IGZyb20gJy4uL1VJL1ZpZGVvUXBJbmRpY2F0b3InO1xuaW1wb3J0IHsgQ29uZmlnVUksIExpZ2h0TW9kZSB9IGZyb20gJy4uL0NvbmZpZy9Db25maWdVSSc7XG5pbXBvcnQgeyBcbiAgICBVSUVsZW1lbnRDcmVhdGlvbk1vZGUsIFxuICAgIFBhbmVsQ29uZmlndXJhdGlvbiwgXG4gICAgaXNQYW5lbEVuYWJsZWQsXG4gICAgVUlFbGVtZW50Q29uZmlnXG59IGZyb20gJy4uL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuaW1wb3J0IHsgRnVsbFNjcmVlbkljb25CYXNlLCBGdWxsU2NyZWVuSWNvbkV4dGVybmFsIH0gZnJvbSAnLi4vVUkvRnVsbHNjcmVlbkljb24nO1xuXG5cbi8qKiBcbiAqIENvbmZpZ3VyYXRpb24gb2YgdGhlIGludGVybmFsIHZpZGVvIFFQIGluZGljYXRvciBlbGVtZW50LlxuICogQnkgZGVmYXVsdCwgb25lIHdpbGwgYmUgbWFkZSwgYnV0IGlmIG5lZWRlZCB0aGlzIGNhbiBiZSBkaXNhYmxlZC5cbiAqIFxuICogTm90ZTogRm9yIGN1c3RvbSBVSSBlbGVtZW50cyB0byByZWFjdCB0byB0aGUgUVAgYmVpbmcgY2hhbmdlZCwgdXNlIGEgUGl4ZWxTdHJlYW1pbmcgXG4gKiBvYmplY3QncyBhZGRFdmVudExpc3RlbmVyKCd2aWRlb0VuY29kZXJBdmdRUCcsIC4uLikgb3IgcmVtb3ZlRXZlbnRMaXN0ZW5lciguLi4pLlxuICovXG5leHBvcnQgdHlwZSBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnID0ge1xuICAgIGRpc2FibGVJbmRpY2F0b3I/OiBib29sZWFuXG59XG5cbi8qKlxuICogVUkgT3B0aW9ucyBjYW4gYmUgcHJvdmlkZWQgd2hlbiBjcmVhdGluZyBhbiBBcHBsaWNhdGlvbiwgdG8gY29uZmlndXJlIGl0J3MgaW50ZXJuYWxcbiAqIGFuZCBleHRlcm5hbCBiZWhhdmlvdXIsIGVuYWJsZS9kaXNhYmxlIGZlYXR1cmVzLCBhbmQgY29ubmVjdCB0byBleHRlcm5hbCBVSS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVSU9wdGlvbnMge1xuICAgIHN0cmVhbTogUGl4ZWxTdHJlYW1pbmc7XG4gICAgb25Db2xvck1vZGVDaGFuZ2VkPzogKGlzTGlnaHRNb2RlOiBib29sZWFuKSA9PiB2b2lkO1xuICAgIC8qKiBCeSBkZWZhdWx0LCBhIHNldHRpbmdzIHBhbmVsIGFuZCBhc3NvY2lhdGUgdmlzaWJpbGl0eSB0b2dnbGUgYnV0dG9uIHdpbGwgYmUgbWFkZS5cbiAgICAgICogSWYgbmVlZGVkLCB0aGlzIGJlaGF2aW91ciBjYW4gYmUgY29uZmlndXJlZC4gKi9cbiAgICBzZXR0aW5nc1BhbmVsQ29uZmlnPzogUGFuZWxDb25maWd1cmF0aW9uO1xuICAgIC8qKiBCeSBkZWZhdWx0LCBhIHN0YXRzIHBhbmVsIGFuZCBhc3NvY2lhdGUgdmlzaWJpbGl0eSB0b2dnbGUgYnV0dG9uIHdpbGwgYmUgbWFkZS5cbiAgICAgICogSWYgbmVlZGVkLCB0aGlzIGJlaGF2aW91ciBjYW4gYmUgY29uZmlndXJlZC4gKi9cbiAgICBzdGF0c1BhbmVsQ29uZmlnPzogUGFuZWxDb25maWd1cmF0aW9uO1xuICAgIC8qKiBJZiBuZWVkZWQsIHRoZSBmdWxsIHNjcmVlbiBidXR0b24gY2FuIGJlIGV4dGVybmFsIG9yIGRpc2FibGVkLiAqL1xuICAgIGZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZz8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgLyoqIElmIG5lZWRlZCwgWFIgYnV0dG9uIGNhbiBiZSBleHRlcm5hbCBvciBkaXNhYmxlZC4gKi9cbiAgICB4ckNvbnRyb2xzQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICAvKiogQ29uZmlndXJhdGlvbiBvZiB0aGUgdmlkZW8gUVAgaW5kaWNhdG9yLiAqL1xuICAgIHZpZGVvUXBJbmRpY2F0b3JDb25maWc/IDogVmlkZW9RUEluZGljYXRvckNvbmZpZ1xufVxuXG4vKipcbiAqIEFuIEFwcGxpY2F0aW9uIGlzIGEgY29tYmluYXRpb24gb2YgVUkgZWxlbWVudHMgdG8gZGlzcGxheSBhbmQgbWFuYWdlIGEgV2ViUlRDIFBpeGVsIFN0cmVhbWluZ1xuICogY29ubmVjdGlvbi4gSXQgaW5jbHVkZXMgZmVhdHVyZXMgZm9yIGNvbnRyb2xsaW5nIGEgc3RyZWFtIHdpdGggbW91c2UgYW5kIGtleWJvYXJkLCBcbiAqIG1hbmFnaW5nIGNvbm5lY3Rpb24gZW5kcG9pbnRzLCBhcyB3ZWxsIGFzIGRpc3BsYXlpbmcgc3RhdHMgYW5kIG90aGVyIGluZm9ybWF0aW9uIGFib3V0IGl0LlxuICovXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24ge1xuICAgIHN0cmVhbTogUGl4ZWxTdHJlYW1pbmc7XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF91aUZlYXR1cmVFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8vIHNldCB0aGUgb3ZlcmxheSBwbGFjZWhvbGRlcnNcbiAgICBjdXJyZW50T3ZlcmxheTogT3ZlcmxheUJhc2UgfCBudWxsO1xuICAgIGRpc2Nvbm5lY3RPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIGNvbm5lY3RPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIHBsYXlPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIGluZm9PdmVybGF5OiBUZXh0T3ZlcmxheTtcbiAgICBlcnJvck92ZXJsYXk6IFRleHRPdmVybGF5O1xuICAgIGFma092ZXJsYXk6IEFGS092ZXJsYXk7XG5cbiAgICBjb250cm9sczogQ29udHJvbHM7XG5cbiAgICBzZXR0aW5nc1BhbmVsOiBTZXR0aW5nc1BhbmVsO1xuICAgIHN0YXRzUGFuZWw6IFN0YXRzUGFuZWw7XG4gICAgdmlkZW9RcEluZGljYXRvcjogVmlkZW9RcEluZGljYXRvcjtcblxuICAgIGNvbmZpZ1VJOiBDb25maWdVSTtcblxuICAgIG9uQ29sb3JNb2RlQ2hhbmdlZDogVUlPcHRpb25zW1wib25Db2xvck1vZGVDaGFuZ2VkXCJdO1xuXG4gICAgcHJvdGVjdGVkIF9vcHRpb25zIDogVUlPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBJbml0aWFsaXphdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVUlPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBvcHRpb25zLnN0cmVhbTtcbiAgICAgICAgdGhpcy5vbkNvbG9yTW9kZUNoYW5nZWQgPSBvcHRpb25zLm9uQ29sb3JNb2RlQ2hhbmdlZDtcbiAgICAgICAgdGhpcy5jb25maWdVSSA9IG5ldyBDb25maWdVSSh0aGlzLnN0cmVhbS5jb25maWcpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheXMoKTtcblxuICAgICAgICBpZiAoaXNQYW5lbEVuYWJsZWQob3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnKSkge1xuICAgICAgICAgICAgLy8gQWRkIHN0YXRzIHBhbmVsXG4gICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwgPSBuZXcgU3RhdHNQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzUGFuZWwucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNQYW5lbEVuYWJsZWQob3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnKSkge1xuICAgICAgICAgICAgLy8gQWRkIHNldHRpbmdzIHBhbmVsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwgPSBuZXcgU2V0dGluZ3NQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzUGFuZWwucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVTZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIW9wdGlvbnMudmlkZW9RcEluZGljYXRvckNvbmZpZyB8fCAhb3B0aW9ucy52aWRlb1FwSW5kaWNhdG9yQ29uZmlnLmRpc2FibGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdmlkZW8gc3RyZWFtIFFQIGluZGljYXRvclxuICAgICAgICAgICAgdGhpcy52aWRlb1FwSW5kaWNhdG9yID0gbmV3IFZpZGVvUXBJbmRpY2F0b3IoKTtcbiAgICAgICAgICAgIHRoaXMudWlGZWF0dXJlc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy52aWRlb1FwSW5kaWNhdG9yLnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFja3MoKTtcblxuICAgICAgICB0aGlzLnNob3dDb25uZWN0T3JBdXRvQ29ubmVjdE92ZXJsYXlzKCk7XG5cbiAgICAgICAgdGhpcy5zZXRDb2xvck1vZGUodGhpcy5jb25maWdVSS5pc0N1c3RvbUZsYWdFbmFibGVkKExpZ2h0TW9kZSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVPdmVybGF5cygpOiB2b2lkIHtcbiAgICAgICAgLy8gYnVpbGQgYWxsIG9mIHRoZSBvdmVybGF5c1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5ID0gbmV3IERpc2Nvbm5lY3RPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkgPSBuZXcgQ29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheSA9IG5ldyBQbGF5T3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5ID0gbmV3IEluZm9PdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5ID0gbmV3IEVycm9yT3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkgPSBuZXcgQUZLT3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkub25BY3Rpb24oKCkgPT4gdGhpcy5zdHJlYW0ucmVjb25uZWN0KCkpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHRoZSB3ZWJSdGMgY29ubmVjdCBvdmVybGF5IEV2ZW50IExpc3RlbmVyIGFuZCBzaG93IHRoZSBjb25uZWN0IG92ZXJsYXlcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5jb25uZWN0KCkpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGxheSBvdmVybGF5cyBhY3Rpb25cbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5wbGF5KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBidXR0b24gY2xpY2sgZnVuY3Rpb25zIGFuZCBidXR0b24gZnVuY3Rpb25hbGl0eVxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVCdXR0b25zKCkge1xuICAgICAgICBjb25zdCBjb250cm9sc1VJQ29uZmlnIDogQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgICAgICBzdGF0c0J1dHRvblR5cGUgOiAhIXRoaXMuX29wdGlvbnMuc3RhdHNQYW5lbENvbmZpZ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWdcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNldHRpbmdzQnV0dG9uVHlwZTogISF0aGlzLl9vcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWdcbiAgICAgICAgICAgICAgICA/IHRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uVHlwZTogdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcsXG4gICAgICAgICAgICB4ckljb25UeXBlOiB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWdcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXR1cCBjb250cm9sc1xuICAgICAgICBjb25zdCBjb250cm9scyA9IG5ldyBDb250cm9scyhjb250cm9sc1VJQ29uZmlnKTtcbiAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZChjb250cm9scy5yb290RWxlbWVudCk7XG5cbiAgICAgICAgLy8gV2hlbiB3ZSBmdWxsc2NyZWVuIHdlIHdhbnQgdGhpcyBlbGVtZW50IHRvIGJlIHRoZSByb290XG4gICAgICAgIGNvbnN0IGZ1bGxTY3JlZW5CdXR0b24gOiBGdWxsU2NyZWVuSWNvbkJhc2UgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgIC8vIERlcGVuZGluZyBvbiBpZiB3ZSdyZSBjcmVhdGluZyBhbiBpbnRlcm5hbCBidXR0b24sIG9yIHVzaW5nIGFuIGV4dGVybmFsIG9uZVxuICAgICAgICAgICAgKCEhdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcgXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuVXNlQ3VzdG9tRWxlbWVudClcbiAgICAgICAgICAgIC8vIEVpdGhlciBjcmVhdGUgYSBmdWxsc2NyZWVuIGNsYXNzIGJhc2VkIG9uIHRoZSBleHRlcm5hbCBidXR0b25cbiAgICAgICAgICAgID8gbmV3IEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwodGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcuY3VzdG9tRWxlbWVudClcbiAgICAgICAgICAgIC8vIE9yIHVzZSB0aGUgb25lIGNyZWF0ZWQgYnkgdGhlIENvbnRyb2xzIGluaXRpYWxpemVyIGVhcmxpZXJcbiAgICAgICAgICAgIDogY29udHJvbHMuZnVsbHNjcmVlbkljb247XG4gICAgICAgIGlmIChmdWxsU2NyZWVuQnV0dG9uKSB7XG4gICAgICAgICAgICBmdWxsU2NyZWVuQnV0dG9uLmZ1bGxzY3JlZW5FbGVtZW50ID0gL2lQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpID8gdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidmlkZW9cIilbMF0gOiB0aGlzLnJvb3RFbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHNldHRpbmdzIGJ1dHRvbiB0byBjb250cm9sc1xuICAgICAgICBjb25zdCBzZXR0aW5nc0J1dHRvbiA6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gXG4gICAgICAgICAgICAhIWNvbnRyb2xzLnNldHRpbmdzSWNvbiA/IGNvbnRyb2xzLnNldHRpbmdzSWNvbi5yb290RWxlbWVudCA6IFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWcuY3VzdG9tRWxlbWVudDtcbiAgICAgICAgaWYgKCEhc2V0dGluZ3NCdXR0b24pIHNldHRpbmdzQnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0NsaWNrZWQoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5zZXR0aW5nc1BhbmVsKSB0aGlzLnNldHRpbmdzUGFuZWwuc2V0dGluZ3NDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDbGlja2VkKCk7XG5cbiAgICAgICAgLy8gQWRkIFdlYlhSIGJ1dHRvbiB0byBjb250cm9sc1xuICAgICAgICBjb25zdCB4ckJ1dHRvbiA6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gXG4gICAgICAgICAgICAhIWNvbnRyb2xzLnhySWNvbiA/IGNvbnRyb2xzLnhySWNvbi5yb290RWxlbWVudCA6IFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy54ckNvbnRyb2xzQ29uZmlnLmNyZWF0aW9uTW9kZSA9PT0gVUlFbGVtZW50Q3JlYXRpb25Nb2RlLlVzZUN1c3RvbUVsZW1lbnQgP1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy54ckNvbnRyb2xzQ29uZmlnLmN1c3RvbUVsZW1lbnQgOiB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghIXhyQnV0dG9uKSB4ckJ1dHRvbi5vbmNsaWNrID0gKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnRvZ2dsZVhSKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgdGhlIHN0YXRzL2luZm8gYnV0dG9uXG4gICAgICAgIGNvbnN0IHN0YXRzQnV0dG9uIDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgICEhY29udHJvbHMuc3RhdHNJY29uID8gY29udHJvbHMuc3RhdHNJY29uLnJvb3RFbGVtZW50IDogXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnN0YXRzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZy5jdXN0b21FbGVtZW50O1xuICAgICAgICBpZiAoISFzdGF0c0J1dHRvbikgc3RhdHNCdXR0b24ub25jbGljayA9ICgpID0+IHRoaXMuc3RhdHNDbGlja2VkKClcblxuICAgICAgICBpZiAoISF0aGlzLnN0YXRzUGFuZWwpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbC5zdGF0c0Nsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB0aGlzLnN0YXRzQ2xpY2tlZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGNvbW1hbmQgYnV0dG9ucyAoaWYgd2UgaGF2ZSBzb21ld2hlcmUgdG8gYWRkIHRoZW0gdG8pXG4gICAgICAgIGlmICghIXRoaXMuc2V0dGluZ3NQYW5lbCkge1xuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBmb3IgdG9nZ2xlIGZwc1xuICAgICAgICAgICAgY29uc3Qgc2hvd0ZQU0J1dHRvbiA9IG5ldyBMYWJlbGxlZEJ1dHRvbignU2hvdyBGUFMnLCAnVG9nZ2xlJyk7XG4gICAgICAgICAgICBzaG93RlBTQnV0dG9uLmFkZE9uQ2xpY2tMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVxdWVzdFNob3dGcHMoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZGQgYnV0dG9uIGZvciByZXN0YXJ0IHN0cmVhbVxuICAgICAgICAgICAgY29uc3QgcmVzdGFydFN0cmVhbUJ1dHRvbiA9IG5ldyBMYWJlbGxlZEJ1dHRvbihcbiAgICAgICAgICAgICAgICAnUmVzdGFydCBTdHJlYW0nLFxuICAgICAgICAgICAgICAgICdSZXN0YXJ0J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlc3RhcnRTdHJlYW1CdXR0b24uYWRkT25DbGlja0xpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBBZGQgYnV0dG9uIGZvciByZXF1ZXN0IGtleWZyYW1lXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0S2V5ZnJhbWVCdXR0b24gPSBuZXcgTGFiZWxsZWRCdXR0b24oXG4gICAgICAgICAgICAgICAgJ1JlcXVlc3Qga2V5ZnJhbWUnLFxuICAgICAgICAgICAgICAgICdSZXF1ZXN0J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJlcXVlc3RLZXlmcmFtZUJ1dHRvbi5hZGRPbkNsaWNrTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlcXVlc3RJZnJhbWUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBjb21tYW5kc1NlY3Rpb25FbGVtID0gdGhpcy5jb25maWdVSS5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwuc2V0dGluZ3NDb250ZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAnQ29tbWFuZHMnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29tbWFuZHNTZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChzaG93RlBTQnV0dG9uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbW1hbmRzU2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQocmVxdWVzdEtleWZyYW1lQnV0dG9uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbW1hbmRzU2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQocmVzdGFydFN0cmVhbUJ1dHRvbi5yb290RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25maWd1cmUgdGhlIHNldHRpbmdzIHdpdGggb24gY2hhbmdlIGxpc3RlbmVycyBhbmQgYW55IGFkZGl0aW9uYWwgcGVyIGV4cGVyaWVuY2Ugc2V0dGluZ3MuXG4gICAgICovXG4gICAgY29uZmlndXJlU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgICAgIC8vIFRoaXMgYnVpbGRzIGFsbCB0aGUgc2V0dGluZ3Mgc2VjdGlvbnMgYW5kIGZsYWdzIHVuZGVyIHRoaXMgYHNldHRpbmdzQ29udGVudGAgZWxlbWVudC5cbiAgICAgICAgdGhpcy5jb25maWdVSS5wb3B1bGF0ZVNldHRpbmdzRWxlbWVudChcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbC5zZXR0aW5nc0NvbnRlbnRFbGVtZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jb25maWdVSS5hZGRDdXN0b21GbGFnT25TZXR0aW5nQ2hhbmdlZExpc3RlbmVyKFxuICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgKGlzTGlnaHRNb2RlOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdVSS5zZXRDdXN0b21GbGFnTGFiZWwoXG4gICAgICAgICAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgYENvbG9yIFNjaGVtZTogJHtpc0xpZ2h0TW9kZSA/ICdMaWdodCcgOiAnRGFyayd9IE1vZGVgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldENvbG9yTW9kZShpc0xpZ2h0TW9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJDYWxsYmFja3MoKSB7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnYWZrV2FybmluZ0FjdGl2YXRlJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgY291bnREb3duLCBkaXNtaXNzQWZrIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBZmtPdmVybGF5KGNvdW50RG93biwgZGlzbWlzc0FmaylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdhZmtXYXJuaW5nVXBkYXRlJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgY291bnREb3duIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmFma092ZXJsYXkudXBkYXRlQ291bnRkb3duKGNvdW50RG93bilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdhZmtXYXJuaW5nRGVhY3RpdmF0ZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLmFma092ZXJsYXkuaGlkZSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ2Fma1RpbWVkT3V0JywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMuYWZrT3ZlcmxheS5oaWRlKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd2aWRlb0VuY29kZXJBdmdRUCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGF2Z1FQIH0gfSkgPT4gdGhpcy5vblZpZGVvRW5jb2RlckF2Z1FQKGF2Z1FQKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNTZHAnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y1NkcCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y0F1dG9Db25uZWN0JywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNBdXRvQ29ubmVjdCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y0Nvbm5lY3RpbmcnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0Nvbm5lY3RpbmcoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNDb25uZWN0ZWQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0Nvbm5lY3RlZCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y0ZhaWxlZCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjRmFpbGVkKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3ZWJSdGNEaXNjb25uZWN0ZWQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBldmVudFN0cmluZywgc2hvd0FjdGlvbk9yRXJyb3JPbkRpc2Nvbm5lY3QgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0KGV2ZW50U3RyaW5nLCBzaG93QWN0aW9uT3JFcnJvck9uRGlzY29ubmVjdClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigndmlkZW9Jbml0aWFsaXplZCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9Jbml0aWFsaXplZCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3N0cmVhbUxvYWRpbmcnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblN0cmVhbUxvYWRpbmcoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXlTdHJlYW1FcnJvcicsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IG1lc3NhZ2UgfSB9KSA9PiB0aGlzLm9uUGxheVN0cmVhbUVycm9yKG1lc3NhZ2UpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlTdHJlYW0nLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblBsYXlTdHJlYW0oKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXlTdHJlYW1SZWplY3RlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IHJlYXNvbiB9IH0pID0+IHRoaXMub25QbGF5U3RyZWFtUmVqZWN0ZWQocmVhc29uKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2xvYWRGcmVlemVGcmFtZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IHNob3VsZFNob3dQbGF5T3ZlcmxheSB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRGcmVlemVGcmFtZShzaG91bGRTaG93UGxheU92ZXJsYXkpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3RhdHNSZWNlaXZlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGFnZ3JlZ2F0ZWRTdGF0cyB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXRzUmVjZWl2ZWQoYWdncmVnYXRlZFN0YXRzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2xhdGVuY3lUZXN0UmVzdWx0JyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgbGF0ZW5jeVRpbWluZ3MgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25MYXRlbmN5VGVzdFJlc3VsdHMobGF0ZW5jeVRpbWluZ3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3RyZWFtZXJMaXN0TWVzc2FnZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IG1lc3NhZ2VTdHJlYW1lckxpc3QsIGF1dG9TZWxlY3RlZFN0cmVhbWVySWQgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RyZWFtZXJMaXN0TWVzc2FnZShtZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3NldHRpbmdzQ2hhbmdlZCcsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuY29uZmlnVUkub25TZXR0aW5nc0NoYW5nZWQoZXZlbnQpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcm9vdEVsZW1lbnQgb2YgdGhlIGFwcGxpY2F0aW9uLCB2aWRlbyBzdHJlYW0gYW5kIGFsbCBVSSBhcmUgY2hpbGRyZW4gb2YgdGhpcyBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAncGxheWVyVUknO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbm9zZWxlY3QnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudWlGZWF0dXJlc0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBlbGVtZW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBVSSBmZWF0dXJlcywgbGlrZSB0aGUgc3RhdHMgYW5kIHNldHRpbmdzIHBhbmVscy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHVpRmVhdHVyZXNFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl91aUZlYXR1cmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl91aUZlYXR1cmVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl91aUZlYXR1cmVFbGVtZW50LmlkID0gJ3VpRmVhdHVyZXMnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl91aUZlYXR1cmVFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBkaXNjb25uZWN0IG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gdXBkYXRlVGV4dCAtIHRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBkaXNwbGF5ZWQgaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93RGlzY29ubmVjdE92ZXJsYXkodXBkYXRlVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGlzY29ubmVjdE92ZXJsYXkodXBkYXRlVGV4dCk7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5kaXNjb25uZWN0T3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGRpc2Nvbm5lY3Qgb3ZlcmxheXMgc3BhbiB0ZXh0XG4gICAgICogQHBhcmFtIHVwZGF0ZVRleHQgLSB0aGUgbmV3IGNvdW50ZG93biBudW1iZXJcbiAgICAgKi9cbiAgICB1cGRhdGVEaXNjb25uZWN0T3ZlcmxheSh1cGRhdGVUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS51cGRhdGUodXBkYXRlVGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSBkaXNjb25uZWN0IG92ZXJsYXlzIGFjdGlvblxuICAgICAqL1xuICAgIG9uRGlzY29ubmVjdGlvbkFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBjdXJyZW50IG92ZXJsYXlcbiAgICAgKi9cbiAgICBoaWRlQ3VycmVudE92ZXJsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRPdmVybGF5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkuaGlkZSgpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgY29ubmVjdCBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd0Nvbm5lY3RPdmVybGF5KCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuY29ubmVjdE92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHBsYXkgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dQbGF5T3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLnBsYXlPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSB0ZXh0IG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gdGV4dCAtIHRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dUZXh0T3ZlcmxheSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5pbmZvT3ZlcmxheS51cGRhdGUodGV4dCk7XG4gICAgICAgIHRoaXMuaW5mb092ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5pbmZvT3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgZXJyb3Igb3ZlcmxheVxuICAgICAqIEBwYXJhbSB0ZXh0IC0gdGhlIHRleHQgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd0Vycm9yT3ZlcmxheSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5lcnJvck92ZXJsYXkudXBkYXRlKHRleHQpO1xuICAgICAgICB0aGlzLmVycm9yT3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmVycm9yT3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBvciBoaWRlcyB0aGUgc2V0dGluZ3MgcGFuZWwgaWYgY2xpY2tlZFxuICAgICAqL1xuICAgIHNldHRpbmdzQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmhpZGUoKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBvciBoaWRlcyB0aGUgc3RhdHMgcGFuZWwgaWYgY2xpY2tlZFxuICAgICAqL1xuICAgIHN0YXRzQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLmhpZGUoKTtcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIGNvbm5lY3Qgb3ZlcmxheXMgYWN0aW9uXG4gICAgICovXG4gICAgb25Db25uZWN0QWN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5LmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSBwbGF5IG92ZXJsYXlzIGFjdGlvblxuICAgICAqL1xuICAgIG9uUGxheUFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheS5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBhZmsgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBjb3VudERvd24gLSB0aGUgY291bnRkb3duIG51bWJlciBmb3IgdGhlIGFmayBjb3VudGRvd25cbiAgICAgKi9cbiAgICBzaG93QWZrT3ZlcmxheShjb3VudERvd246IG51bWJlciwgZGlzbWlzc0FmazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkudXBkYXRlQ291bnRkb3duKGNvdW50RG93bik7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheS5vbkFjdGlvbigoKSA9PiBkaXNtaXNzQWZrKCkpO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5hZmtPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIENvbm5lY3QgT3ZlcmxheSBvciBhdXRvIGNvbm5lY3RcbiAgICAgKi9cbiAgICBzaG93Q29ubmVjdE9yQXV0b0Nvbm5lY3RPdmVybGF5cygpIHtcbiAgICAgICAgLy8gc2V0IHVwIGlmIHRoZSBhdXRvIHBsYXkgd2lsbCBiZSB1c2VkIG9yIHJlZ3VsYXIgY2xpY2sgdG8gc3RhcnRcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5BdXRvQ29ubmVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Nvbm5lY3RPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSB3ZWJSdGNBdXRvQ29ubmVjdCBPdmVybGF5IGFuZCBjb25uZWN0XG4gICAgICovXG4gICAgb25XZWJSdGNBdXRvQ29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ0F1dG8gQ29ubmVjdGluZyBOb3cnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgZnVuY3Rpb25hbGl0eSB0byBoYXBwZW4gd2hlbiByZWNlaXZpbmcgYSB3ZWJSVEMgYW5zd2VyXG4gICAgICovXG4gICAgb25XZWJSdGNTZHAoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdXZWJSVEMgQ29ubmVjdGlvbiBOZWdvdGlhdGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYSB0ZXh0IG92ZXJsYXkgdG8gYWxlcnQgdGhlIHVzZXIgdGhlIHN0cmVhbSBpcyBjdXJyZW50bHkgbG9hZGluZ1xuICAgICAqL1xuICAgIG9uU3RyZWFtTG9hZGluZygpIHtcbiAgICAgICAgLy8gYnVpbGQgdGhlIHNwaW5uZXIgc3BhblxuICAgICAgICBjb25zdCBzcGlubmVyU3BhbjogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGlubmVyU3Bhbi5jbGFzc05hbWUgPSAndmlzdWFsbHktaGlkZGVuJztcbiAgICAgICAgc3Bpbm5lclNwYW4uaW5uZXJIVE1MID0gJ0xvYWRpbmcuLi4nO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBzcGlubmVyIGRpdlxuICAgICAgICBjb25zdCBzcGlubmVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcGlubmVyRGl2LmlkID0gJ2xvYWRpbmctc3Bpbm5lcic7XG4gICAgICAgIHNwaW5uZXJEaXYuY2xhc3NOYW1lID0gJ3NwaW5uZXItYm9yZGVyIG1zLTInO1xuICAgICAgICBzcGlubmVyRGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdzdGF0dXMnKTtcblxuICAgICAgICAvLyBhcHBlbmQgdGhlIHNwaW5uZXIgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgc3Bpbm5lckRpdi5hcHBlbmRDaGlsZChzcGlubmVyU3Bhbik7XG5cbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ0xvYWRpbmcgU3RyZWFtICcgKyBzcGlubmVyRGl2Lm91dGVySFRNTCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgdmlkZW8gaXMgZGlzY29ubmVjdGVkIC0gZGlzcGxheXMgdGhlIGVycm9yIG92ZXJsYXkgYW5kIHJlc2V0cyB0aGUgYnV0dG9ucyBzdHJlYW0gdG9vbHMgdXBvbiBkaXNjb25uZWN0XG4gICAgICogQHBhcmFtIGV2ZW50U3RyaW5nIC0gdGhlIGV2ZW50IHRleHQgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgb25EaXNjb25uZWN0KGV2ZW50U3RyaW5nOiBzdHJpbmcsIHNob3dBY3Rpb25PckVycm9yT25EaXNjb25uZWN0OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzaG93QWN0aW9uT3JFcnJvck9uRGlzY29ubmVjdCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JPdmVybGF5KGBEaXNjb25uZWN0ZWQ6ICR7ZXZlbnRTdHJpbmd9YCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEaXNjb25uZWN0T3ZlcmxheShcbiAgICAgICAgICAgICAgICBgRGlzY29ubmVjdGVkOiAke2V2ZW50U3RyaW5nfSAgPGRpdiBjbGFzcz1cImNsaWNrYWJsZVN0YXRlXCI+Q2xpY2sgVG8gUmVzdGFydDwvZGl2PmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGlzYWJsZSBzdGFydGluZyBhIGxhdGVuY3kgY2hlY2tcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB3aGVuIFdlYiBSdGMgaXMgY29ubmVjdGluZ1xuICAgICAqL1xuICAgIG9uV2ViUnRjQ29ubmVjdGluZygpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ1N0YXJ0aW5nIGNvbm5lY3Rpb24gdG8gc2VydmVyLCBwbGVhc2Ugd2FpdCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgd2hlbiBXZWIgUnRjIGhhcyBjb25uZWN0ZWRcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ1dlYlJUQyBjb25uZWN0ZWQsIHdhaXRpbmcgZm9yIHZpZGVvJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB3aGVuIFdlYiBSdGMgZmFpbHMgdG8gY29ubmVjdFxuICAgICAqL1xuICAgIG9uV2ViUnRjRmFpbGVkKCkge1xuICAgICAgICB0aGlzLnNob3dFcnJvck92ZXJsYXkoJ1VuYWJsZSB0byBzZXR1cCB2aWRlbycpO1xuICAgIH1cblxuICAgIG9uTG9hZEZyZWV6ZUZyYW1lKHNob3VsZFNob3dQbGF5T3ZlcmxheTogYm9vbGVhbikge1xuICAgICAgICBpZiAoc2hvdWxkU2hvd1BsYXlPdmVybGF5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBMb2dnZXIuTG9nKExvZ2dlci5HZXRTdGFja1RyYWNlKCksICdzaG93aW5nIHBsYXkgb3ZlcmxheScpO1xuICAgICAgICAgICAgdGhpcy5zaG93UGxheU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUGxheVN0cmVhbSgpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICB9XG5cbiAgICBvblBsYXlTdHJlYW1FcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3JPdmVybGF5KG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9uUGxheVN0cmVhbVJlamVjdGVkKG9uUmVqZWN0ZWRSZWFzb246IHVua25vd24pIHtcbiAgICAgICAgdGhpcy5zaG93UGxheU92ZXJsYXkoKTtcbiAgICB9XG5cbiAgICBvblZpZGVvSW5pdGlhbGl6ZWQoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHJlYW0uY29uZmlnLmlzRmxhZ0VuYWJsZWQoRmxhZ3MuQXV0b1BsYXlWaWRlbykpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BsYXlPdmVybGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGFydGluZyBhIGxhdGVuY3kgY2hlY2tcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbS5yZXF1ZXN0TGF0ZW5jeVRlc3QoKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgZnVuY3Rpb25hbGl0eSB0byBoYXBwZW4gd2hlbiBjYWxjdWxhdGluZyB0aGUgYXZlcmFnZSB2aWRlbyBlbmNvZGVyIHFwXG4gICAgICogQHBhcmFtIFFQIC0gdGhlIHF1YWxpdHkgbnVtYmVyIG9mIHRoZSBzdHJlYW1cbiAgICAgKi9cbiAgICBvblZpZGVvRW5jb2RlckF2Z1FQKFFQOiBudW1iZXIpIHtcbiAgICAgICAgLy8gVXBkYXRlIGludGVybmFsIFFQIGluZGljYXRvciBpZiBvbmUgaXMgcHJlc2VudFxuICAgICAgICBpZiAoISF0aGlzLnZpZGVvUXBJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9RcEluZGljYXRvci51cGRhdGVRcFRvb2x0aXAoUVApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Jbml0aWFsU2V0dGluZ3Moc2V0dGluZ3M6IEluaXRpYWxTZXR0aW5ncykge1xuICAgICAgICBpZiAoc2V0dGluZ3MuUGl4ZWxTdHJlYW1pbmdTZXR0aW5ncykge1xuICAgICAgICAgICAgY29uc3QgZGlzYWJsZUxhdGVuY3lUZXN0ID1cbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5QaXhlbFN0cmVhbWluZ1NldHRpbmdzLkRpc2FibGVMYXRlbmN5VGVzdDtcbiAgICAgICAgICAgIGlmIChkaXNhYmxlTGF0ZW5jeVRlc3QpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbC5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi50aXRsZSA9XG4gICAgICAgICAgICAgICAgICAgICdEaXNhYmxlZCBieSAtUGl4ZWxTdHJlYW1pbmdEaXNhYmxlTGF0ZW5jeVRlc3Rlcj10cnVlJztcbiAgICAgICAgICAgICAgICBMb2dnZXIuSW5mbyhcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgJy1QaXhlbFN0cmVhbWluZ0Rpc2FibGVMYXRlbmN5VGVzdGVyPXRydWUsIHJlcXVlc3RpbmcgbGF0ZW5jeSByZXBvcnQgZnJvbSB0aGUgdGhlIGJyb3dzZXIgdG8gVUUgaXMgZGlzYWJsZWQuJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblN0YXRzUmVjZWl2ZWQoYWdncmVnYXRlZFN0YXRzOiBBZ2dyZWdhdGVkU3RhdHMpIHtcbiAgICAgICAgLy8gR3JhYiBhbGwgc3RhdHMgd2UgY2FuIG9mZiB0aGUgYWdncmVnYXRlZCBzdGF0c1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwuaGFuZGxlU3RhdHMoYWdncmVnYXRlZFN0YXRzKTtcbiAgICB9XG5cbiAgICBvbkxhdGVuY3lUZXN0UmVzdWx0cyhsYXRlbmN5VGltaW5nczogTGF0ZW5jeVRlc3RSZXN1bHRzKSB7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC5sYXRlbmN5VGVzdC5oYW5kbGVUZXN0UmVzdWx0KGxhdGVuY3lUaW1pbmdzKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdHJlYW1lckxpc3RNZXNzYWdlKG1lc3NhZ2VTdHJlYW1pbmdMaXN0OiBNZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgICAgIGlmIChhdXRvU2VsZWN0ZWRTdHJlYW1lcklkID09PSBudWxsKSB7XG4gICAgICAgICAgICBpZihtZXNzYWdlU3RyZWFtaW5nTGlzdC5pZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGlzY29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICAgICAgICAgICdObyBzdHJlYW1lcnMgY29ubmVjdGVkLiA8ZGl2IGNsYXNzPVwiY2xpY2thYmxlU3RhdGVcIj5DbGljayBUbyBSZXN0YXJ0PC9kaXY+J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KFxuICAgICAgICAgICAgICAgICAgICAnTXVsdGlwbGUgc3RyZWFtZXJzIGRldGVjdGVkLiBVc2UgdGhlIGRyb3Bkb3duIGluIHRoZSBzZXR0aW5ncyBtZW51IHRvIHNlbGVjdCB0aGUgc3RyZWFtZXInXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBsaWdodC9kYXJrIGNvbG9yIG1vZGVcbiAgICAgKiBAcGFyYW0gaXNMaWdodE1vZGUgLSBzaG91bGQgd2UgdXNlIGEgbGlnaHQgb3IgZGFyayBjb2xvciBzY2hlbWVcbiAgICAgKi9cbiAgICBzZXRDb2xvck1vZGUoaXNMaWdodE1vZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMub25Db2xvck1vZGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ29sb3JNb2RlQ2hhbmdlZChpc0xpZ2h0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQge1xuICAgIENvbmZpZyxcbiAgICBGbGFnc0lkcyxcbiAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICBPcHRpb25QYXJhbWV0ZXJzSWRzLFxuICAgIFRleHRQYXJhbWV0ZXJzSWRzLFxuICAgIFRleHRQYXJhbWV0ZXJzLFxuICAgIE9wdGlvblBhcmFtZXRlcnMsXG4gICAgRmxhZ3MsXG4gICAgTnVtZXJpY1BhcmFtZXRlcnMsXG4gICAgU2V0dGluZ3NDaGFuZ2VkRXZlbnQsXG4gICAgU2V0dGluZ0ZsYWcsXG4gICAgU2V0dGluZ051bWJlcixcbiAgICBTZXR0aW5nVGV4dCxcbiAgICBTZXR0aW5nT3B0aW9uLFxuICAgIExvZ2dlcixcbiAgICBTZXR0aW5nQmFzZVxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFNldHRpbmdVSUZsYWcgfSBmcm9tICcuL1NldHRpbmdVSUZsYWcnO1xuaW1wb3J0IHsgU2V0dGluZ1VJTnVtYmVyIH0gZnJvbSAnLi9TZXR0aW5nVUlOdW1iZXInO1xuaW1wb3J0IHsgU2V0dGluZ1VJVGV4dCB9IGZyb20gJy4vU2V0dGluZ1VJVGV4dCc7XG5pbXBvcnQgeyBTZXR0aW5nVUlPcHRpb24gfSBmcm9tICcuL1NldHRpbmdVSU9wdGlvbic7XG5cbmV4cG9ydCBjb25zdCBMaWdodE1vZGUgPSAnTGlnaHRNb2RlJyBhcyBjb25zdDtcbnR5cGUgRXh0cmFGbGFncyA9IHR5cGVvZiBMaWdodE1vZGU7XG5leHBvcnQgdHlwZSBGbGFnc0lkc0V4dGVuZGVkID0gRmxhZ3NJZHMgfCBFeHRyYUZsYWdzO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnVUkge1xuICAgIHByaXZhdGUgY3VzdG9tRmxhZ3MgPSBuZXcgTWFwPFxuICAgICAgICBGbGFnc0lkc0V4dGVuZGVkLFxuICAgICAgICBTZXR0aW5nRmxhZzxGbGFnc0lkc0V4dGVuZGVkPlxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIGZsYWdzIHRoYXQgY2FuIGJlIHRvZ2dsZWQgLSBvcHRpb25zIHRoYXQgY2FuIGJlIHNldCBpbiB0aGUgYXBwbGljYXRpb24gLSBlLmcuIFVzZSBNaWM/ICovXG4gICAgcHJpdmF0ZSBmbGFnc1VpID0gbmV3IE1hcDxcbiAgICAgICAgRmxhZ3NJZHNFeHRlbmRlZCxcbiAgICAgICAgU2V0dGluZ1VJRmxhZzxGbGFnc0lkc0V4dGVuZGVkPlxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIG51bWVyaWNhbCBzZXR0aW5ncyAtIG9wdGlvbnMgdGhhdCBjYW4gYmUgaW4gdGhlIGFwcGxpY2F0aW9uIC0gZS5nLiBNaW5CaXRyYXRlICovXG4gICAgcHJpdmF0ZSBudW1lcmljUGFyYW1ldGVyc1VpID0gbmV3IE1hcDxcbiAgICAgICAgTnVtZXJpY1BhcmFtZXRlcnNJZHMsXG4gICAgICAgIFNldHRpbmdVSU51bWJlclxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIHRleHQgc2V0dGluZ3MgLSBlLmcuIHNpZ25hbGxpbmcgc2VydmVyIHVybCAqL1xuICAgIHByaXZhdGUgdGV4dFBhcmFtZXRlcnNVaSA9IG5ldyBNYXA8VGV4dFBhcmFtZXRlcnNJZHMsIFNldHRpbmdVSVRleHQ+KCk7XG5cbiAgICAvKiBBIG1hcCBvZiBlbnVtIGJhc2VkIHNldHRpbmdzIC0gZS5nLiBwcmVmZXJyZWQgY29kZWMgKi9cbiAgICBwcml2YXRlIG9wdGlvblBhcmFtZXRlcnNVaSA9IG5ldyBNYXA8XG4gICAgICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgICAgIFNldHRpbmdVSU9wdGlvblxuICAgID4oKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLSBTZXR0aW5ncyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDdXN0b21VSVNldHRpbmdzKGNvbmZpZy51c2VVcmxQYXJhbXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU2V0dGluZ3NVSUNvbXBvbmVudHMoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgY3VzdG9tIFVJIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBwcm92aWRlZCBieSB0aGUgUGl4ZWwgU3RyZWFtaW5nIGxpYnJhcnkuXG4gICAgICovXG4gICAgY3JlYXRlQ3VzdG9tVUlTZXR0aW5ncyh1c2VVcmxQYXJhbXM6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jdXN0b21GbGFncy5zZXQoXG4gICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICBuZXcgU2V0dGluZ0ZsYWc8RmxhZ3NJZHNFeHRlbmRlZD4oXG4gICAgICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgICAgICdDb2xvciBTY2hlbWU6IERhcmsgTW9kZScsXG4gICAgICAgICAgICAgICAgJ1BhZ2Ugc3R5bGluZyB3aWxsIGJlIGVpdGhlciBsaWdodCBvciBkYXJrJyxcbiAgICAgICAgICAgICAgICBmYWxzZSAvKmlmIHdhbnQgdG8gdXNlIHN5c3RlbSBwcmVmOiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykqLyxcbiAgICAgICAgICAgICAgICB1c2VVcmxQYXJhbXMsXG4gICAgICAgICAgICAgICAgKGlzTGlnaHRNb2RlOiBib29sZWFuLCBzZXR0aW5nOiBTZXR0aW5nQmFzZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gYENvbG9yIFNjaGVtZTogJHtpc0xpZ2h0TW9kZSA/ICdMaWdodCcgOiAnRGFyayd9IE1vZGVgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIFVJIHdyYXBwZXIgY29tcG9uZW50cyBmb3IgZWFjaCBzZXR0aW5nIGVsZW1lbnQgaW4gY29uZmlnLlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICByZWdpc3RlclNldHRpbmdzVUlDb21wb25lbnRzKGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0RmxhZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChzZXR0aW5nLmlkLCBuZXcgU2V0dGluZ1VJRmxhZyhzZXR0aW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIEFycmF5LmZyb20odGhpcy5jdXN0b21GbGFncy52YWx1ZXMoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5zZXQoXG4gICAgICAgICAgICAgICAgc2V0dGluZy5pZCxcbiAgICAgICAgICAgICAgICBuZXcgU2V0dGluZ1VJRmxhZzxGbGFnc0lkc0V4dGVuZGVkPihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldFRleHRTZXR0aW5ncygpKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRQYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmcuaWQsIG5ldyBTZXR0aW5nVUlUZXh0KHNldHRpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldE51bWVyaWNTZXR0aW5ncygpKSB7XG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuc2V0KFxuICAgICAgICAgICAgICAgIHNldHRpbmcuaWQsXG4gICAgICAgICAgICAgICAgbmV3IFNldHRpbmdVSU51bWJlcihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldE9wdGlvblNldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLnNldChcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgIG5ldyBTZXR0aW5nVUlPcHRpb24oc2V0dGluZylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIERPTSBlbGVtZW50cyBmb3IgYSBzZXR0aW5ncyBzZWN0aW9uIHdpdGggYSBoZWFkaW5nLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc0VsZW0gVGhlIHBhcmVudCBjb250YWluZXIgZm9yIG91ciBET00gZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHNlY3Rpb25IZWFkaW5nIFRoZSBoZWFkaW5nIGVsZW1lbnQgdG8gZ28gaW50byB0aGUgc2VjdGlvbi5cbiAgICAgKiBAcmV0dXJucyBUaGUgY29uc3RydWN0ZWQgRE9NIGVsZW1lbnQgZm9yIHRoZSBzZWN0aW9uLlxuICAgICAqL1xuICAgIGJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKHNldHRpbmdzRWxlbTogSFRNTEVsZW1lbnQsIHNlY3Rpb25IZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gbWFrZSBzZWN0aW9uIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc2VjdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgIHNlY3Rpb25FbGVtLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gbWFrZSBzZWN0aW9uIGhlYWRpbmdcbiAgICAgICAgY29uc3QgcHNTZXR0aW5nc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwc1NldHRpbmdzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzSGVhZGVyJyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtdGV4dCcpO1xuICAgICAgICBwc1NldHRpbmdzSGVhZGVyLnRleHRDb250ZW50ID0gc2VjdGlvbkhlYWRpbmc7XG5cbiAgICAgICAgLy8gYWRkIHNlY3Rpb24gYW5kIGhlYWRpbmcgdG8gcGFyZW50IHNldHRpbmdzIGVsZW1lbnRcbiAgICAgICAgc2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQocHNTZXR0aW5nc0hlYWRlcik7XG4gICAgICAgIHNldHRpbmdzRWxlbS5hcHBlbmRDaGlsZChzZWN0aW9uRWxlbSk7XG4gICAgICAgIHJldHVybiBzZWN0aW9uRWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCBmbGFncyB3aXRoIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGFuZCBhZGQgdGhlbSB0byB0aGUgYENvbmZpZy5mbGFnc2AgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc0VsZW0gLSBUaGUgZWxlbWVudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaW5kaXZpZHVhbCBzZXR0aW5ncyBzZWN0aW9ucywgZmxhZ3MsIGFuZCBzbyBvbi5cbiAgICAgKi9cbiAgICBwb3B1bGF0ZVNldHRpbmdzRWxlbWVudChzZXR0aW5nc0VsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIC8qIFNldHVwIGFsbCBQaXhlbCBTdHJlYW1pbmcgc3BlY2lmaWMgc2V0dGluZ3MgKi9cbiAgICAgICAgY29uc3QgcHNTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1BpeGVsIFN0cmVhbWluZydcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBtYWtlIHNldHRpbmdzIHNob3cgdXAgaW4gRE9NXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RleHQoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5nZXQoVGV4dFBhcmFtZXRlcnMuU2lnbmFsbGluZ1NlcnZlclVybClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoT3B0aW9uUGFyYW1ldGVycy5TdHJlYW1lcklkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkF1dG9Db25uZWN0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkF1dG9QbGF5VmlkZW8pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQnJvd3NlclNlbmRPZmZlcilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLCBcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuVXNlTWljKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlN0YXJ0VmlkZW9NdXRlZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5QcmVmZXJTRlUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuSXNRdWFsaXR5Q29udHJvbGxlcilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Gb3JjZU1vbm9BdWRpbylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Gb3JjZVRVUk4pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuU3VwcHJlc3NCcm93c2VyS2V5cylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5BRktEZXRlY3Rpb24pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuQUZLVGltZW91dFNlY3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWF4UmVjb25uZWN0QXR0ZW1wdHMpXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIHZpZXcvdWkgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3Qgdmlld1NldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnVUknXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICB2aWV3U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5NYXRjaFZpZXdwb3J0UmVzb2x1dGlvbilcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgdmlld1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuSG92ZXJpbmdNb3VzZU1vZGUpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyh2aWV3U2V0dGluZ3NTZWN0aW9uLCB0aGlzLmZsYWdzVWkuZ2V0KExpZ2h0TW9kZSkpO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCBlbmNvZGVyIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IGlucHV0U2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdJbnB1dCdcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuS2V5Ym9hcmRJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLk1vdXNlSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Ub3VjaElucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuR2FtZXBhZElucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuWFJDb250cm9sbGVySW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIGVuY29kZXIgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3QgZW5jb2RlclNldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnRW5jb2RlcidcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWluUVApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBlbmNvZGVyU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5NYXhRUClcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRDb2RlY09wdGlvbiA9IHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChcbiAgICAgICAgICAgIE9wdGlvblBhcmFtZXRlcnMuUHJlZmVycmVkQ29kZWNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChPcHRpb25QYXJhbWV0ZXJzLlByZWZlcnJlZENvZGVjKVxuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmVmZXJyZWRDb2RlY09wdGlvbiAmJlxuICAgICAgICAgICAgWy4uLnByZWZlcnJlZENvZGVjT3B0aW9uLnNlbGVjdG9yLm9wdGlvbnNdXG4gICAgICAgICAgICAgICAgLm1hcCgobykgPT4gby52YWx1ZSlcbiAgICAgICAgICAgICAgICAuaW5jbHVkZXMoJ09ubHkgYXZhaWxhYmxlIG9uIENocm9tZScpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcHJlZmVycmVkQ29kZWNPcHRpb24uZGlzYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIHdlYnJ0YyByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCB3ZWJydGNTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1dlYlJUQydcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENGUFMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICB3ZWJydGNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLldlYlJUQ01pbkJpdHJhdGUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICB3ZWJydGNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLldlYlJUQ01heEJpdHJhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgU2V0dGluZ1RleHQgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCB0ZXh0IGluIHRoZSB0ZXh0IHNldHRpbmdzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ1RleHQgVGhlIHRleHR1YWwgc2V0dGluZ3Mgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdUZXh0KFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nVGV4dD86IFNldHRpbmdVSVRleHRcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmdUZXh0KSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZ1RleHQucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy50ZXh0UGFyYW1ldGVyc1VpLnNldChzZXR0aW5nVGV4dC5zZXR0aW5nLmlkLCBzZXR0aW5nVGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBTZXR0aW5nRmxhZyBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IGZsYWcgaW4gdGhlIENvbmZpZy5mbGFnIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdGbGFnKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nRmxhZz86IFNldHRpbmdVSUZsYWc8RmxhZ3NJZHNFeHRlbmRlZD5cbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmdGbGFnKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZ0ZsYWcucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChzZXR0aW5nRmxhZy5zZXR0aW5nLmlkLCBzZXR0aW5nRmxhZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBudW1lcmljIHNldHRpbmcgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCBmbGFnIGluIHRoZSBDb25maWcubnVtZXJpY1BhcmFtZXRlcnMgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1NlY3Rpb24gVGhlIHNldHRpbmdzIHNlY3Rpb24gSFRNTCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBzZXR0aW5nRmxhZyBUaGUgc2V0dGluZ3MgZmxhZyBvYmplY3QuXG4gICAgICovXG4gICAgYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmc/OiBTZXR0aW5nVUlOdW1iZXJcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5zZXR0aW5nLmlkLCBzZXR0aW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBlbnVtIGJhc2VkIHNldHRpbmdzIGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgZmxhZyBpbiB0aGUgQ29uZmlnLmVudW1QYXJhbWV0ZXJzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdPcHRpb24oXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmc/OiBTZXR0aW5nVUlPcHRpb25cbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLnNldChzZXR0aW5nLnNldHRpbmcuaWQsIHNldHRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZXR0aW5nc0NoYW5nZWQoeyBkYXRhOiB7IGlkLCB0YXJnZXQsIHR5cGUgfSB9OiBTZXR0aW5nc0NoYW5nZWRFdmVudCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBGbGFnc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ0ZsYWc7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5mbGFnc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5mbGFnICE9PSBfdGFyZ2V0LmZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5mbGFnID0gX3RhcmdldC5mbGFnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIE51bWVyaWNQYXJhbWV0ZXJzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nTnVtYmVyO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubnVtYmVyICE9PSBfdGFyZ2V0Lm51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLm51bWJlciA9IF90YXJnZXQubnVtYmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBUZXh0UGFyYW1ldGVyc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ1RleHQ7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy50ZXh0UGFyYW1ldGVyc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy50ZXh0ICE9PSBfdGFyZ2V0LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy50ZXh0ID0gX3RhcmdldC50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIE9wdGlvblBhcmFtZXRlcnNJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdPcHRpb247XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVpT3B0aW9ucyA9IHNldHRpbmcub3B0aW9ucztcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRPcHRpb25zID0gX3RhcmdldC5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdWlPcHRpb25zLmxlbmd0aCAhPT0gdGFyZ2V0T3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgIXVpT3B0aW9ucy5ldmVyeSgodmFsdWUpID0+IHRhcmdldE9wdGlvbnMuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLm9wdGlvbnMgPSBfdGFyZ2V0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLnNlbGVjdGVkICE9PSBfdGFyZ2V0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcuc2VsZWN0ZWQgPSBfdGFyZ2V0LnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGZsYWcgaXMgdG9nZ2xlZC5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBvbkNoYW5nZUxpc3RlbmVyIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgYWRkQ3VzdG9tRmxhZ09uU2V0dGluZ0NoYW5nZWRMaXN0ZW5lcihcbiAgICAgICAgaWQ6IEV4dHJhRmxhZ3MsXG4gICAgICAgIG9uQ2hhbmdlTGlzdGVuZXI6IChuZXdGbGFnVmFsdWU6IGJvb2xlYW4pID0+IHZvaWRcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmxhZ3MuaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GbGFncy5nZXQoaWQpLm9uQ2hhbmdlID0gb25DaGFuZ2VMaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgZm9yIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZsYWcuXG4gICAgICogQHBhcmFtIGxhYmVsIFRoZSBuZXcgbGFiZWwgdG8gdXNlIGZvciB0aGUgZmxhZy5cbiAgICAgKi9cbiAgICBzZXRDdXN0b21GbGFnTGFiZWwoaWQ6IEV4dHJhRmxhZ3MsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUZsYWdzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIExvZ2dlci5XYXJuaW5nKFxuICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgYENhbm5vdCBzZXQgbGFiZWwgZm9yIGZsYWcgY2FsbGVkICR7aWR9IC0gaXQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIENvbmZpZy5mbGFncyBtYXAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChpZCkubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gZmxhZyB3aGljaCBoYXMgdGhlIGdpdmVuIGlkLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdW5pcXVlIGlkIGZvciB0aGUgZmxhZy5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBmbGFnIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgaXNDdXN0b21GbGFnRW5hYmxlZChpZDogRXh0cmFGbGFncyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21GbGFncy5nZXQoaWQpLmZsYWcgYXMgYm9vbGVhbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBTZXR0aW5nQmFzZSB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGEgc2V0dGluZyB0aGF0IGhhcyBhIHRleHQgbGFiZWwsIGFuIGFyYml0cmFyeSBzZXR0aW5nIHZhbHVlIGl0IHN0b3JlcywgYW4gYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdVSUJhc2Uge1xuICAgIF9zZXR0aW5nOiBTZXR0aW5nQmFzZTtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ0Jhc2UpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZyA9IHNldHRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIEZsYWdzSWRzLFxuICAgIFNldHRpbmdGbGFnXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlGbGFnPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IEZsYWdzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgLyogV2UgdG9nZ2xlIHRoaXMgY2hlY2tib3ggdG8gcmVmbGVjdCB0aGUgdmFsdWUgb2Ygb3VyIHNldHRpbmcncyBib29sZWFuIGZsYWcuICovXG4gICAgX2NoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50OyAvLyBpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIG9uQ2hhbmdlRW1pdDogKGNoYW5nZWRWYWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdGbGFnPEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMuZmxhZyA9IHNldHRpbmcuZmxhZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdGbGFnPEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nRmxhZzxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcuX2xhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNoZWNrYm94KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2NoZWNrYm94KSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tib3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9IHRoaXMuc2V0dGluZy5pZDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmNsYXNzTGlzdC5hZGQoJ3RnbC1zd2l0Y2gnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBpbnB1dCB0eXBlPWNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5jbGFzc0xpc3QuYWRkKCd0Z2wnKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guY2xhc3NMaXN0LmFkZCgndGdsLWZsYXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3RnbC1zbGlkZXInKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmNoZWNrYm94KTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZChzbGlkZXIpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbiBjaGFuZ2UgZnJvbSBjaGVja2JveFxuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5mbGFnICE9PSB0aGlzLmNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLmZsYWcgPSB0aGlzLmNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5nJ3Mgc3RvcmVkIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpblZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZmxhZyhpblZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3guY2hlY2tlZCA9IGluVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGdldCBmbGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2JveC5jaGVja2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIE51bWVyaWNQYXJhbWV0ZXJzSWRzLFxuICAgIFNldHRpbmdOdW1iZXJcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG4vKipcbiAqIEEgbnVtYmVyIHNwaW5uZXIgd2l0aCBhIHRleHQgbGFiZWwgYmVzaWRlIGl0LlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJTnVtYmVyPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IE51bWVyaWNQYXJhbWV0ZXJzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgX3NwaW5uZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ051bWJlcjxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMubnVtYmVyID0gdGhpcy5zZXR0aW5nLm51bWJlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSFRNTElucHV0RWxlbWVudCBmb3IgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNwaW5uZXIoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3Bpbm5lcikge1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLnR5cGUgPSAnbnVtYmVyJztcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIubWluID0gdGhpcy5zZXR0aW5nLm1pbi50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci5tYXggPSB0aGlzLnNldHRpbmcubWF4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLnZhbHVlID0gdGhpcy5zZXR0aW5nLm51bWJlci50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1jb250cm9sJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwaW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtLWdyb3VwJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb25jaGFuZ2VcbiAgICAgICAgICAgIHRoaXMuc3Bpbm5lci5vbmNoYW5nZSA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyLnBhcnNlSW50KGlucHV0RWxlbS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuV2FybmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBgQ291bGQgbm90IHBhcnNlIHZhbHVlIGNoYW5nZSBpbnRvIGEgdmFsaWQgbnVtYmVyIC0gdmFsdWUgd2FzICR7aW5wdXRFbGVtLnZhbHVlfSwgcmVzZXR0aW5nIHZhbHVlIHRvICR7dGhpcy5zZXR0aW5nLm1pbn1gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcubnVtYmVyICE9PSB0aGlzLnNldHRpbmcubWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcubnVtYmVyID0gdGhpcy5zZXR0aW5nLm1pbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcubnVtYmVyICE9PSBwYXJzZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLm51bWJlciA9IHBhcnNlZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBudW1iZXIgaW4gdGhlIHNwaW5uZXIgKHdpbGwgYmUgY2xhbXBlZCB3aXRoaW4gcmFuZ2UpLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbnVtYmVyKG5ld051bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3Bpbm5lci52YWx1ZSA9IHRoaXMuc2V0dGluZy5jbGFtcChuZXdOdW1iZXIpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGdldCBudW1iZXIoKSB7XG4gICAgICAgIHJldHVybiArdGhpcy5zcGlubmVyLnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgU2V0dGluZ09wdGlvblxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJT3B0aW9uPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IE9wdGlvblBhcmFtZXRlcnNJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICAvKiBBIHNlbGVjdCBlbGVtZW50IHRoYXQgcmVmbGVjdHMgdGhlIHZhbHVlIG9mIHRoaXMgc2V0dGluZy4gKi9cbiAgICBfc2VsZWN0b3I6IEhUTUxTZWxlY3RFbGVtZW50OyAvLyA8c2VsZWN0Pjwvc2VsZWN0PlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnNldHRpbmcub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2V0dGluZy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdG9yKCk6IEhUTUxTZWxlY3RFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3Mtb3B0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9IHRoaXMuc2V0dGluZy5pZDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tZ3JvdXAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbiBjaGFuZ2UgZnJvbSBzZWxlY3RvclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdG9yLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnModmFsdWVzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlbGVjdG9yLm9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IucmVtb3ZlKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWVzLmZvckVhY2goKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBvcHQuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLmFwcGVuZENoaWxkKG9wdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnNlbGVjdG9yLm9wdGlvbnNdLm1hcCgobykgPT4gby52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZWxlY3RlZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIEEgdXNlciBtYXkgbm90IHNwZWNpZnkgdGhlIGZ1bGwgcG9zc2libGUgdmFsdWUgc28gd2UgaW5zdGVhZCB1c2UgdGhlIGNsb3Nlc3QgbWF0Y2guXG4gICAgICAgIC8vIGVnID94eHg9SDI2NCB3b3VsZCBzZWxlY3QgJ0gyNjQgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MTtwYWNrZXRpemF0aW9uLW1vZGU9MTtwcm9maWxlLWxldmVsLWlkPTQyMDAxZidcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICAgIChvcHRpb246IHN0cmluZykgPT4gb3B0aW9uLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICAgICAgICApO1xuICAgICAgICBpZiAoZmlsdGVyZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci52YWx1ZSA9IGZpbHRlcmVkTGlzdFswXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIFNldHRpbmdUZXh0LFxuICAgIFRleHRQYXJhbWV0ZXJzSWRzXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlUZXh0PFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IFRleHRQYXJhbWV0ZXJzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgLyogQSB0ZXh0IGJveCB0aGF0IHJlZmxlY3RzIHRoZSB2YWx1ZSBvZiB0aGlzIHNldHRpbmcuICovXG4gICAgX3RleHRib3g6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGlucHV0IHR5cGU9XCJ0ZXh0XCJcblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nVGV4dDxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuc2V0dGluZy50ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ1RleHQ8Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdUZXh0PEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0ZXh0Ym94KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3RleHRib3gpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveC5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHRib3gudHlwZSA9ICd0ZXh0Ym94JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dGJveDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gdGhpcy5zZXR0aW5nLmlkO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgaW5wdXQgdHlwZT1jaGVja2JveFxuICAgICAgICAgICAgdGhpcy50ZXh0Ym94LnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMudGV4dGJveCk7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uIGNoYW5nZSBmcm9tIGNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLnRleHRib3guYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy50ZXh0ICE9PSB0aGlzLnRleHRib3gudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnRleHQgPSB0aGlzLnRleHRib3gudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5nJ3Mgc3RvcmVkIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpblZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgdGV4dChpblZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50ZXh0Ym94LnZhbHVlID0gaW5WYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRib3gudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBTaG93IGFuIG92ZXJsYXkgZm9yIHdoZW4gdGhlIHNlc3Npb24gaXMgdW5hdHRlbmRlZCwgaXQgYmVnaW5zIGEgY291bnRkb3duIHRpbWVyLCB3aGljaCB3aGVuIGVsYXBzZWQgd2lsbCBkaXNjb25uZWN0IHRoZSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBBRktPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgYWZrT3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWZrT3ZlcmxheUh0bWwuaWQgPSAnYWZrT3ZlcmxheSc7XG4gICAgICAgIGFma092ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBhZmtPdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHNvbWUgdGV4dCBmb3IgYW4gYWZrIGNvdW50IGRvd24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGFma092ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWZrT3ZlcmxheUh0bWxJbm5lci5pZCA9ICdhZmtPdmVybGF5SW5uZXInO1xuICAgICAgICBhZmtPdmVybGF5SHRtbElubmVyLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGNlbnRlcj5ObyBhY3Rpdml0eSBkZXRlY3RlZDxicj5EaXNjb25uZWN0aW5nIGluIDxzcGFuIGlkPVwiYWZrQ291bnREb3duTnVtYmVyXCI+PC9zcGFuPiBzZWNvbmRzPGJyPkNsaWNrIHRvIGNvbnRpbnVlPGJyPjwvY2VudGVyPic7XG4gICAgICAgIHJldHVybiBhZmtPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBBZmsgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IHRoZSBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm9vdERpdjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb290RGl2LFxuICAgICAgICAgICAgQUZLT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgQUZLT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBjb3VudCBkb3duIHNwYW5zIG51bWJlciBmb3IgdGhlIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY291bnRkb3duIHRoZSBjb3VudCBkb3duIG51bWJlciB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBzcGFuIGZvciB1cGRhdGluZ1xuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVDb3VudGRvd24oY291bnRkb3duOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSBgPGNlbnRlcj5ObyBhY3Rpdml0eSBkZXRlY3RlZDxicj5EaXNjb25uZWN0aW5nIGluIDxzcGFuIGlkPVwiYWZrQ291bnREb3duTnVtYmVyXCI+JHtjb3VudGRvd259PC9zcGFuPiBzZWNvbmRzPGJyPkNsaWNrIHRvIGNvbnRpbnVlPGJyPjwvY2VudGVyPmA7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5cbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9CYXNlT3ZlcmxheSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSBiYXNlIGFjdGlvbiBvdmVybGF5IHN0cnVjdHVyZVxuICovXG5leHBvcnQgY2xhc3MgQWN0aW9uT3ZlcmxheSBleHRlbmRzIE92ZXJsYXlCYXNlIHtcbiAgICBvbkFjdGlvbkNhbGxiYWNrOiAoLi4uYXJnczogW10pID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gYWN0aW9uIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcm9vdERpdiB0aGUgcm9vdCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKiBAcGFyYW0gcm9vdEVsZW1lbnQgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGlzIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIGNvbnRlbnRFbGVtZW50IGFuIGVsZW1lbnQgdGhhdCBjb250YWlucyB0ZXh0IGZvciB0aGUgYWN0aW9uIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICBzdXBlcihyb290RGl2LCByb290RWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvKiBkbyBub3RoaW5nICovIExvZ2dlci5JbmZvKFxuICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgJ0RpZCB5b3UgZm9yZ2V0IHRvIHNldCB0aGUgb25BY3Rpb24gY2FsbGJhY2sgaW4geW91ciBvdmVybGF5PydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB0ZXh0IG92ZXJsYXlzIGlubmVyIHRleHRcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdXBkYXRlIHRleHQgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0ZXh0ICE9IG51bGwgfHwgdGV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIG1ldGhvZCBhcyBhbiBldmVudCBlbWl0dGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIHRoZSBtZXRob2QgdGhhdCBpcyB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZFxuICAgICAqL1xuICAgIG9uQWN0aW9uKGNhbGxCYWNrOiAoLi4uYXJnczogW10pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5vbkFjdGlvbkNhbGxiYWNrID0gY2FsbEJhY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgYW4gZXZlbnQgdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgZXZlbnQgZW1pdHRlclxuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2soKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgYmFzZSBvdmVybGF5IHN0cnVjdHVyZVxuICovXG5leHBvcnQgY2xhc3MgT3ZlcmxheUJhc2Uge1xuICAgIHByb3RlY3RlZCByb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHJvb3REaXY6IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gb3ZlcmxheVxuICAgICAqIEBwYXJhbSByb290RGl2IHRoZSByb290IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqIEBwYXJhbSByb290RWxlbWVudCB0aGUgcm9vdCBlbGVtZW50IHRoYXQgaXMgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICB0aGlzLnJvb3REaXYgPSByb290RGl2O1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQgPSB0ZXh0RWxlbWVudDtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRleHRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMucm9vdERpdi5hcHBlbmRDaGlsZCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuU3RhdGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuU3RhdGUnKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBPdmVybGF5IHNob3duIGR1cmluZyBjb25uZWN0aW9uLCBoYXMgYSBidXR0b24gdGhhdCBjYW4gYmUgY2xpY2tlZCB0byBpbml0aWF0ZSBhIGNvbm5lY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0T3ZlcmxheSBleHRlbmRzIEFjdGlvbk92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3RFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbm5lY3RFbGVtLmlkID0gJ2Nvbm5lY3RPdmVybGF5JztcbiAgICAgICAgY29ubmVjdEVsZW0uY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgY29ubmVjdENvbnRlbnRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbm5lY3RDb250ZW50RWxlbS5pZCA9ICdjb25uZWN0QnV0dG9uJztcbiAgICAgICAgY29ubmVjdENvbnRlbnRFbGVtLmlubmVySFRNTCA9ICdDbGljayB0byBzdGFydCc7XG4gICAgICAgIHJldHVybiBjb25uZWN0Q29udGVudEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29ubmVjdCBvdmVybGF5IHdpdGggYSBjb25uZWN0aW9uIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgQ29ubmVjdE92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIENvbm5lY3RPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBPdmVybGF5IHNob3duIGR1cmluZyBkaXNjb25uZWN0aW9uLCBoYXMgYSByZWNvbm5lY3Rpb24gZWxlbWVudCB0aGF0IGNhbiBiZSBjbGlja2VkIHRvIHJlY29ubmVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIERpc2Nvbm5lY3RPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZGlzY29ubmVjdE92ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbC5pZCA9ICdkaXNjb25uZWN0T3ZlcmxheSc7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbC5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gZGlzY29ubmVjdE92ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gYnVpbGQgdGhlIGlubmVyIGh0bWwgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXNjb25uZWN0T3ZlcmxheUh0bWxDb250YWluZXIuaWQgPSAnZGlzY29ubmVjdEJ1dHRvbic7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lci5pbm5lckhUTUwgPSAnQ2xpY2sgVG8gUmVzdGFydCc7XG5cbiAgICAgICAgcmV0dXJuIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBkaXNjb25uZWN0IG92ZXJsYXkgd2l0aCBhIHJldHJ5IGNvbm5lY3Rpb24gaWNvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgRGlzY29ubmVjdE92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIERpc2Nvbm5lY3RPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBUZXh0T3ZlcmxheSB9IGZyb20gJy4vVGV4dE92ZXJsYXknO1xuXG4vKipcbiAqIEdlbmVyaWMgb3ZlcmxheSB1c2VkIHRvIHNob3cgdGV4dHVhbCBlcnJvciBpbmZvIHRvIHRoZSB1c2VyLlxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JPdmVybGF5IGV4dGVuZHMgVGV4dE92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVycm9yT3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZXJyb3JPdmVybGF5SHRtbC5pZCA9ICdlcnJvck92ZXJsYXknO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICd0ZXh0RGlzcGxheVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGVycm9yT3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBlcnJvck92ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZXJyb3JPdmVybGF5SHRtbElubmVyLmlkID0gJ2Vycm9yT3ZlcmxheUlubmVyJztcbiAgICAgICAgcmV0dXJuIGVycm9yT3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBFcnJvck92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIEVycm9yT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL1RleHRPdmVybGF5JztcblxuLyoqXG4gKiBHZW5lcmljIG92ZXJsYXkgdXNlZCB0byBzaG93IHRleHR1YWwgaW5mbyB0byB0aGUgdXNlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9PdmVybGF5IGV4dGVuZHMgVGV4dE92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGluZm9PdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWwuaWQgPSAnaW5mb092ZXJsYXknO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ3RleHREaXNwbGF5U3RhdGUnO1xuICAgICAgICByZXR1cm4gaW5mb092ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgaW5mb092ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5mb092ZXJsYXlIdG1sSW5uZXIuaWQgPSAnbWVzc2FnZU92ZXJsYXlJbm5lcic7XG4gICAgICAgIHJldHVybiBpbmZvT3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBJbmZvT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgSW5mb092ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gd2hlbiBzdHJlYW0gaXMgcmVhZHkgdG8gcGxheS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXlPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgcGxheUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGxheUVsZW0uaWQgPSAncGxheU92ZXJsYXknO1xuICAgICAgICBwbGF5RWxlbS5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gcGxheUVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyB0b2RvOiBjaGFuZ2UgdGhpcyB0byBhbiBzdmdcbiAgICAgICAgY29uc3QgcGxheU92ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuaWQgPSAncGxheUJ1dHRvbic7XG4gICAgICAgIHBsYXlPdmVybGF5SHRtbElubmVyLnNyYyA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFQRUFBQUQ1Q0FZQUFBRDJtTk5rQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUFaZEVWWWRGTnZablIzWVhKbEFIQmhhVzUwTG01bGRDQTBMakF1TWpIeElHbVZBQUFTZ2tsRVFWUjRYdTJkQzdCZFZYMkhxVUNDSVJBU0NQakFGSVFSRUJSQkJTUlliRk90OGxJckZVV1JGcVhXc1Q1d2JJdFVxRldzMEtxSU1QS29ZRVdwUlMwNktEalMxQmVWRmtWUWJDdyt3Q2ZpQXdHaENLV1A5UHVadFUyNHVUZTU5enoyMlkvdm0vbkdrWHR6N2pscnI5K3NkZlplYS8wM1diMTY5UXR4R1c2MmlZaTBEOEw3TmJ3WWo4RWRjZFB5SXhGcEE0VDJQL0YvOFVhOENJL0doUG5YeXErSVNKTWhyQWx4eFg5aFJ1WUw4U2g4U1BrMUVXa3FCSFhkRUZmY2c2dnczZmhzM0tiOHVvZzBEUUk2WFlncjhyT3ZZc0o4T000di8weEVta0lKNm9iNFA4eklmQU5lZ0N2UU1JczBCUUs1c1JCWEpNeS93SXpNNStCeVhGQmVSa1FtQlVHY2JZalg1UzVNbU0vQUEzQ0w4bklpVWpjRWNKQVFWOXlCWDhhL3dTZWl6NWhGNm9iZ0RSUGlrR2ZNQ2ZPWDhEVGN1N3kwaU5RQm9SczJ4QlgvZzNkaXd2d20zS244Q1JFWko0UnRWQ0d1cU1LY3U5a240eEowOVpmSXVDQmdvdzV4eUozc1RMTnpBeXdyd0Y2SjI2TmhGaGsxQkdzY0lWNlhoUGx1dkE2UHh4M0tueGFSVVVDb3hoM2lpb1E1ejVuL0JZL0ZKZVV0aU1nd0VLYTZRbHlSTU4rSG44SG40WmJscllqSUlCQ2l1a01jOHAyNVdzNlpNRCt6dkIwUm1Tc0VhQklobmtyZXc1VjRFSHJDaU1oY0tBRnFDditObCtKK3VCQzlteTJ5TVFoS2swSmNrZS9NNzhHc3kwNllIMVRlcm9oTWhZQTBNY1FWUDhOejhVRGNDbDJiTFRJVmd0SGtFRmQ4RDgvRS9YRnJkR1FXcVNBUWJRaHh5S09wbS9CMDNBYzlNa2drRUlhMmhMZ2lONzhTNWxQeDBiZ0l2UUVtL1lVQXRDM0VGUW56emZnbnVEYzZ6WlorUXNkdmE0alg1U3Y0YXR3WEhabWxYOURodXhEaWtDMlFuOGRYWVVibVJlVWppblFiT250WFFseVJUUmFmd2xkZ3dyeFYrYWdpM1lSTzNyVVFWL3djVitMTDhESG95WnpTVGVqY1hRMXhSYzcvdWh5emwza3YzTHg4ZEpGdVFLZnVlb2hEbmpGblpQNG8vajdtMFpRSDRFczNvRFAzSWNRVjJmNllNRitDT1pqZ1VlaVoyZEp1Nk1SOUN2RzYzSUx2eDR6TUNmTzgwaVFpN1lMTzI5Y1FWM3diMzRzcHNyNHJ1bUJFMmdXZHR1OGhEbG45OVMxTVhlWVg0TTZsZVVTYUR4M1dFSzhsUmRZVDVsUi96UGxmbnN3cHpZZU9hb2pYSjRjU2ZCM1B3K2ZndHVnMFc1b0puZE1RVDAvdVpHZWFYWlZ5ZlRadVY1cE5wRG5RTVEzeHhzazBPOVVmejhaRGNkdlNmQ0tUaHc1cGlHZFAyaW9GNDk2SlQwYzNXY2prS1IxVDVrWVdqQ1RNNzhEZlFoZU15T1NnQXhyaXdjaDM1bFIvdkFiUHdPWG96UytwSHpxZUlSNk9hbDEyd3Z4MmZCeTZ5VUxxZ3c1bmlFZER3cHlSK1ZwTWtmWHNtSElwcDR3Zk9wb2hIajIzNFJmd0ZOd0RuV2JMK0tDREdlTHhrSkg1cDNnMXZnNTNLMDB1TWxyb1hJWjR2R1RCU01KOEZlWmt6bVdsNlVWR0E1M0tFTmZEL1ppeU5DbXludk8vRnBkTElESWNkQ1pEWEM4Wm1mT2QrZC93SmVqWlh6SWNkQ0pEWEQ5NXhwd2pkblArVjc0ekg0V3UvcExCb1BNWTRzbVNNTitGS2JKK0JCcG1tUnQwR2tQY0RCTG11L0ZqZUFpNmxGTm1CNTNGRURlSFRMUHphQ29qODBkd0JmcU1XVFlNbmNRUU41ZXNBUHN3N2xjdWw4ajYwRUVNY2ZQSkRiRDNZVTdsM0t4Y09wRTEwQ2tNY1R2SVZEdmZtYy9FM1hFTHRQcWpHT0tXa2hWZ3ArR2VtREQ3dmJuUDBBRU1jWHRKa2ZVMzRHTnhBVG95OXhFdXZDRnVQNnZ3Sk15T3FZWGwwa3BmNEtJYjRtNVFuY3laVFJhcFpHR1krd0lYMnhCM2kzdnhPc3dtaTEzUWFYYlg0UUliNG02U1kzYS9pTWRoN21ZYjVxN0NoVFhFM2FYYWFMRVNxN3JNVzVaTEwxMkJpMnFJKzhFOWVEa216THVoWWU0S1hFeEQzQjh5TXQrT2wrS0wwQ0xyWFlDTGFJajdSOEo4SzE2Q1I2UExPZHNNRjg4UTk1ZnNtUG9SWG96UHhkek5kdlZYMitDaUdXTEp6YStFT1hXWmo4U2QwQVB3MndJWHl4QkxxUFl5MzRMblk4SzhEQTF6MCtFaUdXS1pTZ0o5STc0TFUyUjlSM1NhM1ZTNE9JWllacUpheW5rV3BzajZ3MHUza1NiQmhUSEVzakh1d3hzd3BWd1B3NldsKzBnVDRJSVlZcGtObVdLbnIxeVBxZjU0S0c1VnVwRk1rbkpoUkdaTHdwelZYNm4rK0RaOEdycGphcEp3QVF5eERFTENuQjFUcVdUeDEvZ1VkR1NlQkRTOElaWkJTWkJqenY3NlBQNFZIb1NHdVU1b2NFTXNveUJoVHNHNFZIOThJeDZBODBzM2szRkNReHRpR1NWWk1QSVQvQ3dtelB1aHo1akhDUTFzaUdVY1pDbG53dnhwUEFYM0xGMU9SZzJOYTRobFhHU0tuUVVqQ2ZObjhQWDRDTnkwZEQ4WkJUU29JWlp4a3pCWEkvUG44QVRNdW16RFBBcG9TRU1zZFpFdzV6dnpEekhUN0pkand1elpYOE5BQXhwaW1RU1paaWZNbjhUajhhR2xTOHBjb2ZFTXNVeUtqTXc1bFRPbmpId2NjMlRRa3RJMVpiYlFhSVpZSmszQ25FMFdHWm12d09laCs1aG5DNDFsaUtVcFZDTnp3dndKUEJ5OStiVXhhQ1JETEUwalliNGZVLzB4MCt5RDhjR2x5OHBVYUJ4RExFMGtRYTdDZkNmbU1MOEQwU04ycDBLakdHSnBPZ2x6dFdna2gvazlDVDFpdDRMR01NVFNGaExtTEJySjNleHpjSi9TamZzTkRXR0lwWTBrMEQvQU0vR1JwVHYzRXhyQUVFdWJxVmFBblk1THNYOTNzL25RaGxpNlFMVUY4bldZSTNibllUK1djL0pCRGJGMGhlcU85amZ3bGZoSW5JL2REak1mMEJCTEYwbVlyOE5zc2tpTnFTMndtMkhtZ3hsaTZUSjV6cHdqZy80UWQ4YnVMUnJoUXhsaTZRTTVaamRIQmgySCtjN2NuVVVqZkJoRExIMGhVK3k3Y0NVK0g3T1hlVjZKUW52aFF4aGk2UnNKYzBibXkvQlorTXNiWUNVUzdZTTNiNGlscnlUTTJRTDVRVXpCdUh4bmJ0ODBtemR0aUVWV3I3NE5MOEtVY2syUjlmYU16THhaUXl5eWhvek1XY3A1SWY0dUpzek5QNXlBTjJtSVJSNUlWbi9kak9maEVkanN3L3g0YzRaWVpIcnlqUGttUEJzUHdZZVYyRFFMM3BnaEZwbVpUTEZ6WkZEQ25Mck16OER0c1RrYkxYZ3pobGhrNHlUTTJjdThDck5qS2lOendqejVPbE84Q1VNc01qY1M1cXpMZmd1bXlQcjJKVTZUZ1RkZ2lFVUdveXF5bnJyTXY0MlRPVE9iUDJ5SVJRWW4wK3dzNWJ3YVU4cjFOM0hyRXE5NjRBOGFZcEhoU1pqdndCU01TNWdQd25yV1pmT0hETEhJNk1nejVoeXhtNEp4ZjRrSDRIakR6Qjh3eENLakoySE9OUHVmOGM5eEh4elBYbVplMkJDTGpJZE1zV01xV2Z3VG5vaVB3ZEdPekx5Z0lSWVpQd2x6VldQcXRiZ1hqbWJCQ0M5a2lFWHFJOCtZczhuaWNud043bGFpT0RpOGlDRVdxWmVNeWxtWG5UQ25ZRnhPNXR5eFJITHU4SThOc2Noa1NKaXpMdnY3bUpINXBiZ1k1N1pqaW45Z2lFVW1TelV5Znc5VFpQMVkzTFpFZE9Qd3k0WllwQmtrektuKytCMzhLQjZGMjVXb3pneS9aSWhGbWtYQ25MTy92b3Nmd3B3eXNxaEVkbjM0b1NFV2FTWUo4eTh3MCt3UDRHRzQvb0lSL3FNaEZtazJWWmd6elU2WXMyTnE3VDVtL284aEZta0hDWE8yUHliTUYrTysrQ0JETE5JdUV1U3N5ODUzNWx2eFpFTXMwajZxV3N6WkpiWFVFSXUwaTF2d3JaaHFGWnY1blZpa1BXVHFmQTVtRjlRREQrZmpQeGhpa2VhUjc3N3hkcndBbjFBaXV6NzgwQkNMTkl2c2RNcUJBcWtOdFJ3M1hCZUtYekRFSXBNbm8yN0NlemRlaWsvR0JTV21HNFpmTk1RaWt5UGh6WHJwVkdYTTZSOHJjRzdsVmZrSGhsaWtmaExlN0Z6S282S1YrSHU0NW03elhPRWZHbUtSZXNrZTRvVDNrM2dNYmxuaU9CaThnQ0VXcVllTXZEL0dLL0Y0M0tIRWNEaDRJVU1zTWw1eXcrcEhtTE9vWDRhREg4VXpIYnlnSVJZWkQvbmVtNUgzS2p3QmQ4TFJWMUhrUlEyeHlHakozZWFjTloxaWF5ZmhyK1A0NmhuejRvWllaRFJrMnB6d3BoN1RYK0N1T1A3Nnhmd1JReXd5SE5sVlZJWDNWSHg4aVZjOThBY05zY2pnWkpGR3lwcStHZmZId1o3MURnTi8xQkNMekoyZjQ3L2lXekJsVElkNzFqc00vSEZETERJN2NyZjVIcndHMzRZSFk3MEZ4YWVETjJHSVJUWk13cHZqY0s3RmQrQlRjZkxocmVETkdHS1JtY25JZXoyK0V3L0ZoVGkzTWl2amhqZGtpRVhXSjBmRWZoWFB3bWZpNGhLWjVzR2JNOFFpYThuNjVsWDRMa3psaFllVnFEUVgzcVFoRmxuenJQYy84RnpNdHNCbDJLeHA4MHp3UmcyeDlKMGN4bjRlcG9CWmxralcvNngzR0hqRGhsajZTSlpJNWdUSjkrRHpNZUhkdk1TaVhmREdEYkgwaVdwYllNcWdKTHk3WUx0RzNxbndBUXl4OUlWc0M3d0VYNEM3NC9oMkZ0VUpIOFFRUzlmSlVUZzVRZkk0M0FQbmxlN2ZEZmhBaGxpNlNvNS8vUmkrR0JQZXlhMXZIaWQ4TUVNc1hTTUgwWDBDWDRKNzRjTFMzYnNKSDlBUVMxZklUYXZzNmYxVmVMRWR6M3FIZ1E5cGlLWHRaSE5DMWpmbkVMcGZUcHV4KytHdDRNTWFZbWtybVRaL0dWK0xDVyszcDgwendRYzN4Tkkyc2tUeUJzd2hkSHRpYzdZRlRnSWF3QkJMbTdnUlQ4SEg0ZGJZbjJuelROQUlobGphUUNya3Z3a1QzdHl3R3Y4cGttMkJ4akRFMGxSeW9rYk9zam9EVXlFL042d003MVJvRkVNc1RTUGh2UlBmalkvR0JlaTBlU1pvSEVNc1RlSjIvQUR1ZyszY1ZWUTNOSlFobGlhUWtmY2Y4U25vcURzWGFEQkRMSk1pajRydXhjdndhZWpJT3dnMG5DR1d1c255eUlUM0Nqd00rN2xJWTFUUWdJWlk2aUEzcXpMeVptZFJTbjBlaWMwOVFiSk4wSkNHV01aSndwdVI5dzc4RXI0UXU3a2xjRkxRb0laWXhrWHE5T1p1YzJvV1pYTkN2NWRIamdzYTFoRExxS25DbTJxQjJaencwTkxkWkJ6UXdJWllSa1dtelQvRGhQZEUzS1YwTXhrbk5MUWhsbUhKOTk2RU53WEhzamtocTZ4Y0hsa1hOTFlobGtGSmVIUERLaHZ5c3praDRXMzM4YTl0aEVZM3hESlg4cWdvR3hNUzN0VHBmU3pPTDExSzZvYkdOOFF5V3hMZUxJL010RG1sUHZkSHA4MlRob3RnaUdVMlpPU3R3cnNDWFNMWkZMZ1lobGcyeEYyWWM2ek94cWVqQ3pXYUJoZkZFTXQwcE1qMlZ6QjFlZy9CSmFYTFNOUGc0aGhpcWNqZDVpelVTSVg4bFBwOEZpNHRYVVdhQ2hmSkVFdEloZndVMmI0UVUyUjdPM1JmYnh2Z1FobmlmcE9EMTcrSkNXOUtmUzVGN3ppM0NTNllJZTRuT1hqOVcvaDNlQXcrdkhRSmFSdGNQRVBjTC9LczkyYThDSS9GWGRGcGM1dmhBaHJpL3ZCOS9IdjhBM3dVdWtTeUMzQWhEWEgzK1NuK0F4NlBxWkR2RXNrdXdRVTF4TjJrT2dvbkowaW0xR2MySjJ4UkxydDBDUzZzSWU0VzFjNmlqMk5HM2xST21GY3V0M1FSTHJBaDdnNEo3NVg0UjdnM0d0NCt3SVUyeE8wbjArWlA0YXN3QmNkYzM5d251T0NHdUwza1dlL244RFc0THk0cWwxWDZCQmZlRUxlVEwrQUorQVRjQm4zVzIxZTQrSWE0UGVTTzg5ZndUL0dKdUFoZEl0bDM2QVNHdVBsa1o5RzM4ZldZbzNBeThocGVXUU9kd1JBM2x4d0JleE8rR1ZQcTA3SW5zajUwREVQY1RMSysrZTJZYzZ3V285OTVaWHJvSElhNFdkeUtPUXBuT1diYXZHbTVWQ0xUUXljeHhNMGdwMGllajAvRzNMQXl2REk3NkN5R2VISlV4K0c4SHc5RXd5dHpoMDVqaUNkRERxSzdIQS9BaGVoM1hoa01PbzhocnBlMDk2ZnhkOUQ5dkRJOHBWUEorTGtYUDR2UFFhZk1NanJvVUlaNGZPUTdiOVkzWDRVNXg4b2kyeko2NkZpR2VQUmtlV1JPa2Z3aUhvZWUzU3pqZ3c1bWlFZERSdDE0RCtidzlaZmpEcVdaUmNZSEhjMFFEMDkxRkU2T2dQMHo5T0IxcVE4Nm15RWVuS3h0VG5nejhyNEJIWG1sZnVoNGhuanVKTHdwOVpscWdhZmg3cVU1UmVxSERtaUlaMCttelZrZWVRTytGUjlmbWxGa2N0QVJEZkhzU0ozZWY4ZHFaNUdIMEVrem9ETWE0cG5KM2VhMFQwN1RPQWV6dm5sQmFUcVJabEE2cVR5UWhEZHJtMWZoQlhnd0dsNXBKblJPUTd5VzZqbHZ3dnRlZkFadVhwcEtwSm1VVGl0cnA4MHA5Wm4xelE4dVRTVFNiT2lzZlE5eHBzMnBrSi93UGhlM0swMGowZzdvdEgwTjhmMzRkWHdmSG8wVzJaWjJRdWZ0WTRpelBES25hYndJSDRFZS95cnRoUTdjbHhCbmxkVVA4Qko4TVNhODd1dVY5a05IN25xSWM0WlZ3dnNoZkNrdVE4TXIzWUVPM2RVUVo0bmtEL0hEbUZLZmU1U1BMTkl0Nk54ZERISEMreEY4QmFic2lTT3ZkQmM2ZUpkQ2ZCdGVoZ2x2aW16N3JGZTZEeDI5Q3lIT1FvMHI4TldZT3IwVzJaYitRSWR2YTRpelJETFBlbGRpNnZTbTFPZkM4ckZFK2dNZHY0MGh6bnUrR2xNaGZ6L2NFajBPUi9vSm5iOU5JYzU3dlFaUHhDZWhJNjlJQ1ViVHlkbk4xK0xKbVBBdUtXOWZSQWhFazBPY1o3M1hZdzZoT3dnOXYxbGtLZ1NqcVNITzVvUlQ4VGR3S2JxK1dXUTZDRWVUUXB3N3psbW9jVHFtVG0vT2I3Ym9tTWlHSUNSTkNIR216VC9Cc3pDbFBqUHl1c3BLWkRZUWxrbUgrTWY0dDdnY3QwZW56U0p6Z2RCTUtzUUo3MFg0VkhUa0ZSa1V3bE4zaUZNNTRZTjRLRzZMSGtRbk1neUVxSzRRNTFudnBaandadVExdkNLamdERFZFZUlyOFhCTWVMM2JMREpLQ05XNFFweVI5em84QXJkQmIxaUpqQVBDTmVvUUo3eXBGbmdzemtjM0pvaU1FMEkycWhEbldXOEtqdjB4dWpGQnBDNEkzREFoemdxckhFU1hVcC9aMC91UThySWlVaGNFYjVBUUo3ejM0VGZ3Sk55NXZKeUkxQTBCbkcySUU5eVlzaWZmd1RmaXp1aDNYcEZKUWdobkUrSjgzMDE0djR1cGtMOHIrcWhJcEFrUXhnMkZPT0hOenpOdFBoZjNSRWRla1NaUlFqcVZUSnR6Z3VTTmVENGVXSDVkUkpvR0FaMGE0cnZ4bTNnaHJrQ256U0pOaHBCV0ljNy9wbHBnd3B1ZFJaN2RMTklHQ092dEpid1g0Mkc0dVB4SVJOb0FvVTJkM2lOeFVmbFBJdElhTnRuay93RUdCb01kcEVDR0hBQUFBQUJKUlU1RXJrSmdnZz09JztcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuYWx0ID0gJ1N0YXJ0IFN0cmVhbWluZyc7XG4gICAgICAgIHJldHVybiBwbGF5T3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBQbGF5T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgUGxheU92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9CYXNlT3ZlcmxheSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSB0ZXh0IG92ZXJsYXkgYmFzZVxuICovXG5leHBvcnQgY2xhc3MgVGV4dE92ZXJsYXkgZXh0ZW5kcyBPdmVybGF5QmFzZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgdGV4dCBvdmVybGF5XG4gICAgICogQHBhcmFtIHJvb3REaXYgdGhlIHJvb3QgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogQHBhcmFtIHJvb3RFbGVtZW50IHRoZSByb290IGVsZW1lbnQgdGhhdCBpcyB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB0ZXh0RWxlbWVudCBhbiBlbGVtZW50IHRoYXQgY29udGFpbnMgdGV4dCBmb3IgdGhlIGFjdGlvbiBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICByb290RGl2OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm9vdERpdiwgcm9vdEVsZW1lbnQsIHRleHRFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHRleHQgb3ZlcmxheXMgaW5uZXIgdGV4dFxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSB1cGRhdGUgdGV4dCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZSh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRleHQgIT0gbnVsbCB8fCB0ZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyogQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IGpzcywgeyBTdHlsZXMgfSBmcm9tICdqc3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICdqc3MtcGx1Z2luLWdsb2JhbCc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2pzcy1wbHVnaW4tY2FtZWwtY2FzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQYWxldHRlIHtcbiAgICAnLS1jb2xvcjAnOiBzdHJpbmc7XG4gICAgJy0tY29sb3IxJzogc3RyaW5nO1xuICAgICctLWNvbG9yMic6IHN0cmluZztcbiAgICAnLS1jb2xvcjMnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I0Jzogc3RyaW5nO1xuICAgICctLWNvbG9yNSc6IHN0cmluZztcbiAgICAnLS1jb2xvcjYnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I3Jzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUGl4ZWxTdHJlYW1pbmdBcHBsaWNhdGlvblN0eWxlIHtcbiAgICBkZWZhdWx0TGlnaHRNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlID0ge1xuICAgICAgICAnLS1jb2xvcjAnOiAnI2UyZTBkZDgwJyxcbiAgICAgICAgJy0tY29sb3IxJzogJyNGRkZGRkYnLFxuICAgICAgICAnLS1jb2xvcjInOiAnIzAwMDAwMCcsXG4gICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAnLS1jb2xvcjUnOiAnI2ZmYWIwMCcsXG4gICAgICAgICctLWNvbG9yNic6ICcjZTFlMmRkJyxcbiAgICAgICAgJy0tY29sb3I3JzogJyNjM2M0YmYnXG4gICAgfTtcblxuICAgIGRlZmF1bHREYXJrTW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZSA9IHtcbiAgICAgICAgJy0tY29sb3IwJzogJyMxRDFGMjI4MCcsXG4gICAgICAgICctLWNvbG9yMSc6ICcjMDAwMDAwJyxcbiAgICAgICAgJy0tY29sb3IyJzogJyNGRkZGRkYnLFxuICAgICAgICAnLS1jb2xvcjMnOiAnIzA1ODVmZScsXG4gICAgICAgICctLWNvbG9yNCc6ICcjMzViMzUwJyxcbiAgICAgICAgJy0tY29sb3I1JzogJyNmZmFiMDAnLFxuICAgICAgICAnLS1jb2xvcjYnOiAnIzFlMWQyMicsXG4gICAgICAgICctLWNvbG9yNyc6ICcjM2MzYjQwJ1xuICAgIH07XG5cbiAgICBkZWZhdWx0U3R5bGVzID0ge1xuICAgICAgICAnOnJvb3QnOiB7XG4gICAgICAgICAgICAnLS1jb2xvcjAnOiAnIzFEMUYyMjgwJyxcbiAgICAgICAgICAgICctLWNvbG9yMSc6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICctLWNvbG9yMic6ICcjRkZGRkZGJyxcbiAgICAgICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgICAgICctLWNvbG9yNCc6ICcjMzViMzUwJyxcbiAgICAgICAgICAgICctLWNvbG9yNSc6ICcjZmZhYjAwJyxcbiAgICAgICAgICAgICctLWNvbG9yNic6ICcjMWUxZDIyJyxcbiAgICAgICAgICAgICctLWNvbG9yNyc6ICcjM2MzYjQwJyxcbiAgICAgICAgICAgICctLWNvbG9yOCc6ICcjNDEwMDhjJyxcbiAgICAgICAgICAgICctLWNvbG9yOSc6ICcjM2UwMDcwJyxcbiAgICAgICAgICAgICctLWNvbG9yMTAnOiAnIzJlMDA1MicsXG4gICAgICAgICAgICAnLS1jb2xvcjExJzogJ3JnYmEoNjUsMCwxMzksMSknXG4gICAgICAgIH0sXG4gICAgICAgICcubm9zZWxlY3QnOiB7XG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNwbGF5ZXJVSSc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjdmlkZW9FbGVtZW50UGFyZW50Jzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjEpJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICB6SW5kZXg6ICczMCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgfSxcbiAgICAgICAgJy5VaVRvb2wgLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxNXB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwcHggMTBweCcsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0Jywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgZm9udFNpemU6ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjc1cHgnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMjUlKScsXG4gICAgICAgICAgICBsZWZ0OiAnMTI1JScsXG4gICAgICAgICAgICB6SW5kZXg6ICcyMCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5VaVRvb2w6aG92ZXIgLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0aW9uIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIHRvcDogJzEyNSUnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMjUlKScsXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICB6SW5kZXg6ICcyMCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNXB4IDEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcjY29ubmVjdGlvbic6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgYm90dG9tOiAnOCUnLFxuICAgICAgICAgICAgbGVmdDogJzUlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01pY2hyb21hJywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgaGVpZ2h0OiAnM3JlbScsXG4gICAgICAgICAgICB3aWR0aDogJzNyZW0nLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5ncy1wYW5lbCAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgdG9wOiAnMTI1JScsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCcsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgIGZhbGxiYWNrczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdtYXgtY29udGVudCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiAnMjAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICcxMjUlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICczJScsXG4gICAgICAgICAgICBsZWZ0OiAnMiUnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTWljaHJvbWEnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb250cm9scz4qJzoge1xuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMC41cmVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMnJlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS43NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC41cmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzICNhZGRpdGlvbmFsaW5mbyc6IHtcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0Jywgc2Fucy1zZXJpZlwiXG4gICAgICAgIH0sXG4gICAgICAgICcjZnVsbHNjcmVlbi1idG4nOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMC42cmVtICFpbXBvcnRhbnQnXG4gICAgICAgIH0sXG4gICAgICAgICcjbWluaW1pemVJY29uJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NCdG4sICNzdGF0c0J0bic6IHtcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b24nOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnM3JlbScsXG4gICAgICAgICAgICBoZWlnaHQ6ICczcmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVyZW0nLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgYnV0dG9uOmhvdmVyJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnMC4yNXMgZWFzZScsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNTVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNTVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b246YWN0aXZlJzoge1xuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNTVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNTVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTW9udHNlcnJhdCdcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzFyZW0nLFxuICAgICAgICAgICAgZm9udFNpemU6ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzAuNXJlbScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpob3Zlcic6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2Vhc2UgMC4zcydcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpkaXNhYmxlZCc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDphY3RpdmUnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpmb2N1cyc6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgaW1nJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwtd3JhcCc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICBib3R0b206ICcwJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMjB2dycsXG4gICAgICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMTAwJSknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJy4zcyBlYXNlLW91dCcsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJyxcbiAgICAgICAgICAgIGJhY2tkcm9wRmlsdGVyOiAnYmx1cigxMHB4KScsXG4gICAgICAgICAgICB3ZWJraXRCYWNrZHJvcEZpbHRlcjogJ2JsdXIoMTBweCknLFxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IwKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbC13cmFwLXZpc2libGUnOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbCc6IHtcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgcGFkZGluZzogJzFlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0hlYWRpbmcsICNzdGF0c0hlYWRpbmcnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMmVtJyxcbiAgICAgICAgICAgIG1hcmdpbkJsb2NrU3RhcnQ6ICcwLjY3ZW0nLFxuICAgICAgICAgICAgbWFyZ2luQmxvY2tFbmQ6ICcwLjY3ZW0nLFxuICAgICAgICAgICAgbWFyZ2luSW5saW5lU3RhcnQ6ICcwcHgnLFxuICAgICAgICAgICAgbWFyZ2luSW5saW5lRW5kOiAnMHB4JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZzogJzAgMCAwIDJyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDbG9zZSwgI3N0YXRzQ2xvc2UnOiB7XG4gICAgICAgICAgICBtYXJnaW46ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzAuNXJlbScsXG4gICAgICAgICAgICBmb250U2l6ZTogJzJlbScsXG4gICAgICAgICAgICBmbG9hdDogJ3JpZ2h0J1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2U6YWZ0ZXIsICNzdGF0c0Nsb3NlOmFmdGVyJzoge1xuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcXFxcMDBkN1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2U6aG92ZXIsICNzdGF0c0Nsb3NlOmhvdmVyJzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdlYXNlIDAuM3MnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDb250ZW50LCAjc3RhdHNDb250ZW50Jzoge1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogJzJyZW0nLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcycmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmcnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC4xNXJlbSAxMHB4IDAuMTVyZW0gMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5ncy10ZXh0Jzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5ncy1vcHRpb24nOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0T3ZlcmxheSwgI3BsYXlPdmVybGF5LCAjaW5mb092ZXJsYXksICNlcnJvck92ZXJsYXksICNhZmtPdmVybGF5LCAjZGlzY29ubmVjdE92ZXJsYXknOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHpJbmRleDogJzMwJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMS44ZW0nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IxKScsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLmNsaWNrYWJsZVN0YXRlJzoge1xuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRleHREaXNwbGF5U3RhdGUnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5oaWRkZW5TdGF0ZSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3BsYXlCdXR0b24sICNjb25uZWN0QnV0dG9uJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHpJbmRleDogJzMwJ1xuICAgICAgICB9LFxuICAgICAgICAnaW1nI3BsYXlCdXR0b24nOiB7XG4gICAgICAgICAgICBtYXhXaWR0aDogJzI0MXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpSW50ZXJhY3Rpb24nOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICB9LFxuICAgICAgICAnI1VJSW50ZXJhY3Rpb25CdXR0b25Cb3VuZGFyeSc6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHgnXG4gICAgICAgIH0sXG4gICAgICAgICcjVUlJbnRlcmFjdGlvbkJ1dHRvbic6IHtcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjaGlkZGVuSW5wdXQnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6ICctMTAlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMHB4JyxcbiAgICAgICAgICAgIG9wYWNpdHk6ICcwJ1xuICAgICAgICB9LFxuICAgICAgICAnI2VkaXRUZXh0QnV0dG9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnNDBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tb3ZlcmxheSc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc3dpdGNoJzoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1zd2l0Y2ggLnRnbCc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbCwgLnRnbDphZnRlciwgLnRnbDpiZWZvcmUsIC50Z2wgKiwgLnRnbCAqOmFmdGVyLCAudGdsICo6YmVmb3JlLCAudGdsKy50Z2wtc2xpZGVyJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB3ZWJraXRCb3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2w6Oi1tb3otc2VsZWN0aW9uLCAudGdsOmFmdGVyOjotbW96LXNlbGVjdGlvbiwgLnRnbDpiZWZvcmU6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6YWZ0ZXI6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6YmVmb3JlOjotbW96LXNlbGVjdGlvbiwgLnRnbCsudGdsLXNsaWRlcjo6LW1vei1zZWxlY3Rpb24nOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2w6OnNlbGVjdGlvbiwgLnRnbDphZnRlcjo6c2VsZWN0aW9uLCAudGdsOmJlZm9yZTo6c2VsZWN0aW9uLCAudGdsICo6OnNlbGVjdGlvbiwgLnRnbCAqOmFmdGVyOjpzZWxlY3Rpb24sIC50Z2wgKjpiZWZvcmU6OnNlbGVjdGlvbiwgLnRnbCsudGdsLXNsaWRlcjo6c2VsZWN0aW9uJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcudGdsLXNsaWRlcic6IHt9LFxuICAgICAgICAnLnRnbCsudGdsLXNsaWRlcic6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICcwJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMThweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmFmdGVyLCAudGdsKy50Z2wtc2xpZGVyOmJlZm9yZSc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdcIlwiJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgbGVmdDogJzAnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmJlZm9yZSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0Ky50Z2wtc2xpZGVyJzoge1xuICAgICAgICAgICAgcGFkZGluZzogJzJweCcsXG4gICAgICAgICAgICB3ZWJraXRUcmFuc2l0aW9uOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNiknLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0Ky50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgd2Via2l0VHJhbnNpdGlvbjogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdcIlwiJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzFlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdDpjaGVja2VkKy50Z2wtc2xpZGVyJzoge1xuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQ6Y2hlY2tlZCsudGdsLXNsaWRlcjphZnRlcic6IHtcbiAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yMyknXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWFwcGx5Jzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrICFpbXBvcnRhbnQnLFxuICAgICAgICAgICAgbWFyZ2luTGVmdDogJ2F1dG8nLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNDAlJ1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tY29udHJvbCc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMnB4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdyaWdodCcsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnaW5oZXJpdCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWNvbnRyb2w6aG92ZXInOiB7XG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1ncm91cCc6IHtcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICc0cHgnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2dyaWQnLFxuICAgICAgICAgICAgZ3JpZFRlbXBsYXRlQ29sdW1uczogJzgwJSAyMCUnLFxuICAgICAgICAgICAgcm93R2FwOiAnNHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzEwcHgnLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcxMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tZ3JvdXAgbGFiZWwnOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3NDb250YWluZXInOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcxMHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcxMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzQ29udGFpbmVyPiA6Zmlyc3QtY2hpbGQnOiB7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICc0cHgnLFxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNHB4JyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdiYXNlbGluZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5jb2xsYXBzZSc6IHtcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnNSUnXG4gICAgICAgIH0sXG4gICAgICAgICcjc3RyZWFtVG9vbHMnOiB7XG4gICAgICAgICAgICBib3JkZXJCb3R0b21SaWdodFJhZGl1czogJzVweCcsXG4gICAgICAgICAgICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiAnNXB4JyxcbiAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICByaWdodDogJzIlJyxcbiAgICAgICAgICAgIHpJbmRleDogJzEwMCcsXG4gICAgICAgICAgICBib3JkZXI6ICc0cHggc29saWQgdmFyKC0tY29sb3VyOCknLFxuICAgICAgICAgICAgYm9yZGVyVG9wV2lkdGg6ICcwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3NIZWFkZXInOiB7XG4gICAgICAgICAgICBmb250U3R5bGU6ICdpdGFsaWMnXG4gICAgICAgIH0sXG4gICAgICAgICcjc3RyZWFtVG9vbHNIZWFkZXInOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tY29sb3VyOCknLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zdHJlYW1Ub29scyc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ3ZhcigtLWJ1dHRvbkZvbnQpJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdsaWdodGVyJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zdHJlYW1Ub29scy1zaG93bj4jc3RyZWFtVG9vbHNTZXR0aW5ncywgLnN0cmVhbVRvb2xzLXNob3duPiNzdHJlYW1Ub29sc1N0YXRzJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgICAgICB9LFxuICAgICAgICAnI3N0cmVhbVRvb2xzVG9nZ2xlJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3F1YWxpdHlTdGF0dXMnOiB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzM3cHgnLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnNHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLnN2Z0ljb24nOiB7XG4gICAgICAgICAgICBmaWxsOiAndmFyKC0tY29sb3IyKSdcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjdXN0b21TdHlsZXM/OiBQYXJ0aWFsPFN0eWxlcz47XG4gICAgbGlnaHRNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlO1xuICAgIGRhcmtNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlO1xuXG4gICAgY29uc3RydWN0b3Iob3B0aW9ucz86IHtcbiAgICAgICAgY3VzdG9tU3R5bGVzPzogUGFydGlhbDxTdHlsZXM+O1xuICAgICAgICBsaWdodE1vZGVQYWxldHRlPzogQ29sb3JQYWxldHRlO1xuICAgICAgICBkYXJrTW9kZVBhbGV0dGU/OiBDb2xvclBhbGV0dGU7XG4gICAgfSkge1xuICAgICAgICBjb25zdCB7IGN1c3RvbVN0eWxlcywgbGlnaHRNb2RlUGFsZXR0ZSwgZGFya01vZGVQYWxldHRlIH0gPVxuICAgICAgICAgICAgb3B0aW9ucyA/PyB7fTtcbiAgICAgICAgLy8gT25lIHRpbWUgc2V0dXAgd2l0aCBkZWZhdWx0IHBsdWdpbnMgYW5kIHNldHRpbmdzLlxuICAgICAgICBjb25zdCBqc3NPcHRpb25zID0ge1xuICAgICAgICAgICAgLy8gSlNTIGhhcyBtYW55IGludGVyZXN0aW5nIHBsdWdpbnMgd2UgbWF5IHdpc2ggdG8gdHVybiBvblxuICAgICAgICAgICAgLy9wbHVnaW5zOiBbZnVuY3Rpb25zKCksIHRlbXBsYXRlKCksIGdsb2JhbCgpLCBleHRlbmQoKSwgbmVzdGVkKCksIGNvbXBvc2UoKSwgY2FtZWxDYXNlKCksIGRlZmF1bHRVbml0KG9wdGlvbnMuZGVmYXVsdFVuaXQpLCBleHBhbmQoKSwgdmVuZG9yUHJlZml4ZXIoKSwgcHJvcHNTb3J0KCldXG4gICAgICAgICAgICBwbHVnaW5zOiBbZ2xvYmFsKCksIGNhbWVsQ2FzZSgpXVxuICAgICAgICB9O1xuXG4gICAgICAgIGpzcy5zZXR1cChqc3NPcHRpb25zKTtcblxuICAgICAgICB0aGlzLmN1c3RvbVN0eWxlcyA9IGN1c3RvbVN0eWxlcztcbiAgICAgICAgdGhpcy5saWdodE1vZGVQYWxldHRlID1cbiAgICAgICAgICAgIGxpZ2h0TW9kZVBhbGV0dGUgPz8gdGhpcy5kZWZhdWx0TGlnaHRNb2RlUGFsZXR0ZTtcbiAgICAgICAgdGhpcy5kYXJrTW9kZVBhbGV0dGUgPSBkYXJrTW9kZVBhbGV0dGUgPz8gdGhpcy5kZWZhdWx0RGFya01vZGVQYWxldHRlO1xuICAgIH1cblxuICAgIGFwcGx5U3R5bGVTaGVldCgpIHtcbiAgICAgICAgLy8gVG9kbzogcmVmYWN0b3IgY29kZWJhc2UgdG8gdXNlIGpzcyBhdCBhIGNvbXBvbmVudCBsZXZlbCwgY2xhc3NlcyBjYW4gYmUgZ3JhYmJlZCBsaWtlIHNvOlxuICAgICAgICAvL2NvbnN0IHtwaXhlbFN0cmVhbWluZ0NsYXNzZXN9ID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoc3R5bGVzKS5hdHRhY2goKTtcblxuICAgICAgICAvLyBhdHRhY2ggZ2VuZXJhdGVkIHN0eWxlIHNoZWV0IHRvIHBhZ2VcbiAgICAgICAganNzLmNyZWF0ZVN0eWxlU2hlZXQoe1xuICAgICAgICAgICAgJ0BnbG9iYWwnOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0U3R5bGVzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tU3R5bGVzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmF0dGFjaCgpO1xuICAgIH1cblxuICAgIGFwcGx5UGFsZXR0ZShwYWxldHRlOiBDb2xvclBhbGV0dGUpIHtcbiAgICAgICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjAnLCBwYWxldHRlWyctLWNvbG9yMCddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IxJywgcGFsZXR0ZVsnLS1jb2xvcjEnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMicsIHBhbGV0dGVbJy0tY29sb3IyJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjMnLCBwYWxldHRlWyctLWNvbG9yMyddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I0JywgcGFsZXR0ZVsnLS1jb2xvcjQnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNScsIHBhbGV0dGVbJy0tY29sb3I1J10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjYnLCBwYWxldHRlWyctLWNvbG9yNiddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I3JywgcGFsZXR0ZVsnLS1jb2xvcjcnXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwbGF5ZXJzIGNvbG9yIHZhcmlhYmxlc1xuICAgICAqIEBwYXJhbSBpc0xpZ2h0TW9kZSAtIHNob3VsZCB3ZSB1c2UgYSBsaWdodCBvciBkYXJrIGNvbG9yIHNjaGVtZVxuICAgICAqL1xuICAgIHNldENvbG9yTW9kZShpc0xpZ2h0TW9kZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNMaWdodE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYWxldHRlKHRoaXMubGlnaHRNb2RlUGFsZXR0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFsZXR0ZSh0aGlzLmRhcmtNb2RlUGFsZXR0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBGdWxsU2NyZWVuSWNvbiB9IGZyb20gJy4vRnVsbHNjcmVlbkljb24nO1xuaW1wb3J0IHsgU2V0dGluZ3NJY29uIH0gZnJvbSAnLi9TZXR0aW5nc0ljb24nO1xuaW1wb3J0IHsgU3RhdHNJY29uIH0gZnJvbSAnLi9TdGF0c0ljb24nO1xuaW1wb3J0IHsgWFJJY29uIH0gZnJvbSAnLi9YUkljb24nO1xuaW1wb3J0IHsgV2ViWFJDb250cm9sbGVyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBVSUVsZW1lbnRDb25maWcsIFVJRWxlbWVudENyZWF0aW9uTW9kZSB9IGZyb20gJy4uL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgaG93IFVJIGVsZW1lbnRzIHRvIGNvbnRyb2wgdGhlIHN0cmVhbSBhcmUgY3JlYXRlZC4gXG4gKiBCeSBkZWZhdWx0LCBhIGJ1dHRvbiB3aWxsIGJlIGNyZWF0ZWQgZm9yIGVhY2ggY29udHJvbC4gVGhhdCBjYW4gYmUgb3ZlcnJpZGVuIHBlci1jb250cm9sXG4gKiB0byB1c2UgYW4gZXh0ZXJuYWxseSBwcm92aWRlZCBlbGVtZW50LCBvciB0byBkaXNhYmxlIHRoZSBlbGVtZW50IGVudGlyZWx5LlxuICovXG5leHBvcnQgdHlwZSBDb250cm9sc1VJQ29uZmlndXJhdGlvbiA9IHtcbiAgICAvL1tQcm9wZXJ0eSBpbiBrZXlvZiBDb250cm9scyBhcyBgJHtQcm9wZXJ0eX1UeXBlYF0/IDogVUlFbGVtZW50VHlwZTtcbiAgICBzdGF0c0J1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIGZ1bGxzY3JlZW5CdXR0b25UeXBlPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICBzZXR0aW5nc0J1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIHhySWNvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnXG59XG5cbi8vIElmIHRoZXJlIGlzbid0IGEgdHlwZSBwcm92aWRlZCwgZGVmYXVsdCBiZWhhdmlvdXIgaXMgdG8gY3JlYXRlIHRoZSBlbGVtZW50LlxuZnVuY3Rpb24gc2hvdWxkQ3JlYXRlQnV0dG9uKHR5cGUgOiBVSUVsZW1lbnRDb25maWcgfCB1bmRlZmluZWQpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0eXBlID09IHVuZGVmaW5lZCkgPyB0cnVlIDogKHR5cGUuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuQ3JlYXRlRGVmYXVsdEVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEVsZW1lbnQgY29udGFpbmluZyB2YXJpb3VzIGNvbnRyb2xzIGxpa2Ugc3RhdHMsIHNldHRpbmdzLCBmdWxsc2NyZWVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbHMge1xuICAgIHN0YXRzSWNvbjogU3RhdHNJY29uO1xuICAgIGZ1bGxzY3JlZW5JY29uOiBGdWxsU2NyZWVuSWNvbjtcbiAgICBzZXR0aW5nc0ljb246IFNldHRpbmdzSWNvbjtcbiAgICB4ckljb246IFhSSWNvbjtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIGNvbnRyb2xzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnPyA6IENvbnRyb2xzVUlDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcuc3RhdHNCdXR0b25UeXBlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0c0ljb24gPSBuZXcgU3RhdHNJY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5zZXR0aW5nc0J1dHRvblR5cGUpKXtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NJY29uID0gbmV3IFNldHRpbmdzSWNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcuZnVsbHNjcmVlbkJ1dHRvblR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW5JY29uID0gbmV3IEZ1bGxTY3JlZW5JY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy54ckljb25UeXBlKSl7XG4gICAgICAgICAgICB0aGlzLnhySWNvbiA9IG5ldyBYUkljb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb250cm9scy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ2NvbnRyb2xzJztcbiAgICAgICAgICAgIGlmICghIXRoaXMuZnVsbHNjcmVlbkljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZ1bGxzY3JlZW5JY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIXRoaXMuc2V0dGluZ3NJY29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0ljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEhdGhpcy5zdGF0c0ljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzSWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISF0aGlzLnhySWNvbikgXG5cdFx0XHR7XG5cdFx0XHRcdCB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnhySWNvbi5yb290RWxlbWVudCk7XG5cdFx0XHRcdCBcbiAgICAgICAgICAgICAgICAvKiBXZWJYUkNvbnRyb2xsZXIuaXNTZXNzaW9uU3VwcG9ydGVkKCdpbW1lcnNpdmUtdnInKS50aGVuKFxuICAgICAgICAgICAgICAgIChzdXBwb3J0ZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy54ckljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7ICovXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG59IiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBEZWNsYXJlIGFkZGl0aW9ucyB0byBiYXNlIHR5cGVzIGZvciBjcm9zcyBicm93c2VyIGZ1bGxzY3JlZW4gZnVuY3Rpb25hbGl0eS5cbiAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBEb2N1bWVudCB7XG4gICAgICAgIHdlYmtpdElzRnVsbFNjcmVlbj86IGJvb2xlYW47XG4gICAgICAgIG1vekZ1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgICAgICB3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZD86IGJvb2xlYW47XG4gICAgICAgIG1vekNhbmNlbEZ1bGxTY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtc0V4aXRGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0RXhpdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtb3pGdWxsU2NyZWVuRWxlbWVudD86IEVsZW1lbnQ7XG4gICAgICAgIG1zRnVsbHNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgICAgICB3ZWJraXRGdWxsc2NyZWVuRWxlbWVudD86IEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEhUTUxFbGVtZW50IHtcbiAgICAgICAgbXNSZXF1ZXN0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIG1velJlcXVlc3RGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICB3ZWJraXRFbnRlckZ1bGxzY3JlZW4/OiAoKSA9PiB2b2lkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbiBlbGVtZW50IChpLmUuIGJ1dHRvbikgdGhhdCwgd2hlbiBjbGlja2VkLCB3aWxsIHRvZ2dsZSBmdWxsc2NyZWVuIG9mIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIENhbiBiZSBpbml0aWFsaXplZCB3aXRoIGFueSBIVE1MRWxlbWVudCwgaWYgaXQgaXMgc2V0IGFzIHJvb3RFbGVtZW50IGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG4gICAgaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgZnVsbHNjcmVlbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgSFRNTFZpZGVvRWxlbWVudDtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQub25jbGljayA9ICgpID0+IHRoaXMudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7ICAgICAgIFxuICAgICAgICAvLyBzZXQgdXAgdGhlIGZ1bGwgc2NyZWVuIGV2ZW50c1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ01TRnVsbHNjcmVlbkNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyB0aGUgZG9jdW1lbnQgb3IgZnVsbHNjcmVlbkVsZW1lbnQgZnVsbHNjcmVlbi5cbiAgICAgKi9cbiAgICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgICAgICAvLyBpZiBhbHJlYWR5IGZ1bGwgc2NyZWVuOyBleGl0XG4gICAgICAgIC8vIGVsc2UgZ28gZnVsbHNjcmVlblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZnVsbHNjcmVlbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1velJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LndlYmtpdEVudGVyRnVsbHNjcmVlbigpOyAvL2ZvciBpcGhvbmUgdGhpcyBjb2RlIHdvcmtlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgZnVsbHNjcmVlbiBidXR0b24gb24gY2hhbmdlXG4gICAgICovXG4gICAgb25GdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIChkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbCkgfHxcbiAgICAgICAgICAgIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIEZ1bGxTY3JlZW5JY29uQmFzZSB0aGF0IHVzZXMgYW4gZXh0ZXJuYWxseVxuICogcHJvdmlkZWQgSFRNTEVsZW1lbnQgZm9yIHRvZ2dsaW5nIGZ1bGwgc2NyZWVuLlxuICovXG5leHBvcnQgY2xhc3MgRnVsbFNjcmVlbkljb25FeHRlcm5hbCBleHRlbmRzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihleHRlcm5hbEJ1dHRvbiA6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSBleHRlcm5hbEJ1dHRvbjtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBmdWxsc2NyZWVuIGljb24gdGhhdCBjb250YWlucyBhIGJ1dHRvbiBhbmQgc3ZncyBmb3IgZWFjaCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uIGV4dGVuZHMgRnVsbFNjcmVlbkljb25CYXNlIHtcbiAgICBfbWF4aW1pemVJY29uOiBTVkdFbGVtZW50O1xuICAgIF9taW5pbWl6ZUljb246IFNWR0VsZW1lbnQ7XG4gICAgX3Rvb2x0aXBUZXh0OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3JlYXRlZEJ1dHRvbiA6IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmlkID0gJ2Z1bGxzY3JlZW4tYnRuJztcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLm1heGltaXplSWNvbik7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5taW5pbWl6ZUljb24pO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSBjcmVhdGVkQnV0dG9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnRnVsbHNjcmVlbic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBUZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4aW1pemVJY29uKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX21heGltaXplSWNvbikge1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9tYXhpbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ21heGltaXplSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ3ZpZXdCb3gnLFxuICAgICAgICAgICAgICAgICcwIDAgMzg0Ljk3IDM4NC45NydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9tYXhpbWl6ZUljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgb25lIGZvciBlYWNoIGNvcm5lclxuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTM4NC45NywxMi4wM2MwLTYuNzEzLTUuMzE3LTEyLjAzLTEyLjAzLTEyLjAzSDI2NC44NDdjLTYuODMzLDAtMTEuOTIyLDUuMzktMTEuOTM0LDEyLjIyM2MwLDYuODIxLDUuMTAxLDExLjgzOCwxMS45MzQsMTEuODM4aDk2LjA2MmwtMC4xOTMsOTYuNTE5YzAsNi44MzMsNS4xOTcsMTIuMDMsMTIuMDMsMTIuMDNjNi44MzMtMC4wMTIsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNsMC4xOTMtMTA4LjM2OWMwLTAuMDM2LTAuMDEyLTAuMDYtMC4wMTItMC4wODRDMzg0Ljk1OCwxMi4wOSwzODQuOTcsMTIuMDY2LDM4NC45NywxMi4wM3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTIwLjQ5NiwwSDEyLjQwM2MtMC4wMzYsMC0wLjA2LDAuMDEyLTAuMDk2LDAuMDEyQzEyLjI4MywwLjAxMiwxMi4yNDcsMCwxMi4yMjMsMEM1LjUxLDAsMC4xOTIsNS4zMTcsMC4xOTIsMTIuMDNMMCwxMjAuMzk5YzAsNi44MzMsNS4zOSwxMS45MzQsMTIuMjIzLDExLjkzNGM2LjgyMSwwLDExLjgzOC01LjEwMSwxMS44MzgtMTEuOTM0bDAuMTkyLTk2LjMzOWg5Ni4yNDJjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM0MxMzIuNTE0LDUuMTk3LDEyNy4zMTcsMCwxMjAuNDk2LDB6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC4xMjMsMzYwLjkwOUgyNC4wNjF2LTk2LjI0MmMwLTYuODMzLTUuMTk3LTEyLjAzLTEyLjAzLTEyLjAzUzAsMjU3LjgzMywwLDI2NC42Njd2MTA4LjA5MmMwLDAuMDM2LDAuMDEyLDAuMDYsMC4wMTIsMC4wODRjMCwwLjAzNi0wLjAxMiwwLjA2LTAuMDEyLDAuMDk2YzAsNi43MTMsNS4zMTcsMTIuMDMsMTIuMDMsMTIuMDNoMTA4LjA5MmM2LjgzMywwLDExLjkyMi01LjM5LDExLjkzNC0xMi4yMjNDMTMyLjA1NywzNjUuOTI2LDEyNi45NTYsMzYwLjkwOSwxMjAuMTIzLDM2MC45MDl6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoNC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTM3Mi43NDcsMjUyLjkxM2MtNi44MzMsMC0xMS44NSw1LjEwMS0xMS44MzgsMTEuOTM0djk2LjA2MmgtOTYuMjQyYy02LjgzMywwLTEyLjAzLDUuMTk3LTEyLjAzLDEyLjAzczUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4wOTJjMC4wMzYsMCwwLjA2LTAuMDEyLDAuMDg0LTAuMDEyYzAuMDM2LTAuMDEyLDAuMDYsMC4wMTIsMC4wOTYsMC4wMTJjNi43MTMsMCwxMi4wMy01LjMxNywxMi4wMy0xMi4wM1YyNjQuODQ3QzM4NC45NywyNTguMDE0LDM3OS41OCwyNTIuOTEzLDM3Mi43NDcsMjUyLjkxM3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoNCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21heGltaXplSWNvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1pbmltaXplSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9taW5pbWl6ZUljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbWluaW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdtaW5pbWl6ZUljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDM4NS4zMzEgMzg1LjMzMSdcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgb25lIGZvciBlYWNoIGNvcm5lclxuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTI2NC45NDMsMTU2LjY2NWgxMDguMjczYzYuODMzLDAsMTEuOTM0LTUuMzksMTEuOTM0LTEyLjIxMWMwLTYuODMzLTUuMTAxLTExLjg1LTExLjkzNC0xMS44MzhoLTk2LjI0MlYzNi4xODFjMC02LjgzMy01LjE5Ny0xMi4wMy0xMi4wMy0xMi4wM3MtMTIuMDMsNS4xOTctMTIuMDMsMTIuMDN2MTA4LjI3M2MwLDAuMDM2LDAuMDEyLDAuMDYsMC4wMTIsMC4wODRjMCwwLjAzNi0wLjAxMiwwLjA2LTAuMDEyLDAuMDk2QzI1Mi45MTMsMTUxLjM0NywyNTguMjMsMTU2LjY3NywyNjQuOTQzLDE1Ni42NjV6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC4yOTEsMjQuMjQ3Yy02LjgyMSwwLTExLjgzOCw1LjExMy0xMS44MzgsMTEuOTM0djk2LjI0MkgxMi4wM2MtNi44MzMsMC0xMi4wMyw1LjE5Ny0xMi4wMywxMi4wM2MwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4yNzNjMC4wMzYsMCwwLjA2LTAuMDEyLDAuMDg0LTAuMDEyYzAuMDM2LDAsMC4wNiwwLjAxMiwwLjA5NiwwLjAxMmM2LjcxMywwLDEyLjAzLTUuMzE3LDEyLjAzLTEyLjAzVjM2LjE4MUMxMzIuNTE0LDI5LjM2LDEyNy4xMjQsMjQuMjU5LDEyMC4yOTEsMjQuMjQ3eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMzg3LDIyOC42NjZIMTIuMTE1Yy02LjgzMywwLjAxMi0xMS45MzQsNS4zOS0xMS45MzQsMTIuMjIzYzAsNi44MzMsNS4xMDEsMTEuODUsMTEuOTM0LDExLjgzOGg5Ni4yNDJ2OTYuNDIzYzAsNi44MzMsNS4xOTcsMTIuMDMsMTIuMDMsMTIuMDNjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM1YyNDAuODc3YzAtMC4wMzYtMC4wMTItMC4wNi0wLjAxMi0wLjA4NGMwLTAuMDM2LDAuMDEyLTAuMDYsMC4wMTItMC4wOTZDMTMyLjQxOCwyMzMuOTgzLDEyNy4xLDIyOC42NjYsMTIwLjM4NywyMjguNjY2eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zNzMuMywyMjguNjY2SDI2NS4wMjhjLTAuMDM2LDAtMC4wNiwwLjAxMi0wLjA4NCwwLjAxMmMtMC4wMzYsMC0wLjA2LTAuMDEyLTAuMDk2LTAuMDEyYy02LjcxMywwLTEyLjAzLDUuMzE3LTEyLjAzLDEyLjAzdjEwOC4yNzNjMCw2LjgzMyw1LjM5LDExLjkyMiwxMi4yMjMsMTEuOTM0YzYuODIxLDAuMDEyLDExLjgzOC01LjEwMSwxMS44MzgtMTEuOTIydi05Ni4yNDJIMzczLjNjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM1MzODAuMTM0LDIyOC42NzgsMzczLjMsMjI4LjY2NnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoNCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbmltaXplSWNvbjtcbiAgICB9XG5cbiAgICBvbkZ1bGxzY3JlZW5DaGFuZ2UoKSB7XG4gICAgICAgIHN1cGVyLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuXG4gICAgICAgIGNvbnN0IG1pbmltaXplID0gdGhpcy5taW5pbWl6ZUljb247XG4gICAgICAgIGNvbnN0IG1heGltaXplID0gdGhpcy5tYXhpbWl6ZUljb247XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBtaW5pbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAvL2lvcyBkaXNhcHBlYXJpbmcgc3ZnIGZpeFxuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIG1heGltaXplLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgICAgICAgIC8vaW9zIGRpc2FwcGVhcmluZyBzdmcgZml4XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsIDApJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBBIGJ1dHRvbiB3aXRoIGEgdGV4dCBsYWJlbCBiZXNpZGUgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYWJlbGxlZEJ1dHRvbiB7XG4gICAgX2xhYmVsOiBzdHJpbmc7XG4gICAgX2J1dHRvblRleHQ6IHN0cmluZztcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9idXR0b246IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBidXR0b25UZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5fYnV0dG9uVGV4dCA9IGJ1dHRvblRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2xpY2sgbGlzdGVuZXIgdG8gdGhlIGJ1dHRvbiBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRPbkNsaWNrTGlzdGVuZXIob25DbGlja0Z1bmM6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRnVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBIVE1MSW5wdXRFbGVtZW50IGZvciB0aGUgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgYnV0dG9uKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2J1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24udmFsdWUgPSB0aGlzLl9idXR0b25UZXh0O1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5fbGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChzZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5jbGFzc0xpc3QuYWRkKCdidG4tb3ZlcmxheScpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTGF0ZW5jeVRlc3RSZXN1bHRzIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcblxuLyoqXG4gKiBMYXRlbmN5IHRlc3QgVUkgZWxlbWVudHMgYW5kIHJlc3VsdHMgaGFuZGxpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYXRlbmN5VGVzdCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfbGF0ZW5jeVRlc3RCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHN0YXRzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBoZWFkaW5nXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkaW5nLmlkID0gJ2xhdGVuY3lUZXN0SGVhZGVyJztcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtdGV4dCcpO1xuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0hlYWRlcicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkaW5nVGV4dC5pbm5lckhUTUwgPSAnTGF0ZW5jeSBUZXN0JztcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoaGVhZGluZ1RleHQpO1xuICAgICAgICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0QnV0dG9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSB0ZXN0IHJlc3VsdHMgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgcmVzdWx0c1BhcmVudEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmlkID0gJ2xhdGVuY3lUZXN0Q29udGFpbmVyJztcbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzdWx0c1BhcmVudEVsZW0pO1xuXG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQuaWQgPSAnbGF0ZW5jeVN0YXRzUmVzdWx0cyc7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1N0YXRzUmVzdWx0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdEJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udmFsdWUgPSAnUnVuIFRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uaWQgPSAnYnRuLXN0YXJ0LWxhdGVuY3ktdGVzdCc7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdHJlYW1Ub29scy1idXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBVSSBiYXNlZCBvbiB0aGUgbGF0ZW5jeSB0ZXN0J3MgcmVzdWx0cy5cbiAgICAgKiBAcGFyYW0gbGF0ZW5jeVRpbWluZ3MgVGhlIGxhdGVuY3kgdGVzdCByZXN1bHRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVUZXN0UmVzdWx0KGxhdGVuY3lUaW1pbmdzOiBMYXRlbmN5VGVzdFJlc3VsdHMpIHtcbiAgICAgICAgTG9nZ2VyLkxvZyhMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLCBsYXRlbmN5VGltaW5ncy50b1N0cmluZygpLCA2KTtcbiAgICAgICAgbGV0IGxhdGVuY3lTdGF0c0lubmVySFRNTCA9ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2Pk5ldCBsYXRlbmN5IFJUVCAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLm5ldHdvcmtMYXRlbmN5ICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PlVFIEVuY29kZSAobXMpOiAnICsgbGF0ZW5jeVRpbWluZ3MuRW5jb2RlTXMgKyAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5VRSBDYXB0dXJlIChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuQ2FwdHVyZVRvU2VuZE1zICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PkJyb3dzZXIgc2VuZCBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuYnJvd3NlclNlbmRMYXRlbmN5ICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmZyYW1lRGlzcGxheURlbHRhVGltZU1zICYmXG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5icm93c2VyUmVjZWlwdFRpbWVNc1xuICAgICAgICAgICAgICAgID8gJzxkaXY+QnJvd3NlciByZWNlaXZlIGxhdGVuY3kgKG1zKTogJyArXG4gICAgICAgICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5mcmFtZURpc3BsYXlEZWx0YVRpbWVNcyArXG4gICAgICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+VG90YWwgbGF0ZW5jeSAoZXhjbHVkaW5nIGJyb3dzZXIpIChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MubGF0ZW5jeUV4Y2x1ZGluZ0RlY29kZSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9IGxhdGVuY3lUaW1pbmdzLmVuZFRvRW5kTGF0ZW5jeVxuICAgICAgICAgICAgPyAnPGRpdj5Ub3RhbCBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5lbmRUb0VuZExhdGVuY3kgK1xuICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlubmVySFRNTCA9IGxhdGVuY3lTdGF0c0lubmVySFRNTDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFNldHRpbmdzIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdzSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfc2V0dGluZ3NJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc2V0dGluZ3MgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc2V0dGluZ3NCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0ljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnU2V0dGluZ3MnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdzZXR0aW5nc0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDQ3OC43MDMgNDc4LjcwMydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgdGhlIGlubmVyIGFuZCBvdXQgcGF0aCBvZiBhIGNvZ1xuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44XFxcblx0XHRcdGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yXFxcblx0XHRcdGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjhcXFxuXHRcdFx0Yy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMVxcXG5cdFx0XHRjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjhcXFxuXHRcdFx0YzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjVcXFxuXHRcdFx0bDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjZcXFxuXHRcdFx0YzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjFcXFxuXHRcdFx0bC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xXFxcblx0XHRcdEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjlcXFxuXHRcdFx0Yy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOFxcXG5cdFx0XHRjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MlxcXG5cdFx0XHRjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOFxcXG5cdFx0XHRjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjhcXFxuXHRcdFx0Yy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMlxcXG5cdFx0XHRjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MlxcXG5cdFx0XHRjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42XFxcblx0XHRcdGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMVxcXG5cdFx0XHRjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjhcXFxuXHRcdFx0YzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43XFxcblx0XHRcdGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDF6IE0yMzkuNCwzMTUuNjAxYy00Mi4xLDAtNzYuMy0zNC4yLTc2LjMtNzYuM3MzNC4yLTc2LjMsNzYuMy03Ni4zczc2LjMsMzQuMiw3Ni4zLDc2LjNTMjgxLjUsMzE1LjYwMSwyMzkuNCwzMTUuNjAxeidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgxKTtcbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NJY29uO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBVSSBjb21wb25lbnQgY29udGFpbmluZyBhbGwgdGhlIHNldHRpbmdzIGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1BhbmVsIHtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9zZXR0aW5nc0Nsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgICBfc2V0dGluZ3NDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3NldHRpbmdzLXBhbmVsJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAnKTtcblxuICAgICAgICAgICAgY29uc3QgcGFuZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwYW5lbEVsZW0uY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsRWxlbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2V0dGluZ3NIZWFkaW5nLmlkID0gJ3NldHRpbmdzSGVhZGluZyc7XG4gICAgICAgICAgICBzZXR0aW5nc0hlYWRpbmcudGV4dENvbnRlbnQgPSAnU2V0dGluZ3MnO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHNldHRpbmdzSGVhZGluZyk7XG5cbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzQ2xvc2VCdXR0b24pO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudC5pZCA9ICdzZXR0aW5nc0NvbnRlbnQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc0NvbnRlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NDbG9zZUJ1dHRvbigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbi5pZCA9ICdzZXR0aW5nc0Nsb3NlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHNldHRpbmdzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2V0dGluZ3MgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBzZXR0aW5ncyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogU3RhdHMgaWNvbiB0aGF0IGNhbiBiZSBjbGlja2VkLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdHNJY29uIHtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIF9zdGF0c0ljb246IFNWR0VsZW1lbnQ7XG4gICAgX3Rvb2x0aXBUZXh0OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGhlIGJ1dHRvbiBjb250YWluaW5nIHRoZSBzdGF0cyBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnVWlUb29sJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzdGF0c0J0bic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzSWNvbik7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0b29sdGlwVGV4dCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuY2xhc3NMaXN0LmFkZCgndG9vbHRpcHRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmlubmVySFRNTCA9ICdJbmZvcm1hdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBUZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNJY29uKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzSWNvbikge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ3N0YXRzSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAzMzAgMzMwJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0ljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgdGhlIGlubmVyIGFuZCBvdXQgcGF0aCBvZiBhIGNvZ1xuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSwwLjAwOEM3NC4wMTksMC4wMDgsMCw3NC4wMjQsMCwxNjQuOTk5YzAsOTAuOTc3LDc0LjAxOSwxNjQuOTkyLDE2NSwxNjQuOTkyczE2NS03NC4wMTUsMTY1LTE2NC45OTJDMzMwLDc0LjAyNCwyNTUuOTgxLDAuMDA4LDE2NSwwLjAwOHogTTE2NSwyOTkuOTkyYy03NC40MzksMC0xMzUtNjAuNTU3LTEzNS0xMzQuOTkyUzkwLjU2MSwzMC4wMDgsMTY1LDMwLjAwOHMxMzUsNjAuNTU3LDEzNSwxMzQuOTkxQzMwMCwyMzkuNDM2LDIzOS40MzksMjk5Ljk5MiwxNjUsMjk5Ljk5MnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTY1LDEzMC4wMDhjLTguMjg0LDAtMTUsNi43MTYtMTUsMTV2OTkuOTgzYzAsOC4yODQsNi43MTYsMTUsMTUsMTVzMTUtNi43MTYsMTUtMTV2LTk5Ljk4M0MxODAsMTM2LjcyNSwxNzMuMjg0LDEzMC4wMDgsMTY1LDEzMC4wMDh6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSw3MC4wMTFjLTMuOTUsMC03LjgxMSwxLjYtMTAuNjEsNC4zOWMtMi43OSwyLjc5LTQuMzksNi42Ni00LjM5LDEwLjYxczEuNiw3LjgxLDQuMzksMTAuNjFjMi43OSwyLjc5LDYuNjYsNC4zOSwxMC42MSw0LjM5czcuODEtMS42LDEwLjYwOS00LjM5YzIuNzktMi44LDQuMzkxLTYuNjYsNC4zOTEtMTAuNjFzLTEuNjAxLTcuODItNC4zOTEtMTAuNjFDMTcyLjgxLDcxLjYxLDE2OC45NSw3MC4wMTEsMTY1LDcwLjAxMXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRzSWNvbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBMYXRlbmN5VGVzdCB9IGZyb20gJy4vTGF0ZW5jeVRlc3QnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBBZ2dyZWdhdGVkU3RhdHMgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IE1hdGhVdGlscyB9IGZyb20gJy4uL1V0aWwvTWF0aFV0aWxzJztcblxuLyoqXG4gKiBBIHN0YXQgc3RydWN0dXJlLCBhbiBpZCwgdGhlIHN0YXQgc3RyaW5nLCBhbmQgdGhlIGVsZW1lbnQgd2hlcmUgaXQgaXMgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdDogc3RyaW5nO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG4vKipcbiAqIEEgVUkgY29tcG9uZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzdGF0cyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdHNQYW5lbCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdHNDbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0aXN0aWNzQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdHNSZXN1bHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgbGF0ZW5jeVRlc3Q6IExhdGVuY3lUZXN0O1xuXG4gICAgLyogQSBtYXAgc3RhdHMgd2UgYXJlIHN0b3JpbmcvcmVuZGVyaW5nICovXG4gICAgc3RhdHNNYXAgPSBuZXcgTWFwPHN0cmluZywgU3RhdD4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxhdGVuY3lUZXN0ID0gbmV3IExhdGVuY3lUZXN0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc3RhdHMtcGFuZWwnO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcCcpO1xuXG4gICAgICAgICAgICBjb25zdCBwYW5lbEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHBhbmVsRWxlbS5jbGFzc0xpc3QuYWRkKCdwYW5lbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocGFuZWxFbGVtKTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdHNIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzdGF0c0hlYWRpbmcuaWQgPSAnc3RhdHNIZWFkaW5nJztcbiAgICAgICAgICAgIHN0YXRzSGVhZGluZy50ZXh0Q29udGVudCA9ICdJbmZvcm1hdGlvbic7XG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQoc3RhdHNIZWFkaW5nKTtcblxuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNDbG9zZUJ1dHRvbik7XG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0NvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0c0NvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50LmlkID0gJ3N0YXRzQ29udGVudCc7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0cmVhbVRvb2xTdGF0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3RyZWFtVG9vbFN0YXRzLmlkID0gJ3N0cmVhbVRvb2xzU3RhdHMnO1xuICAgICAgICAgICAgc3RyZWFtVG9vbFN0YXRzLmNsYXNzTGlzdC5hZGQoJ2NvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICBjb25zdCBjb250cm9sU3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5pZCA9ICdDb250cm9sU3RhdHMnO1xuICAgICAgICAgICAgY29udHJvbFN0YXRzLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0aXN0aWNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgc3RhdGlzdGljcy5pZCA9ICdzdGF0aXN0aWNzJztcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGljc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3RhdGlzdGljc0hlYWRlci5pZCA9ICdzdGF0aXN0aWNzSGVhZGVyJztcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtdGV4dCcpO1xuICAgICAgICAgICAgc3RhdGlzdGljc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0hlYWRlcicpO1xuXG4gICAgICAgICAgICBjb25zdCBzZXNzaW9uU3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNlc3Npb25TdGF0cy5pbm5lckhUTUwgPSAnU2Vzc2lvbiBTdGF0cyc7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ29udGVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoc3RyZWFtVG9vbFN0YXRzKTtcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5hcHBlbmRDaGlsZChjb250cm9sU3RhdHMpO1xuICAgICAgICAgICAgY29udHJvbFN0YXRzLmFwcGVuZENoaWxkKHN0YXRpc3RpY3MpO1xuICAgICAgICAgICAgc3RhdGlzdGljcy5hcHBlbmRDaGlsZChzdGF0aXN0aWNzSGVhZGVyKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuYXBwZW5kQ2hpbGQoc2Vzc2lvblN0YXRzKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuYXBwZW5kQ2hpbGQodGhpcy5zdGF0aXN0aWNzQ29udGFpbmVyKTtcblxuICAgICAgICAgICAgY29udHJvbFN0YXRzLmFwcGVuZENoaWxkKHRoaXMubGF0ZW5jeVRlc3Qucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdGlzdGljc0NvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lci5pZCA9ICdzdGF0aXN0aWNzQ29udGFpbmVyJztcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNSZXN1bHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c1Jlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQuaWQgPSAnc3RhdGlzdGljc1Jlc3VsdCc7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c1Jlc3VsdC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c1Jlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzQ2xvc2VCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b24uaWQgPSAnc3RhdHNDbG9zZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHN0YXRzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHN0YXRzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhbmVsLXdyYXAtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIHN0YXRzIGNvbWluZyBpbiBmcm9tIGJyb3dzZXIvVUVcbiAgICAgKiBAcGFyYW0gc3RhdHMgdGhlIHN0YXRzIHN0cnVjdHVyZVxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVTdGF0cyhzdGF0czogQWdncmVnYXRlZFN0YXRzKSB7XG4gICAgICAgIC8vIGZvcm1hdCBudW1iZXJpbmcgYmFzZWQgb24gdGhlIGJyb3dzZXIgbGFuZ3VhZ2VcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHdpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UsIHtcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBJbmJvdW5kIGRhdGFcbiAgICAgICAgY29uc3QgaW5ib3VuZERhdGEgPSBNYXRoVXRpbHMuZm9ybWF0Qnl0ZXMoXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5ieXRlc1JlY2VpdmVkLFxuICAgICAgICAgICAgMlxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnSW5ib3VuZERhdGFTdGF0JywgJ1JlY2VpdmVkJywgaW5ib3VuZERhdGEpO1xuXG4gICAgICAgIC8vIFBhY2tldHMgbG9zdFxuICAgICAgICBjb25zdCBwYWNrZXRzTG9zdFN0YXQgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cyxcbiAgICAgICAgICAgICdwYWNrZXRzTG9zdCdcbiAgICAgICAgKVxuICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLnBhY2tldHNMb3N0KVxuICAgICAgICAgICAgOiAnQ2hyb21lIG9ubHknO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdQYWNrZXRzTG9zdFN0YXQnLFxuICAgICAgICAgICAgJ1BhY2tldHMgTG9zdCcsXG4gICAgICAgICAgICBwYWNrZXRzTG9zdFN0YXRcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBCaXRyYXRlXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5iaXRyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICAgICAnVmlkZW9CaXRyYXRlU3RhdCcsXG4gICAgICAgICAgICAgICAgJ1ZpZGVvIEJpdHJhdGUgKGticHMpJyxcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5iaXRyYXRlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuYml0cmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ0F1ZGlvQml0cmF0ZVN0YXQnLFxuICAgICAgICAgICAgICAgICdBdWRpbyBCaXRyYXRlIChrYnBzKScsXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuYml0cmF0ZS50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmlkZW8gcmVzb2x1dGlvblxuICAgICAgICBjb25zdCByZXNTdGF0ID1cbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cyxcbiAgICAgICAgICAgICAgICAnZnJhbWVXaWR0aCdcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lV2lkdGggJiZcbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cyxcbiAgICAgICAgICAgICAgICAnZnJhbWVIZWlnaHQnXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZUhlaWdodFxuICAgICAgICAgICAgICAgID8gc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVXaWR0aCArXG4gICAgICAgICAgICAgICAgICAneCcgK1xuICAgICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVIZWlnaHRcbiAgICAgICAgICAgICAgICA6ICdDaHJvbWUgb25seSc7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KCdWaWRlb1Jlc1N0YXQnLCAnVmlkZW8gcmVzb2x1dGlvbicsIHJlc1N0YXQpO1xuXG4gICAgICAgIC8vIEZyYW1lcyBkZWNvZGVkXG4gICAgICAgIGNvbnN0IGZyYW1lc0RlY29kZWQgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cyxcbiAgICAgICAgICAgICdmcmFtZXNEZWNvZGVkJ1xuICAgICAgICApXG4gICAgICAgICAgICA/IG51bWJlckZvcm1hdC5mb3JtYXQoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVzRGVjb2RlZClcbiAgICAgICAgICAgIDogJ0Nocm9tZSBvbmx5JztcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnRnJhbWVzRGVjb2RlZFN0YXQnLFxuICAgICAgICAgICAgJ0ZyYW1lcyBEZWNvZGVkJyxcbiAgICAgICAgICAgIGZyYW1lc0RlY29kZWRcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBGcmFtZXJhdGVcbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc1BlclNlY29uZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ0ZyYW1lcmF0ZVN0YXQnLFxuICAgICAgICAgICAgICAgICdGcmFtZXJhdGUnLFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc1BlclNlY29uZC50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRnJhbWVzIGRyb3BwZWRcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnRnJhbWVzRHJvcHBlZFN0YXQnLFxuICAgICAgICAgICAgJ0ZyYW1lcyBkcm9wcGVkJyxcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc0Ryb3BwZWQ/LnRvU3RyaW5nKClcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuY29kZWNJZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ1ZpZGVvQ29kZWNTdGF0JyxcbiAgICAgICAgICAgICAgICAnVmlkZW8gY29kZWMnLFxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZSBjb2RlYyB0byByZW1vdmUgdGhlIEZtdHAgbGluZVxuICAgICAgICAgICAgICAgIHN0YXRzLmNvZGVjc1xuICAgICAgICAgICAgICAgICAgICAuZ2V0KHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmNvZGVjSWQpXG4gICAgICAgICAgICAgICAgICAgID8uc3BsaXQoJyAnKVswXSA/PyAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kQXVkaW9TdGF0cy5jb2RlY0lkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICAgICAnQXVkaW9Db2RlY1N0YXQnLFxuICAgICAgICAgICAgICAgICdBdWRpbyBjb2RlYycsXG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdGhlIGNvZGVjIHRvIHJlbW92ZSB0aGUgRm10cCBsaW5lXG4gICAgICAgICAgICAgICAgc3RhdHMuY29kZWNzXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuY29kZWNJZClcbiAgICAgICAgICAgICAgICAgICAgPy5zcGxpdCgnICcpWzBdID8/ICcnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUlRUXG4gICAgICAgIGNvbnN0IG5ldFJUVCA9XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuY2FuZGlkYXRlUGFpcixcbiAgICAgICAgICAgICAgICAnY3VycmVudFJvdW5kVHJpcFRpbWUnXG4gICAgICAgICAgICApICYmIHN0YXRzLmlzTnVtYmVyKHN0YXRzLmNhbmRpZGF0ZVBhaXIuY3VycmVudFJvdW5kVHJpcFRpbWUpXG4gICAgICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRzLmNhbmRpZGF0ZVBhaXIuY3VycmVudFJvdW5kVHJpcFRpbWUgKiAxMDAwXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBcIkNhbid0IGNhbGN1bGF0ZVwiO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnUlRUU3RhdCcsICdOZXQgUlRUIChtcyknLCBuZXRSVFQpO1xuXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0R1cmF0aW9uU3RhdCcsXG4gICAgICAgICAgICAnRHVyYXRpb24nLFxuICAgICAgICAgICAgc3RhdHMuc2Vzc2lvblN0YXRzLnJ1blRpbWVcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdDb250cm9sc0lucHV0U3RhdCcsXG4gICAgICAgICAgICAnQ29udHJvbHMgc3RyZWFtIGlucHV0JyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy5jb250cm9sc1N0cmVhbUlucHV0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gUVBcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUVBTdGF0JyxcbiAgICAgICAgICAgICdWaWRlbyBxdWFudGl6YXRpb24gcGFyYW1ldGVyJyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy52aWRlb0VuY29kZXJBdmdRUC50b1N0cmluZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdG9kbzpcbiAgICAgICAgLy9zdGF0c1RleHQgKz0gYDxkaXY+QnJvd3NlciByZWNlaXZlIHRvIGNvbXBvc2l0ZSAobXMpOiAke3N0YXRzLmluYm91bmRWaWRlb1N0YXRzLnJlY2VpdmVUb0NvbXBvc2l0ZU1zfTwvZGl2PmA7XG5cbiAgICAgICAgTG9nZ2VyLkxvZyhcbiAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICBgLS0tLS0tLS0tIFN0YXRzIC0tLS0tLS0tLVxcbiAke3N0YXRzfVxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWAsXG4gICAgICAgICAgICA2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBzdGF0IHRvIHRoZSBzdGF0cyByZXN1bHRzIGluIHRoZSBET00gb3IgdXBkYXRlcyBhbiBleGl0aW5nIHN0YXQuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgc3RhdCB0byBhZGQvdXBkYXRlLlxuICAgICAqIEBwYXJhbSBzdGF0IFRoZSBjb250ZW50cyBvZiB0aGUgc3RhdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkT3JVcGRhdGVTdGF0KGlkOiBzdHJpbmcsIHN0YXRMYWJlbDogc3RyaW5nLCBzdGF0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RhdEhUTUwgPSBgJHtzdGF0TGFiZWx9OiAke3N0YXR9YDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdHNNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBzdGF0XG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ID0gbmV3IFN0YXQoKTtcbiAgICAgICAgICAgIG5ld1N0YXQuaWQgPSBpZDtcbiAgICAgICAgICAgIG5ld1N0YXQuc3RhdCA9IHN0YXQ7XG4gICAgICAgICAgICBuZXdTdGF0LnRpdGxlID0gc3RhdExhYmVsO1xuICAgICAgICAgICAgbmV3U3RhdC5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdGF0LmVsZW1lbnQuaW5uZXJIVE1MID0gc3RhdEhUTUw7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIHN0YXQgdG8gdGhlIGRvbVxuICAgICAgICAgICAgdGhpcy5zdGF0c1Jlc3VsdC5hcHBlbmRDaGlsZChuZXdTdGF0LmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c01hcC5zZXQoaWQsIG5ld1N0YXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgc3RhdFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0c01hcC5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5lbGVtZW50LmlubmVySFRNTCA9IHN0YXRIVE1MO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqIFdoZXRoZXIgYSBzdHJlYW0gVUkgZWxlbWVudCBpcyBpbnRlcm5hbGx5IG1hZGUsIGV4dGVybmFsbHkgcHJvdmlkZWQsIG9yIGRpc2FibGVkLiAqL1xuZXhwb3J0IGVudW0gVUlFbGVtZW50Q3JlYXRpb25Nb2RlIHtcbiAgICBDcmVhdGVEZWZhdWx0RWxlbWVudCxcbiAgICBVc2VDdXN0b21FbGVtZW50LFxuICAgIERpc2FibGVcbn1cblxuLyoqIEEgY29uZmlndXJhdGlvbiBmb3IgZGlmZmVyZW50IFVJIGVsZW1lbnRzIHdoaWNoIGNvbnRyb2wvZGlzcGxheSBpbmZvIHJlbGF0ZWQgdG8gdGhlIHN0cmVhbS4gKi9cbmV4cG9ydCB0eXBlIFVJRWxlbWVudENvbmZpZyA9IHtcbiAgICAvLyBJbiB3aGljaCB3YXkgaXMgdGhpcyBlbGVtZW50IGNyZWF0ZWQ/XG4gICAgY3JlYXRpb25Nb2RlIDogVUlFbGVtZW50Q3JlYXRpb25Nb2RlLFxuICAgIC8vIChPbmx5IHJlbGV2YW50IGlmIHdoZW4gbW9kZSBpcyBDcmVhdGVDdXN0b21FbGVtZW50KSBWaXN1YWxpemluZyBlbGVtZW50XG4gICAgY3VzdG9tRWxlbWVudD8gOiBIVE1MRWxlbWVudFxufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgYSBnZW5lcmFsIHN0cmVhbS1yZWxhdGVkIFVJIHBhbmVsLiBcbiAqIEZvciBleGFtcGxlOiBpcyBpdCBjcmVhdGVkLCBhbmQgaWYgaXQgaXMsIHdoYXQga2luZCBvZiBidXR0b24gaXMgdXNlZCB0byBzaG93L2hpZGUgaXQuXG4gKiBUaGlzIGNvbmZpZ3VyYXRpb24gaXMgdXNlZCBmb3IgdGhlIHNldHRpbmdzIHBhbmVsIGFuZCBzdGF0cyBwYW5lbCBieSBkZWZhdWx0LlxuICogXG4gKiBOb3RlOiBGb3IgY2FzZXMgd2hlcmUgdGhlIHBhbmVsIG5lZWRzIHRvIGJlIGNyZWF0ZWQsIGJ1dCBhIGJ1dHRvbiBpc24ndCBuZWVkZWQsIFxuICogdGhlIHBhbmVsIGVsZW1lbnQgY2FuIGJlIHBsYWNlZCBhbnl3aGVyZSBpbiB0aGUgRE9NIGFzIG5lZWRlZCAoc2VlIEFwcGxpY2F0aW9uIGNsYXNzKS4gXG4gKi9cbmV4cG9ydCB0eXBlIFBhbmVsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAvLyBJZiBwYW5lbCBpcyBlbmFibGVkLCBIVE1MIGVsZW1lbnRzIGZvciBpdCB3aWxsIGJlIGNyZWF0ZWQsIGFuZCBmdW50aW9uYWxpdHkgYm91bmRcbiAgICBpc0VuYWJsZWQgOiBib29sZWFuLFxuICAgIC8vIChPbmx5IHJlbGV2YW50IGlmIGlzRW5hYmxlZCkgVGhlIHR5cGUgb2YgdGhlIGJ1dHRvbiB0byBzaG93L2hpZGUgdGhpcyBwYW5lbFxuICAgIHZpc2liaWxpdHlCdXR0b25Db25maWc/IDogVUlFbGVtZW50Q29uZmlnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhbmVsRW5hYmxlZChjb25maWcgOiBQYW5lbENvbmZpZ3VyYXRpb24gfCB1bmRlZmluZWQpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFjb25maWcgfHwgKCEhY29uZmlnICYmIGNvbmZpZy5pc0VuYWJsZWQpO1xufSIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBVSSBlbGVtZW50IHNob3dpbmcgdGhlIFFQIChxdWFudGl6YXRpb24gcGFyYW1ldGVyKSBvZiB0aGUgdmlkZW8gc3RyZWFtIGF0IHRoZSBsYXN0IGVuY29kZWQgZnJhbWUgKHdlbGwsIGxhc3QgdHJhbnNtaXR0ZWQgUVAgcmVhbGx5KS5cbiAqIEEgYmxvY2tpZXIgZW5jb2Rpbmcgd2lsbCBoYXZlIGEgaGlnaGVyIFFQIGFuZCB0aGlzIHdpbGwgbWFrZSB0aGUgaW5kaWNhdG9yIHR1cm4gbW9yZSByZWQuXG4gKiBBIG5vbi1ibG9ja3kgc3RyZWFtIHdpbGwgaGF2ZSBhIGxvd2VyIFFQIGFuZCB0aGlzIHdpbGwgbWFrZSB0aGUgaW5kaWNhdG9yIHR1cm4gbW9yZSBncmVlbi5cbiAqIFRoZSBRUCBpbmRpY2F0b3IgaXMgcmVwcmVzZW50ZWQgdmlzdWFsbHkgdXNpbmcgYSBXaUZpIGljb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBWaWRlb1FwSW5kaWNhdG9yIHtcbiAgICB2aWRlb0VuY29kZXJBdmdRUCA9IC0xO1xuXG4gICAgLy8gbm9uIGh0bWwgZWxlbWVudHNcbiAgICBzdGF0c1RleHQgPSAnJztcbiAgICBjb2xvciA9ICcnO1xuXG4gICAgLy8gcXAgY29sb3JzXG4gICAgcmVhZG9ubHkgb3JhbmdlUVAgPSAyNjtcbiAgICByZWFkb25seSByZWRRUCA9IDM1O1xuXG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfcXVhbGl0eVRleHQ6IEhUTUxFbGVtZW50O1xuICAgIF9xdWFsaXR5U3RhdHVzOiBTVkdFbGVtZW50O1xuICAgIF9kb3Q6IFNWR0VsZW1lbnQ7XG4gICAgX291dGVyOiBTVkdFbGVtZW50O1xuICAgIF9taWRkbGU6IFNWR0VsZW1lbnQ7XG4gICAgX2lubmVyOiBTVkdFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb290IGVsZW1lbnQgb2YgdGhlIFFQIGluZGljYXRvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcm9vdCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIHN2ZyBmb3IgdGhlIGNvbm5lY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdjb25uZWN0aW9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuXG4gICAgICAgICAgICAvLyBhZGQgc3ZnIGljb24gZm9yIHRoZSBjb25uZWN0aW9uIHN0cmVuZ3RoXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnF1YWxpdHlTdGF0dXMpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHRleHQgdW5kZXJuZWF0aCB0aGUgY29ubmVjdGlvblxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5xdWFsaXR5VGV4dCk7XG5cbiAgICAgICAgICAgIC8vIHNldCBjb2xvcnMgdG8gbm90IGNvbm5lY3RlZCBpbml0aWFsbHlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUXBUb29sdGlwKC0xKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0ZXh0IHRoYXQgZGlzcGxheXMgdW5kZXIgdGhlIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBxdWFsaXR5VGV4dCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcXVhbGl0eVRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVRleHQuaWQgPSAncXVhbGl0eVRleHQnO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVRleHQuY2xhc3NMaXN0LmFkZCgndG9vbHRpcHRleHQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVhbGl0eVRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcXVhbGl0eVN0YXR1cygpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9xdWFsaXR5U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICAgICAnY29ubmVjdGlvblN0cmVuZ3RoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlTdGF0dXMuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDQ5NC40NSA0OTQuNDUnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWZpIGljb25cbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLmRvdCk7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuYXBwZW5kQ2hpbGQodGhpcy5taWRkbGUpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMub3V0ZXIpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMuaW5uZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWFsaXR5U3RhdHVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZG90IGF0IHRoZSBib3R0b20gb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGRvdCgpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kb3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdjaXJjbGUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdkb3QnKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3gnLCAnMjQ3LjEyNScpO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsICczOTguOTI1Jyk7XG4gICAgICAgICAgICB0aGlzLl9kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ3InLCAnMzUuMycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kb3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBvdXRlciBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG91dGVyKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX291dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX291dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdvdXRlcicpO1xuICAgICAgICAgICAgdGhpcy5fb3V0ZXIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ000NjcuOTI1LDIwNC42MjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy0xMTEuNS0xMTEuNC0yOTIuNy0xMTEuNC00MDQuMSwwYy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMHMtMTAuMy0yNy4xLDAtMzcuNGM2NC02NCwxNDktOTkuMiwyMzkuNS05OS4yczE3NS41LDM1LjIsMjM5LjUsOTkuMmMxMC4zLDEwLjMsMTAuMywyNy4xLDAsMzcuNEM0ODEuNDI1LDIwMi4wMjUsNDc0LjYyNSwyMDQuNjI1LDQ2Ny45MjUsMjA0LjYyNXonXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pZGRsZSBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG1pZGRsZSgpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9taWRkbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21pZGRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21pZGRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnbWlkZGxlJyk7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zOTUuMjI1LDI3Ny4zMjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy03MS40LTcxLjMtMTg3LjQtNzEuMy0yNTguOCwwYy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMHMtMTAuMy0yNy4xLDAtMzcuNGM5Mi05MiwyNDEuNi05MiwzMzMuNiwwYzEwLjMsMTAuMywxMC4zLDI3LjEsMCwzNy40QzQwOC43MjUsMjc0LjcyNSw0MDEuOTI1LDI3Ny4zMjUsMzk1LjIyNSwyNzcuMzI1eidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21pZGRsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGlubmVyIGFyYyBvZiB0aGUgd2lmaSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaW5uZXIoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5faW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5faW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ2lubmVyJyk7XG4gICAgICAgICAgICB0aGlzLl9pbm5lci5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTMyMy42MjUsMzQ4LjgyNWMtNi44LDAtMTMuNS0yLjYtMTguNy03LjhjLTE1LjQtMTUuNC0zNi0yMy45LTU3LjgtMjMuOXMtNDIuNCw4LjUtNTcuOCwyMy45Yy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMGMtMTAuMy0xMC4zLTEwLjMtMjcuMSwwLTM3LjRjMjUuNC0yNS40LDU5LjItMzkuNCw5NS4yLTM5LjRzNjkuOCwxNCw5NS4yLDM5LjVjMTAuMywxMC4zLDEwLjMsMjcuMSwwLDM3LjRDMzM3LjIyNSwzNDYuMjI1LDMzMC40MjUsMzQ4LjgyNSwzMjMuNjI1LDM0OC44MjV6J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzZXQgdGhlIHNwZWVkIG9mIHRoZSBzdGF0dXMgbGlnaHQuXG4gICAgICogQHBhcmFtIHNwZWVkIC0gU2V0IHRoZSBzcGVlZCBvZiB0aGUgYmxpbmssIGhpZ2hlciBudW1iZXJzIG1ha2UgdGhlIHN0YXR1cyBsaWdodCBibGluayBmYXN0ZXIuXG4gICAgICovXG4gICAgYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoc3BlZWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgaXRlcmF0aW9uID0gc3BlZWQ7XG4gICAgICAgIGxldCBvcGFjaXR5ID0gMTtcbiAgICAgICAgY29uc3QgdGlja0lEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgb3BhY2l0eSAtPSAwLjE7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlUZXh0LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoKG9wYWNpdHkgLSAwLjUpICogMilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAob3BhY2l0eSA8PSAwLjEpIHtcbiAgICAgICAgICAgICAgICBpZiAoLS1pdGVyYXRpb24gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tJRCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAgLyBzcGVlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlcyB0aGUgUVAgdG9vbHRpcCBieSBjb252ZXJ0aW5nIHRoZSBWaWRlbyBFbmNvZGVyIFFQIHRvIGEgY29sb3IgbGlnaHRcbiAgICAgKiBAcGFyYW0gUVAgLSBUaGUgdmlkZW8gZW5jb2RlciBRUCBudW1iZXIgbmVlZGVkIHRvIGZpbmQgdGhlIGF2ZXJhZ2VcbiAgICAgKi9cbiAgICB1cGRhdGVRcFRvb2x0aXAoUVA6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZpZGVvRW5jb2RlckF2Z1FQID0gUVA7XG4gICAgICAgIGlmIChRUCA+IHRoaXMucmVkUVApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIHRoaXMuYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoMik7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5Qb29yIGVuY29kaW5nIHF1YWxpdHk8L2Rpdj5gO1xuICAgICAgICAgICAgdGhpcy5vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLm1pZGRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKFFQID4gdGhpcy5vcmFuZ2VRUCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICAgICAgdGhpcy5ibGlua1ZpZGVvUXVhbGl0eVN0YXR1cygxKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNUZXh0ID0gYDxkaXYgc3R5bGU9XCJjb2xvcjogJHt0aGlzLmNvbG9yfVwiPkJsb2NreSBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoUVAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9ICcjYjBiMGIwJztcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5pbm5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5Ob3QgY29ubmVjdGVkPC9kaXY+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnbGltZSc7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIHRoaXMuc3RhdHNUZXh0ID0gYDxkaXYgc3R5bGU9XCJjb2xvcjogJHt0aGlzLmNvbG9yfVwiPkNsZWFyIGVuY29kaW5nIHF1YWxpdHk8L2Rpdj5gO1xuICAgICAgICAgICAgdGhpcy5vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWFsaXR5VGV4dC5pbm5lckhUTUwgPSB0aGlzLnN0YXRzVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFhSIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFhSSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfeHJJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgWFIgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAneHJCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy54ckljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnWFInO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHhySWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl94ckljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5feHJJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICd4ckljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMTAwIDEwMCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5feHJJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBwYXRoIG9mIHRoZSB4ciBoZWFkc2V0XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMjkgNDFjLTUgMC05IDQtOSA5czQgOSA5IDkgOS00IDktOS00LTktOS05em0wIDE0Yy0yLjggMC01LTIuMi01LTVzMi4yLTUgNS01IDUgMi4yIDUgNS0yLjIgNS01IDV6bTQyLTE0Yy01IDAtOSA0LTkgOXM0IDkgOSA5IDktNCA5LTktNC05LTktOXptMCAxNGMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1em0xMi0zMUgxN2MtNi42IDAtMTIgNS40LTEyIDEydjI4YzAgNi42IDUuNCAxMiAxMiAxMmgxNC41YzMuNSAwIDYuOC0xLjUgOS00LjFsMy41LTRjMS41LTEuNyAzLjctMi43IDYtMi43czQuNSAxIDYgMi43bDMuNSA0YzIuMyAyLjYgNS42IDQuMSA5IDQuMUg4M2M2LjYgMCAxMi01LjQgMTItMTJWMzZjMC02LjYtNS40LTEyLTEyLTEyem04IDQwYzAgNC40LTMuNiA4LTggOEg2OC41Yy0yLjMgMC00LjUtMS02LTIuN2wtMy41LTRjLTIuMy0yLjYtNS42LTQuMS05LTQuMS0zLjUgMC02LjggMS41LTkgNC4xbC0zLjUgNEMzNiA3MSAzMy44IDcyIDMxLjUgNzJIMTdjLTQuNCAwLTgtMy42LTgtOFYzNmMwLTQuNCAzLjYtOCA4LThoNjZjNC40IDAgOCAzLjYgOCA4djI4eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl94ckljb247XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuZXhwb3J0IGNsYXNzIE1hdGhVdGlscyB7XG4gICAgLyoqXG4gICAgICogZm9ybWF0cyBCeXRlcyBjb21pbmcgaW4gZm9yIHZpZGVvIHN0YXRzXG4gICAgICogQHBhcmFtIGJ5dGVzIG51bWJlciB0byBjb252ZXJ0XG4gICAgICogQHBhcmFtIGRlY2ltYWxzIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xuICAgICAqL1xuICAgIHN0YXRpYyBmb3JtYXRCeXRlcyhieXRlczogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmFjdG9yID0gMTAyNDtcbiAgICAgICAgY29uc3QgZG0gPSBkZWNpbWFscyA8IDAgPyAwIDogZGVjaW1hbHM7XG4gICAgICAgIGNvbnN0IHNpemVzID0gW1xuICAgICAgICAgICAgJ0J5dGVzJyxcbiAgICAgICAgICAgICdLaUInLFxuICAgICAgICAgICAgJ01pQicsXG4gICAgICAgICAgICAnR2lCJyxcbiAgICAgICAgICAgICdUaUInLFxuICAgICAgICAgICAgJ1BpQicsXG4gICAgICAgICAgICAnRWlCJyxcbiAgICAgICAgICAgICdaaUInLFxuICAgICAgICAgICAgJ1lpQidcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhmYWN0b3IpKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcGFyc2VGbG9hdCgoYnl0ZXMgLyBNYXRoLnBvdyhmYWN0b3IsIGkpKS50b0ZpeGVkKGRtKSkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIHNpemVzW2ldXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19lcGljZ2FtZXNfcHNfbGliX3BpeGVsc3RyZWFtaW5nZnJvbnRlbmRfdWU1XzJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fY2FtZWxfY2FzZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qc3NfcGx1Z2luX2dsb2JhbF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgVUlPcHRpb25zLCBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnIH0gZnJvbSAnLi9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCB7IFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB9IGZyb20gJy4vU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMnO1xuXG5leHBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0FGS092ZXJsYXknO1xuZXhwb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmV4cG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmV4cG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuZXhwb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvSW5mb092ZXJsYXknO1xuZXhwb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvUGxheU92ZXJsYXknO1xuZXhwb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuZXhwb3J0IHsgQ29uZmlnVUkgfSBmcm9tICcuL0NvbmZpZy9Db25maWdVSSc7XG5leHBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJQmFzZSc7XG5leHBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJRmxhZyc7XG5leHBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXInO1xuZXhwb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJT3B0aW9uJztcbmV4cG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlUZXh0JztcbmV4cG9ydCB7IFBhbmVsQ29uZmlndXJhdGlvbiwgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9