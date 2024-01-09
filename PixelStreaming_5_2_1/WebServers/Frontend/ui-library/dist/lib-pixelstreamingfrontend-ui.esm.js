import * as __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_2_d57552df__ from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2";
import * as __WEBPACK_EXTERNAL_MODULE_jss__ from "jss";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case_de113355__ from "jss-plugin-camel-case";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_global_ef86f421__ from "jss-plugin-global";
/**222****/ var __webpack_modules__ = ({

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
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jss-plugin-global */ "jss-plugin-global");
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jss-plugin-camel-case */ "jss-plugin-camel-case");
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
            plugins: [(0,jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__["default"])(), (0,jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__["default"])()]
        };
        jss__WEBPACK_IMPORTED_MODULE_0__["default"].setup(jssOptions);
        this.customStyles = customStyles;
        this.lightModePalette =
            lightModePalette !== null && lightModePalette !== void 0 ? lightModePalette : this.defaultLightModePalette;
        this.darkModePalette = darkModePalette !== null && darkModePalette !== void 0 ? darkModePalette : this.defaultDarkModePalette;
    }
    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();
        // attach generated style sheet to page
        jss__WEBPACK_IMPORTED_MODULE_0__["default"].createStyleSheet({
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

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_2_d57552df__;

/***/ }),

/***/ "jss":
/*!**********************!*\
  !*** external "jss" ***!
  \**********************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss__;

/***/ }),

/***/ "jss-plugin-camel-case":
/*!****************************************!*\
  !*** external "jss-plugin-camel-case" ***!
  \****************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case_de113355__;

/***/ }),

/***/ "jss-plugin-global":
/*!************************************!*\
  !*** external "jss-plugin-global" ***!
  \************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_global_ef86f421__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
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

var __webpack_exports__AFKOverlay = __webpack_exports__.AFKOverlay;
var __webpack_exports__ActionOverlay = __webpack_exports__.ActionOverlay;
var __webpack_exports__Application = __webpack_exports__.Application;
var __webpack_exports__ConfigUI = __webpack_exports__.ConfigUI;
var __webpack_exports__ConnectOverlay = __webpack_exports__.ConnectOverlay;
var __webpack_exports__DisconnectOverlay = __webpack_exports__.DisconnectOverlay;
var __webpack_exports__ErrorOverlay = __webpack_exports__.ErrorOverlay;
var __webpack_exports__InfoOverlay = __webpack_exports__.InfoOverlay;
var __webpack_exports__OverlayBase = __webpack_exports__.OverlayBase;
var __webpack_exports__PixelStreamingApplicationStyle = __webpack_exports__.PixelStreamingApplicationStyle;
var __webpack_exports__PlayOverlay = __webpack_exports__.PlayOverlay;
var __webpack_exports__SettingUIBase = __webpack_exports__.SettingUIBase;
var __webpack_exports__SettingUIFlag = __webpack_exports__.SettingUIFlag;
var __webpack_exports__SettingUINumber = __webpack_exports__.SettingUINumber;
var __webpack_exports__SettingUIOption = __webpack_exports__.SettingUIOption;
var __webpack_exports__SettingUIText = __webpack_exports__.SettingUIText;
var __webpack_exports__TextOverlay = __webpack_exports__.TextOverlay;
var __webpack_exports__UIElementCreationMode = __webpack_exports__.UIElementCreationMode;
export { __webpack_exports__AFKOverlay as AFKOverlay, __webpack_exports__ActionOverlay as ActionOverlay, __webpack_exports__Application as Application, __webpack_exports__ConfigUI as ConfigUI, __webpack_exports__ConnectOverlay as ConnectOverlay, __webpack_exports__DisconnectOverlay as DisconnectOverlay, __webpack_exports__ErrorOverlay as ErrorOverlay, __webpack_exports__InfoOverlay as InfoOverlay, __webpack_exports__OverlayBase as OverlayBase, __webpack_exports__PixelStreamingApplicationStyle as PixelStreamingApplicationStyle, __webpack_exports__PlayOverlay as PlayOverlay, __webpack_exports__SettingUIBase as SettingUIBase, __webpack_exports__SettingUIFlag as SettingUIFlag, __webpack_exports__SettingUINumber as SettingUINumber, __webpack_exports__SettingUIOption as SettingUIOption, __webpack_exports__SettingUIText as SettingUIText, __webpack_exports__TextOverlay as TextOverlay, __webpack_exports__UIElementCreationMode as UIElementCreationMode };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsR0FBRztZQUNILEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDWCxDQUFDO0lBQ04sQ0FBQztDQUNKOzs7Ozs7Ozs7OztBQ25DRCxlQUFlLFlBQVksNkJBQTZCO0FBQ3hEO0FBQ0E7Ozs7Ozs7Ozs7QUNGQSxlQUFlLFlBQVksNkJBQTZCO0FBQ3hEO0FBQ0E7Ozs7Ozs7Ozs7QUNGQSxlQUFlLFlBQVksNkJBQTZCO0FBQ3hEO0FBQ0E7Ozs7Ozs7Ozs7QUNGQSxlQUFlLFlBQVksNkJBQTZCO0FBQ3hEO0FBQ0E7Ozs7OztTQ0ZBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7O1NBRUE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7Ozs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EseUNBQXlDLHdDQUF3QztVQUNqRjtVQUNBO1VBQ0E7Ozs7O1VDUEE7Ozs7O1VDQUE7VUFDQTtVQUNBO1VBQ0EsdURBQXVELGlCQUFpQjtVQUN4RTtVQUNBLGdEQUFnRCxhQUFhO1VBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkEsa0RBQWtEO0FBRXlDO0FBRUQ7QUFFeEM7QUFDTTtBQUNKO0FBQ007QUFDTTtBQUNWO0FBQ0Y7QUFDQTtBQUNBO0FBQ1A7QUFDVTtBQUNBO0FBQ0k7QUFDQTtBQUNKO0FBQytDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL0NvbmZpZy9Db25maWdVSS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlCYXNlLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvQ29uZmlnL1NldHRpbmdVSUZsYWcudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9Db25maWcvU2V0dGluZ1VJTnVtYmVyLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvQ29uZmlnL1NldHRpbmdVSU9wdGlvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlUZXh0LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9BRktPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9BY3Rpb25PdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9CYXNlT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvQ29ubmVjdE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9FcnJvck92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9PdmVybGF5L0luZm9PdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9QbGF5T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvVGV4dE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9TdHlsZXMvUGl4ZWxTdHJlYW1pbmdBcHBsaWNhdGlvblN0eWxlcy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL0NvbnRyb2xzLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvRnVsbHNjcmVlbkljb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9MYWJlbGxlZEJ1dHRvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL0xhdGVuY3lUZXN0LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvU2V0dGluZ3NJY29uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvU2V0dGluZ3NQYW5lbC50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL1N0YXRzSWNvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL1N0YXRzUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL1ZpZGVvUXBJbmRpY2F0b3IudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9YUkljb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VdGlsL01hdGhVdGlscy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yL2V4dGVybmFsIG1vZHVsZSBcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjJcIiIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yL2V4dGVybmFsIG1vZHVsZSBcImpzc1wiIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvZXh0ZXJuYWwgbW9kdWxlIFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi9leHRlcm5hbCBtb2R1bGUgXCJqc3MtcGx1Z2luLWdsb2JhbFwiIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL3BpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHtcbiAgICBQaXhlbFN0cmVhbWluZyxcbiAgICBGbGFncyxcbiAgICBMb2dnZXIsXG4gICAgQWdncmVnYXRlZFN0YXRzLFxuICAgIExhdGVuY3lUZXN0UmVzdWx0cyxcbiAgICBJbml0aWFsU2V0dGluZ3MsXG4gICAgTWVzc2FnZVN0cmVhbWVyTGlzdFxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi4vT3ZlcmxheS9CYXNlT3ZlcmxheSc7XG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmltcG9ydCB7IFRleHRPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9UZXh0T3ZlcmxheSc7XG5pbXBvcnQgeyBDb25uZWN0T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvQ29ubmVjdE92ZXJsYXknO1xuaW1wb3J0IHsgRGlzY29ubmVjdE92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmltcG9ydCB7IFBsYXlPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9QbGF5T3ZlcmxheSc7XG5pbXBvcnQgeyBJbmZvT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvSW5mb092ZXJsYXknO1xuaW1wb3J0IHsgRXJyb3JPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuaW1wb3J0IHsgQUZLT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvQUZLT3ZlcmxheSc7XG5pbXBvcnQgeyBDb250cm9scywgQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9VSS9Db250cm9scyc7XG5pbXBvcnQgeyBMYWJlbGxlZEJ1dHRvbiB9IGZyb20gJy4uL1VJL0xhYmVsbGVkQnV0dG9uJztcbmltcG9ydCB7IFNldHRpbmdzUGFuZWwgfSBmcm9tICcuLi9VSS9TZXR0aW5nc1BhbmVsJztcbmltcG9ydCB7IFN0YXRzUGFuZWwgfSBmcm9tICcuLi9VSS9TdGF0c1BhbmVsJztcbmltcG9ydCB7IFZpZGVvUXBJbmRpY2F0b3IgfSBmcm9tICcuLi9VSS9WaWRlb1FwSW5kaWNhdG9yJztcbmltcG9ydCB7IENvbmZpZ1VJLCBMaWdodE1vZGUgfSBmcm9tICcuLi9Db25maWcvQ29uZmlnVUknO1xuaW1wb3J0IHsgXG4gICAgVUlFbGVtZW50Q3JlYXRpb25Nb2RlLCBcbiAgICBQYW5lbENvbmZpZ3VyYXRpb24sIFxuICAgIGlzUGFuZWxFbmFibGVkLFxuICAgIFVJRWxlbWVudENvbmZpZ1xufSBmcm9tICcuLi9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcydcbmltcG9ydCB7IEZ1bGxTY3JlZW5JY29uQmFzZSwgRnVsbFNjcmVlbkljb25FeHRlcm5hbCB9IGZyb20gJy4uL1VJL0Z1bGxzY3JlZW5JY29uJztcblxuXG4vKiogXG4gKiBDb25maWd1cmF0aW9uIG9mIHRoZSBpbnRlcm5hbCB2aWRlbyBRUCBpbmRpY2F0b3IgZWxlbWVudC5cbiAqIEJ5IGRlZmF1bHQsIG9uZSB3aWxsIGJlIG1hZGUsIGJ1dCBpZiBuZWVkZWQgdGhpcyBjYW4gYmUgZGlzYWJsZWQuXG4gKiBcbiAqIE5vdGU6IEZvciBjdXN0b20gVUkgZWxlbWVudHMgdG8gcmVhY3QgdG8gdGhlIFFQIGJlaW5nIGNoYW5nZWQsIHVzZSBhIFBpeGVsU3RyZWFtaW5nIFxuICogb2JqZWN0J3MgYWRkRXZlbnRMaXN0ZW5lcigndmlkZW9FbmNvZGVyQXZnUVAnLCAuLi4pIG9yIHJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uKS5cbiAqL1xuZXhwb3J0IHR5cGUgVmlkZW9RUEluZGljYXRvckNvbmZpZyA9IHtcbiAgICBkaXNhYmxlSW5kaWNhdG9yPzogYm9vbGVhblxufVxuXG4vKipcbiAqIFVJIE9wdGlvbnMgY2FuIGJlIHByb3ZpZGVkIHdoZW4gY3JlYXRpbmcgYW4gQXBwbGljYXRpb24sIHRvIGNvbmZpZ3VyZSBpdCdzIGludGVybmFsXG4gKiBhbmQgZXh0ZXJuYWwgYmVoYXZpb3VyLCBlbmFibGUvZGlzYWJsZSBmZWF0dXJlcywgYW5kIGNvbm5lY3QgdG8gZXh0ZXJuYWwgVUkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVUlPcHRpb25zIHtcbiAgICBzdHJlYW06IFBpeGVsU3RyZWFtaW5nO1xuICAgIG9uQ29sb3JNb2RlQ2hhbmdlZD86IChpc0xpZ2h0TW9kZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgICAvKiogQnkgZGVmYXVsdCwgYSBzZXR0aW5ncyBwYW5lbCBhbmQgYXNzb2NpYXRlIHZpc2liaWxpdHkgdG9nZ2xlIGJ1dHRvbiB3aWxsIGJlIG1hZGUuXG4gICAgICAqIElmIG5lZWRlZCwgdGhpcyBiZWhhdmlvdXIgY2FuIGJlIGNvbmZpZ3VyZWQuICovXG4gICAgc2V0dGluZ3NQYW5lbENvbmZpZz86IFBhbmVsQ29uZmlndXJhdGlvbjtcbiAgICAvKiogQnkgZGVmYXVsdCwgYSBzdGF0cyBwYW5lbCBhbmQgYXNzb2NpYXRlIHZpc2liaWxpdHkgdG9nZ2xlIGJ1dHRvbiB3aWxsIGJlIG1hZGUuXG4gICAgICAqIElmIG5lZWRlZCwgdGhpcyBiZWhhdmlvdXIgY2FuIGJlIGNvbmZpZ3VyZWQuICovXG4gICAgc3RhdHNQYW5lbENvbmZpZz86IFBhbmVsQ29uZmlndXJhdGlvbjtcbiAgICAvKiogSWYgbmVlZGVkLCB0aGUgZnVsbCBzY3JlZW4gYnV0dG9uIGNhbiBiZSBleHRlcm5hbCBvciBkaXNhYmxlZC4gKi9cbiAgICBmdWxsU2NyZWVuQ29udHJvbHNDb25maWc/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIC8qKiBJZiBuZWVkZWQsIFhSIGJ1dHRvbiBjYW4gYmUgZXh0ZXJuYWwgb3IgZGlzYWJsZWQuICovXG4gICAgeHJDb250cm9sc0NvbmZpZz8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgLyoqIENvbmZpZ3VyYXRpb24gb2YgdGhlIHZpZGVvIFFQIGluZGljYXRvci4gKi9cbiAgICB2aWRlb1FwSW5kaWNhdG9yQ29uZmlnPyA6IFZpZGVvUVBJbmRpY2F0b3JDb25maWdcbn1cblxuLyoqXG4gKiBBbiBBcHBsaWNhdGlvbiBpcyBhIGNvbWJpbmF0aW9uIG9mIFVJIGVsZW1lbnRzIHRvIGRpc3BsYXkgYW5kIG1hbmFnZSBhIFdlYlJUQyBQaXhlbCBTdHJlYW1pbmdcbiAqIGNvbm5lY3Rpb24uIEl0IGluY2x1ZGVzIGZlYXR1cmVzIGZvciBjb250cm9sbGluZyBhIHN0cmVhbSB3aXRoIG1vdXNlIGFuZCBrZXlib2FyZCwgXG4gKiBtYW5hZ2luZyBjb25uZWN0aW9uIGVuZHBvaW50cywgYXMgd2VsbCBhcyBkaXNwbGF5aW5nIHN0YXRzIGFuZCBvdGhlciBpbmZvcm1hdGlvbiBhYm91dCBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIEFwcGxpY2F0aW9uIHtcbiAgICBzdHJlYW06IFBpeGVsU3RyZWFtaW5nO1xuXG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfdWlGZWF0dXJlRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvLyBzZXQgdGhlIG92ZXJsYXkgcGxhY2Vob2xkZXJzXG4gICAgY3VycmVudE92ZXJsYXk6IE92ZXJsYXlCYXNlIHwgbnVsbDtcbiAgICBkaXNjb25uZWN0T3ZlcmxheTogQWN0aW9uT3ZlcmxheTtcbiAgICBjb25uZWN0T3ZlcmxheTogQWN0aW9uT3ZlcmxheTtcbiAgICBwbGF5T3ZlcmxheTogQWN0aW9uT3ZlcmxheTtcbiAgICBpbmZvT3ZlcmxheTogVGV4dE92ZXJsYXk7XG4gICAgZXJyb3JPdmVybGF5OiBUZXh0T3ZlcmxheTtcbiAgICBhZmtPdmVybGF5OiBBRktPdmVybGF5O1xuXG4gICAgY29udHJvbHM6IENvbnRyb2xzO1xuXG4gICAgc2V0dGluZ3NQYW5lbDogU2V0dGluZ3NQYW5lbDtcbiAgICBzdGF0c1BhbmVsOiBTdGF0c1BhbmVsO1xuICAgIHZpZGVvUXBJbmRpY2F0b3I6IFZpZGVvUXBJbmRpY2F0b3I7XG5cbiAgICBjb25maWdVSTogQ29uZmlnVUk7XG5cbiAgICBvbkNvbG9yTW9kZUNoYW5nZWQ6IFVJT3B0aW9uc1tcIm9uQ29sb3JNb2RlQ2hhbmdlZFwiXTtcblxuICAgIHByb3RlY3RlZCBfb3B0aW9ucyA6IFVJT3B0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvcHRpb25zIC0gSW5pdGlhbGl6YXRpb24gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFVJT3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc3RyZWFtID0gb3B0aW9ucy5zdHJlYW07XG4gICAgICAgIHRoaXMub25Db2xvck1vZGVDaGFuZ2VkID0gb3B0aW9ucy5vbkNvbG9yTW9kZUNoYW5nZWQ7XG4gICAgICAgIHRoaXMuY29uZmlnVUkgPSBuZXcgQ29uZmlnVUkodGhpcy5zdHJlYW0uY29uZmlnKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZU92ZXJsYXlzKCk7XG5cbiAgICAgICAgaWYgKGlzUGFuZWxFbmFibGVkKG9wdGlvbnMuc3RhdHNQYW5lbENvbmZpZykpIHtcbiAgICAgICAgICAgIC8vIEFkZCBzdGF0cyBwYW5lbFxuICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsID0gbmV3IFN0YXRzUGFuZWwoKTtcbiAgICAgICAgICAgIHRoaXMudWlGZWF0dXJlc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGF0c1BhbmVsLnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKGlzUGFuZWxFbmFibGVkKG9wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZykpIHtcbiAgICAgICAgICAgIC8vIEFkZCBzZXR0aW5ncyBwYW5lbFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsID0gbmV3IFNldHRpbmdzUGFuZWwoKTtcbiAgICAgICAgICAgIHRoaXMudWlGZWF0dXJlc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1BhbmVsLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJlU2V0dGluZ3MoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKCFvcHRpb25zLnZpZGVvUXBJbmRpY2F0b3JDb25maWcgfHwgIW9wdGlvbnMudmlkZW9RcEluZGljYXRvckNvbmZpZy5kaXNhYmxlSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICAvLyBBZGQgdGhlIHZpZGVvIHN0cmVhbSBRUCBpbmRpY2F0b3JcbiAgICAgICAgICAgIHRoaXMudmlkZW9RcEluZGljYXRvciA9IG5ldyBWaWRlb1FwSW5kaWNhdG9yKCk7XG4gICAgICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudmlkZW9RcEluZGljYXRvci5yb290RWxlbWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcblxuICAgICAgICB0aGlzLnJlZ2lzdGVyQ2FsbGJhY2tzKCk7XG5cbiAgICAgICAgdGhpcy5zaG93Q29ubmVjdE9yQXV0b0Nvbm5lY3RPdmVybGF5cygpO1xuXG4gICAgICAgIHRoaXMuc2V0Q29sb3JNb2RlKHRoaXMuY29uZmlnVUkuaXNDdXN0b21GbGFnRW5hYmxlZChMaWdodE1vZGUpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlT3ZlcmxheXMoKTogdm9pZCB7XG4gICAgICAgIC8vIGJ1aWxkIGFsbCBvZiB0aGUgb3ZlcmxheXNcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheSA9IG5ldyBEaXNjb25uZWN0T3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5ID0gbmV3IENvbm5lY3RPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkgPSBuZXcgUGxheU92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pbmZvT3ZlcmxheSA9IG5ldyBJbmZvT3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmVycm9yT3ZlcmxheSA9IG5ldyBFcnJvck92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5ID0gbmV3IEFGS092ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5Lm9uQWN0aW9uKCgpID0+IHRoaXMuc3RyZWFtLnJlY29ubmVjdCgpKTtcblxuICAgICAgICAvLyBCdWlsZCB0aGUgd2ViUnRjIGNvbm5lY3Qgb3ZlcmxheSBFdmVudCBMaXN0ZW5lciBhbmQgc2hvdyB0aGUgY29ubmVjdCBvdmVybGF5XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkub25BY3Rpb24oKCkgPT4gdGhpcy5zdHJlYW0uY29ubmVjdCgpKTtcblxuICAgICAgICAvLyBzZXQgdXAgdGhlIHBsYXkgb3ZlcmxheXMgYWN0aW9uXG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkub25BY3Rpb24oKCkgPT4gdGhpcy5zdHJlYW0ucGxheSgpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgYnV0dG9uIGNsaWNrIGZ1bmN0aW9ucyBhbmQgYnV0dG9uIGZ1bmN0aW9uYWxpdHlcbiAgICAgKi9cbiAgICBwdWJsaWMgY3JlYXRlQnV0dG9ucygpIHtcbiAgICAgICAgY29uc3QgY29udHJvbHNVSUNvbmZpZyA6IENvbnRyb2xzVUlDb25maWd1cmF0aW9uID0ge1xuICAgICAgICAgICAgc3RhdHNCdXR0b25UeXBlIDogISF0aGlzLl9vcHRpb25zLnN0YXRzUGFuZWxDb25maWdcbiAgICAgICAgICAgICAgICA/IHRoaXMuX29wdGlvbnMuc3RhdHNQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzZXR0aW5nc0J1dHRvblR5cGU6ICEhdGhpcy5fb3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9vcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZ1xuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZnVsbHNjcmVlbkJ1dHRvblR5cGU6IHRoaXMuX29wdGlvbnMuZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnLFxuICAgICAgICAgICAgeHJJY29uVHlwZTogdGhpcy5fb3B0aW9ucy54ckNvbnRyb2xzQ29uZmlnXG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0dXAgY29udHJvbHNcbiAgICAgICAgY29uc3QgY29udHJvbHMgPSBuZXcgQ29udHJvbHMoY29udHJvbHNVSUNvbmZpZyk7XG4gICAgICAgIHRoaXMudWlGZWF0dXJlc0VsZW1lbnQuYXBwZW5kQ2hpbGQoY29udHJvbHMucm9vdEVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFdoZW4gd2UgZnVsbHNjcmVlbiB3ZSB3YW50IHRoaXMgZWxlbWVudCB0byBiZSB0aGUgcm9vdFxuICAgICAgICBjb25zdCBmdWxsU2NyZWVuQnV0dG9uIDogRnVsbFNjcmVlbkljb25CYXNlIHwgdW5kZWZpbmVkID0gXG4gICAgICAgICAgICAvLyBEZXBlbmRpbmcgb24gaWYgd2UncmUgY3JlYXRpbmcgYW4gaW50ZXJuYWwgYnV0dG9uLCBvciB1c2luZyBhbiBleHRlcm5hbCBvbmVcbiAgICAgICAgICAgICghIXRoaXMuX29wdGlvbnMuZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnIFxuICAgICAgICAgICAgICAgICYmIHRoaXMuX29wdGlvbnMuZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnLmNyZWF0aW9uTW9kZSA9PT0gVUlFbGVtZW50Q3JlYXRpb25Nb2RlLlVzZUN1c3RvbUVsZW1lbnQpXG4gICAgICAgICAgICAvLyBFaXRoZXIgY3JlYXRlIGEgZnVsbHNjcmVlbiBjbGFzcyBiYXNlZCBvbiB0aGUgZXh0ZXJuYWwgYnV0dG9uXG4gICAgICAgICAgICA/IG5ldyBGdWxsU2NyZWVuSWNvbkV4dGVybmFsKHRoaXMuX29wdGlvbnMuZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnLmN1c3RvbUVsZW1lbnQpXG4gICAgICAgICAgICAvLyBPciB1c2UgdGhlIG9uZSBjcmVhdGVkIGJ5IHRoZSBDb250cm9scyBpbml0aWFsaXplciBlYXJsaWVyXG4gICAgICAgICAgICA6IGNvbnRyb2xzLmZ1bGxzY3JlZW5JY29uO1xuICAgICAgICBpZiAoZnVsbFNjcmVlbkJ1dHRvbikge1xuICAgICAgICAgICAgZnVsbFNjcmVlbkJ1dHRvbi5mdWxsc2NyZWVuRWxlbWVudCA9IC9pUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInZpZGVvXCIpWzBdIDogdGhpcy5yb290RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBzZXR0aW5ncyBidXR0b24gdG8gY29udHJvbHNcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy5zZXR0aW5nc0ljb24gPyBjb250cm9scy5zZXR0aW5nc0ljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnLmN1c3RvbUVsZW1lbnQ7XG4gICAgICAgIGlmICghIXNldHRpbmdzQnV0dG9uKSBzZXR0aW5nc0J1dHRvbi5vbmNsaWNrID0gKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDbGlja2VkKCk7XG4gICAgICAgIGlmICghIXRoaXMuc2V0dGluZ3NQYW5lbCkgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2xpY2tlZCgpO1xuXG4gICAgICAgIC8vIEFkZCBXZWJYUiBidXR0b24gdG8gY29udHJvbHNcbiAgICAgICAgY29uc3QgeHJCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy54ckljb24gPyBjb250cm9scy54ckljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZy5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5Vc2VDdXN0b21FbGVtZW50ID9cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZy5jdXN0b21FbGVtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoISF4ckJ1dHRvbikgeHJCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnN0cmVhbS50b2dnbGVYUigpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBzdGF0cy9pbmZvIGJ1dHRvblxuICAgICAgICBjb25zdCBzdGF0c0J1dHRvbiA6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gXG4gICAgICAgICAgICAhIWNvbnRyb2xzLnN0YXRzSWNvbiA/IGNvbnRyb2xzLnN0YXRzSWNvbi5yb290RWxlbWVudCA6IFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWcuY3VzdG9tRWxlbWVudDtcbiAgICAgICAgaWYgKCEhc3RhdHNCdXR0b24pIHN0YXRzQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB0aGlzLnN0YXRzQ2xpY2tlZCgpXG5cbiAgICAgICAgaWYgKCEhdGhpcy5zdGF0c1BhbmVsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwuc3RhdHNDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gdGhpcy5zdGF0c0NsaWNrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjb21tYW5kIGJ1dHRvbnMgKGlmIHdlIGhhdmUgc29tZXdoZXJlIHRvIGFkZCB0aGVtIHRvKVxuICAgICAgICBpZiAoISF0aGlzLnNldHRpbmdzUGFuZWwpIHtcbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHRvZ2dsZSBmcHNcbiAgICAgICAgICAgIGNvbnN0IHNob3dGUFNCdXR0b24gPSBuZXcgTGFiZWxsZWRCdXR0b24oJ1Nob3cgRlBTJywgJ1RvZ2dsZScpO1xuICAgICAgICAgICAgc2hvd0ZQU0J1dHRvbi5hZGRPbkNsaWNrTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlcXVlc3RTaG93RnBzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBmb3IgcmVzdGFydCBzdHJlYW1cbiAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRTdHJlYW1CdXR0b24gPSBuZXcgTGFiZWxsZWRCdXR0b24oXG4gICAgICAgICAgICAgICAgJ1Jlc3RhcnQgU3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnUmVzdGFydCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN0YXJ0U3RyZWFtQnV0dG9uLmFkZE9uQ2xpY2tMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBmb3IgcmVxdWVzdCBrZXlmcmFtZVxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEtleWZyYW1lQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKFxuICAgICAgICAgICAgICAgICdSZXF1ZXN0IGtleWZyYW1lJyxcbiAgICAgICAgICAgICAgICAnUmVxdWVzdCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXF1ZXN0S2V5ZnJhbWVCdXR0b24uYWRkT25DbGlja0xpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZXF1ZXN0SWZyYW1lKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY29tbWFuZHNTZWN0aW9uRWxlbSA9IHRoaXMuY29uZmlnVUkuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ29udGVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ0NvbW1hbmRzJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbW1hbmRzU2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQoc2hvd0ZQU0J1dHRvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHJlcXVlc3RLZXlmcmFtZUJ1dHRvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHJlc3RhcnRTdHJlYW1CdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlIHRoZSBzZXR0aW5ncyB3aXRoIG9uIGNoYW5nZSBsaXN0ZW5lcnMgYW5kIGFueSBhZGRpdGlvbmFsIHBlciBleHBlcmllbmNlIHNldHRpbmdzLlxuICAgICAqL1xuICAgIGNvbmZpZ3VyZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICAvLyBUaGlzIGJ1aWxkcyBhbGwgdGhlIHNldHRpbmdzIHNlY3Rpb25zIGFuZCBmbGFncyB1bmRlciB0aGlzIGBzZXR0aW5nc0NvbnRlbnRgIGVsZW1lbnQuXG4gICAgICAgIHRoaXMuY29uZmlnVUkucG9wdWxhdGVTZXR0aW5nc0VsZW1lbnQoXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwuc2V0dGluZ3NDb250ZW50RWxlbWVudFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY29uZmlnVUkuYWRkQ3VzdG9tRmxhZ09uU2V0dGluZ0NoYW5nZWRMaXN0ZW5lcihcbiAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgIChpc0xpZ2h0TW9kZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnVUkuc2V0Q3VzdG9tRmxhZ0xhYmVsKFxuICAgICAgICAgICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGBDb2xvciBTY2hlbWU6ICR7aXNMaWdodE1vZGUgPyAnTGlnaHQnIDogJ0RhcmsnfSBNb2RlYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb2xvck1vZGUoaXNMaWdodE1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQ2FsbGJhY2tzKCkge1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdBY3RpdmF0ZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGNvdW50RG93biwgZGlzbWlzc0FmayB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWZrT3ZlcmxheShjb3VudERvd24sIGRpc21pc3NBZmspXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnYWZrV2FybmluZ1VwZGF0ZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGNvdW50RG93biB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hZmtPdmVybGF5LnVwZGF0ZUNvdW50ZG93bihjb3VudERvd24pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnYWZrV2FybmluZ0RlYWN0aXZhdGUnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5hZmtPdmVybGF5LmhpZGUoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZmtUaW1lZE91dCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFma092ZXJsYXkuaGlkZSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAndmlkZW9FbmNvZGVyQXZnUVAnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBhdmdRUCB9IH0pID0+IHRoaXMub25WaWRlb0VuY29kZXJBdmdRUChhdmdRUClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjU2RwJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNTZHAoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNBdXRvQ29ubmVjdCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQXV0b0Nvbm5lY3QoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNDb25uZWN0aW5nJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNDb25uZWN0aW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQ29ubmVjdGVkJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNDb25uZWN0ZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNGYWlsZWQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0ZhaWxlZCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnd2ViUnRjRGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgZXZlbnRTdHJpbmcsIHNob3dBY3Rpb25PckVycm9yT25EaXNjb25uZWN0IH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uRGlzY29ubmVjdChldmVudFN0cmluZywgc2hvd0FjdGlvbk9yRXJyb3JPbkRpc2Nvbm5lY3QpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblZpZGVvSW5pdGlhbGl6ZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdzdHJlYW1Mb2FkaW5nJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25TdHJlYW1Mb2FkaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdwbGF5U3RyZWFtRXJyb3InLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBtZXNzYWdlIH0gfSkgPT4gdGhpcy5vblBsYXlTdHJlYW1FcnJvcihtZXNzYWdlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdwbGF5U3RyZWFtJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25QbGF5U3RyZWFtKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdwbGF5U3RyZWFtUmVqZWN0ZWQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyByZWFzb24gfSB9KSA9PiB0aGlzLm9uUGxheVN0cmVhbVJlamVjdGVkKHJlYXNvbilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdsb2FkRnJlZXplRnJhbWUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBzaG91bGRTaG93UGxheU92ZXJsYXkgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRnJlZXplRnJhbWUoc2hvdWxkU2hvd1BsYXlPdmVybGF5KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N0YXRzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBhZ2dyZWdhdGVkU3RhdHMgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25TdGF0c1JlY2VpdmVkKGFnZ3JlZ2F0ZWRTdGF0cylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdsYXRlbmN5VGVzdFJlc3VsdCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGxhdGVuY3lUaW1pbmdzIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF0ZW5jeVRlc3RSZXN1bHRzKGxhdGVuY3lUaW1pbmdzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N0cmVhbWVyTGlzdE1lc3NhZ2UnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBtZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0cmVhbWVyTGlzdE1lc3NhZ2UobWVzc2FnZVN0cmVhbWVyTGlzdCwgYXV0b1NlbGVjdGVkU3RyZWFtZXJJZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzZXR0aW5nc0NoYW5nZWQnLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLmNvbmZpZ1VJLm9uU2V0dGluZ3NDaGFuZ2VkKGV2ZW50KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJvb3RFbGVtZW50IG9mIHRoZSBhcHBsaWNhdGlvbiwgdmlkZW8gc3RyZWFtIGFuZCBhbGwgVUkgYXJlIGNoaWxkcmVuIG9mIHRoaXMgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3BsYXllclVJJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25vc2VsZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnVpRmVhdHVyZXNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZWxlbWVudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgVUkgZmVhdHVyZXMsIGxpa2UgdGhlIHN0YXRzIGFuZCBzZXR0aW5ncyBwYW5lbHMuXG4gICAgICovXG4gICAgcHVibGljIGdldCB1aUZlYXR1cmVzRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdWlGZWF0dXJlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudC5pZCA9ICd1aUZlYXR1cmVzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdWlGZWF0dXJlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgZGlzY29ubmVjdCBvdmVybGF5XG4gICAgICogQHBhcmFtIHVwZGF0ZVRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQpO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuZGlzY29ubmVjdE92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBkaXNjb25uZWN0IG92ZXJsYXlzIHNwYW4gdGV4dFxuICAgICAqIEBwYXJhbSB1cGRhdGVUZXh0IC0gdGhlIG5ldyBjb3VudGRvd24gbnVtYmVyXG4gICAgICovXG4gICAgdXBkYXRlRGlzY29ubmVjdE92ZXJsYXkodXBkYXRlVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkudXBkYXRlKHVwZGF0ZVRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgZGlzY29ubmVjdCBvdmVybGF5cyBhY3Rpb25cbiAgICAgKi9cbiAgICBvbkRpc2Nvbm5lY3Rpb25BY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgY3VycmVudCBvdmVybGF5XG4gICAgICovXG4gICAgaGlkZUN1cnJlbnRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50T3ZlcmxheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5LmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGNvbm5lY3Qgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dDb25uZWN0T3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmNvbm5lY3RPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBwbGF5IG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93UGxheU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5wbGF5T3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgdGV4dCBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93VGV4dE92ZXJsYXkodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuaW5mb092ZXJsYXkudXBkYXRlKHRleHQpO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuaW5mb092ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGVycm9yIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gdGV4dCAtIHRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dFcnJvck92ZXJsYXkodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5LnVwZGF0ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5lcnJvck92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5lcnJvck92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3Mgb3IgaGlkZXMgdGhlIHNldHRpbmdzIHBhbmVsIGlmIGNsaWNrZWRcbiAgICAgKi9cbiAgICBzZXR0aW5nc0NsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC5oaWRlKCk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbC50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3Mgb3IgaGlkZXMgdGhlIHN0YXRzIHBhbmVsIGlmIGNsaWNrZWRcbiAgICAgKi9cbiAgICBzdGF0c0NsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbC5oaWRlKCk7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSBjb25uZWN0IG92ZXJsYXlzIGFjdGlvblxuICAgICAqL1xuICAgIG9uQ29ubmVjdEFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgcGxheSBvdmVybGF5cyBhY3Rpb25cbiAgICAgKi9cbiAgICBvblBsYXlBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgYWZrIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY291bnREb3duIC0gdGhlIGNvdW50ZG93biBudW1iZXIgZm9yIHRoZSBhZmsgY291bnRkb3duXG4gICAgICovXG4gICAgc2hvd0Fma092ZXJsYXkoY291bnREb3duOiBudW1iZXIsIGRpc21pc3NBZms6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5LnVwZGF0ZUNvdW50ZG93bihjb3VudERvd24pO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkub25BY3Rpb24oKCkgPT4gZGlzbWlzc0FmaygpKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuYWZrT3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBDb25uZWN0IE92ZXJsYXkgb3IgYXV0byBjb25uZWN0XG4gICAgICovXG4gICAgc2hvd0Nvbm5lY3RPckF1dG9Db25uZWN0T3ZlcmxheXMoKSB7XG4gICAgICAgIC8vIHNldCB1cCBpZiB0aGUgYXV0byBwbGF5IHdpbGwgYmUgdXNlZCBvciByZWd1bGFyIGNsaWNrIHRvIHN0YXJ0XG4gICAgICAgIGlmICghdGhpcy5zdHJlYW0uY29uZmlnLmlzRmxhZ0VuYWJsZWQoRmxhZ3MuQXV0b0Nvbm5lY3QpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dDb25uZWN0T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgd2ViUnRjQXV0b0Nvbm5lY3QgT3ZlcmxheSBhbmQgY29ubmVjdFxuICAgICAqL1xuICAgIG9uV2ViUnRjQXV0b0Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdBdXRvIENvbm5lY3RpbmcgTm93Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGZ1bmN0aW9uYWxpdHkgdG8gaGFwcGVuIHdoZW4gcmVjZWl2aW5nIGEgd2ViUlRDIGFuc3dlclxuICAgICAqL1xuICAgIG9uV2ViUnRjU2RwKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnV2ViUlRDIENvbm5lY3Rpb24gTmVnb3RpYXRlZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIGEgdGV4dCBvdmVybGF5IHRvIGFsZXJ0IHRoZSB1c2VyIHRoZSBzdHJlYW0gaXMgY3VycmVudGx5IGxvYWRpbmdcbiAgICAgKi9cbiAgICBvblN0cmVhbUxvYWRpbmcoKSB7XG4gICAgICAgIC8vIGJ1aWxkIHRoZSBzcGlubmVyIHNwYW5cbiAgICAgICAgY29uc3Qgc3Bpbm5lclNwYW46IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bpbm5lclNwYW4uY2xhc3NOYW1lID0gJ3Zpc3VhbGx5LWhpZGRlbic7XG4gICAgICAgIHNwaW5uZXJTcGFuLmlubmVySFRNTCA9ICdMb2FkaW5nLi4uJztcblxuICAgICAgICAvLyBidWlsZCB0aGUgc3Bpbm5lciBkaXZcbiAgICAgICAgY29uc3Qgc3Bpbm5lckRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3Bpbm5lckRpdi5pZCA9ICdsb2FkaW5nLXNwaW5uZXInO1xuICAgICAgICBzcGlubmVyRGl2LmNsYXNzTmFtZSA9ICdzcGlubmVyLWJvcmRlciBtcy0yJztcbiAgICAgICAgc3Bpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnc3RhdHVzJyk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBzcGlubmVyIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHNwaW5uZXJEaXYuYXBwZW5kQ2hpbGQoc3Bpbm5lclNwYW4pO1xuXG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdMb2FkaW5nIFN0cmVhbSAnICsgc3Bpbm5lckRpdi5vdXRlckhUTUwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHZpZGVvIGlzIGRpc2Nvbm5lY3RlZCAtIGRpc3BsYXlzIHRoZSBlcnJvciBvdmVybGF5IGFuZCByZXNldHMgdGhlIGJ1dHRvbnMgc3RyZWFtIHRvb2xzIHVwb24gZGlzY29ubmVjdFxuICAgICAqIEBwYXJhbSBldmVudFN0cmluZyAtIHRoZSBldmVudCB0ZXh0IHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIG9uRGlzY29ubmVjdChldmVudFN0cmluZzogc3RyaW5nLCBzaG93QWN0aW9uT3JFcnJvck9uRGlzY29ubmVjdDogYm9vbGVhbikge1xuICAgICAgICBpZiAoc2hvd0FjdGlvbk9yRXJyb3JPbkRpc2Nvbm5lY3QgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yT3ZlcmxheShgRGlzY29ubmVjdGVkOiAke2V2ZW50U3RyaW5nfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93RGlzY29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICAgICAgYERpc2Nvbm5lY3RlZDogJHtldmVudFN0cmluZ30gIDxkaXYgY2xhc3M9XCJjbGlja2FibGVTdGF0ZVwiPkNsaWNrIFRvIFJlc3RhcnQ8L2Rpdj5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpc2FibGUgc3RhcnRpbmcgYSBsYXRlbmN5IGNoZWNrXG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgd2hlbiBXZWIgUnRjIGlzIGNvbm5lY3RpbmdcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0Nvbm5lY3RpbmcoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdTdGFydGluZyBjb25uZWN0aW9uIHRvIHNlcnZlciwgcGxlYXNlIHdhaXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBoYXMgY29ubmVjdGVkXG4gICAgICovXG4gICAgb25XZWJSdGNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdXZWJSVEMgY29ubmVjdGVkLCB3YWl0aW5nIGZvciB2aWRlbycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgd2hlbiBXZWIgUnRjIGZhaWxzIHRvIGNvbm5lY3RcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0ZhaWxlZCgpIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3JPdmVybGF5KCdVbmFibGUgdG8gc2V0dXAgdmlkZW8nKTtcbiAgICB9XG5cbiAgICBvbkxvYWRGcmVlemVGcmFtZShzaG91bGRTaG93UGxheU92ZXJsYXk6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHNob3VsZFNob3dQbGF5T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgTG9nZ2VyLkxvZyhMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLCAnc2hvd2luZyBwbGF5IG92ZXJsYXknKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BsYXlPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXlTdHJlYW0oKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtRXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yT3ZlcmxheShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBvblBsYXlTdHJlYW1SZWplY3RlZChvblJlamVjdGVkUmVhc29uOiB1bmtub3duKSB7XG4gICAgICAgIHRoaXMuc2hvd1BsYXlPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgb25WaWRlb0luaXRpYWxpemVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RyZWFtLmNvbmZpZy5pc0ZsYWdFbmFibGVkKEZsYWdzLkF1dG9QbGF5VmlkZW8pKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RhcnRpbmcgYSBsYXRlbmN5IGNoZWNrXG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVxdWVzdExhdGVuY3lUZXN0KCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGZ1bmN0aW9uYWxpdHkgdG8gaGFwcGVuIHdoZW4gY2FsY3VsYXRpbmcgdGhlIGF2ZXJhZ2UgdmlkZW8gZW5jb2RlciBxcFxuICAgICAqIEBwYXJhbSBRUCAtIHRoZSBxdWFsaXR5IG51bWJlciBvZiB0aGUgc3RyZWFtXG4gICAgICovXG4gICAgb25WaWRlb0VuY29kZXJBdmdRUChRUDogbnVtYmVyKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBpbnRlcm5hbCBRUCBpbmRpY2F0b3IgaWYgb25lIGlzIHByZXNlbnRcbiAgICAgICAgaWYgKCEhdGhpcy52aWRlb1FwSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvUXBJbmRpY2F0b3IudXBkYXRlUXBUb29sdGlwKFFQKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdGlhbFNldHRpbmdzKHNldHRpbmdzOiBJbml0aWFsU2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLlBpeGVsU3RyZWFtaW5nU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpc2FibGVMYXRlbmN5VGVzdCA9XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuUGl4ZWxTdHJlYW1pbmdTZXR0aW5ncy5EaXNhYmxlTGF0ZW5jeVRlc3Q7XG4gICAgICAgICAgICBpZiAoZGlzYWJsZUxhdGVuY3lUZXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24udGl0bGUgPVxuICAgICAgICAgICAgICAgICAgICAnRGlzYWJsZWQgYnkgLVBpeGVsU3RyZWFtaW5nRGlzYWJsZUxhdGVuY3lUZXN0ZXI9dHJ1ZSc7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLkluZm8oXG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgICAgICctUGl4ZWxTdHJlYW1pbmdEaXNhYmxlTGF0ZW5jeVRlc3Rlcj10cnVlLCByZXF1ZXN0aW5nIGxhdGVuY3kgcmVwb3J0IGZyb20gdGhlIHRoZSBicm93c2VyIHRvIFVFIGlzIGRpc2FibGVkLidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TdGF0c1JlY2VpdmVkKGFnZ3JlZ2F0ZWRTdGF0czogQWdncmVnYXRlZFN0YXRzKSB7XG4gICAgICAgIC8vIEdyYWIgYWxsIHN0YXRzIHdlIGNhbiBvZmYgdGhlIGFnZ3JlZ2F0ZWQgc3RhdHNcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmhhbmRsZVN0YXRzKGFnZ3JlZ2F0ZWRTdGF0cyk7XG4gICAgfVxuXG4gICAgb25MYXRlbmN5VGVzdFJlc3VsdHMobGF0ZW5jeVRpbWluZ3M6IExhdGVuY3lUZXN0UmVzdWx0cykge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwubGF0ZW5jeVRlc3QuaGFuZGxlVGVzdFJlc3VsdChsYXRlbmN5VGltaW5ncyk7XG4gICAgfVxuXG4gICAgaGFuZGxlU3RyZWFtZXJMaXN0TWVzc2FnZShtZXNzYWdlU3RyZWFtaW5nTGlzdDogTWVzc2FnZVN0cmVhbWVyTGlzdCwgYXV0b1NlbGVjdGVkU3RyZWFtZXJJZDogc3RyaW5nIHwgbnVsbCkge1xuICAgICAgICBpZiAoYXV0b1NlbGVjdGVkU3RyZWFtZXJJZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgaWYobWVzc2FnZVN0cmVhbWluZ0xpc3QuaWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KFxuICAgICAgICAgICAgICAgICAgICAnTm8gc3RyZWFtZXJzIGNvbm5lY3RlZC4gPGRpdiBjbGFzcz1cImNsaWNrYWJsZVN0YXRlXCI+Q2xpY2sgVG8gUmVzdGFydDwvZGl2PidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheShcbiAgICAgICAgICAgICAgICAgICAgJ011bHRpcGxlIHN0cmVhbWVycyBkZXRlY3RlZC4gVXNlIHRoZSBkcm9wZG93biBpbiB0aGUgc2V0dGluZ3MgbWVudSB0byBzZWxlY3QgdGhlIHN0cmVhbWVyJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbGlnaHQvZGFyayBjb2xvciBtb2RlXG4gICAgICogQHBhcmFtIGlzTGlnaHRNb2RlIC0gc2hvdWxkIHdlIHVzZSBhIGxpZ2h0IG9yIGRhcmsgY29sb3Igc2NoZW1lXG4gICAgICovXG4gICAgc2V0Q29sb3JNb2RlKGlzTGlnaHRNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQ29sb3JNb2RlQ2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy5vbkNvbG9yTW9kZUNoYW5nZWQoaXNMaWdodE1vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHtcbiAgICBDb25maWcsXG4gICAgRmxhZ3NJZHMsXG4gICAgTnVtZXJpY1BhcmFtZXRlcnNJZHMsXG4gICAgT3B0aW9uUGFyYW1ldGVyc0lkcyxcbiAgICBUZXh0UGFyYW1ldGVyc0lkcyxcbiAgICBUZXh0UGFyYW1ldGVycyxcbiAgICBPcHRpb25QYXJhbWV0ZXJzLFxuICAgIEZsYWdzLFxuICAgIE51bWVyaWNQYXJhbWV0ZXJzLFxuICAgIFNldHRpbmdzQ2hhbmdlZEV2ZW50LFxuICAgIFNldHRpbmdGbGFnLFxuICAgIFNldHRpbmdOdW1iZXIsXG4gICAgU2V0dGluZ1RleHQsXG4gICAgU2V0dGluZ09wdGlvbixcbiAgICBMb2dnZXIsXG4gICAgU2V0dGluZ0Jhc2Vcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9TZXR0aW5nVUlGbGFnJztcbmltcG9ydCB7IFNldHRpbmdVSU51bWJlciB9IGZyb20gJy4vU2V0dGluZ1VJTnVtYmVyJztcbmltcG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL1NldHRpbmdVSVRleHQnO1xuaW1wb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9TZXR0aW5nVUlPcHRpb24nO1xuXG5leHBvcnQgY29uc3QgTGlnaHRNb2RlID0gJ0xpZ2h0TW9kZScgYXMgY29uc3Q7XG50eXBlIEV4dHJhRmxhZ3MgPSB0eXBlb2YgTGlnaHRNb2RlO1xuZXhwb3J0IHR5cGUgRmxhZ3NJZHNFeHRlbmRlZCA9IEZsYWdzSWRzIHwgRXh0cmFGbGFncztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1VJIHtcbiAgICBwcml2YXRlIGN1c3RvbUZsYWdzID0gbmV3IE1hcDxcbiAgICAgICAgRmxhZ3NJZHNFeHRlbmRlZCxcbiAgICAgICAgU2V0dGluZ0ZsYWc8RmxhZ3NJZHNFeHRlbmRlZD5cbiAgICA+KCk7XG5cbiAgICAvKiBBIG1hcCBvZiBmbGFncyB0aGF0IGNhbiBiZSB0b2dnbGVkIC0gb3B0aW9ucyB0aGF0IGNhbiBiZSBzZXQgaW4gdGhlIGFwcGxpY2F0aW9uIC0gZS5nLiBVc2UgTWljPyAqL1xuICAgIHByaXZhdGUgZmxhZ3NVaSA9IG5ldyBNYXA8XG4gICAgICAgIEZsYWdzSWRzRXh0ZW5kZWQsXG4gICAgICAgIFNldHRpbmdVSUZsYWc8RmxhZ3NJZHNFeHRlbmRlZD5cbiAgICA+KCk7XG5cbiAgICAvKiBBIG1hcCBvZiBudW1lcmljYWwgc2V0dGluZ3MgLSBvcHRpb25zIHRoYXQgY2FuIGJlIGluIHRoZSBhcHBsaWNhdGlvbiAtIGUuZy4gTWluQml0cmF0ZSAqL1xuICAgIHByaXZhdGUgbnVtZXJpY1BhcmFtZXRlcnNVaSA9IG5ldyBNYXA8XG4gICAgICAgIE51bWVyaWNQYXJhbWV0ZXJzSWRzLFxuICAgICAgICBTZXR0aW5nVUlOdW1iZXJcbiAgICA+KCk7XG5cbiAgICAvKiBBIG1hcCBvZiB0ZXh0IHNldHRpbmdzIC0gZS5nLiBzaWduYWxsaW5nIHNlcnZlciB1cmwgKi9cbiAgICBwcml2YXRlIHRleHRQYXJhbWV0ZXJzVWkgPSBuZXcgTWFwPFRleHRQYXJhbWV0ZXJzSWRzLCBTZXR0aW5nVUlUZXh0PigpO1xuXG4gICAgLyogQSBtYXAgb2YgZW51bSBiYXNlZCBzZXR0aW5ncyAtIGUuZy4gcHJlZmVycmVkIGNvZGVjICovXG4gICAgcHJpdmF0ZSBvcHRpb25QYXJhbWV0ZXJzVWkgPSBuZXcgTWFwPFxuICAgICAgICBPcHRpb25QYXJhbWV0ZXJzSWRzLFxuICAgICAgICBTZXR0aW5nVUlPcHRpb25cbiAgICA+KCk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0gU2V0dGluZ3MgLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ3VzdG9tVUlTZXR0aW5ncyhjb25maWcudXNlVXJsUGFyYW1zKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlclNldHRpbmdzVUlDb21wb25lbnRzKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGN1c3RvbSBVSSBzZXR0aW5ncyB0aGF0IGFyZSBub3QgcHJvdmlkZWQgYnkgdGhlIFBpeGVsIFN0cmVhbWluZyBsaWJyYXJ5LlxuICAgICAqL1xuICAgIGNyZWF0ZUN1c3RvbVVJU2V0dGluZ3ModXNlVXJsUGFyYW1zOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY3VzdG9tRmxhZ3Muc2V0KFxuICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgbmV3IFNldHRpbmdGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+KFxuICAgICAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgICAgICAnQ29sb3IgU2NoZW1lOiBEYXJrIE1vZGUnLFxuICAgICAgICAgICAgICAgICdQYWdlIHN0eWxpbmcgd2lsbCBiZSBlaXRoZXIgbGlnaHQgb3IgZGFyaycsXG4gICAgICAgICAgICAgICAgZmFsc2UgLyppZiB3YW50IHRvIHVzZSBzeXN0ZW0gcHJlZjogKHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KScpLm1hdGNoZXMpKi8sXG4gICAgICAgICAgICAgICAgdXNlVXJsUGFyYW1zLFxuICAgICAgICAgICAgICAgIChpc0xpZ2h0TW9kZTogYm9vbGVhbiwgc2V0dGluZzogU2V0dGluZ0Jhc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IGBDb2xvciBTY2hlbWU6ICR7aXNMaWdodE1vZGUgPyAnTGlnaHQnIDogJ0RhcmsnfSBNb2RlYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBVSSB3cmFwcGVyIGNvbXBvbmVudHMgZm9yIGVhY2ggc2V0dGluZyBlbGVtZW50IGluIGNvbmZpZy5cbiAgICAgKiBAcGFyYW0gY29uZmlnXG4gICAgICovXG4gICAgcmVnaXN0ZXJTZXR0aW5nc1VJQ29tcG9uZW50cyhjb25maWc6IENvbmZpZykge1xuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldEZsYWdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5zZXQoc2V0dGluZy5pZCwgbmV3IFNldHRpbmdVSUZsYWcoc2V0dGluZykpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBBcnJheS5mcm9tKHRoaXMuY3VzdG9tRmxhZ3MudmFsdWVzKCkpKSB7XG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuc2V0KFxuICAgICAgICAgICAgICAgIHNldHRpbmcuaWQsXG4gICAgICAgICAgICAgICAgbmV3IFNldHRpbmdVSUZsYWc8RmxhZ3NJZHNFeHRlbmRlZD4oc2V0dGluZylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNvbmZpZy5nZXRUZXh0U2V0dGluZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy50ZXh0UGFyYW1ldGVyc1VpLnNldChzZXR0aW5nLmlkLCBuZXcgU2V0dGluZ1VJVGV4dChzZXR0aW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNvbmZpZy5nZXROdW1lcmljU2V0dGluZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLnNldChcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgIG5ldyBTZXR0aW5nVUlOdW1iZXIoc2V0dGluZylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNvbmZpZy5nZXRPcHRpb25TZXR0aW5ncygpKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5zZXQoXG4gICAgICAgICAgICAgICAgc2V0dGluZy5pZCxcbiAgICAgICAgICAgICAgICBuZXcgU2V0dGluZ1VJT3B0aW9uKHNldHRpbmcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBET00gZWxlbWVudHMgZm9yIGEgc2V0dGluZ3Mgc2VjdGlvbiB3aXRoIGEgaGVhZGluZy5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NFbGVtIFRoZSBwYXJlbnQgY29udGFpbmVyIGZvciBvdXIgRE9NIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBzZWN0aW9uSGVhZGluZyBUaGUgaGVhZGluZyBlbGVtZW50IHRvIGdvIGludG8gdGhlIHNlY3Rpb24uXG4gICAgICogQHJldHVybnMgVGhlIGNvbnN0cnVjdGVkIERPTSBlbGVtZW50IGZvciB0aGUgc2VjdGlvbi5cbiAgICAgKi9cbiAgICBidWlsZFNlY3Rpb25XaXRoSGVhZGluZyhzZXR0aW5nc0VsZW06IEhUTUxFbGVtZW50LCBzZWN0aW9uSGVhZGluZzogc3RyaW5nKSB7XG4gICAgICAgIC8vIG1ha2Ugc2VjdGlvbiBlbGVtZW50XG4gICAgICAgIGNvbnN0IHNlY3Rpb25FbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICBzZWN0aW9uRWxlbS5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0NvbnRhaW5lcicpO1xuXG4gICAgICAgIC8vIG1ha2Ugc2VjdGlvbiBoZWFkaW5nXG4gICAgICAgIGNvbnN0IHBzU2V0dGluZ3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHNTZXR0aW5nc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0hlYWRlcicpO1xuICAgICAgICBwc1NldHRpbmdzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgcHNTZXR0aW5nc0hlYWRlci50ZXh0Q29udGVudCA9IHNlY3Rpb25IZWFkaW5nO1xuXG4gICAgICAgIC8vIGFkZCBzZWN0aW9uIGFuZCBoZWFkaW5nIHRvIHBhcmVudCBzZXR0aW5ncyBlbGVtZW50XG4gICAgICAgIHNlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHBzU2V0dGluZ3NIZWFkZXIpO1xuICAgICAgICBzZXR0aW5nc0VsZW0uYXBwZW5kQ2hpbGQoc2VjdGlvbkVsZW0pO1xuICAgICAgICByZXR1cm4gc2VjdGlvbkVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgZmxhZ3Mgd2l0aCB0aGVpciBkZWZhdWx0IHZhbHVlcyBhbmQgYWRkIHRoZW0gdG8gdGhlIGBDb25maWcuZmxhZ3NgIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NFbGVtIC0gVGhlIGVsZW1lbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIGluZGl2aWR1YWwgc2V0dGluZ3Mgc2VjdGlvbnMsIGZsYWdzLCBhbmQgc28gb24uXG4gICAgICovXG4gICAgcG9wdWxhdGVTZXR0aW5nc0VsZW1lbnQoc2V0dGluZ3NFbGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAvKiBTZXR1cCBhbGwgUGl4ZWwgU3RyZWFtaW5nIHNwZWNpZmljIHNldHRpbmdzICovXG4gICAgICAgIGNvbnN0IHBzU2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdQaXhlbCBTdHJlYW1pbmcnXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gbWFrZSBzZXR0aW5ncyBzaG93IHVwIGluIERPTVxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUZXh0KFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLnRleHRQYXJhbWV0ZXJzVWkuZ2V0KFRleHRQYXJhbWV0ZXJzLlNpZ25hbGxpbmdTZXJ2ZXJVcmwpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ09wdGlvbihcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuZ2V0KE9wdGlvblBhcmFtZXRlcnMuU3RyZWFtZXJJZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5BdXRvQ29ubmVjdClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5BdXRvUGxheVZpZGVvKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkJyb3dzZXJTZW5kT2ZmZXIpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbiwgXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlVzZU1pYylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5TdGFydFZpZGVvTXV0ZWQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuUHJlZmVyU0ZVKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLklzUXVhbGl0eUNvbnRyb2xsZXIpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuRm9yY2VNb25vQXVkaW8pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuRm9yY2VUVVJOKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlN1cHByZXNzQnJvd3NlcktleXMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQUZLRGV0ZWN0aW9uKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLkFGS1RpbWVvdXRTZWNzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLk1heFJlY29ubmVjdEF0dGVtcHRzKVxuICAgICAgICApO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCB2aWV3L3VpIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IHZpZXdTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1VJJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgdmlld1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuTWF0Y2hWaWV3cG9ydFJlc29sdXRpb24pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHZpZXdTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkhvdmVyaW5nTW91c2VNb2RlKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcodmlld1NldHRpbmdzU2VjdGlvbiwgdGhpcy5mbGFnc1VpLmdldChMaWdodE1vZGUpKTtcblxuICAgICAgICAvKiBTZXR1cCBhbGwgZW5jb2RlciByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCBpbnB1dFNldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnSW5wdXQnXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLktleWJvYXJkSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Nb3VzZUlucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuVG91Y2hJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkdhbWVwYWRJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlhSQ29udHJvbGxlcklucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCBlbmNvZGVyIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IGVuY29kZXJTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ0VuY29kZXInXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIGVuY29kZXJTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLk1pblFQKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWF4UVApXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkQ29kZWNPcHRpb24gPSB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoXG4gICAgICAgICAgICBPcHRpb25QYXJhbWV0ZXJzLlByZWZlcnJlZENvZGVjXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ09wdGlvbihcbiAgICAgICAgICAgIGVuY29kZXJTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoT3B0aW9uUGFyYW1ldGVycy5QcmVmZXJyZWRDb2RlYylcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJlZmVycmVkQ29kZWNPcHRpb24gJiZcbiAgICAgICAgICAgIFsuLi5wcmVmZXJyZWRDb2RlY09wdGlvbi5zZWxlY3Rvci5vcHRpb25zXVxuICAgICAgICAgICAgICAgIC5tYXAoKG8pID0+IG8udmFsdWUpXG4gICAgICAgICAgICAgICAgLmluY2x1ZGVzKCdPbmx5IGF2YWlsYWJsZSBvbiBDaHJvbWUnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHByZWZlcnJlZENvZGVjT3B0aW9uLmRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNldHVwIGFsbCB3ZWJydGMgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3Qgd2VicnRjU2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdXZWJSVEMnXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHdlYnJ0Y1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuV2ViUlRDRlBTKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENNaW5CaXRyYXRlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENNYXhCaXRyYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIFNldHRpbmdUZXh0IGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgdGV4dCBpbiB0aGUgdGV4dCBzZXR0aW5ncyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdUZXh0IFRoZSB0ZXh0dWFsIHNldHRpbmdzIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nVGV4dChcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZ1RleHQ/OiBTZXR0aW5nVUlUZXh0XG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nVGV4dCkge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmdUZXh0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZ1RleHQuc2V0dGluZy5pZCwgc2V0dGluZ1RleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgU2V0dGluZ0ZsYWcgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCBmbGFnIGluIHRoZSBDb25maWcuZmxhZyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdGbGFnIFRoZSBzZXR0aW5ncyBmbGFnIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZ0ZsYWc/OiBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nRmxhZykge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmdGbGFnLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5zZXQoc2V0dGluZ0ZsYWcuc2V0dGluZy5pZCwgc2V0dGluZ0ZsYWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbnVtZXJpYyBzZXR0aW5nIGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgZmxhZyBpbiB0aGUgQ29uZmlnLm51bWVyaWNQYXJhbWV0ZXJzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nPzogU2V0dGluZ1VJTnVtYmVyXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZy5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmcuc2V0dGluZy5pZCwgc2V0dGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gZW51bSBiYXNlZCBzZXR0aW5ncyBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IGZsYWcgaW4gdGhlIENvbmZpZy5lbnVtUGFyYW1ldGVycyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdGbGFnIFRoZSBzZXR0aW5ncyBmbGFnIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nPzogU2V0dGluZ1VJT3B0aW9uXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZy5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5zZXR0aW5nLmlkLCBzZXR0aW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2V0dGluZ3NDaGFuZ2VkKHsgZGF0YTogeyBpZCwgdGFyZ2V0LCB0eXBlIH0gfTogU2V0dGluZ3NDaGFuZ2VkRXZlbnQpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdmbGFnJykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgRmxhZ3NJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdGbGFnO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMuZmxhZ3NVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcuZmxhZyAhPT0gX3RhcmdldC5mbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcuZmxhZyA9IF90YXJnZXQuZmxhZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBOdW1lcmljUGFyYW1ldGVyc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ051bWJlcjtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLm51bWJlciAhPT0gX3RhcmdldC5udW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5udW1iZXIgPSBfdGFyZ2V0Lm51bWJlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgVGV4dFBhcmFtZXRlcnNJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdUZXh0O1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMudGV4dFBhcmFtZXRlcnNVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcudGV4dCAhPT0gX3RhcmdldC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcudGV4dCA9IF90YXJnZXQudGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvcHRpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBPcHRpb25QYXJhbWV0ZXJzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nT3B0aW9uO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1aU9wdGlvbnMgPSBzZXR0aW5nLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0T3B0aW9ucyA9IF90YXJnZXQub3B0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHVpT3B0aW9ucy5sZW5ndGggIT09IHRhcmdldE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgICAgICF1aU9wdGlvbnMuZXZlcnkoKHZhbHVlKSA9PiB0YXJnZXRPcHRpb25zLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5vcHRpb25zID0gX3RhcmdldC5vcHRpb25zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5zZWxlY3RlZCAhPT0gX3RhcmdldC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLnNlbGVjdGVkID0gX3RhcmdldC5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSBmbGFnIGlzIHRvZ2dsZWQuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmxhZy5cbiAgICAgKiBAcGFyYW0gb25DaGFuZ2VMaXN0ZW5lciBUaGUgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGFkZEN1c3RvbUZsYWdPblNldHRpbmdDaGFuZ2VkTGlzdGVuZXIoXG4gICAgICAgIGlkOiBFeHRyYUZsYWdzLFxuICAgICAgICBvbkNoYW5nZUxpc3RlbmVyOiAobmV3RmxhZ1ZhbHVlOiBib29sZWFuKSA9PiB2b2lkXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZsYWdzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5vbkNoYW5nZSA9IG9uQ2hhbmdlTGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIGZvciB0aGUgZmxhZy5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBsYWJlbCBUaGUgbmV3IGxhYmVsIHRvIHVzZSBmb3IgdGhlIGZsYWcuXG4gICAgICovXG4gICAgc2V0Q3VzdG9tRmxhZ0xhYmVsKGlkOiBFeHRyYUZsYWdzLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21GbGFncy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBMb2dnZXIuV2FybmluZyhcbiAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgIGBDYW5ub3Qgc2V0IGxhYmVsIGZvciBmbGFnIGNhbGxlZCAke2lkfSAtIGl0IGRvZXMgbm90IGV4aXN0IGluIHRoZSBDb25maWcuZmxhZ3MgbWFwLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbUZsYWdzLmdldChpZCkubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoaWQpLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIHRoZSBjb25maWd1cmF0aW9uIGZsYWcgd2hpY2ggaGFzIHRoZSBnaXZlbiBpZC5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZCBmb3IgdGhlIGZsYWcuXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgZmxhZyBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGlzQ3VzdG9tRmxhZ0VuYWJsZWQoaWQ6IEV4dHJhRmxhZ3MpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5mbGFnIGFzIGJvb2xlYW47XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgU2V0dGluZ0Jhc2UgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhIHNldHRpbmcgdGhhdCBoYXMgYSB0ZXh0IGxhYmVsLCBhbiBhcmJpdHJhcnkgc2V0dGluZyB2YWx1ZSBpdCBzdG9yZXMsIGFuIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlCYXNlIHtcbiAgICBfc2V0dGluZzogU2V0dGluZ0Jhc2U7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdCYXNlKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmcgPSBzZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ0Jhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBGbGFnc0lkcyxcbiAgICBTZXR0aW5nRmxhZ1xufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJRmxhZzxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBGbGFnc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIC8qIFdlIHRvZ2dsZSB0aGlzIGNoZWNrYm94IHRvIHJlZmxlY3QgdGhlIHZhbHVlIG9mIG91ciBzZXR0aW5nJ3MgYm9vbGVhbiBmbGFnLiAqL1xuICAgIF9jaGVja2JveDogSFRNTElucHV0RWxlbWVudDsgLy8gaW5wdXQgdHlwZT1cImNoZWNrYm94XCJcblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBvbkNoYW5nZUVtaXQ6IChjaGFuZ2VkVmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nRmxhZzxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSBzZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLmZsYWcgPSBzZXR0aW5nLmZsYWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nRmxhZzxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ0ZsYWc8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLl9sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGVja2JveCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jaGVja2JveCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrYm94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSB0aGlzLnNldHRpbmcuaWQ7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5jbGFzc0xpc3QuYWRkKCd0Z2wtc3dpdGNoJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgaW5wdXQgdHlwZT1jaGVja2JveFxuICAgICAgICAgICAgdGhpcy5jaGVja2JveC50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guY2xhc3NMaXN0LmFkZCgndGdsJyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ3RnbC1mbGF0Jyk7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCd0Z2wtc2xpZGVyJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy5jaGVja2JveCk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQoc2xpZGVyKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb24gY2hhbmdlIGZyb20gY2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcuZmxhZyAhPT0gdGhpcy5jaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5mbGFnID0gdGhpcy5jaGVja2JveC5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2V0dGluZydzIHN0b3JlZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaW5WYWx1ZSBUaGUgbmV3IHZhbHVlIGZvciB0aGUgc2V0dGluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGZsYWcoaW5WYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNoZWNrYm94LmNoZWNrZWQgPSBpblZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZmxhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tib3guY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICBTZXR0aW5nTnVtYmVyXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuLyoqXG4gKiBBIG51bWJlciBzcGlubmVyIHdpdGggYSB0ZXh0IGxhYmVsIGJlc2lkZSBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdVSU51bWJlcjxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBOdW1lcmljUGFyYW1ldGVyc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIF9zcGlubmVyOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLm51bWJlciA9IHRoaXMuc2V0dGluZy5udW1iZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nTnVtYmVyPEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nTnVtYmVyPEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIEhUTUxJbnB1dEVsZW1lbnQgZm9yIHRoZSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBzcGlubmVyKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NwaW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci50eXBlID0gJ251bWJlcic7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLm1pbiA9IHRoaXMuc2V0dGluZy5taW4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIubWF4ID0gdGhpcy5zZXR0aW5nLm1heC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci52YWx1ZSA9IHRoaXMuc2V0dGluZy5udW1iZXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGlubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybS1ncm91cCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uY2hhbmdlXG4gICAgICAgICAgICB0aGlzLnNwaW5uZXIub25jaGFuZ2UgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUludChpbnB1dEVsZW0udmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc05hTihwYXJzZWRWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLldhcm5pbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgYENvdWxkIG5vdCBwYXJzZSB2YWx1ZSBjaGFuZ2UgaW50byBhIHZhbGlkIG51bWJlciAtIHZhbHVlIHdhcyAke2lucHV0RWxlbS52YWx1ZX0sIHJlc2V0dGluZyB2YWx1ZSB0byAke3RoaXMuc2V0dGluZy5taW59YFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLm51bWJlciAhPT0gdGhpcy5zZXR0aW5nLm1pbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLm51bWJlciA9IHRoaXMuc2V0dGluZy5taW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLm51bWJlciAhPT0gcGFyc2VkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5udW1iZXIgPSBwYXJzZWRWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbnVtYmVyIGluIHRoZSBzcGlubmVyICh3aWxsIGJlIGNsYW1wZWQgd2l0aGluIHJhbmdlKS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IG51bWJlcihuZXdOdW1iZXI6IG51bWJlcikge1xuICAgICAgICB0aGlzLnNwaW5uZXIudmFsdWUgPSB0aGlzLnNldHRpbmcuY2xhbXAobmV3TnVtYmVyKS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbnVtYmVyKCkge1xuICAgICAgICByZXR1cm4gK3RoaXMuc3Bpbm5lci52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBPcHRpb25QYXJhbWV0ZXJzSWRzLFxuICAgIFNldHRpbmdPcHRpb25cbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdVSU9wdGlvbjxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBPcHRpb25QYXJhbWV0ZXJzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgLyogQSBzZWxlY3QgZWxlbWVudCB0aGF0IHJlZmxlY3RzIHRoZSB2YWx1ZSBvZiB0aGlzIHNldHRpbmcuICovXG4gICAgX3NlbGVjdG9yOiBIVE1MU2VsZWN0RWxlbWVudDsgLy8gPHNlbGVjdD48L3NlbGVjdD5cblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nT3B0aW9uPEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gdGhpcy5zZXR0aW5nLm9wdGlvbnM7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNldHRpbmcuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nT3B0aW9uPEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nT3B0aW9uPEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZWxlY3RvcigpOiBIVE1MU2VsZWN0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLW9wdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RvcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSB0aGlzLnNldHRpbmcuaWQ7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtLWdyb3VwJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzZWxlY3QgZWxlbWVudFxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLnNlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb24gY2hhbmdlIGZyb20gc2VsZWN0b3JcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3Iub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5zZWxlY3RlZCAhPT0gdGhpcy5zZWxlY3Rvci52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBvcHRpb25zKHZhbHVlczogQXJyYXk8c3RyaW5nPikge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy5zZWxlY3Rvci5vcHRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLnJlbW92ZShpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlcy5mb3JFYWNoKCh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIG9wdC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgb3B0LmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci5hcHBlbmRDaGlsZChvcHQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zZWxlY3Rvci5vcHRpb25zXS5tYXAoKG8pID0+IG8udmFsdWUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWQodmFsdWU6IHN0cmluZykge1xuICAgICAgICAvLyBBIHVzZXIgbWF5IG5vdCBzcGVjaWZ5IHRoZSBmdWxsIHBvc3NpYmxlIHZhbHVlIHNvIHdlIGluc3RlYWQgdXNlIHRoZSBjbG9zZXN0IG1hdGNoLlxuICAgICAgICAvLyBlZyA/eHh4PUgyNjQgd291bGQgc2VsZWN0ICdIMjY0IGxldmVsLWFzeW1tZXRyeS1hbGxvd2VkPTE7cGFja2V0aXphdGlvbi1tb2RlPTE7cHJvZmlsZS1sZXZlbC1pZD00MjAwMWYnXG4gICAgICAgIGNvbnN0IGZpbHRlcmVkTGlzdCA9IHRoaXMub3B0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgICAob3B0aW9uOiBzdHJpbmcpID0+IG9wdGlvbi5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZpbHRlcmVkTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IudmFsdWUgPSBmaWx0ZXJlZExpc3RbMF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rvci52YWx1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZGlzYWJsZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGVuYWJsZSgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBTZXR0aW5nVGV4dCxcbiAgICBUZXh0UGFyYW1ldGVyc0lkc1xufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJVGV4dDxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBUZXh0UGFyYW1ldGVyc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIC8qIEEgdGV4dCBib3ggdGhhdCByZWZsZWN0cyB0aGUgdmFsdWUgb2YgdGhpcyBzZXR0aW5nLiAqL1xuICAgIF90ZXh0Ym94OiBIVE1MSW5wdXRFbGVtZW50OyAvLyBpbnB1dCB0eXBlPVwidGV4dFwiXG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ1RleHQ8Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLnNldHRpbmcudGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdUZXh0PEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nVGV4dDxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdGV4dGJveCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90ZXh0Ym94KSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Ym94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHRib3guY2xhc3NMaXN0LmFkZCgnZm9ybS1jb250cm9sJyk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Ym94LnR5cGUgPSAndGV4dGJveCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3RleHRib3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9IHRoaXMuc2V0dGluZy5pZDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGlucHV0IHR5cGU9Y2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMudGV4dGJveC50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLnRleHRib3gpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbiBjaGFuZ2UgZnJvbSBjaGVja2JveFxuICAgICAgICAgICAgdGhpcy50ZXh0Ym94LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcudGV4dCAhPT0gdGhpcy50ZXh0Ym94LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy50ZXh0ID0gdGhpcy50ZXh0Ym94LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2V0dGluZydzIHN0b3JlZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaW5WYWx1ZSBUaGUgbmV3IHZhbHVlIGZvciB0aGUgc2V0dGluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IHRleHQoaW5WYWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGV4dGJveC52YWx1ZSA9IGluVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGdldCB0ZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0Ym94LnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vQWN0aW9uT3ZlcmxheSc7XG5cbi8qKlxuICogU2hvdyBhbiBvdmVybGF5IGZvciB3aGVuIHRoZSBzZXNzaW9uIGlzIHVuYXR0ZW5kZWQsIGl0IGJlZ2lucyBhIGNvdW50ZG93biB0aW1lciwgd2hpY2ggd2hlbiBlbGFwc2VkIHdpbGwgZGlzY29ubmVjdCB0aGUgc3RyZWFtLlxuICovXG5leHBvcnQgY2xhc3MgQUZLT3ZlcmxheSBleHRlbmRzIEFjdGlvbk92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGFma092ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFma092ZXJsYXlIdG1sLmlkID0gJ2Fma092ZXJsYXknO1xuICAgICAgICBhZmtPdmVybGF5SHRtbC5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gYWZrT3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiBzb21lIHRleHQgZm9yIGFuIGFmayBjb3VudCBkb3duLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBhZmtPdmVybGF5SHRtbElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFma092ZXJsYXlIdG1sSW5uZXIuaWQgPSAnYWZrT3ZlcmxheUlubmVyJztcbiAgICAgICAgYWZrT3ZlcmxheUh0bWxJbm5lci5pbm5lckhUTUwgPVxuICAgICAgICAgICAgJzxjZW50ZXI+Tm8gYWN0aXZpdHkgZGV0ZWN0ZWQ8YnI+RGlzY29ubmVjdGluZyBpbiA8c3BhbiBpZD1cImFma0NvdW50RG93bk51bWJlclwiPjwvc3Bhbj4gc2Vjb25kczxicj5DbGljayB0byBjb250aW51ZTxicj48L2NlbnRlcj4nO1xuICAgICAgICByZXR1cm4gYWZrT3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gQWZrIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbWVudCB0aGUgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHJvb3REaXY6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcm9vdERpdixcbiAgICAgICAgICAgIEFGS092ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIEFGS092ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY291bnQgZG93biBzcGFucyBudW1iZXIgZm9yIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIGNvdW50ZG93biB0aGUgY291bnQgZG93biBudW1iZXIgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgc3BhbiBmb3IgdXBkYXRpbmdcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlQ291bnRkb3duKGNvdW50ZG93bjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gYDxjZW50ZXI+Tm8gYWN0aXZpdHkgZGV0ZWN0ZWQ8YnI+RGlzY29ubmVjdGluZyBpbiA8c3BhbiBpZD1cImFma0NvdW50RG93bk51bWJlclwiPiR7Y291bnRkb3dufTwvc3Bhbj4gc2Vjb25kczxicj5DbGljayB0byBjb250aW51ZTxicj48L2NlbnRlcj5gO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuXG5pbXBvcnQgeyBPdmVybGF5QmFzZSB9IGZyb20gJy4vQmFzZU92ZXJsYXknO1xuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgYmFzZSBhY3Rpb24gb3ZlcmxheSBzdHJ1Y3R1cmVcbiAqL1xuZXhwb3J0IGNsYXNzIEFjdGlvbk92ZXJsYXkgZXh0ZW5kcyBPdmVybGF5QmFzZSB7XG4gICAgb25BY3Rpb25DYWxsYmFjazogKC4uLmFyZ3M6IFtdKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGFuIGFjdGlvbiBvdmVybGF5XG4gICAgICogQHBhcmFtIHJvb3REaXYgdGhlIHJvb3QgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogQHBhcmFtIHJvb3RFbGVtZW50IHRoZSByb290IGVsZW1lbnQgdGhhdCBpcyB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBjb250ZW50RWxlbWVudCBhbiBlbGVtZW50IHRoYXQgY29udGFpbnMgdGV4dCBmb3IgdGhlIGFjdGlvbiBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICByb290RGl2OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICBjb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm9vdERpdiwgcm9vdEVsZW1lbnQsIGNvbnRlbnRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5vbkFjdGlvbkNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLyogZG8gbm90aGluZyAqLyBMb2dnZXIuSW5mbyhcbiAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgICdEaWQgeW91IGZvcmdldCB0byBzZXQgdGhlIG9uQWN0aW9uIGNhbGxiYWNrIGluIHlvdXIgb3ZlcmxheT8nXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGV4dCBvdmVybGF5cyBpbm5lciB0ZXh0XG4gICAgICogQHBhcmFtIHRleHQgdGhlIHVwZGF0ZSB0ZXh0IHRvIGJlIGluc2VydGVkIGludG8gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGV4dCAhPSBudWxsIHx8IHRleHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSBtZXRob2QgYXMgYW4gZXZlbnQgZW1pdHRlciBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBjYWxsQmFjayB0aGUgbWV0aG9kIHRoYXQgaXMgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWRcbiAgICAgKi9cbiAgICBvbkFjdGlvbihjYWxsQmFjazogKC4uLmFyZ3M6IFtdKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMub25BY3Rpb25DYWxsYmFjayA9IGNhbGxCYWNrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlIGFuIGV2ZW50IHRoYXQgaXMgYXR0YWNoZWQgdG8gdGhlIGV2ZW50IGVtaXR0ZXJcbiAgICAgKi9cbiAgICBhY3RpdmF0ZSgpIHtcbiAgICAgICAgdGhpcy5vbkFjdGlvbkNhbGxiYWNrKCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIGJhc2Ugb3ZlcmxheSBzdHJ1Y3R1cmVcbiAqL1xuZXhwb3J0IGNsYXNzIE92ZXJsYXlCYXNlIHtcbiAgICBwcm90ZWN0ZWQgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCByb290RGl2OiBIVE1MRWxlbWVudDtcbiAgICBwdWJsaWMgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGFuIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcm9vdERpdiB0aGUgcm9vdCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKiBAcGFyYW0gcm9vdEVsZW1lbnQgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGlzIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgICAgICByb290RGl2OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgdGhpcy5yb290RGl2ID0gcm9vdERpdjtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudCA9IHJvb3RFbGVtZW50O1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50ID0gdGV4dEVsZW1lbnQ7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50ZXh0RWxlbWVudCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICB0aGlzLnJvb3REaXYuYXBwZW5kQ2hpbGQodGhpcy5yb290RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlblN0YXRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hpZGRlblN0YXRlJyk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vQWN0aW9uT3ZlcmxheSc7XG5cbi8qKlxuICogT3ZlcmxheSBzaG93biBkdXJpbmcgY29ubmVjdGlvbiwgaGFzIGEgYnV0dG9uIHRoYXQgY2FuIGJlIGNsaWNrZWQgdG8gaW5pdGlhdGUgYSBjb25uZWN0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQ29ubmVjdE92ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBjb25uZWN0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25uZWN0RWxlbS5pZCA9ICdjb25uZWN0T3ZlcmxheSc7XG4gICAgICAgIGNvbm5lY3RFbGVtLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBjb25uZWN0RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3RDb250ZW50RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25uZWN0Q29udGVudEVsZW0uaWQgPSAnY29ubmVjdEJ1dHRvbic7XG4gICAgICAgIGNvbm5lY3RDb250ZW50RWxlbS5pbm5lckhUTUwgPSAnQ2xpY2sgdG8gc3RhcnQnO1xuICAgICAgICByZXR1cm4gY29ubmVjdENvbnRlbnRFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIENvbm5lY3RPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBDb25uZWN0T3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vQWN0aW9uT3ZlcmxheSc7XG5cbi8qKlxuICogT3ZlcmxheSBzaG93biBkdXJpbmcgZGlzY29ubmVjdGlvbiwgaGFzIGEgcmVjb25uZWN0aW9uIGVsZW1lbnQgdGhhdCBjYW4gYmUgY2xpY2tlZCB0byByZWNvbm5lY3QuXG4gKi9cbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0T3ZlcmxheSBleHRlbmRzIEFjdGlvbk92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGRpc2Nvbm5lY3RPdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXNjb25uZWN0T3ZlcmxheUh0bWwuaWQgPSAnZGlzY29ubmVjdE92ZXJsYXknO1xuICAgICAgICBkaXNjb25uZWN0T3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGRpc2Nvbm5lY3RPdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIGJ1aWxkIHRoZSBpbm5lciBodG1sIGNvbnRhaW5lclxuICAgICAgICBjb25zdCBkaXNjb25uZWN0T3ZlcmxheUh0bWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyLmlkID0gJ2Rpc2Nvbm5lY3RCdXR0b24nO1xuICAgICAgICBkaXNjb25uZWN0T3ZlcmxheUh0bWxDb250YWluZXIuaW5uZXJIVE1MID0gJ0NsaWNrIFRvIFJlc3RhcnQnO1xuXG4gICAgICAgIHJldHVybiBkaXNjb25uZWN0T3ZlcmxheUh0bWxDb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgZGlzY29ubmVjdCBvdmVybGF5IHdpdGggYSByZXRyeSBjb25uZWN0aW9uIGljb24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIERpc2Nvbm5lY3RPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBEaXNjb25uZWN0T3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL1RleHRPdmVybGF5JztcblxuLyoqXG4gKiBHZW5lcmljIG92ZXJsYXkgdXNlZCB0byBzaG93IHRleHR1YWwgZXJyb3IgaW5mbyB0byB0aGUgdXNlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEVycm9yT3ZlcmxheSBleHRlbmRzIFRleHRPdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBlcnJvck92ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVycm9yT3ZlcmxheUh0bWwuaWQgPSAnZXJyb3JPdmVybGF5JztcbiAgICAgICAgZXJyb3JPdmVybGF5SHRtbC5jbGFzc05hbWUgPSAndGV4dERpc3BsYXlTdGF0ZSc7XG4gICAgICAgIHJldHVybiBlcnJvck92ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZXJyb3JPdmVybGF5SHRtbElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVycm9yT3ZlcmxheUh0bWxJbm5lci5pZCA9ICdlcnJvck92ZXJsYXlJbm5lcic7XG4gICAgICAgIHJldHVybiBlcnJvck92ZXJsYXlIdG1sSW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29ubmVjdCBvdmVybGF5IHdpdGggYSBjb25uZWN0aW9uIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgRXJyb3JPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBFcnJvck92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IFRleHRPdmVybGF5IH0gZnJvbSAnLi9UZXh0T3ZlcmxheSc7XG5cbi8qKlxuICogR2VuZXJpYyBvdmVybGF5IHVzZWQgdG8gc2hvdyB0ZXh0dWFsIGluZm8gdG8gdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbmZvT3ZlcmxheSBleHRlbmRzIFRleHRPdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBpbmZvT3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5mb092ZXJsYXlIdG1sLmlkID0gJ2luZm9PdmVybGF5JztcbiAgICAgICAgaW5mb092ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICd0ZXh0RGlzcGxheVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGluZm9PdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGluZm9PdmVybGF5SHRtbElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZm9PdmVybGF5SHRtbElubmVyLmlkID0gJ21lc3NhZ2VPdmVybGF5SW5uZXInO1xuICAgICAgICByZXR1cm4gaW5mb092ZXJsYXlIdG1sSW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29ubmVjdCBvdmVybGF5IHdpdGggYSBjb25uZWN0aW9uIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgSW5mb092ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIEluZm9PdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBPdmVybGF5IHNob3duIHdoZW4gc3RyZWFtIGlzIHJlYWR5IHRvIHBsYXkuXG4gKi9cbmV4cG9ydCBjbGFzcyBQbGF5T3ZlcmxheSBleHRlbmRzIEFjdGlvbk92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHBsYXlFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBsYXlFbGVtLmlkID0gJ3BsYXlPdmVybGF5JztcbiAgICAgICAgcGxheUVsZW0uY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIHBsYXlFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gdG9kbzogY2hhbmdlIHRoaXMgdG8gYW4gc3ZnXG4gICAgICAgIGNvbnN0IHBsYXlPdmVybGF5SHRtbElubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHBsYXlPdmVybGF5SHRtbElubmVyLmlkID0gJ3BsYXlCdXR0b24nO1xuICAgICAgICBwbGF5T3ZlcmxheUh0bWxJbm5lci5zcmMgPVxuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBUEVBQUFENUNBWUFBQUQybU5Oa0FBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFEc01BQUE3REFjZHZxR1FBQUFBWmRFVllkRk52Wm5SM1lYSmxBSEJoYVc1MExtNWxkQ0EwTGpBdU1qSHhJR21WQUFBU2drbEVRVlI0WHUyZEM3QmRWWDJIcVVDQ0lSQVNDUGpBRklRUkVCUkJCU1JZYkZPdDhsSXJGVVdSRnFYV3NUNXdiSXRVcUZXczBLcUlNUEtvWUVXcFJTMDZLRGpTMUJlVkZrVlFiQ3crd0NmaUF3R2hDS1dQOVB1WnRVMjR1VGU1OXp6MjJZL3ZtL25Ha1h0ejdqbHJyOStzZGZaZWEvMDNXYjE2OVF0eEdXNjJpWWkwRDhMN05id1lqOEVkY2RQeUl4RnBBNFQyUC9GLzhVYThDSS9HaFBuWHlxK0lTSk1ockFseHhYOWhSdVlMOFNoOFNQazFFV2txQkhYZEVGZmNnNnZ3M2ZoczNLYjh1b2cwRFFJNlhZZ3I4ck92WXNKOE9NNHYvMHhFbWtJSjZvYjRQOHpJZkFOZWdDdlFNSXMwQlFLNXNSQlhKTXkvd0l6TTUrQnlYRkJlUmtRbUJVR2NiWWpYNVM1TW1NL0FBM0NMOG5JaVVqY0VjSkFRVjl5Qlg4YS93U2VpejVoRjZvYmdEUlBpa0dmTUNmT1g4RFRjdTd5MGlOUUJvUnMyeEJYL2czZGl3dndtM0tuOENSRVpKNFJ0VkNHdXFNS2N1OWtuNHhKMDlaZkl1Q0Jnb3c1eHlKM3NUTE56QXl3cndGNkoyNk5oRmhrMUJHc2NJVjZYaFBsdXZBNlB4eDNLbnhhUlVVQ294aDNpaW9RNXo1bi9CWS9GSmVVdGlNZ3dFS2E2UWx5Uk1OK0huOEhuNFpibHJZaklJQkNpdWtNYzhwMjVXczZaTUQrenZCMFJtU3NFYUJJaG5rcmV3NVY0RUhyQ2lNaGNLQUZxQ3YrTmwrSit1QkM5bXkyeU1RaEtrMEpja2UvTTc4R3N5MDZZSDFUZXJvaE1oWUEwTWNRVlA4Tno4VURjQ2wyYkxUSVZndEhrRUZkOEQ4L0UvWEZyZEdRV3FTQVFiUWh4eUtPcG0vQjAzQWM5TWtna0VJYTJoTGdpTjc4UzVsUHgwYmdJdlFFbS9ZVUF0QzNFRlFuenpmZ251RGM2elpaK1FzZHZhNGpYNVN2NGF0d1hIWm1sWDlEaHV4RGlrQzJRbjhkWFlVYm1SZVVqaW5RYk9udFhRbHlSVFJhZndsZGd3cnhWK2FnaTNZUk8zclVRVi93Y1YrTEw4REhveVp6U1RlamNYUTF4UmM3L3VoeXpsM2t2M0x4OGRKRnVRS2Z1ZW9oRG5qRm5aUDRvL2o3bTBaUUg0RXMzb0RQM0ljUVYyZjZZTUYrQ09aamdVZWlaMmRKdTZNUjlDdkc2M0lMdng0ek1DZk84MGlRaTdZTE8yOWNRVjN3YjM0c3BzcjRydW1CRTJnV2R0dThoRGxuOTlTMU1YZVlYNE02bGVVU2FEeDNXRUs4bFJkWVQ1bFIvelBsZm5zd3B6WWVPYW9qWEo0Y1NmQjNQdytmZ3R1ZzBXNW9KbmRNUVQwL3VaR2VhWFpWeWZUWnVWNXBOcERuUU1RM3h4c2swTzlVZno4WkRjZHZTZkNLVGh3NXBpR2RQMmlvRjQ5NkpUMGMzV2Nqa0tSMVQ1a1lXakNUTTc4RGZRaGVNeU9TZ0F4cml3Y2gzNWxSL3ZBYlB3T1hvelMrcEh6cWVJUjZPYWwxMnd2eDJmQnk2eVVMcWd3NW5pRWREd3B5UitWcE1rZlhzbUhJcHA0d2ZPcG9oSGoyMzRSZndGTndEbldiTCtLQ0RHZUx4a0pINXAzZzF2ZzUzSzAwdU1scm9YSVo0dkdUQlNNSjhGZVprem1XbDZVVkdBNTNLRU5mRC9aaXlOQ215bnZPL0ZwZExJREljZENaRFhDOFptZk9kK2Qvd0plalpYekljZENKRFhEOTV4cHdqZG5QK1Y3NHpINFd1L3BMQm9QTVk0c21TTU4rRktiSitCQnBtbVJ0MEdrUGNEQkxtdS9GamVBaTZsRk5tQjUzRkVEZUhUTFB6YUNvajgwZHdCZnFNV1RZTW5jUVFONWVzQVBzdzdsY3VsOGo2MEVFTWNmUEpEYkQzWVU3bDNLeGNPcEUxMENrTWNUdklWRHZmbWMvRTNYRUx0UHFqR09LV2toVmdwK0dlbUREN3ZiblAwQUVNY1h0SmtmVTM0R054QVRveTl4RXV2Q0Z1UDZ2d0pNeU9xWVhsMGtwZjRLSWI0bTVRbmN5WlRSYXBaR0dZK3dJWDJ4QjNpM3Z4T3N3bWkxM1FhWGJYNFFJYjRtNlNZM2EvaU1kaDdtWWI1cTdDaFRYRTNhWGFhTEVTcTdyTVc1WkxMMTJCaTJxSSs4RTllRGttekx1aFllNEtYRXhEM0I4eU10K09sK0tMMENMclhZQ0xhSWo3UjhKOEsxNkNSNlBMT2RzTUY4OFE5NWZzbVBvUlhvelB4ZHpOZHZWWDIrQ2lHV0xKemErRU9YV1pqOFNkMEFQdzJ3SVh5eEJMcVBZeTM0TG5ZOEs4REExejArRWlHV0taU2dKOUk3NExVMlI5UjNTYTNWUzRPSVpZWnFKYXlua1dwc2o2dzB1M2tTYkJoVEhFc2pIdXd4c3dwVndQdzZXbCswZ1Q0SUlZWXBrTm1XS25yMXlQcWY1NEtHNVZ1cEZNa25KaFJHWkx3cHpWWDZuKytEWjhHcnBqYXBKd0FReXhERUxDbkIxVHFXVHgxL2dVZEdTZUJEUzhJWlpCU1pCanp2NzZQUDRWSG9TR3VVNW9jRU1zb3lCaFRzRzRWSDk4SXg2QTgwczNrM0ZDUXh0aUdTVlpNUElUL0N3bXpQdWh6NWpIQ1Exc2lHVWNaQ2xud3Z4cFBBWDNMRjFPUmcyTmE0aGxYR1NLblFVakNmTm44UFg0Q055MGREOFpCVFNvSVpaeGt6QlhJL1BuOEFUTXVtekRQQXBvU0VNc2RaRXc1enZ6RHpIVDdKZGp3dXpaWDhOQUF4cGltUVNaWmlmTW44VGo4YUdsUzhwY29mRU1zVXlLak13NWxUT25qSHdjYzJUUWt0STFaYmJRYUlaWUprM0NuRTBXR1ptdndPZWgrNWhuQzQxbGlLVXBWQ056d3Z3SlBCeTkrYlV4YUNSRExFMGpZYjRmVS8weDAreUQ4Y0dseThwVWFCeERMRTBrUWE3Q2ZDZm1NTDhEMFNOMnAwS2pHR0pwT2dsenRXZ2toL2s5Q1QxaXQ0TEdNTVRTRmhMbUxCckozZXh6Y0ovU2pmc05EV0dJcFkwazBEL0FNL0dScFR2M0V4ckFFRXVicVZhQW5ZNUxzWDkzcy9uUWhsaTZRTFVGOG5XWUkzYm5ZVCtXYy9KQkRiRjBoZXFPOWpmd2xmaEluSS9kRGpNZjBCQkxGMG1ZcjhOc3NraU5xUzJ3bTJIbWd4bGk2VEo1enB3amcvNFFkOGJ1TFJyaFF4bGk2UU01WmpkSEJoMkgrYzdjblVVamZCaERMSDBoVSt5N2NDVStIN09YZVY2SlFudmhReGhpNlJzSmMwYm15L0JaK01zYllDVVM3WU0zYjRpbHJ5VE0yUUw1UVV6QnVIeG5idDgwbXpkdGlFVldyNzROTDhLVWNrMlI5ZmFNekx4WlF5eXlob3pNV2NwNUlmNHVKc3pOUDV5QU4ybUlSUjVJVm4vZGpPZmhFZGpzdy94NGM0WllaSHJ5alBrbVBCc1B3WWVWMkRRTDNwZ2hGcG1aVExGelpGRENuTHJNejhEdHNUa2JMWGd6aGxoazR5VE0yY3U4Q3JOaktpTnp3ano1T2xPOENVTXNNamNTNXF6TGZndW15UHIySlU2VGdUZGdpRVVHb3lxeW5yck12NDJUT1RPYlAyeUlSUVluMCt3czVid2FVOHIxTjNIckVxOTY0QThhWXBIaFNaanZ3QlNNUzVnUHducldaZk9IRExISTZNZ3o1aHl4bTRKeGY0a0g0SGpEekI4d3hDS2pKMkhPTlB1ZjhjOXhIeHpQWG1aZTJCQ0xqSWRNc1dNcVdmd1Rub2lQd2RHT3pMeWdJUllaUHdselZXUHF0YmdYam1iQkNDOWtpRVhxSTgrWXM4bmljbndON2xhaU9EaThpQ0VXcVplTXlsbVhuVENuWUZ4TzV0eXhSSEx1OEk4TnNjaGtTSml6THZ2N21KSDVwYmdZNTdaamluOWdpRVVtU3pVeWZ3OVRaUDFZM0xaRWRPUHd5NFpZcEJra3pLbisrQjM4S0I2RjI1V296Z3kvWkloRm1rWENuTE8vdm9zZndwd3lzcWhFZG4zNG9TRVdhU1lKOHk4dzArd1A0R0c0L29JUi9xTWhGbWsyVlpnenpVNllzMk5xN1Q1bS9vOGhGbWtIQ1hPMlB5Yk1GK08rK0NCRExOSXVFdVNzeTg1MzVsdnhaRU1zMGo2cVdzelpKYlhVRUl1MGkxdndyWmhxRlp2NW5WaWtQV1RxZkE1bUY5UUREK2ZqUHhoaWtlYVI3Nzd4ZHJ3QW4xQWl1ejc4MEJDTE5JdnNkTXFCQXFrTnRSdzNYQmVLWHpERUlwTW5vMjdDZXpkZWlrL0dCU1dtRzRaZk5NUWlreVBoelhycFZHWE02UjhyY0c3bFZma0hobGlrZmhMZTdGektvNktWK0h1NDVtN3pYT0VmR21LUmVza2U0b1QzazNnTWJsbmlPQmk4Z0NFV3FZZU12RC9HSy9GNDNLSEVjRGg0SVVNc01sNXl3K3BIbUxPb1g0YURIOFV6SGJ5Z0lSWVpEL25lbTVIM0tqd0JkOExSVjFIa1JRMnh5R2pKM2VhY05aMWlheWZocitQNDZobno0b1pZWkRSazJwendwaDdUWCtDdU9QNzZ4ZndSUXl3eUhObFZWSVgzVkh4OGlWYzk4QWNOc2NqZ1pKRkd5cHErR2ZmSHdaNzFEZ04vMUJDTHpKMmY0Ny9pV3pCbFRJZDcxanNNL0hGRExESTdjcmY1SHJ3RzM0WUhZNzBGeGFlRE4yR0lSVFpNd3B2amNLN0ZkK0JUY2ZMaHJlRE5HR0tSbWNuSWV6MitFdy9GaFRpM01pdmpoamRraUVYV0owZkVmaFhQd21maTRoS1o1c0diTThRaWE4bjY1bFg0TGt6bGhZZVZxRFFYM3FRaEZsbnpyUGMvOEZ6TXRzQmwyS3hwODB6d1JnMng5SjBjeG40ZXBvQlpsa2pXLzZ4M0dIakRobGo2U0paSTVnVEo5K0R6TWVIZHZNU2lYZkRHRGJIMGlXcGJZTXFnSkx5N1lMdEczcW53QVF5eDlJVnNDN3dFWDRDNzQvaDJGdFVKSDhRUVM5ZkpVVGc1UWZJNDNBUG5sZTdmRGZoQWhsaTZTbzUvL1JpK0dCUGV5YTF2SGlkOE1FTXNYU01IMFgwQ1g0Sjc0Y0xTM2JzSkg5QVFTMWZJVGF2czZmMVZlTEVkejNxSGdROXBpS1h0WkhOQzFqZm5FTHBmVHB1eCsrR3Q0TU1hWW1rcm1UWi9HVitMQ1crM3A4MHp3UWMzeE5JMnNrVHlCc3doZEh0aWM3WUZUZ0lhd0JCTG03Z1JUOEhINGRiWW4ybnpUTkFJaGxqYVFDcmt2d2tUM3R5d0d2OHBrbTJCeGpERTBsUnlva2JPc2pvRFV5RS9ONndNNzFSb0ZFTXNUU1BodlJQZmpZL0dCZWkwZVNab0hFTXNUZUoyL0FEdWcrM2NWVlEzTkpRaGxpYVFrZmNmOFNub3FEc1hhREJETEpNaWo0cnV4Y3Z3YWVqSU93ZzBuQ0dXdXNueXlJVDNDandNKzdsSVkxVFFnSVpZNmlBM3F6THlabWRSU24wZWljMDlRYkpOMEpDR1dNWkp3cHVSOXc3OEVyNFF1N2tsY0ZMUW9JWll4a1hxOU9adWMyb1daWE5DdjVkSGpnc2ExaERMcUtuQ20ycUIyWnp3ME5MZFpCelF3SVpZUmtXbXpUL0RoUGRFM0tWME14a25OTFFobG1ISjk5NkVOd1hIc2praHE2eGNIbGtYTkxZaGxrRkplSFBES2h2eXN6a2g0VzMzOGE5dGhFWTN4REpYOHFnb0d4TVMzdFRwZlN6T0wxMUs2b2JHTjhReVd4TGVMSS9NdERtbFB2ZEhwODJUaG90Z2lHVTJaT1N0d3JzQ1hTTFpGTGdZaGxnMnhGMlljNnpPeHFlakN6V2FCaGZGRU10MHBNajJWekIxZWcvQkphWExTTlBnNGhoaXFjamQ1aXpVU0lYOGxQcDhGaTR0WFVXYUNoZkpFRXRJaGZ3VTJiNFFVMlI3TzNSZmJ4dmdRaG5pZnBPRDE3K0pDVzlLZlM1Rjd6aTNDUzZZSWU0bk9YajlXL2gzZUF3K3ZIUUphUnRjUEVQY0wvS3M5MmE4Q0kvRlhkRnBjNXZoQWhyaS92QjkvSHY4QTN3VXVrU3lDM0FoRFhIMytTbitBeDZQcVpEdkVza3V3UVUxeE4ya09nb25KMGltMUdjMkoyeFJMcnQwQ1M2c0llNFcxYzZpajJORzNsUk9tRmN1dDNRUkxyQWg3ZzRKNzVYNFI3ZzNHdDQrd0lVMnhPMG4wK1pQNGFzd0JjZGMzOXdudU9DR3VMM2tXZS9uOERXNEx5NHFsMVg2QkJmZUVMZVRMK0FKK0FUY0JuM1cyMWU0K0lhNFBlU084OWZ3VC9HSnVBaGRJdGwzNkFTR3VQbGtaOUczOGZXWW8zQXk4aHBlV1FPZHdSQTNseHdCZXhPK0dWUHEwN0luc2o1MERFUGNUTEsrK2UyWWM2d1dvOTk1Wlhyb0hJYTRXZHlLT1Fwbk9XYmF2R201VkNMVFF5Y3h4TTBncDBpZWowL0czTEF5dkRJNzZDeUdlSEpVeCtHOEh3OUV3eXR6aDA1amlDZEREcUs3SEEvQWhlaDNYaGtNT284aHJwZTA5NmZ4ZDlEOXZESThwVlBKK0xrWFA0dlBRYWZNTWpyb1VJWjRmT1E3YjlZM1g0VTV4OG9pMnpKNjZGaUdlUFJrZVdST2tmd2lIb2VlM1N6amd3NW1pRWREUnQxNEQrYnc5WmZqRHFXWlJjWUhIYzBRRDA5MUZFNk9nUDB6OU9CMXFRODZteUVlbkt4dFRuZ3o4cjRCSFhtbGZ1aDRobmp1Skx3cDlabHFnYWZoN3FVNVJlcUhEbWlJWjArbXpWa2VlUU8rRlI5Zm1sRmtjdEFSRGZIc1NKM2VmOGRxWjVHSDBFa3pvRE1hNHBuSjNlYTBUMDdUT0FlenZubEJhVHFSWmxBNnFUeVFoRGRybTFmaEJYZ3dHbDVwSm5ST1E3eVc2amx2d3Z0ZWZBWnVYcHBLcEptVVRpdHJwODBwOVpuMXpROHVUU1RTYk9pc2ZROXhwczJwa0ovd1BoZTNLMDBqMGc3b3RIME44ZjM0ZFh3ZkhvMFcyWloyUXVmdFk0aXpQREtuYWJ3SUg0RWUveXJ0aFE3Y2x4Qm5sZFVQOEJKOE1TYTg3dXVWOWtOSDducUljNFpWd3ZzaGZDa3VROE1yM1lFTzNkVVFaNG5rRC9IRG1GS2ZlNVNQTE5JdDZOeGRESEhDK3hGOEJhYnNpU092ZEJjNmVKZENmQnRlaGdsdmltejdyRmU2RHgyOUN5SE9RbzByOE5XWU9yMFcyWmIrUUlkdmE0aXpSRExQZWxkaTZ2U20xT2ZDOHJGRStnTWR2NDBoem51K0dsTWhmei9jRWowT1Ivb0puYjlOSWM1N3ZRWlB4Q2VoSTY5SUNVYlR5ZG5OMStMSm1QQXVLVzlmUkFoRWswT2NaNzNYWXc2aE93Zzl2MWxrS2dTanFTSE81b1JUOFRkd0ticStXV1E2Q0VlVFFwdzd6bG1vY1RxbVRtL09iN2JvbU1pR0lDUk5DSEdtelQvQnN6Q2xQalB5dXNwS1pEWVFsa21IK01mNHQ3Z2N0MGVuelNKemdkQk1Lc1FKNzBYNFZIVGtGUmtVd2xOM2lGTTU0WU40S0c2TEhrUW5NZ3lFcUs0UTUxbnZwWmp3WnVRMXZDS2pnRERWRWVJcjhYQk1lTDNiTERKS0NOVzRRcHlSOXpvOEFyZEJiMWlKakFQQ05lb1FKN3lwRm5nc3prYzNKb2lNRTBJMnFoRG5XVzhLanYweHVqRkJwQzRJM0RBaHpncXJIRVNYVXAvWjAvdVE4cklpVWhjRWI1QVFKN3ozNFRmd0pOeTV2SnlJMUEwQm5HMklFOXlZc2lmZndUZml6dWgzWHBGSlFnaG5FK0o4MzAxNHY0dXBrTDhyK3FoSXBBa1F4ZzJGT09ITnp6TnRQaGYzUkVkZWtTWlJRanFWVEp0emd1U05lRDRlV0g1ZFJKb0dBWjBhNHJ2eG0zZ2hya0NuelNKTmhwQldJYzcvcGxwZ3dwdWRSWjdkTE5JR0NPdnRKYndYNDJHNHVQeElSTm9Bb1UyZDNpTnhVZmxQSXRJYU50bmsvd0VHQm9NZHBFQ0dIQUFBQUFCSlJVNUVya0pnZ2c9PSc7XG4gICAgICAgIHBsYXlPdmVybGF5SHRtbElubmVyLmFsdCA9ICdTdGFydCBTdHJlYW1pbmcnO1xuICAgICAgICByZXR1cm4gcGxheU92ZXJsYXlIdG1sSW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29ubmVjdCBvdmVybGF5IHdpdGggYSBjb25uZWN0aW9uIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgUGxheU92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIFBsYXlPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBPdmVybGF5QmFzZSB9IGZyb20gJy4vQmFzZU92ZXJsYXknO1xuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgdGV4dCBvdmVybGF5IGJhc2VcbiAqL1xuZXhwb3J0IGNsYXNzIFRleHRPdmVybGF5IGV4dGVuZHMgT3ZlcmxheUJhc2Uge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIHRleHQgb3ZlcmxheVxuICAgICAqIEBwYXJhbSByb290RGl2IHRoZSByb290IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqIEBwYXJhbSByb290RWxlbWVudCB0aGUgcm9vdCBlbGVtZW50IHRoYXQgaXMgdGhlIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gdGV4dEVsZW1lbnQgYW4gZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRleHQgZm9yIHRoZSBhY3Rpb24gb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm9vdERpdjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvb3REaXYsIHJvb3RFbGVtZW50LCB0ZXh0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB0ZXh0IG92ZXJsYXlzIGlubmVyIHRleHRcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdXBkYXRlIHRleHQgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0ZXh0ICE9IG51bGwgfHwgdGV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuICovXG5cbmltcG9ydCBqc3MsIHsgU3R5bGVzIH0gZnJvbSAnanNzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnanNzLXBsdWdpbi1nbG9iYWwnO1xuaW1wb3J0IGNhbWVsQ2FzZSBmcm9tICdqc3MtcGx1Z2luLWNhbWVsLWNhc2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yUGFsZXR0ZSB7XG4gICAgJy0tY29sb3IwJzogc3RyaW5nO1xuICAgICctLWNvbG9yMSc6IHN0cmluZztcbiAgICAnLS1jb2xvcjInOiBzdHJpbmc7XG4gICAgJy0tY29sb3IzJzogc3RyaW5nO1xuICAgICctLWNvbG9yNCc6IHN0cmluZztcbiAgICAnLS1jb2xvcjUnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I2Jzogc3RyaW5nO1xuICAgICctLWNvbG9yNyc6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB7XG4gICAgZGVmYXVsdExpZ2h0TW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZSA9IHtcbiAgICAgICAgJy0tY29sb3IwJzogJyNlMmUwZGQ4MCcsXG4gICAgICAgICctLWNvbG9yMSc6ICcjRkZGRkZGJyxcbiAgICAgICAgJy0tY29sb3IyJzogJyMwMDAwMDAnLFxuICAgICAgICAnLS1jb2xvcjMnOiAnIzA1ODVmZScsXG4gICAgICAgICctLWNvbG9yNCc6ICcjMzViMzUwJyxcbiAgICAgICAgJy0tY29sb3I1JzogJyNmZmFiMDAnLFxuICAgICAgICAnLS1jb2xvcjYnOiAnI2UxZTJkZCcsXG4gICAgICAgICctLWNvbG9yNyc6ICcjYzNjNGJmJ1xuICAgIH07XG5cbiAgICBkZWZhdWx0RGFya01vZGVQYWxldHRlOiBDb2xvclBhbGV0dGUgPSB7XG4gICAgICAgICctLWNvbG9yMCc6ICcjMUQxRjIyODAnLFxuICAgICAgICAnLS1jb2xvcjEnOiAnIzAwMDAwMCcsXG4gICAgICAgICctLWNvbG9yMic6ICcjRkZGRkZGJyxcbiAgICAgICAgJy0tY29sb3IzJzogJyMwNTg1ZmUnLFxuICAgICAgICAnLS1jb2xvcjQnOiAnIzM1YjM1MCcsXG4gICAgICAgICctLWNvbG9yNSc6ICcjZmZhYjAwJyxcbiAgICAgICAgJy0tY29sb3I2JzogJyMxZTFkMjInLFxuICAgICAgICAnLS1jb2xvcjcnOiAnIzNjM2I0MCdcbiAgICB9O1xuXG4gICAgZGVmYXVsdFN0eWxlcyA9IHtcbiAgICAgICAgJzpyb290Jzoge1xuICAgICAgICAgICAgJy0tY29sb3IwJzogJyMxRDFGMjI4MCcsXG4gICAgICAgICAgICAnLS1jb2xvcjEnOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAnLS1jb2xvcjInOiAnI0ZGRkZGRicsXG4gICAgICAgICAgICAnLS1jb2xvcjMnOiAnIzA1ODVmZScsXG4gICAgICAgICAgICAnLS1jb2xvcjQnOiAnIzM1YjM1MCcsXG4gICAgICAgICAgICAnLS1jb2xvcjUnOiAnI2ZmYWIwMCcsXG4gICAgICAgICAgICAnLS1jb2xvcjYnOiAnIzFlMWQyMicsXG4gICAgICAgICAgICAnLS1jb2xvcjcnOiAnIzNjM2I0MCcsXG4gICAgICAgICAgICAnLS1jb2xvcjgnOiAnIzQxMDA4YycsXG4gICAgICAgICAgICAnLS1jb2xvcjknOiAnIzNlMDA3MCcsXG4gICAgICAgICAgICAnLS1jb2xvcjEwJzogJyMyZTAwNTInLFxuICAgICAgICAgICAgJy0tY29sb3IxMSc6ICdyZ2JhKDY1LDAsMTM5LDEpJ1xuICAgICAgICB9LFxuICAgICAgICAnLm5vc2VsZWN0Jzoge1xuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjcGxheWVyVUknOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3ZpZGVvRWxlbWVudFBhcmVudCc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IxKSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgekluZGV4OiAnMzAnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gICAgICAgIH0sXG4gICAgICAgICcuVWlUb29sIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6ICdoaWRkZW4nLFxuICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTVweCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMHB4IDEwcHgnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTW9udHNlcnJhdCcsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMC43NXJlbScsXG4gICAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiAnMC43NXB4JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDI1JSknLFxuICAgICAgICAgICAgbGVmdDogJzEyNSUnLFxuICAgICAgICAgICAgekluZGV4OiAnMjAnXG4gICAgICAgIH0sXG4gICAgICAgICcuVWlUb29sOmhvdmVyIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIHZpc2liaWxpdHk6ICd2aXNpYmxlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcjY29ubmVjdGlvbiAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICB0b3A6ICcxMjUlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTI1JSknLFxuICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgekluZGV4OiAnMjAnLFxuICAgICAgICAgICAgcGFkZGluZzogJzVweCAxMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnI2Nvbm5lY3Rpb24nOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzglJyxcbiAgICAgICAgICAgIGxlZnQ6ICc1JScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNaWNocm9tYScsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIGhlaWdodDogJzNyZW0nLFxuICAgICAgICAgICAgd2lkdGg6ICczcmVtJyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3MtcGFuZWwgLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIHRvcDogJzEyNSUnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICB6SW5kZXg6ICcyMCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNXB4IDEwcHgnLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgd2lkdGg6ICdtYXgtY29udGVudCcsXG4gICAgICAgICAgICBmYWxsYmFja3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNXB4IDEwcHgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogJzIwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnMTI1JSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgJyNjb250cm9scyc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnMyUnLFxuICAgICAgICAgICAgbGVmdDogJzIlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01pY2hyb21hJywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgICcjY29udHJvbHM+Kic6IHtcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzAuNXJlbScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGhlaWdodDogJzJyZW0nLFxuICAgICAgICAgICAgbGluZUhlaWdodDogJzEuNzVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuNXJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb250cm9scyAjYWRkaXRpb25hbGluZm8nOiB7XG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTW9udHNlcnJhdCcsIHNhbnMtc2VyaWZcIlxuICAgICAgICB9LFxuICAgICAgICAnI2Z1bGxzY3JlZW4tYnRuJzoge1xuICAgICAgICAgICAgcGFkZGluZzogJzAuNnJlbSAhaW1wb3J0YW50J1xuICAgICAgICB9LFxuICAgICAgICAnI21pbmltaXplSWNvbic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQnRuLCAjc3RhdHNCdG4nOiB7XG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgYnV0dG9uJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXI6ICcxcHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICB3aWR0aDogJzNyZW0nLFxuICAgICAgICAgICAgaGVpZ2h0OiAnM3JlbScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGJ1dHRvbjpob3Zlcic6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJzAuMjVzIGVhc2UnLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjU1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcwLjU1cmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgYnV0dG9uOmFjdGl2ZSc6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjU1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcwLjU1cmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0Jzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01vbnRzZXJyYXQnXCIsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxcmVtJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMC43NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQ6aG92ZXInOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdlYXNlIDAuM3MnXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQ6ZGlzYWJsZWQnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXJDb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ2RlZmF1bHQnXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQ6YWN0aXZlJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQ6Zm9jdXMnOiB7XG4gICAgICAgICAgICBvdXRsaW5lOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGltZyc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICAnLnBhbmVsLXdyYXAnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgYm90dG9tOiAnMCcsXG4gICAgICAgICAgICByaWdodDogJzAnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBtaW5XaWR0aDogJzIwdncnLFxuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDB2dycsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICcuM3MgZWFzZS1vdXQnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCcsXG4gICAgICAgICAgICBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMTBweCknLFxuICAgICAgICAgICAgd2Via2l0QmFja2Ryb3BGaWx0ZXI6ICdibHVyKDEwcHgpJyxcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMCknXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwtd3JhcC12aXNpYmxlJzoge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwnOiB7XG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NIZWFkaW5nLCAjc3RhdHNIZWFkaW5nJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBmb250U2l6ZTogJzJlbScsXG4gICAgICAgICAgICBtYXJnaW5CbG9ja1N0YXJ0OiAnMC42N2VtJyxcbiAgICAgICAgICAgIG1hcmdpbkJsb2NrRW5kOiAnMC42N2VtJyxcbiAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0OiAnMHB4JyxcbiAgICAgICAgICAgIG1hcmdpbklubGluZUVuZDogJzBweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDAgMCAycmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2UsICNzdGF0c0Nsb3NlJzoge1xuICAgICAgICAgICAgbWFyZ2luOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgZm9udFNpemU6ICcyZW0nLFxuICAgICAgICAgICAgZmxvYXQ6ICdyaWdodCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0Nsb3NlOmFmdGVyLCAjc3RhdHNDbG9zZTphZnRlcic6IHtcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXFxcXDAwZDdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0Nsb3NlOmhvdmVyLCAjc3RhdHNDbG9zZTpob3Zlcic6IHtcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnZWFzZSAwLjNzJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ29udGVudCwgI3N0YXRzQ29udGVudCc6IHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICcycmVtJyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMnJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuMTVyZW0gMTBweCAwLjE1cmVtIDEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3MtdGV4dCc6IHtcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3Mtb3B0aW9uJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnXG4gICAgICAgIH0sXG4gICAgICAgICcjY29ubmVjdE92ZXJsYXksICNwbGF5T3ZlcmxheSwgI2luZm9PdmVybGF5LCAjZXJyb3JPdmVybGF5LCAjYWZrT3ZlcmxheSwgI2Rpc2Nvbm5lY3RPdmVybGF5JzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6ICczMCcsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEuOGVtJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMSknLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy5jbGlja2FibGVTdGF0ZSc6IHtcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJy50ZXh0RGlzcGxheVN0YXRlJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXG4gICAgICAgIH0sXG4gICAgICAgICcuaGlkZGVuU3RhdGUnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNwbGF5QnV0dG9uLCAjY29ubmVjdEJ1dHRvbic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB6SW5kZXg6ICczMCdcbiAgICAgICAgfSxcbiAgICAgICAgJ2ltZyNwbGF5QnV0dG9uJzoge1xuICAgICAgICAgICAgbWF4V2lkdGg6ICcyNDFweCcsXG4gICAgICAgICAgICB3aWR0aDogJzEwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUludGVyYWN0aW9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNVSUludGVyYWN0aW9uQnV0dG9uQm91bmRhcnknOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMnB4J1xuICAgICAgICB9LFxuICAgICAgICAnI1VJSW50ZXJhY3Rpb25CdXR0b24nOiB7XG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnI2hpZGRlbklucHV0Jzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiAnLTEwJScsXG4gICAgICAgICAgICB3aWR0aDogJzBweCcsXG4gICAgICAgICAgICBvcGFjaXR5OiAnMCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNlZGl0VGV4dEJ1dHRvbic6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgICAgICAgICB3aWR0aDogJzQwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLW92ZXJsYXknOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLXN3aXRjaCc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc3dpdGNoIC50Z2wnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wsIC50Z2w6YWZ0ZXIsIC50Z2w6YmVmb3JlLCAudGdsICosIC50Z2wgKjphZnRlciwgLnRnbCAqOmJlZm9yZSwgLnRnbCsudGdsLXNsaWRlcic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgd2Via2l0Qm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcudGdsOjotbW96LXNlbGVjdGlvbiwgLnRnbDphZnRlcjo6LW1vei1zZWxlY3Rpb24sIC50Z2w6YmVmb3JlOjotbW96LXNlbGVjdGlvbiwgLnRnbCAqOjotbW96LXNlbGVjdGlvbiwgLnRnbCAqOmFmdGVyOjotbW96LXNlbGVjdGlvbiwgLnRnbCAqOmJlZm9yZTo6LW1vei1zZWxlY3Rpb24sIC50Z2wrLnRnbC1zbGlkZXI6Oi1tb3otc2VsZWN0aW9uJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcudGdsOjpzZWxlY3Rpb24sIC50Z2w6YWZ0ZXI6OnNlbGVjdGlvbiwgLnRnbDpiZWZvcmU6OnNlbGVjdGlvbiwgLnRnbCAqOjpzZWxlY3Rpb24sIC50Z2wgKjphZnRlcjo6c2VsZWN0aW9uLCAudGdsICo6YmVmb3JlOjpzZWxlY3Rpb24sIC50Z2wrLnRnbC1zbGlkZXI6OnNlbGVjdGlvbic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLnRnbC1zbGlkZXInOiB7fSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXInOiB7XG4gICAgICAgICAgICBvdXRsaW5lOiAnMCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgd2lkdGg6ICc0MHB4JyxcbiAgICAgICAgICAgIGhlaWdodDogJzE4cHgnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbCsudGdsLXNsaWRlcjphZnRlciwgLnRnbCsudGdsLXNsaWRlcjpiZWZvcmUnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcIicsXG4gICAgICAgICAgICB3aWR0aDogJzUwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbCsudGdsLXNsaWRlcjphZnRlcic6IHtcbiAgICAgICAgICAgIGxlZnQ6ICcwJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbCsudGdsLXNsaWRlcjpiZWZvcmUnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdCsudGdsLXNsaWRlcic6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHgnLFxuICAgICAgICAgICAgd2Via2l0VHJhbnNpdGlvbjogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjYpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdCsudGdsLXNsaWRlcjphZnRlcic6IHtcbiAgICAgICAgICAgIHdlYmtpdFRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcIicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQ6Y2hlY2tlZCsudGdsLXNsaWRlcic6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0OmNoZWNrZWQrLnRnbC1zbGlkZXI6YWZ0ZXInOiB7XG4gICAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjMpJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1hcHBseSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jayAhaW1wb3J0YW50JyxcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB3aWR0aDogJzQwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWNvbnRyb2wnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzJweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2luaGVyaXQnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1jb250cm9sOmhvdmVyJzoge1xuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tZ3JvdXAnOiB7XG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnNHB4JyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICc4MCUgMjAlJyxcbiAgICAgICAgICAgIHJvd0dhcDogJzRweCcsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcxMHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWdyb3VwIGxhYmVsJzoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJ1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzQ29udGFpbmVyJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMTBweCcsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0NvbnRhaW5lcj4gOmZpcnN0LWNoaWxkJzoge1xuICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnYmFzZWxpbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcuY29sbGFwc2UnOiB7XG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzUlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3N0cmVhbVRvb2xzJzoge1xuICAgICAgICAgICAgYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICc1cHgnLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogJzVweCcsXG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgcmlnaHQ6ICcyJScsXG4gICAgICAgICAgICB6SW5kZXg6ICcxMDAnLFxuICAgICAgICAgICAgYm9yZGVyOiAnNHB4IHNvbGlkIHZhcigtLWNvbG91cjgpJyxcbiAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAnMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzSGVhZGVyJzoge1xuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJ1xuICAgICAgICB9LFxuICAgICAgICAnI3N0cmVhbVRvb2xzSGVhZGVyJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWNvbG91cjgpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcuc3RyZWFtVG9vbHMnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1idXR0b25Gb250KScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbGlnaHRlcicsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcuc3RyZWFtVG9vbHMtc2hvd24+I3N0cmVhbVRvb2xzU2V0dGluZ3MsIC5zdHJlYW1Ub29scy1zaG93bj4jc3RyZWFtVG9vbHNTdGF0cyc6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29sc1RvZ2dsZSc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNxdWFsaXR5U3RhdHVzJzoge1xuICAgICAgICAgICAgZm9udFNpemU6ICczN3B4JyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzRweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zdmdJY29uJzoge1xuICAgICAgICAgICAgZmlsbDogJ3ZhcigtLWNvbG9yMiknXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3VzdG9tU3R5bGVzPzogUGFydGlhbDxTdHlsZXM+O1xuICAgIGxpZ2h0TW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZTtcbiAgICBkYXJrTW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiB7XG4gICAgICAgIGN1c3RvbVN0eWxlcz86IFBhcnRpYWw8U3R5bGVzPjtcbiAgICAgICAgbGlnaHRNb2RlUGFsZXR0ZT86IENvbG9yUGFsZXR0ZTtcbiAgICAgICAgZGFya01vZGVQYWxldHRlPzogQ29sb3JQYWxldHRlO1xuICAgIH0pIHtcbiAgICAgICAgY29uc3QgeyBjdXN0b21TdHlsZXMsIGxpZ2h0TW9kZVBhbGV0dGUsIGRhcmtNb2RlUGFsZXR0ZSB9ID1cbiAgICAgICAgICAgIG9wdGlvbnMgPz8ge307XG4gICAgICAgIC8vIE9uZSB0aW1lIHNldHVwIHdpdGggZGVmYXVsdCBwbHVnaW5zIGFuZCBzZXR0aW5ncy5cbiAgICAgICAgY29uc3QganNzT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIC8vIEpTUyBoYXMgbWFueSBpbnRlcmVzdGluZyBwbHVnaW5zIHdlIG1heSB3aXNoIHRvIHR1cm4gb25cbiAgICAgICAgICAgIC8vcGx1Z2luczogW2Z1bmN0aW9ucygpLCB0ZW1wbGF0ZSgpLCBnbG9iYWwoKSwgZXh0ZW5kKCksIG5lc3RlZCgpLCBjb21wb3NlKCksIGNhbWVsQ2FzZSgpLCBkZWZhdWx0VW5pdChvcHRpb25zLmRlZmF1bHRVbml0KSwgZXhwYW5kKCksIHZlbmRvclByZWZpeGVyKCksIHByb3BzU29ydCgpXVxuICAgICAgICAgICAgcGx1Z2luczogW2dsb2JhbCgpLCBjYW1lbENhc2UoKV1cbiAgICAgICAgfTtcblxuICAgICAgICBqc3Muc2V0dXAoanNzT3B0aW9ucyk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21TdHlsZXMgPSBjdXN0b21TdHlsZXM7XG4gICAgICAgIHRoaXMubGlnaHRNb2RlUGFsZXR0ZSA9XG4gICAgICAgICAgICBsaWdodE1vZGVQYWxldHRlID8/IHRoaXMuZGVmYXVsdExpZ2h0TW9kZVBhbGV0dGU7XG4gICAgICAgIHRoaXMuZGFya01vZGVQYWxldHRlID0gZGFya01vZGVQYWxldHRlID8/IHRoaXMuZGVmYXVsdERhcmtNb2RlUGFsZXR0ZTtcbiAgICB9XG5cbiAgICBhcHBseVN0eWxlU2hlZXQoKSB7XG4gICAgICAgIC8vIFRvZG86IHJlZmFjdG9yIGNvZGViYXNlIHRvIHVzZSBqc3MgYXQgYSBjb21wb25lbnQgbGV2ZWwsIGNsYXNzZXMgY2FuIGJlIGdyYWJiZWQgbGlrZSBzbzpcbiAgICAgICAgLy9jb25zdCB7cGl4ZWxTdHJlYW1pbmdDbGFzc2VzfSA9IGpzcy5jcmVhdGVTdHlsZVNoZWV0KHN0eWxlcykuYXR0YWNoKCk7XG5cbiAgICAgICAgLy8gYXR0YWNoIGdlbmVyYXRlZCBzdHlsZSBzaGVldCB0byBwYWdlXG4gICAgICAgIGpzcy5jcmVhdGVTdHlsZVNoZWV0KHtcbiAgICAgICAgICAgICdAZ2xvYmFsJzoge1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuZGVmYXVsdFN0eWxlcyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLmN1c3RvbVN0eWxlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5hdHRhY2goKTtcbiAgICB9XG5cbiAgICBhcHBseVBhbGV0dGUocGFsZXR0ZTogQ29sb3JQYWxldHRlKSB7XG4gICAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignOnJvb3QnKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IwJywgcGFsZXR0ZVsnLS1jb2xvcjAnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMScsIHBhbGV0dGVbJy0tY29sb3IxJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjInLCBwYWxldHRlWyctLWNvbG9yMiddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IzJywgcGFsZXR0ZVsnLS1jb2xvcjMnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNCcsIHBhbGV0dGVbJy0tY29sb3I0J10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjUnLCBwYWxldHRlWyctLWNvbG9yNSddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I2JywgcGFsZXR0ZVsnLS1jb2xvcjYnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNycsIHBhbGV0dGVbJy0tY29sb3I3J10pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgcGxheWVycyBjb2xvciB2YXJpYWJsZXNcbiAgICAgKiBAcGFyYW0gaXNMaWdodE1vZGUgLSBzaG91bGQgd2UgdXNlIGEgbGlnaHQgb3IgZGFyayBjb2xvciBzY2hlbWVcbiAgICAgKi9cbiAgICBzZXRDb2xvck1vZGUoaXNMaWdodE1vZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKGlzTGlnaHRNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFsZXR0ZSh0aGlzLmxpZ2h0TW9kZVBhbGV0dGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhbGV0dGUodGhpcy5kYXJrTW9kZVBhbGV0dGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgRnVsbFNjcmVlbkljb24gfSBmcm9tICcuL0Z1bGxzY3JlZW5JY29uJztcbmltcG9ydCB7IFNldHRpbmdzSWNvbiB9IGZyb20gJy4vU2V0dGluZ3NJY29uJztcbmltcG9ydCB7IFN0YXRzSWNvbiB9IGZyb20gJy4vU3RhdHNJY29uJztcbmltcG9ydCB7IFhSSWNvbiB9IGZyb20gJy4vWFJJY29uJztcbmltcG9ydCB7IFdlYlhSQ29udHJvbGxlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuLi9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcydcblxuLyoqXG4gKiBDb25maWd1cmVzIGhvdyBVSSBlbGVtZW50cyB0byBjb250cm9sIHRoZSBzdHJlYW0gYXJlIGNyZWF0ZWQuIFxuICogQnkgZGVmYXVsdCwgYSBidXR0b24gd2lsbCBiZSBjcmVhdGVkIGZvciBlYWNoIGNvbnRyb2wuIFRoYXQgY2FuIGJlIG92ZXJyaWRlbiBwZXItY29udHJvbFxuICogdG8gdXNlIGFuIGV4dGVybmFsbHkgcHJvdmlkZWQgZWxlbWVudCwgb3IgdG8gZGlzYWJsZSB0aGUgZWxlbWVudCBlbnRpcmVseS5cbiAqL1xuZXhwb3J0IHR5cGUgQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24gPSB7XG4gICAgLy9bUHJvcGVydHkgaW4ga2V5b2YgQ29udHJvbHMgYXMgYCR7UHJvcGVydHl9VHlwZWBdPyA6IFVJRWxlbWVudFR5cGU7XG4gICAgc3RhdHNCdXR0b25UeXBlPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICBmdWxsc2NyZWVuQnV0dG9uVHlwZT8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgc2V0dGluZ3NCdXR0b25UeXBlPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICB4ckljb25UeXBlPyA6IFVJRWxlbWVudENvbmZpZ1xufVxuXG4vLyBJZiB0aGVyZSBpc24ndCBhIHR5cGUgcHJvdmlkZWQsIGRlZmF1bHQgYmVoYXZpb3VyIGlzIHRvIGNyZWF0ZSB0aGUgZWxlbWVudC5cbmZ1bmN0aW9uIHNob3VsZENyZWF0ZUJ1dHRvbih0eXBlIDogVUlFbGVtZW50Q29uZmlnIHwgdW5kZWZpbmVkKSA6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodHlwZSA9PSB1bmRlZmluZWQpID8gdHJ1ZSA6ICh0eXBlLmNyZWF0aW9uTW9kZSA9PT0gVUlFbGVtZW50Q3JlYXRpb25Nb2RlLkNyZWF0ZURlZmF1bHRFbGVtZW50KTtcbn1cblxuLyoqXG4gKiBFbGVtZW50IGNvbnRhaW5pbmcgdmFyaW91cyBjb250cm9scyBsaWtlIHN0YXRzLCBzZXR0aW5ncywgZnVsbHNjcmVlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbnRyb2xzIHtcbiAgICBzdGF0c0ljb246IFN0YXRzSWNvbjtcbiAgICBmdWxsc2NyZWVuSWNvbjogRnVsbFNjcmVlbkljb247XG4gICAgc2V0dGluZ3NJY29uOiBTZXR0aW5nc0ljb247XG4gICAgeHJJY29uOiBYUkljb247XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IHRoZSBjb250cm9sc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNvbmZpZz8gOiBDb250cm9sc1VJQ29uZmlndXJhdGlvbikge1xuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLnN0YXRzQnV0dG9uVHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNJY29uID0gbmV3IFN0YXRzSWNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcuc2V0dGluZ3NCdXR0b25UeXBlKSl7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzSWNvbiA9IG5ldyBTZXR0aW5nc0ljb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLmZ1bGxzY3JlZW5CdXR0b25UeXBlKSkge1xuICAgICAgICAgICAgdGhpcy5mdWxsc2NyZWVuSWNvbiA9IG5ldyBGdWxsU2NyZWVuSWNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcueHJJY29uVHlwZSkpe1xuICAgICAgICAgICAgdGhpcy54ckljb24gPSBuZXcgWFJJY29uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgY29udHJvbHMuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdjb250cm9scyc7XG4gICAgICAgICAgICBpZiAoISF0aGlzLmZ1bGxzY3JlZW5JY29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5mdWxsc2NyZWVuSWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISF0aGlzLnNldHRpbmdzSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIXRoaXMuc3RhdHNJY29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0ljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEhdGhpcy54ckljb24pIFxuXHRcdFx0e1xuXHRcdFx0XHQgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy54ckljb24ucm9vdEVsZW1lbnQpO1xuXHRcdFx0XHQgXG4gICAgICAgICAgICAgICAgLyogV2ViWFJDb250cm9sbGVyLmlzU2Vzc2lvblN1cHBvcnRlZCgnaW1tZXJzaXZlLXZyJykudGhlbihcbiAgICAgICAgICAgICAgICAoc3VwcG9ydGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pOyAqL1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogRGVjbGFyZSBhZGRpdGlvbnMgdG8gYmFzZSB0eXBlcyBmb3IgY3Jvc3MgYnJvd3NlciBmdWxsc2NyZWVuIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgRG9jdW1lbnQge1xuICAgICAgICB3ZWJraXRJc0Z1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgICAgICBtb3pGdWxsU2NyZWVuPzogYm9vbGVhbjtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgICBtb3pDYW5jZWxGdWxsU2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbXNFeGl0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdEV4aXRGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbW96RnVsbFNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgICAgICBtc0Z1bGxzY3JlZW5FbGVtZW50PzogRWxlbWVudDtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgIH1cblxuICAgIGludGVyZmFjZSBIVE1MRWxlbWVudCB7XG4gICAgICAgIG1zUmVxdWVzdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtb3pSZXF1ZXN0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdFJlcXVlc3RGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0RW50ZXJGdWxsc2NyZWVuPzogKCkgPT4gdm9pZDtcbiAgICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYW4gZWxlbWVudCAoaS5lLiBidXR0b24pIHRoYXQsIHdoZW4gY2xpY2tlZCwgd2lsbCB0b2dnbGUgZnVsbHNjcmVlbiBvZiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBDYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCBhbnkgSFRNTEVsZW1lbnQsIGlmIGl0IGlzIHNldCBhcyByb290RWxlbWVudCBpbiB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuICAgIGlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIGZ1bGxzY3JlZW5FbGVtZW50OiBIVE1MRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQ7XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcm9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgICBcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBmdWxsIHNjcmVlbiBldmVudHNcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgdGhlIGRvY3VtZW50IG9yIGZ1bGxzY3JlZW5FbGVtZW50IGZ1bGxzY3JlZW4uXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBmdWxsIHNjcmVlbjsgZXhpdFxuICAgICAgICAvLyBlbHNlIGdvIGZ1bGxzY3JlZW5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZ1bGxzY3JlZW5FbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQud2Via2l0RW50ZXJGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTsgLy9mb3IgaXBob25lIHRoaXMgY29kZSB3b3JrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGZ1bGxzY3JlZW4gYnV0dG9uIG9uIGNoYW5nZVxuICAgICAqL1xuICAgIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPVxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBGdWxsU2NyZWVuSWNvbkJhc2UgdGhhdCB1c2VzIGFuIGV4dGVybmFsbHlcbiAqIHByb3ZpZGVkIEhUTUxFbGVtZW50IGZvciB0b2dnbGluZyBmdWxsIHNjcmVlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwgZXh0ZW5kcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuXG4gICAgY29uc3RydWN0b3IoZXh0ZXJuYWxCdXR0b24gOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gZXh0ZXJuYWxCdXR0b247XG4gICAgfVxuXG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgZnVsbHNjcmVlbiBpY29uIHRoYXQgY29udGFpbnMgYSBidXR0b24gYW5kIHN2Z3MgZm9yIGVhY2ggc3RhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbiBleHRlbmRzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG4gICAgX21heGltaXplSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfbWluaW1pemVJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRCdXR0b24gOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5pZCA9ICdmdWxsc2NyZWVuLWJ0bic7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5tYXhpbWl6ZUljb24pO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMubWluaW1pemVJY29uKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcblxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gY3JlYXRlZEJ1dHRvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ0Z1bGxzY3JlZW4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heGltaXplSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhpbWl6ZUljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdtYXhpbWl6ZUljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDM4NC45NyAzODQuOTcnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zODQuOTcsMTIuMDNjMC02LjcxMy01LjMxNy0xMi4wMy0xMi4wMy0xMi4wM0gyNjQuODQ3Yy02LjgzMywwLTExLjkyMiw1LjM5LTExLjkzNCwxMi4yMjNjMCw2LjgyMSw1LjEwMSwxMS44MzgsMTEuOTM0LDExLjgzOGg5Ni4wNjJsLTAuMTkzLDk2LjUxOWMwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLTAuMDEyLDEyLjAzLTUuMTk3LDEyLjAzLTEyLjAzbDAuMTkzLTEwOC4zNjljMC0wLjAzNi0wLjAxMi0wLjA2LTAuMDEyLTAuMDg0QzM4NC45NTgsMTIuMDksMzg0Ljk3LDEyLjA2NiwzODQuOTcsMTIuMDN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC40OTYsMEgxMi40MDNjLTAuMDM2LDAtMC4wNiwwLjAxMi0wLjA5NiwwLjAxMkMxMi4yODMsMC4wMTIsMTIuMjQ3LDAsMTIuMjIzLDBDNS41MSwwLDAuMTkyLDUuMzE3LDAuMTkyLDEyLjAzTDAsMTIwLjM5OWMwLDYuODMzLDUuMzksMTEuOTM0LDEyLjIyMywxMS45MzRjNi44MjEsMCwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkzNGwwLjE5Mi05Ni4zMzloOTYuMjQyYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNDMTMyLjUxNCw1LjE5NywxMjcuMzE3LDAsMTIwLjQ5NiwweidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMTIzLDM2MC45MDlIMjQuMDYxdi05Ni4yNDJjMC02LjgzMy01LjE5Ny0xMi4wMy0xMi4wMy0xMi4wM1MwLDI1Ny44MzMsMCwyNjQuNjY3djEwOC4wOTJjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NmMwLDYuNzEzLDUuMzE3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4wOTJjNi44MzMsMCwxMS45MjItNS4zOSwxMS45MzQtMTIuMjIzQzEzMi4wNTcsMzY1LjkyNiwxMjYuOTU2LDM2MC45MDksMTIwLjEyMywzNjAuOTA5eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zNzIuNzQ3LDI1Mi45MTNjLTYuODMzLDAtMTEuODUsNS4xMDEtMTEuODM4LDExLjkzNHY5Ni4wNjJoLTk2LjI0MmMtNi44MzMsMC0xMi4wMyw1LjE5Ny0xMi4wMywxMi4wM3M1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMDkyYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNi0wLjAxMiwwLjA2LDAuMDEyLDAuMDk2LDAuMDEyYzYuNzEzLDAsMTIuMDMtNS4zMTcsMTIuMDMtMTIuMDNWMjY0Ljg0N0MzODQuOTcsMjU4LjAxNCwzNzkuNTgsMjUyLjkxMywzNzIuNzQ3LDI1Mi45MTN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhpbWl6ZUljb247XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtaW5pbWl6ZUljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWluaW1pemVJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnbWluaW1pemVJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCAzODUuMzMxIDM4NS4zMzEnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWluaW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00yNjQuOTQzLDE1Ni42NjVoMTA4LjI3M2M2LjgzMywwLDExLjkzNC01LjM5LDExLjkzNC0xMi4yMTFjMC02LjgzMy01LjEwMS0xMS44NS0xMS45MzQtMTEuODM4aC05Ni4yNDJWMzYuMTgxYzAtNi44MzMtNS4xOTctMTIuMDMtMTIuMDMtMTIuMDNzLTEyLjAzLDUuMTk3LTEyLjAzLDEyLjAzdjEwOC4yNzNjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NkMyNTIuOTEzLDE1MS4zNDcsMjU4LjIzLDE1Ni42NzcsMjY0Ljk0MywxNTYuNjY1eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMjkxLDI0LjI0N2MtNi44MjEsMC0xMS44MzgsNS4xMTMtMTEuODM4LDExLjkzNHY5Ni4yNDJIMTIuMDNjLTYuODMzLDAtMTIuMDMsNS4xOTctMTIuMDMsMTIuMDNjMCw2LjgzMyw1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMjczYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNiwwLDAuMDYsMC4wMTIsMC4wOTYsMC4wMTJjNi43MTMsMCwxMi4wMy01LjMxNywxMi4wMy0xMi4wM1YzNi4xODFDMTMyLjUxNCwyOS4zNiwxMjcuMTI0LDI0LjI1OSwxMjAuMjkxLDI0LjI0N3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgzLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTIwLjM4NywyMjguNjY2SDEyLjExNWMtNi44MzMsMC4wMTItMTEuOTM0LDUuMzktMTEuOTM0LDEyLjIyM2MwLDYuODMzLDUuMTAxLDExLjg1LDExLjkzNCwxMS44MzhoOTYuMjQydjk2LjQyM2MwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNWMjQwLjg3N2MwLTAuMDM2LTAuMDEyLTAuMDYtMC4wMTItMC4wODRjMC0wLjAzNiwwLjAxMi0wLjA2LDAuMDEyLTAuMDk2QzEzMi40MTgsMjMzLjk4MywxMjcuMSwyMjguNjY2LDEyMC4zODcsMjI4LjY2NnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGg0LnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzczLjMsMjI4LjY2NkgyNjUuMDI4Yy0wLjAzNiwwLTAuMDYsMC4wMTItMC4wODQsMC4wMTJjLTAuMDM2LDAtMC4wNi0wLjAxMi0wLjA5Ni0wLjAxMmMtNi43MTMsMC0xMi4wMyw1LjMxNy0xMi4wMywxMi4wM3YxMDguMjczYzAsNi44MzMsNS4zOSwxMS45MjIsMTIuMjIzLDExLjkzNGM2LjgyMSwwLjAxMiwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkyMnYtOTYuMjQySDM3My4zYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNTMzgwLjEzNCwyMjguNjc4LDM3My4zLDIyOC42NjZ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5pbWl6ZUljb247XG4gICAgfVxuXG4gICAgb25GdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICBzdXBlci5vbkZ1bGxzY3JlZW5DaGFuZ2UoKTtcblxuICAgICAgICBjb25zdCBtaW5pbWl6ZSA9IHRoaXMubWluaW1pemVJY29uO1xuICAgICAgICBjb25zdCBtYXhpbWl6ZSA9IHRoaXMubWF4aW1pemVJY29uO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgICAgICAgLy9pb3MgZGlzYXBwZWFyaW5nIHN2ZyBmaXhcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAvL2lvcyBkaXNhcHBlYXJpbmcgc3ZnIGZpeFxuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBidXR0b24gd2l0aCBhIHRleHQgbGFiZWwgYmVzaWRlIGl0LlxuICovXG5leHBvcnQgY2xhc3MgTGFiZWxsZWRCdXR0b24ge1xuICAgIF9sYWJlbDogc3RyaW5nO1xuICAgIF9idXR0b25UZXh0OiBzdHJpbmc7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfYnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX2J1dHRvblRleHQgPSBidXR0b25UZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNsaWNrIGxpc3RlbmVyIHRvIHRoZSBidXR0b24gZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkT25DbGlja0xpc3RlbmVyKG9uQ2xpY2tGdW5jOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja0Z1bmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSFRNTElucHV0RWxlbWVudCBmb3IgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9idXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLnZhbHVlID0gdGhpcy5fYnV0dG9uVGV4dDtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWJ1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuX2xhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuY2xhc3NMaXN0LmFkZCgnYnRuLW92ZXJsYXknKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IExhdGVuY3lUZXN0UmVzdWx0cyB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5cbi8qKlxuICogTGF0ZW5jeSB0ZXN0IFVJIGVsZW1lbnRzIGFuZCByZXN1bHRzIGhhbmRsaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTGF0ZW5jeVRlc3Qge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0QnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIF9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGhlIGJ1dHRvbiBjb250YWluaW5nIHRoZSBzdGF0cyBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgaGVhZGluZ1xuICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZy5pZCA9ICdsYXRlbmN5VGVzdEhlYWRlcic7XG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZ1RleHQuaW5uZXJIVE1MID0gJ0xhdGVuY3kgVGVzdCc7XG4gICAgICAgICAgICBoZWFkaW5nLmFwcGVuZENoaWxkKGhlYWRpbmdUZXh0KTtcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgdGVzdCByZXN1bHRzIGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHNQYXJlbnRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5pZCA9ICdsYXRlbmN5VGVzdENvbnRhaW5lcic7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdHNQYXJlbnRFbGVtKTtcblxuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlkID0gJ2xhdGVuY3lTdGF0c1Jlc3VsdHMnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGF0ZW5jeVRlc3RCdXR0b24oKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnZhbHVlID0gJ1J1biBUZXN0JztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmlkID0gJ2J0bi1zdGFydC1sYXRlbmN5LXRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3RyZWFtVG9vbHMtYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGxhdGVuY3kgdGVzdCdzIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIGxhdGVuY3lUaW1pbmdzIFRoZSBsYXRlbmN5IHRlc3QgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlVGVzdFJlc3VsdChsYXRlbmN5VGltaW5nczogTGF0ZW5jeVRlc3RSZXN1bHRzKSB7XG4gICAgICAgIExvZ2dlci5Mb2coTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSwgbGF0ZW5jeVRpbWluZ3MudG9TdHJpbmcoKSwgNik7XG4gICAgICAgIGxldCBsYXRlbmN5U3RhdHNJbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5OZXQgbGF0ZW5jeSBSVFQgKG1zKTogJyArXG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5uZXR3b3JrTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5VRSBFbmNvZGUgKG1zKTogJyArIGxhdGVuY3lUaW1pbmdzLkVuY29kZU1zICsgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+VUUgQ2FwdHVyZSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLkNhcHR1cmVUb1NlbmRNcyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5Ccm93c2VyIHNlbmQgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmJyb3dzZXJTZW5kTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5mcmFtZURpc3BsYXlEZWx0YVRpbWVNcyAmJlxuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuYnJvd3NlclJlY2VpcHRUaW1lTXNcbiAgICAgICAgICAgICAgICA/ICc8ZGl2PkJyb3dzZXIgcmVjZWl2ZSBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZnJhbWVEaXNwbGF5RGVsdGFUaW1lTXMgK1xuICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PlRvdGFsIGxhdGVuY3kgKGV4Y2x1ZGluZyBicm93c2VyKSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmxhdGVuY3lFeGNsdWRpbmdEZWNvZGUgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPSBsYXRlbmN5VGltaW5ncy5lbmRUb0VuZExhdGVuY3lcbiAgICAgICAgICAgID8gJzxkaXY+VG90YWwgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZW5kVG9FbmRMYXRlbmN5ICtcbiAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSBsYXRlbmN5U3RhdHNJbm5lckhUTUw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBTZXR0aW5ncyBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0ljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3NldHRpbmdzSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3NldHRpbmdzQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc0ljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnc2V0dGluZ3NJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0NzguNzAzIDQ3OC43MDMnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ000NTQuMiwxODkuMTAxbC0zMy42LTUuN2MtMy41LTExLjMtOC0yMi4yLTEzLjUtMzIuNmwxOS44LTI3LjdjOC40LTExLjgsNy4xLTI3LjktMy4yLTM4LjFsLTI5LjgtMjkuOFxcXG5cdFx0XHRjLTUuNi01LjYtMTMtOC43LTIwLjktOC43Yy02LjIsMC0xMi4xLDEuOS0xNy4xLDUuNWwtMjcuOCwxOS44Yy0xMC44LTUuNy0yMi4xLTEwLjQtMzMuOC0xMy45bC01LjYtMzMuMlxcXG5cdFx0XHRjLTIuNC0xNC4zLTE0LjctMjQuNy0yOS4yLTI0LjdoLTQyLjFjLTE0LjUsMC0yNi44LDEwLjQtMjkuMiwyNC43bC01LjgsMzRjLTExLjIsMy41LTIyLjEsOC4xLTMyLjUsMTMuN2wtMjcuNS0xOS44XFxcblx0XHRcdGMtNS0zLjYtMTEtNS41LTE3LjItNS41Yy03LjksMC0xNS40LDMuMS0yMC45LDguN2wtMjkuOSwyOS44Yy0xMC4yLDEwLjItMTEuNiwyNi4zLTMuMiwzOC4xbDIwLDI4LjFcXFxuXHRcdFx0Yy01LjUsMTAuNS05LjksMjEuNC0xMy4zLDMyLjdsLTMzLjIsNS42Yy0xNC4zLDIuNC0yNC43LDE0LjctMjQuNywyOS4ydjQyLjFjMCwxNC41LDEwLjQsMjYuOCwyNC43LDI5LjJsMzQsNS44XFxcblx0XHRcdGMzLjUsMTEuMiw4LjEsMjIuMSwxMy43LDMyLjVsLTE5LjcsMjcuNGMtOC40LDExLjgtNy4xLDI3LjksMy4yLDM4LjFsMjkuOCwyOS44YzUuNiw1LjYsMTMsOC43LDIwLjksOC43YzYuMiwwLDEyLjEtMS45LDE3LjEtNS41XFxcblx0XHRcdGwyOC4xLTIwYzEwLjEsNS4zLDIwLjcsOS42LDMxLjYsMTNsNS42LDMzLjZjMi40LDE0LjMsMTQuNywyNC43LDI5LjIsMjQuN2g0Mi4yYzE0LjUsMCwyNi44LTEwLjQsMjkuMi0yNC43bDUuNy0zMy42XFxcblx0XHRcdGMxMS4zLTMuNSwyMi4yLTgsMzIuNi0xMy41bDI3LjcsMTkuOGM1LDMuNiwxMSw1LjUsMTcuMiw1LjVsMCwwYzcuOSwwLDE1LjMtMy4xLDIwLjktOC43bDI5LjgtMjkuOGMxMC4yLTEwLjIsMTEuNi0yNi4zLDMuMi0zOC4xXFxcblx0XHRcdGwtMTkuOC0yNy44YzUuNS0xMC41LDEwLjEtMjEuNCwxMy41LTMyLjZsMzMuNi01LjZjMTQuMy0yLjQsMjQuNy0xNC43LDI0LjctMjkuMnYtNDIuMVxcXG5cdFx0XHRDNDc4LjksMjAzLjgwMSw0NjguNSwxOTEuNTAxLDQ1NC4yLDE4OS4xMDF6IE00NTEuOSwyNjAuNDAxYzAsMS4zLTAuOSwyLjQtMi4yLDIuNmwtNDIsN2MtNS4zLDAuOS05LjUsNC44LTEwLjgsOS45XFxcblx0XHRcdGMtMy44LDE0LjctOS42LDI4LjgtMTcuNCw0MS45Yy0yLjcsNC42LTIuNSwxMC4zLDAuNiwxNC43bDI0LjcsMzQuOGMwLjcsMSwwLjYsMi41LTAuMywzLjRsLTI5LjgsMjkuOGMtMC43LDAuNy0xLjQsMC44LTEuOSwwLjhcXFxuXHRcdFx0Yy0wLjYsMC0xLjEtMC4yLTEuNS0wLjVsLTM0LjctMjQuN2MtNC4zLTMuMS0xMC4xLTMuMy0xNC43LTAuNmMtMTMuMSw3LjgtMjcuMiwxMy42LTQxLjksMTcuNGMtNS4yLDEuMy05LjEsNS42LTkuOSwxMC44bC03LjEsNDJcXFxuXHRcdFx0Yy0wLjIsMS4zLTEuMywyLjItMi42LDIuMmgtNDIuMWMtMS4zLDAtMi40LTAuOS0yLjYtMi4ybC03LTQyYy0wLjktNS4zLTQuOC05LjUtOS45LTEwLjhjLTE0LjMtMy43LTI4LjEtOS40LTQxLTE2LjhcXFxuXHRcdFx0Yy0yLjEtMS4yLTQuNS0xLjgtNi44LTEuOGMtMi43LDAtNS41LDAuOC03LjgsMi41bC0zNSwyNC45Yy0wLjUsMC4zLTEsMC41LTEuNSwwLjVjLTAuNCwwLTEuMi0wLjEtMS45LTAuOGwtMjkuOC0yOS44XFxcblx0XHRcdGMtMC45LTAuOS0xLTIuMy0wLjMtMy40bDI0LjYtMzQuNWMzLjEtNC40LDMuMy0xMC4yLDAuNi0xNC44Yy03LjgtMTMtMTMuOC0yNy4xLTE3LjYtNDEuOGMtMS40LTUuMS01LjYtOS0xMC44LTkuOWwtNDIuMy03LjJcXFxuXHRcdFx0Yy0xLjMtMC4yLTIuMi0xLjMtMi4yLTIuNnYtNDIuMWMwLTEuMywwLjktMi40LDIuMi0yLjZsNDEuNy03YzUuMy0wLjksOS42LTQuOCwxMC45LTEwYzMuNy0xNC43LDkuNC0yOC45LDE3LjEtNDJcXFxuXHRcdFx0YzIuNy00LjYsMi40LTEwLjMtMC43LTE0LjZsLTI0LjktMzVjLTAuNy0xLTAuNi0yLjUsMC4zLTMuNGwyOS44LTI5LjhjMC43LTAuNywxLjQtMC44LDEuOS0wLjhjMC42LDAsMS4xLDAuMiwxLjUsMC41bDM0LjUsMjQuNlxcXG5cdFx0XHRjNC40LDMuMSwxMC4yLDMuMywxNC44LDAuNmMxMy03LjgsMjcuMS0xMy44LDQxLjgtMTcuNmM1LjEtMS40LDktNS42LDkuOS0xMC44bDcuMi00Mi4zYzAuMi0xLjMsMS4zLTIuMiwyLjYtMi4yaDQyLjFcXFxuXHRcdFx0YzEuMywwLDIuNCwwLjksMi42LDIuMmw3LDQxLjdjMC45LDUuMyw0LjgsOS42LDEwLDEwLjljMTUuMSwzLjgsMjkuNSw5LjcsNDIuOSwxNy42YzQuNiwyLjcsMTAuMywyLjUsMTQuNy0wLjZsMzQuNS0yNC44XFxcblx0XHRcdGMwLjUtMC4zLDEtMC41LDEuNS0wLjVjMC40LDAsMS4yLDAuMSwxLjksMC44bDI5LjgsMjkuOGMwLjksMC45LDEsMi4zLDAuMywzLjRsLTI0LjcsMzQuN2MtMy4xLDQuMy0zLjMsMTAuMS0wLjYsMTQuN1xcXG5cdFx0XHRjNy44LDEzLjEsMTMuNiwyNy4yLDE3LjQsNDEuOWMxLjMsNS4yLDUuNiw5LjEsMTAuOCw5LjlsNDIsNy4xYzEuMywwLjIsMi4yLDEuMywyLjIsMi42djQyLjFINDUxLjl6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTIzOS40LDEzNi4wMDFjLTU3LDAtMTAzLjMsNDYuMy0xMDMuMywxMDMuM3M0Ni4zLDEwMy4zLDEwMy4zLDEwMy4zczEwMy4zLTQ2LjMsMTAzLjMtMTAzLjNTMjk2LjQsMTM2LjAwMSwyMzkuNCwxMzYuMDAxeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzSWNvbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgY29tcG9uZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NQYW5lbCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc2V0dGluZ3NDbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgX3NldHRpbmdzQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzZXR0aW5ncy1wYW5lbCc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhbmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChwYW5lbEVsZW0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNldHRpbmdzSGVhZGluZy5pZCA9ICdzZXR0aW5nc0hlYWRpbmcnO1xuICAgICAgICAgICAgc2V0dGluZ3NIZWFkaW5nLnRleHRDb250ZW50ID0gJ1NldHRpbmdzJztcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZChzZXR0aW5nc0hlYWRpbmcpO1xuXG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0Nsb3NlQnV0dG9uKTtcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQuaWQgPSAnc2V0dGluZ3NDb250ZW50JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ2xvc2VCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24uaWQgPSAnc2V0dGluZ3NDbG9zZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzZXR0aW5ncyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNldHRpbmdzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgc2V0dGluZ3MgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFN0YXRzIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfc3RhdHNJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc3RhdHMgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc3RhdHNCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0ljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdzdGF0c0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMzMwIDMzMCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsMC4wMDhDNzQuMDE5LDAuMDA4LDAsNzQuMDI0LDAsMTY0Ljk5OWMwLDkwLjk3Nyw3NC4wMTksMTY0Ljk5MiwxNjUsMTY0Ljk5MnMxNjUtNzQuMDE1LDE2NS0xNjQuOTkyQzMzMCw3NC4wMjQsMjU1Ljk4MSwwLjAwOCwxNjUsMC4wMDh6IE0xNjUsMjk5Ljk5MmMtNzQuNDM5LDAtMTM1LTYwLjU1Ny0xMzUtMTM0Ljk5MlM5MC41NjEsMzAuMDA4LDE2NSwzMC4wMDhzMTM1LDYwLjU1NywxMzUsMTM0Ljk5MUMzMDAsMjM5LjQzNiwyMzkuNDM5LDI5OS45OTIsMTY1LDI5OS45OTJ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSwxMzAuMDA4Yy04LjI4NCwwLTE1LDYuNzE2LTE1LDE1djk5Ljk4M2MwLDguMjg0LDYuNzE2LDE1LDE1LDE1czE1LTYuNzE2LDE1LTE1di05OS45ODNDMTgwLDEzNi43MjUsMTczLjI4NCwxMzAuMDA4LDE2NSwxMzAuMDA4eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsNzAuMDExYy0zLjk1LDAtNy44MTEsMS42LTEwLjYxLDQuMzljLTIuNzksMi43OS00LjM5LDYuNjYtNC4zOSwxMC42MXMxLjYsNy44MSw0LjM5LDEwLjYxYzIuNzksMi43OSw2LjY2LDQuMzksMTAuNjEsNC4zOXM3LjgxLTEuNiwxMC42MDktNC4zOWMyLjc5LTIuOCw0LjM5MS02LjY2LDQuMzkxLTEwLjYxcy0xLjYwMS03LjgyLTQuMzkxLTEwLjYxQzE3Mi44MSw3MS42MSwxNjguOTUsNzAuMDExLDE2NSw3MC4wMTF6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0ljb247XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTGF0ZW5jeVRlc3QgfSBmcm9tICcuL0xhdGVuY3lUZXN0JztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgQWdncmVnYXRlZFN0YXRzIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBNYXRoVXRpbHMgfSBmcm9tICcuLi9VdGlsL01hdGhVdGlscyc7XG5cbi8qKlxuICogQSBzdGF0IHN0cnVjdHVyZSwgYW4gaWQsIHRoZSBzdGF0IHN0cmluZywgYW5kIHRoZSBlbGVtZW50IHdoZXJlIGl0IGlzIHJlbmRlcmVkLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHN0YXQ6IHN0cmluZztcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbn1cblxuLyoqXG4gKiBBIFVJIGNvbXBvbmVudCBjb250YWluaW5nIGFsbCB0aGUgc3RhdHMgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzUGFuZWwge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzQ2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0c0NvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdGlzdGljc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzUmVzdWx0OiBIVE1MRWxlbWVudDtcblxuICAgIGxhdGVuY3lUZXN0OiBMYXRlbmN5VGVzdDtcblxuICAgIC8qIEEgbWFwIHN0YXRzIHdlIGFyZSBzdG9yaW5nL3JlbmRlcmluZyAqL1xuICAgIHN0YXRzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFN0YXQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdCA9IG5ldyBMYXRlbmN5VGVzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3N0YXRzLXBhbmVsJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAnKTtcblxuICAgICAgICAgICAgY29uc3QgcGFuZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwYW5lbEVsZW0uY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsRWxlbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3RhdHNIZWFkaW5nLmlkID0gJ3N0YXRzSGVhZGluZyc7XG4gICAgICAgICAgICBzdGF0c0hlYWRpbmcudGV4dENvbnRlbnQgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHN0YXRzSGVhZGluZyk7XG5cbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzQ2xvc2VCdXR0b24pO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudC5pZCA9ICdzdGF0c0NvbnRlbnQnO1xuXG4gICAgICAgICAgICBjb25zdCBzdHJlYW1Ub29sU3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5pZCA9ICdzdHJlYW1Ub29sc1N0YXRzJztcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICAgICAgY29uc3QgY29udHJvbFN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuaWQgPSAnQ29udHJvbFN0YXRzJztcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGljcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuaWQgPSAnc3RhdGlzdGljcyc7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpY3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuaWQgPSAnc3RhdGlzdGljc0hlYWRlcic7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcblxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXNzaW9uU3RhdHMuaW5uZXJIVE1MID0gJ1Nlc3Npb24gU3RhdHMnO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKHN0cmVhbVRvb2xTdGF0cyk7XG4gICAgICAgICAgICBzdHJlYW1Ub29sU3RhdHMuYXBwZW5kQ2hpbGQoY29udHJvbFN0YXRzKTtcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZChzdGF0aXN0aWNzKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuYXBwZW5kQ2hpbGQoc3RhdGlzdGljc0hlYWRlcik7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmFwcGVuZENoaWxkKHNlc3Npb25TdGF0cyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmFwcGVuZENoaWxkKHRoaXMuc3RhdGlzdGljc0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRpc3RpY3NDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIuaWQgPSAnc3RhdGlzdGljc0NvbnRhaW5lcic7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzUmVzdWx0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c1Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzUmVzdWx0LmlkID0gJ3N0YXRpc3RpY3NSZXN1bHQnO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQuY2xhc3NMaXN0LmFkZCgnU3RhdHNSZXN1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0c0Nsb3NlQnV0dG9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uLmlkID0gJ3N0YXRzQ2xvc2UnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgc3RhdHMgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhbmVsLXdyYXAtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzdGF0cyBjb21pbmcgaW4gZnJvbSBicm93c2VyL1VFXG4gICAgICogQHBhcmFtIHN0YXRzIHRoZSBzdGF0cyBzdHJ1Y3R1cmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU3RhdHMoc3RhdHM6IEFnZ3JlZ2F0ZWRTdGF0cykge1xuICAgICAgICAvLyBmb3JtYXQgbnVtYmVyaW5nIGJhc2VkIG9uIHRoZSBicm93c2VyIGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IG51bWJlckZvcm1hdCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlLCB7XG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5ib3VuZCBkYXRhXG4gICAgICAgIGNvbnN0IGluYm91bmREYXRhID0gTWF0aFV0aWxzLmZvcm1hdEJ5dGVzKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYnl0ZXNSZWNlaXZlZCxcbiAgICAgICAgICAgIDJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ0luYm91bmREYXRhU3RhdCcsICdSZWNlaXZlZCcsIGluYm91bmREYXRhKTtcblxuICAgICAgICAvLyBQYWNrZXRzIGxvc3RcbiAgICAgICAgY29uc3QgcGFja2V0c0xvc3RTdGF0ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAncGFja2V0c0xvc3QnXG4gICAgICAgIClcbiAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5wYWNrZXRzTG9zdClcbiAgICAgICAgICAgIDogJ0Nocm9tZSBvbmx5JztcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUGFja2V0c0xvc3RTdGF0JyxcbiAgICAgICAgICAgICdQYWNrZXRzIExvc3QnLFxuICAgICAgICAgICAgcGFja2V0c0xvc3RTdGF0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQml0cmF0ZVxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ1ZpZGVvQml0cmF0ZVN0YXQnLFxuICAgICAgICAgICAgICAgICdWaWRlbyBCaXRyYXRlIChrYnBzKScsXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZS50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdBdWRpb0JpdHJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gQml0cmF0ZSAoa2JwcyknLFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZpZGVvIHJlc29sdXRpb25cbiAgICAgICAgY29uc3QgcmVzU3RhdCA9XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lV2lkdGgnXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZVdpZHRoICYmXG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lSGVpZ2h0J1xuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVIZWlnaHRcbiAgICAgICAgICAgICAgICA/IHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lV2lkdGggK1xuICAgICAgICAgICAgICAgICAgJ3gnICtcbiAgICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lSGVpZ2h0XG4gICAgICAgICAgICAgICAgOiAnQ2hyb21lIG9ubHknO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnVmlkZW9SZXNTdGF0JywgJ1ZpZGVvIHJlc29sdXRpb24nLCByZXNTdGF0KTtcblxuICAgICAgICAvLyBGcmFtZXMgZGVjb2RlZFxuICAgICAgICBjb25zdCBmcmFtZXNEZWNvZGVkID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAnZnJhbWVzRGVjb2RlZCdcbiAgICAgICAgKVxuICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc0RlY29kZWQpXG4gICAgICAgICAgICA6ICdDaHJvbWUgb25seSc7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0RlY29kZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgRGVjb2RlZCcsXG4gICAgICAgICAgICBmcmFtZXNEZWNvZGVkXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gRnJhbWVyYXRlXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdGcmFtZXJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnRnJhbWVyYXRlJyxcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZyYW1lcyBkcm9wcGVkXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0Ryb3BwZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgZHJvcHBlZCcsXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNEcm9wcGVkPy50b1N0cmluZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmNvZGVjSWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdWaWRlb0NvZGVjU3RhdCcsXG4gICAgICAgICAgICAgICAgJ1ZpZGVvIGNvZGVjJyxcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGUgY29kZWMgdG8gcmVtb3ZlIHRoZSBGbXRwIGxpbmVcbiAgICAgICAgICAgICAgICBzdGF0cy5jb2RlY3NcbiAgICAgICAgICAgICAgICAgICAgLmdldChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5jb2RlY0lkKVxuICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KCcgJylbMF0gPz8gJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuY29kZWNJZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ0F1ZGlvQ29kZWNTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gY29kZWMnLFxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZSBjb2RlYyB0byByZW1vdmUgdGhlIEZtdHAgbGluZVxuICAgICAgICAgICAgICAgIHN0YXRzLmNvZGVjc1xuICAgICAgICAgICAgICAgICAgICAuZ2V0KHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmNvZGVjSWQpXG4gICAgICAgICAgICAgICAgICAgID8uc3BsaXQoJyAnKVswXSA/PyAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJUVFxuICAgICAgICBjb25zdCBuZXRSVFQgPVxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgIHN0YXRzLmNhbmRpZGF0ZVBhaXIsXG4gICAgICAgICAgICAgICAgJ2N1cnJlbnRSb3VuZFRyaXBUaW1lJ1xuICAgICAgICAgICAgKSAmJiBzdGF0cy5pc051bWJlcihzdGF0cy5jYW5kaWRhdGVQYWlyLmN1cnJlbnRSb3VuZFRyaXBUaW1lKVxuICAgICAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0cy5jYW5kaWRhdGVQYWlyLmN1cnJlbnRSb3VuZFRyaXBUaW1lICogMTAwMFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogXCJDYW4ndCBjYWxjdWxhdGVcIjtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ1JUVFN0YXQnLCAnTmV0IFJUVCAobXMpJywgbmV0UlRUKTtcblxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdEdXJhdGlvblN0YXQnLFxuICAgICAgICAgICAgJ0R1cmF0aW9uJyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy5ydW5UaW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnQ29udHJvbHNJbnB1dFN0YXQnLFxuICAgICAgICAgICAgJ0NvbnRyb2xzIHN0cmVhbSBpbnB1dCcsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMuY29udHJvbHNTdHJlYW1JbnB1dFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFFQXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ1FQU3RhdCcsXG4gICAgICAgICAgICAnVmlkZW8gcXVhbnRpemF0aW9uIHBhcmFtZXRlcicsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMudmlkZW9FbmNvZGVyQXZnUVAudG9TdHJpbmcoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRvZG86XG4gICAgICAgIC8vc3RhdHNUZXh0ICs9IGA8ZGl2PkJyb3dzZXIgcmVjZWl2ZSB0byBjb21wb3NpdGUgKG1zKTogJHtzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5yZWNlaXZlVG9Db21wb3NpdGVNc308L2Rpdj5gO1xuXG4gICAgICAgIExvZ2dlci5Mb2coXG4gICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgYC0tLS0tLS0tLSBTdGF0cyAtLS0tLS0tLS1cXG4gJHtzdGF0c31cXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1gLFxuICAgICAgICAgICAgNlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgc3RhdCB0byB0aGUgc3RhdHMgcmVzdWx0cyBpbiB0aGUgRE9NIG9yIHVwZGF0ZXMgYW4gZXhpdGluZyBzdGF0LlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHN0YXQgdG8gYWRkL3VwZGF0ZS5cbiAgICAgKiBAcGFyYW0gc3RhdCBUaGUgY29udGVudHMgb2YgdGhlIHN0YXQuXG4gICAgICovXG4gICAgcHVibGljIGFkZE9yVXBkYXRlU3RhdChpZDogc3RyaW5nLCBzdGF0TGFiZWw6IHN0cmluZywgc3RhdDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRIVE1MID0gYCR7c3RhdExhYmVsfTogJHtzdGF0fWA7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRzTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgc3RhdFxuICAgICAgICAgICAgY29uc3QgbmV3U3RhdCA9IG5ldyBTdGF0KCk7XG4gICAgICAgICAgICBuZXdTdGF0LmlkID0gaWQ7XG4gICAgICAgICAgICBuZXdTdGF0LnN0YXQgPSBzdGF0O1xuICAgICAgICAgICAgbmV3U3RhdC50aXRsZSA9IHN0YXRMYWJlbDtcbiAgICAgICAgICAgIG5ld1N0YXQuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbmV3U3RhdC5lbGVtZW50LmlubmVySFRNTCA9IHN0YXRIVE1MO1xuICAgICAgICAgICAgLy8gYWRkIHRoZSBzdGF0IHRvIHRoZSBkb21cbiAgICAgICAgICAgIHRoaXMuc3RhdHNSZXN1bHQuYXBwZW5kQ2hpbGQobmV3U3RhdC5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNNYXAuc2V0KGlkLCBuZXdTdGF0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIHN0YXRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdHNNYXAuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZWxlbWVudC5pbm5lckhUTUwgPSBzdGF0SFRNTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKiBXaGV0aGVyIGEgc3RyZWFtIFVJIGVsZW1lbnQgaXMgaW50ZXJuYWxseSBtYWRlLCBleHRlcm5hbGx5IHByb3ZpZGVkLCBvciBkaXNhYmxlZC4gKi9cbmV4cG9ydCBlbnVtIFVJRWxlbWVudENyZWF0aW9uTW9kZSB7XG4gICAgQ3JlYXRlRGVmYXVsdEVsZW1lbnQsXG4gICAgVXNlQ3VzdG9tRWxlbWVudCxcbiAgICBEaXNhYmxlXG59XG5cbi8qKiBBIGNvbmZpZ3VyYXRpb24gZm9yIGRpZmZlcmVudCBVSSBlbGVtZW50cyB3aGljaCBjb250cm9sL2Rpc3BsYXkgaW5mbyByZWxhdGVkIHRvIHRoZSBzdHJlYW0uICovXG5leHBvcnQgdHlwZSBVSUVsZW1lbnRDb25maWcgPSB7XG4gICAgLy8gSW4gd2hpY2ggd2F5IGlzIHRoaXMgZWxlbWVudCBjcmVhdGVkP1xuICAgIGNyZWF0aW9uTW9kZSA6IFVJRWxlbWVudENyZWF0aW9uTW9kZSxcbiAgICAvLyAoT25seSByZWxldmFudCBpZiB3aGVuIG1vZGUgaXMgQ3JlYXRlQ3VzdG9tRWxlbWVudCkgVmlzdWFsaXppbmcgZWxlbWVudFxuICAgIGN1c3RvbUVsZW1lbnQ/IDogSFRNTEVsZW1lbnRcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIGEgZ2VuZXJhbCBzdHJlYW0tcmVsYXRlZCBVSSBwYW5lbC4gXG4gKiBGb3IgZXhhbXBsZTogaXMgaXQgY3JlYXRlZCwgYW5kIGlmIGl0IGlzLCB3aGF0IGtpbmQgb2YgYnV0dG9uIGlzIHVzZWQgdG8gc2hvdy9oaWRlIGl0LlxuICogVGhpcyBjb25maWd1cmF0aW9uIGlzIHVzZWQgZm9yIHRoZSBzZXR0aW5ncyBwYW5lbCBhbmQgc3RhdHMgcGFuZWwgYnkgZGVmYXVsdC5cbiAqIFxuICogTm90ZTogRm9yIGNhc2VzIHdoZXJlIHRoZSBwYW5lbCBuZWVkcyB0byBiZSBjcmVhdGVkLCBidXQgYSBidXR0b24gaXNuJ3QgbmVlZGVkLCBcbiAqIHRoZSBwYW5lbCBlbGVtZW50IGNhbiBiZSBwbGFjZWQgYW55d2hlcmUgaW4gdGhlIERPTSBhcyBuZWVkZWQgKHNlZSBBcHBsaWNhdGlvbiBjbGFzcykuIFxuICovXG5leHBvcnQgdHlwZSBQYW5lbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgLy8gSWYgcGFuZWwgaXMgZW5hYmxlZCwgSFRNTCBlbGVtZW50cyBmb3IgaXQgd2lsbCBiZSBjcmVhdGVkLCBhbmQgZnVudGlvbmFsaXR5IGJvdW5kXG4gICAgaXNFbmFibGVkIDogYm9vbGVhbixcbiAgICAvLyAoT25seSByZWxldmFudCBpZiBpc0VuYWJsZWQpIFRoZSB0eXBlIG9mIHRoZSBidXR0b24gdG8gc2hvdy9oaWRlIHRoaXMgcGFuZWxcbiAgICB2aXNpYmlsaXR5QnV0dG9uQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYW5lbEVuYWJsZWQoY29uZmlnIDogUGFuZWxDb25maWd1cmF0aW9uIHwgdW5kZWZpbmVkKSA6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhY29uZmlnIHx8ICghIWNvbmZpZyAmJiBjb25maWcuaXNFbmFibGVkKTtcbn0iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgZWxlbWVudCBzaG93aW5nIHRoZSBRUCAocXVhbnRpemF0aW9uIHBhcmFtZXRlcikgb2YgdGhlIHZpZGVvIHN0cmVhbSBhdCB0aGUgbGFzdCBlbmNvZGVkIGZyYW1lICh3ZWxsLCBsYXN0IHRyYW5zbWl0dGVkIFFQIHJlYWxseSkuXG4gKiBBIGJsb2NraWVyIGVuY29kaW5nIHdpbGwgaGF2ZSBhIGhpZ2hlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgcmVkLlxuICogQSBub24tYmxvY2t5IHN0cmVhbSB3aWxsIGhhdmUgYSBsb3dlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgZ3JlZW4uXG4gKiBUaGUgUVAgaW5kaWNhdG9yIGlzIHJlcHJlc2VudGVkIHZpc3VhbGx5IHVzaW5nIGEgV2lGaSBpY29uLlxuICovXG5leHBvcnQgY2xhc3MgVmlkZW9RcEluZGljYXRvciB7XG4gICAgdmlkZW9FbmNvZGVyQXZnUVAgPSAtMTtcblxuICAgIC8vIG5vbiBodG1sIGVsZW1lbnRzXG4gICAgc3RhdHNUZXh0ID0gJyc7XG4gICAgY29sb3IgPSAnJztcblxuICAgIC8vIHFwIGNvbG9yc1xuICAgIHJlYWRvbmx5IG9yYW5nZVFQID0gMjY7XG4gICAgcmVhZG9ubHkgcmVkUVAgPSAzNTtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3F1YWxpdHlUZXh0OiBIVE1MRWxlbWVudDtcbiAgICBfcXVhbGl0eVN0YXR1czogU1ZHRWxlbWVudDtcbiAgICBfZG90OiBTVkdFbGVtZW50O1xuICAgIF9vdXRlcjogU1ZHRWxlbWVudDtcbiAgICBfbWlkZGxlOiBTVkdFbGVtZW50O1xuICAgIF9pbm5lcjogU1ZHRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBRUCBpbmRpY2F0b3IuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBzdmcgZm9yIHRoZSBjb25uZWN0aW9uXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnY29ubmVjdGlvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcblxuICAgICAgICAgICAgLy8gYWRkIHN2ZyBpY29uIGZvciB0aGUgY29ubmVjdGlvbiBzdHJlbmd0aFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5xdWFsaXR5U3RhdHVzKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0ZXh0IHVuZGVybmVhdGggdGhlIGNvbm5lY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucXVhbGl0eVRleHQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgY29sb3JzIHRvIG5vdCBjb25uZWN0ZWQgaW5pdGlhbGx5XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVFwVG9vbHRpcCgtMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGV4dCB0aGF0IGRpc3BsYXlzIHVuZGVyIHRoZSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcXVhbGl0eVRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3F1YWxpdHlUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmlkID0gJ3F1YWxpdHlUZXh0JztcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YWxpdHlUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHF1YWxpdHlTdGF0dXMoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcXVhbGl0eVN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdpZCcsXG4gICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb25TdHJlbmd0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlTdGF0dXMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0OTQuNDUgNDk0LjQ1J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lmaSBpY29uXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuYXBwZW5kQ2hpbGQodGhpcy5kb3QpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMubWlkZGxlKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLm91dGVyKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLmlubmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVhbGl0eVN0YXR1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRvdCBhdCB0aGUgYm90dG9tIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBkb3QoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fZG90KSB7XG4gICAgICAgICAgICB0aGlzLl9kb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnY2lyY2xlJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnZG90Jyk7XG4gICAgICAgICAgICB0aGlzLl9kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JywgJzI0Ny4xMjUnKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knLCAnMzk4LjkyNScpO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdyJywgJzM1LjMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZG90O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb3V0ZXIgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBvdXRlcigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9vdXRlcikge1xuICAgICAgICAgICAgdGhpcy5fb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnb3V0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX291dGVyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNNDY3LjkyNSwyMDQuNjI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtMTExLjUtMTExLjQtMjkyLjctMTExLjQtNDA0LjEsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjNjQtNjQsMTQ5LTk5LjIsMjM5LjUtOTkuMnMxNzUuNSwzNS4yLDIzOS41LDk5LjJjMTAuMywxMC4zLDEwLjMsMjcuMSwwLDM3LjRDNDgxLjQyNSwyMDIuMDI1LDQ3NC42MjUsMjA0LjYyNSw0NjcuOTI1LDIwNC42MjV6J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtaWRkbGUgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBtaWRkbGUoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWlkZGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ21pZGRsZScpO1xuICAgICAgICAgICAgdGhpcy5fbWlkZGxlLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzk1LjIyNSwyNzcuMzI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtNzEuNC03MS4zLTE4Ny40LTcxLjMtMjU4LjgsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjOTItOTIsMjQxLjYtOTIsMzMzLjYsMGMxMC4zLDEwLjMsMTAuMywyNy4xLDAsMzcuNEM0MDguNzI1LDI3NC43MjUsNDAxLjkyNSwyNzcuMzI1LDM5NS4yMjUsMjc3LjMyNXonXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taWRkbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbm5lciBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlubmVyKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2lubmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdpbm5lcicpO1xuICAgICAgICAgICAgdGhpcy5faW5uZXIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zMjMuNjI1LDM0OC44MjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy0xNS40LTE1LjQtMzYtMjMuOS01Ny44LTIzLjlzLTQyLjQsOC41LTU3LjgsMjMuOWMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBjLTEwLjMtMTAuMy0xMC4zLTI3LjEsMC0zNy40YzI1LjQtMjUuNCw1OS4yLTM5LjQsOTUuMi0zOS40czY5LjgsMTQsOTUuMiwzOS41YzEwLjMsMTAuMywxMC4zLDI3LjEsMCwzNy40QzMzNy4yMjUsMzQ2LjIyNSwzMzAuNDI1LDM0OC44MjUsMzIzLjYyNSwzNDguODI1eidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc2V0IHRoZSBzcGVlZCBvZiB0aGUgc3RhdHVzIGxpZ2h0LlxuICAgICAqIEBwYXJhbSBzcGVlZCAtIFNldCB0aGUgc3BlZWQgb2YgdGhlIGJsaW5rLCBoaWdoZXIgbnVtYmVycyBtYWtlIHRoZSBzdGF0dXMgbGlnaHQgYmxpbmsgZmFzdGVyLlxuICAgICAqL1xuICAgIGJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IHNwZWVkO1xuICAgICAgICBsZXQgb3BhY2l0eSA9IDE7XG4gICAgICAgIGNvbnN0IHRpY2tJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG9wYWNpdHkgLT0gMC4xO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5VGV4dC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKChvcGFjaXR5IC0gMC41KSAqIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG9wYWNpdHkgPD0gMC4xKSB7XG4gICAgICAgICAgICAgICAgaWYgKC0taXRlcmF0aW9uID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aWNrSUQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwIC8gc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZXMgdGhlIFFQIHRvb2x0aXAgYnkgY29udmVydGluZyB0aGUgVmlkZW8gRW5jb2RlciBRUCB0byBhIGNvbG9yIGxpZ2h0XG4gICAgICogQHBhcmFtIFFQIC0gVGhlIHZpZGVvIGVuY29kZXIgUVAgbnVtYmVyIG5lZWRlZCB0byBmaW5kIHRoZSBhdmVyYWdlXG4gICAgICovXG4gICAgdXBkYXRlUXBUb29sdGlwKFFQOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy52aWRlb0VuY29kZXJBdmdRUCA9IFFQO1xuICAgICAgICBpZiAoUVAgPiB0aGlzLnJlZFFQKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICB0aGlzLmJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKDIpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+UG9vciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5pbm5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChRUCA+IHRoaXMub3JhbmdlUVApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgIHRoaXMuYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoMSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5CbG9ja3kgZW5jb2RpbmcgcXVhbGl0eTwvZGl2PmA7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKFFQIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnI2IwYjBiMCc7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+Tm90IGNvbm5lY3RlZDwvZGl2PmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ2xpbWUnO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5DbGVhciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVhbGl0eVRleHQuaW5uZXJIVE1MID0gdGhpcy5zdGF0c1RleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBYUiBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBYUkljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3hySWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIFhSIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3hyQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1hSJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB4ckljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5feHJJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl94ckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAneHJJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHN2ZyBncm91cCBmb3IgdGhlIHBhdGhzXG4gICAgICAgICAgICBjb25zdCBzdmdHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHN2Z0dyb3VwLmNsYXNzTGlzdC5hZGQoJ3N2Z0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5hcHBlbmRDaGlsZChzdmdHcm91cCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBwYXRocyBmb3IgdGhlIGljb24gaXRzZWxmLCB0aGUgcGF0aCBvZiB0aGUgeHIgaGVhZHNldFxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTI5IDQxYy01IDAtOSA0LTkgOXM0IDkgOSA5IDktNCA5LTktNC05LTktOXptMCAxNGMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1em00Mi0xNGMtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05LTQtOS05LTl6bTAgMTRjLTIuOCAwLTUtMi4yLTUtNXMyLjItNSA1LTUgNSAyLjIgNSA1LTIuMiA1LTUgNXptMTItMzFIMTdjLTYuNiAwLTEyIDUuNC0xMiAxMnYyOGMwIDYuNiA1LjQgMTIgMTIgMTJoMTQuNWMzLjUgMCA2LjgtMS41IDktNC4xbDMuNS00YzEuNS0xLjcgMy43LTIuNyA2LTIuN3M0LjUgMSA2IDIuN2wzLjUgNGMyLjMgMi42IDUuNiA0LjEgOSA0LjFIODNjNi42IDAgMTItNS40IDEyLTEyVjM2YzAtNi42LTUuNC0xMi0xMi0xMnptOCA0MGMwIDQuNC0zLjYgOC04IDhINjguNWMtMi4zIDAtNC41LTEtNi0yLjdsLTMuNS00Yy0yLjMtMi42LTUuNi00LjEtOS00LjEtMy41IDAtNi44IDEuNS05IDQuMWwtMy41IDRDMzYgNzEgMzMuOCA3MiAzMS41IDcySDE3Yy00LjQgMC04LTMuNi04LThWMzZjMC00LjQgMy42LTggOC04aDY2YzQuNCAwIDggMy42IDggOHYyOHonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5feHJJY29uO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmV4cG9ydCBjbGFzcyBNYXRoVXRpbHMge1xuICAgIC8qKlxuICAgICAqIGZvcm1hdHMgQnl0ZXMgY29taW5nIGluIGZvciB2aWRlbyBzdGF0c1xuICAgICAqIEBwYXJhbSBieXRlcyBudW1iZXIgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBkZWNpbWFscyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZm9ybWF0Qnl0ZXMoYnl0ZXM6IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmIChieXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZhY3RvciA9IDEwMjQ7XG4gICAgICAgIGNvbnN0IGRtID0gZGVjaW1hbHMgPCAwID8gMCA6IGRlY2ltYWxzO1xuICAgICAgICBjb25zdCBzaXplcyA9IFtcbiAgICAgICAgICAgICdCeXRlcycsXG4gICAgICAgICAgICAnS2lCJyxcbiAgICAgICAgICAgICdNaUInLFxuICAgICAgICAgICAgJ0dpQicsXG4gICAgICAgICAgICAnVGlCJyxcbiAgICAgICAgICAgICdQaUInLFxuICAgICAgICAgICAgJ0VpQicsXG4gICAgICAgICAgICAnWmlCJyxcbiAgICAgICAgICAgICdZaUInXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coZmFjdG9yKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coZmFjdG9yLCBpKSkudG9GaXhlZChkbSkpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBzaXplc1tpXVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2VwaWNnYW1lc19wc19saWJfcGl4ZWxzdHJlYW1pbmdmcm9udGVuZF91ZTVfMl9kNTc1NTJkZl9fOyIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX187IiwidmFyIHggPSB5ID0+IHsgdmFyIHggPSB7fTsgX193ZWJwYWNrX3JlcXVpcmVfXy5kKHgsIHkpOyByZXR1cm4geDsgfVxudmFyIHkgPSB4ID0+ICgpID0+IHhcbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qc3NfcGx1Z2luX2NhbWVsX2Nhc2VfZGUxMTMzNTVfXzsiLCJ2YXIgeCA9IHkgPT4geyB2YXIgeCA9IHt9OyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoeCwgeSk7IHJldHVybiB4OyB9XG52YXIgeSA9IHggPT4gKCkgPT4geFxubW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fZ2xvYmFsX2VmODZmNDIxX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgVUlPcHRpb25zLCBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnIH0gZnJvbSAnLi9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCB7IFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB9IGZyb20gJy4vU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMnO1xuXG5leHBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0FGS092ZXJsYXknO1xuZXhwb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmV4cG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmV4cG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuZXhwb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvSW5mb092ZXJsYXknO1xuZXhwb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvUGxheU92ZXJsYXknO1xuZXhwb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuZXhwb3J0IHsgQ29uZmlnVUkgfSBmcm9tICcuL0NvbmZpZy9Db25maWdVSSc7XG5leHBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJQmFzZSc7XG5leHBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJRmxhZyc7XG5leHBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXInO1xuZXhwb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJT3B0aW9uJztcbmV4cG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlUZXh0JztcbmV4cG9ydCB7IFBhbmVsQ29uZmlndXJhdGlvbiwgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9