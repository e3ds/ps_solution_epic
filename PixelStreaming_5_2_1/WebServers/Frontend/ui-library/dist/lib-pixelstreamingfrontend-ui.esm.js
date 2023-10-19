import * as __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_2_d57552df__ from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2";
import * as __WEBPACK_EXTERNAL_MODULE_jss__ from "jss";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case_de113355__ from "jss-plugin-camel-case";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_global_ef86f421__ from "jss-plugin-global";
/******/ var __webpack_modules__ = ({

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
/* harmony import */ var _FullscreenIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FullscreenIcon */ "./src/UI/FullscreenIcon.ts");
/* harmony import */ var _SettingsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsIcon */ "./src/UI/SettingsIcon.ts");
/* harmony import */ var _StatsIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StatsIcon */ "./src/UI/StatsIcon.ts");
/* harmony import */ var _XRIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./XRIcon */ "./src/UI/XRIcon.ts");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.2 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
// Copyright Epic Games, Inc. All Rights Reserved.






// If there isn't a type provided, default behaviour is to create the element.
function shouldCreateButton(type) {
    return (type == undefined) ? true : (type.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.UIElementCreationMode.CreateDefaultElement);
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
            this.statsIcon = new _StatsIcon__WEBPACK_IMPORTED_MODULE_2__.StatsIcon();
        }
        if (!config || shouldCreateButton(config.settingsButtonType)) {
            this.settingsIcon = new _SettingsIcon__WEBPACK_IMPORTED_MODULE_3__.SettingsIcon();
        }
        if (!config || shouldCreateButton(config.fullscreenButtonType)) {
            this.fullscreenIcon = new _FullscreenIcon__WEBPACK_IMPORTED_MODULE_4__.FullScreenIcon();
        }
        if (!config || shouldCreateButton(config.xrIconType)) {
            this.xrIcon = new _XRIcon__WEBPACK_IMPORTED_MODULE_5__.XRIcon();
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
                _epicgames_ps_lib_pixelstreamingfrontend_ue5_2__WEBPACK_IMPORTED_MODULE_0__.WebXRController.isSessionSupported('immersive-vr').then((supported) => {
                    if (supported) {
                        this._rootElement.appendChild(this.xrIcon.rootElement);
                    }
                });
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELEdBQUc7WUFDSCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1gsQ0FBQztJQUNOLENBQUM7Q0FDSjs7Ozs7Ozs7Ozs7QUNuQ0QsZUFBZSxZQUFZLDZCQUE2QjtBQUN4RDtBQUNBOzs7Ozs7Ozs7O0FDRkEsZUFBZSxZQUFZLDZCQUE2QjtBQUN4RDtBQUNBOzs7Ozs7Ozs7O0FDRkEsZUFBZSxZQUFZLDZCQUE2QjtBQUN4RDtBQUNBOzs7Ozs7Ozs7O0FDRkEsZUFBZSxZQUFZLDZCQUE2QjtBQUN4RDtBQUNBOzs7Ozs7U0NGQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLGtEQUFrRDtBQUV5QztBQUVEO0FBRXhDO0FBQ007QUFDSjtBQUNNO0FBQ007QUFDVjtBQUNGO0FBQ0E7QUFDQTtBQUNQO0FBQ1U7QUFDQTtBQUNJO0FBQ0E7QUFDSjtBQUMrQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvQXBwbGljYXRpb24vQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9Db25maWcvQ29uZmlnVUkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9Db25maWcvU2V0dGluZ1VJQmFzZS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlGbGFnLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvQ29uZmlnL1NldHRpbmdVSU51bWJlci50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlPcHRpb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9Db25maWcvU2V0dGluZ1VJVGV4dC50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvQUZLT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvQWN0aW9uT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvQmFzZU92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9PdmVybGF5L0Nvbm5lY3RPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9EaXNjb25uZWN0T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvRXJyb3JPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvT3ZlcmxheS9JbmZvT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL092ZXJsYXkvUGxheU92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9PdmVybGF5L1RleHRPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9Db250cm9scy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL0Z1bGxzY3JlZW5JY29uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvTGFiZWxsZWRCdXR0b24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9MYXRlbmN5VGVzdC50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL1NldHRpbmdzSWNvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yLy4vc3JjL1VJL1NldHRpbmdzUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9TdGF0c0ljb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9TdGF0c1BhbmVsLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvVUlDb25maWd1cmF0aW9uVHlwZXMudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9VSS9WaWRlb1FwSW5kaWNhdG9yLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVUkvWFJJY29uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvLi9zcmMvVXRpbC9NYXRoVXRpbHMudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi9leHRlcm5hbCBtb2R1bGUgXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yXCIiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi9leHRlcm5hbCBtb2R1bGUgXCJqc3NcIiIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yL2V4dGVybmFsIG1vZHVsZSBcImpzcy1wbHVnaW4tY2FtZWwtY2FzZVwiIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvZXh0ZXJuYWwgbW9kdWxlIFwianNzLXBsdWdpbi1nbG9iYWxcIiIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS4yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuMi8uL3NyYy9waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7XG4gICAgUGl4ZWxTdHJlYW1pbmcsXG4gICAgRmxhZ3MsXG4gICAgTG9nZ2VyLFxuICAgIEFnZ3JlZ2F0ZWRTdGF0cyxcbiAgICBMYXRlbmN5VGVzdFJlc3VsdHMsXG4gICAgSW5pdGlhbFNldHRpbmdzLFxuICAgIE1lc3NhZ2VTdHJlYW1lckxpc3Rcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBPdmVybGF5QmFzZSB9IGZyb20gJy4uL092ZXJsYXkvQmFzZU92ZXJsYXknO1xuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvQWN0aW9uT3ZlcmxheSc7XG5pbXBvcnQgeyBUZXh0T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuaW1wb3J0IHsgQ29ubmVjdE92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmltcG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9EaXNjb25uZWN0T3ZlcmxheSc7XG5pbXBvcnQgeyBQbGF5T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvUGxheU92ZXJsYXknO1xuaW1wb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0luZm9PdmVybGF5JztcbmltcG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvRXJyb3JPdmVybGF5JztcbmltcG9ydCB7IEFGS092ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0FGS092ZXJsYXknO1xuaW1wb3J0IHsgQ29udHJvbHMsIENvbnRyb2xzVUlDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vVUkvQ29udHJvbHMnO1xuaW1wb3J0IHsgTGFiZWxsZWRCdXR0b24gfSBmcm9tICcuLi9VSS9MYWJlbGxlZEJ1dHRvbic7XG5pbXBvcnQgeyBTZXR0aW5nc1BhbmVsIH0gZnJvbSAnLi4vVUkvU2V0dGluZ3NQYW5lbCc7XG5pbXBvcnQgeyBTdGF0c1BhbmVsIH0gZnJvbSAnLi4vVUkvU3RhdHNQYW5lbCc7XG5pbXBvcnQgeyBWaWRlb1FwSW5kaWNhdG9yIH0gZnJvbSAnLi4vVUkvVmlkZW9RcEluZGljYXRvcic7XG5pbXBvcnQgeyBDb25maWdVSSwgTGlnaHRNb2RlIH0gZnJvbSAnLi4vQ29uZmlnL0NvbmZpZ1VJJztcbmltcG9ydCB7IFxuICAgIFVJRWxlbWVudENyZWF0aW9uTW9kZSwgXG4gICAgUGFuZWxDb25maWd1cmF0aW9uLCBcbiAgICBpc1BhbmVsRW5hYmxlZCxcbiAgICBVSUVsZW1lbnRDb25maWdcbn0gZnJvbSAnLi4vVUkvVUlDb25maWd1cmF0aW9uVHlwZXMnXG5pbXBvcnQgeyBGdWxsU2NyZWVuSWNvbkJhc2UsIEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwgfSBmcm9tICcuLi9VSS9GdWxsc2NyZWVuSWNvbic7XG5cblxuLyoqIFxuICogQ29uZmlndXJhdGlvbiBvZiB0aGUgaW50ZXJuYWwgdmlkZW8gUVAgaW5kaWNhdG9yIGVsZW1lbnQuXG4gKiBCeSBkZWZhdWx0LCBvbmUgd2lsbCBiZSBtYWRlLCBidXQgaWYgbmVlZGVkIHRoaXMgY2FuIGJlIGRpc2FibGVkLlxuICogXG4gKiBOb3RlOiBGb3IgY3VzdG9tIFVJIGVsZW1lbnRzIHRvIHJlYWN0IHRvIHRoZSBRUCBiZWluZyBjaGFuZ2VkLCB1c2UgYSBQaXhlbFN0cmVhbWluZyBcbiAqIG9iamVjdCdzIGFkZEV2ZW50TGlzdGVuZXIoJ3ZpZGVvRW5jb2RlckF2Z1FQJywgLi4uKSBvciByZW1vdmVFdmVudExpc3RlbmVyKC4uLikuXG4gKi9cbmV4cG9ydCB0eXBlIFZpZGVvUVBJbmRpY2F0b3JDb25maWcgPSB7XG4gICAgZGlzYWJsZUluZGljYXRvcj86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBVSSBPcHRpb25zIGNhbiBiZSBwcm92aWRlZCB3aGVuIGNyZWF0aW5nIGFuIEFwcGxpY2F0aW9uLCB0byBjb25maWd1cmUgaXQncyBpbnRlcm5hbFxuICogYW5kIGV4dGVybmFsIGJlaGF2aW91ciwgZW5hYmxlL2Rpc2FibGUgZmVhdHVyZXMsIGFuZCBjb25uZWN0IHRvIGV4dGVybmFsIFVJLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVJT3B0aW9ucyB7XG4gICAgc3RyZWFtOiBQaXhlbFN0cmVhbWluZztcbiAgICBvbkNvbG9yTW9kZUNoYW5nZWQ/OiAoaXNMaWdodE1vZGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgLyoqIEJ5IGRlZmF1bHQsIGEgc2V0dGluZ3MgcGFuZWwgYW5kIGFzc29jaWF0ZSB2aXNpYmlsaXR5IHRvZ2dsZSBidXR0b24gd2lsbCBiZSBtYWRlLlxuICAgICAgKiBJZiBuZWVkZWQsIHRoaXMgYmVoYXZpb3VyIGNhbiBiZSBjb25maWd1cmVkLiAqL1xuICAgIHNldHRpbmdzUGFuZWxDb25maWc/OiBQYW5lbENvbmZpZ3VyYXRpb247XG4gICAgLyoqIEJ5IGRlZmF1bHQsIGEgc3RhdHMgcGFuZWwgYW5kIGFzc29jaWF0ZSB2aXNpYmlsaXR5IHRvZ2dsZSBidXR0b24gd2lsbCBiZSBtYWRlLlxuICAgICAgKiBJZiBuZWVkZWQsIHRoaXMgYmVoYXZpb3VyIGNhbiBiZSBjb25maWd1cmVkLiAqL1xuICAgIHN0YXRzUGFuZWxDb25maWc/OiBQYW5lbENvbmZpZ3VyYXRpb247XG4gICAgLyoqIElmIG5lZWRlZCwgdGhlIGZ1bGwgc2NyZWVuIGJ1dHRvbiBjYW4gYmUgZXh0ZXJuYWwgb3IgZGlzYWJsZWQuICovXG4gICAgZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICAvKiogSWYgbmVlZGVkLCBYUiBidXR0b24gY2FuIGJlIGV4dGVybmFsIG9yIGRpc2FibGVkLiAqL1xuICAgIHhyQ29udHJvbHNDb25maWc/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIC8qKiBDb25maWd1cmF0aW9uIG9mIHRoZSB2aWRlbyBRUCBpbmRpY2F0b3IuICovXG4gICAgdmlkZW9RcEluZGljYXRvckNvbmZpZz8gOiBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnXG59XG5cbi8qKlxuICogQW4gQXBwbGljYXRpb24gaXMgYSBjb21iaW5hdGlvbiBvZiBVSSBlbGVtZW50cyB0byBkaXNwbGF5IGFuZCBtYW5hZ2UgYSBXZWJSVEMgUGl4ZWwgU3RyZWFtaW5nXG4gKiBjb25uZWN0aW9uLiBJdCBpbmNsdWRlcyBmZWF0dXJlcyBmb3IgY29udHJvbGxpbmcgYSBzdHJlYW0gd2l0aCBtb3VzZSBhbmQga2V5Ym9hcmQsIFxuICogbWFuYWdpbmcgY29ubmVjdGlvbiBlbmRwb2ludHMsIGFzIHdlbGwgYXMgZGlzcGxheWluZyBzdGF0cyBhbmQgb3RoZXIgaW5mb3JtYXRpb24gYWJvdXQgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XG4gICAgc3RyZWFtOiBQaXhlbFN0cmVhbWluZztcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3VpRmVhdHVyZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLy8gc2V0IHRoZSBvdmVybGF5IHBsYWNlaG9sZGVyc1xuICAgIGN1cnJlbnRPdmVybGF5OiBPdmVybGF5QmFzZSB8IG51bGw7XG4gICAgZGlzY29ubmVjdE92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgY29ubmVjdE92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgcGxheU92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgaW5mb092ZXJsYXk6IFRleHRPdmVybGF5O1xuICAgIGVycm9yT3ZlcmxheTogVGV4dE92ZXJsYXk7XG4gICAgYWZrT3ZlcmxheTogQUZLT3ZlcmxheTtcblxuICAgIGNvbnRyb2xzOiBDb250cm9scztcblxuICAgIHNldHRpbmdzUGFuZWw6IFNldHRpbmdzUGFuZWw7XG4gICAgc3RhdHNQYW5lbDogU3RhdHNQYW5lbDtcbiAgICB2aWRlb1FwSW5kaWNhdG9yOiBWaWRlb1FwSW5kaWNhdG9yO1xuXG4gICAgY29uZmlnVUk6IENvbmZpZ1VJO1xuXG4gICAgb25Db2xvck1vZGVDaGFuZ2VkOiBVSU9wdGlvbnNbXCJvbkNvbG9yTW9kZUNoYW5nZWRcIl07XG5cbiAgICBwcm90ZWN0ZWQgX29wdGlvbnMgOiBVSU9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluaXRpYWxpemF0aW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBVSU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0cmVhbSA9IG9wdGlvbnMuc3RyZWFtO1xuICAgICAgICB0aGlzLm9uQ29sb3JNb2RlQ2hhbmdlZCA9IG9wdGlvbnMub25Db2xvck1vZGVDaGFuZ2VkO1xuICAgICAgICB0aGlzLmNvbmZpZ1VJID0gbmV3IENvbmZpZ1VJKHRoaXMuc3RyZWFtLmNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuXG4gICAgICAgIGlmIChpc1BhbmVsRW5hYmxlZChvcHRpb25zLnN0YXRzUGFuZWxDb25maWcpKSB7XG4gICAgICAgICAgICAvLyBBZGQgc3RhdHMgcGFuZWxcbiAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbCA9IG5ldyBTdGF0c1BhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3RhdHNQYW5lbC5yb290RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpc1BhbmVsRW5hYmxlZChvcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWcpKSB7XG4gICAgICAgICAgICAvLyBBZGQgc2V0dGluZ3MgcGFuZWxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbCA9IG5ldyBTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NQYW5lbC5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVNldHRpbmdzKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghb3B0aW9ucy52aWRlb1FwSW5kaWNhdG9yQ29uZmlnIHx8ICFvcHRpb25zLnZpZGVvUXBJbmRpY2F0b3JDb25maWcuZGlzYWJsZUluZGljYXRvcikge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSB2aWRlbyBzdHJlYW0gUVAgaW5kaWNhdG9yXG4gICAgICAgICAgICB0aGlzLnZpZGVvUXBJbmRpY2F0b3IgPSBuZXcgVmlkZW9RcEluZGljYXRvcigpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvUXBJbmRpY2F0b3Iucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrcygpO1xuXG4gICAgICAgIHRoaXMuc2hvd0Nvbm5lY3RPckF1dG9Db25uZWN0T3ZlcmxheXMoKTtcblxuICAgICAgICB0aGlzLnNldENvbG9yTW9kZSh0aGlzLmNvbmZpZ1VJLmlzQ3VzdG9tRmxhZ0VuYWJsZWQoTGlnaHRNb2RlKSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgICAgICAvLyBidWlsZCBhbGwgb2YgdGhlIG92ZXJsYXlzXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkgPSBuZXcgRGlzY29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheSA9IG5ldyBDb25uZWN0T3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBsYXlPdmVybGF5ID0gbmV3IFBsYXlPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW5mb092ZXJsYXkgPSBuZXcgSW5mb092ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5lcnJvck92ZXJsYXkgPSBuZXcgRXJyb3JPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheSA9IG5ldyBBRktPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5yZWNvbm5lY3QoKSk7XG5cbiAgICAgICAgLy8gQnVpbGQgdGhlIHdlYlJ0YyBjb25uZWN0IG92ZXJsYXkgRXZlbnQgTGlzdGVuZXIgYW5kIHNob3cgdGhlIGNvbm5lY3Qgb3ZlcmxheVxuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5Lm9uQWN0aW9uKCgpID0+IHRoaXMuc3RyZWFtLmNvbm5lY3QoKSk7XG5cbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwbGF5IG92ZXJsYXlzIGFjdGlvblxuICAgICAgICB0aGlzLnBsYXlPdmVybGF5Lm9uQWN0aW9uKCgpID0+IHRoaXMuc3RyZWFtLnBsYXkoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGJ1dHRvbiBjbGljayBmdW5jdGlvbnMgYW5kIGJ1dHRvbiBmdW5jdGlvbmFsaXR5XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzVUlDb25maWcgOiBDb250cm9sc1VJQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHN0YXRzQnV0dG9uVHlwZSA6ICEhdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9vcHRpb25zLnN0YXRzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZ1xuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2V0dGluZ3NCdXR0b25UeXBlOiAhIXRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWdcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5CdXR0b25UeXBlOiB0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZyxcbiAgICAgICAgICAgIHhySWNvblR5cGU6IHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZ1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldHVwIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IENvbnRyb2xzKGNvbnRyb2xzVUlDb25maWcpO1xuICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRyb2xzLnJvb3RFbGVtZW50KTtcblxuICAgICAgICAvLyBXaGVuIHdlIGZ1bGxzY3JlZW4gd2Ugd2FudCB0aGlzIGVsZW1lbnQgdG8gYmUgdGhlIHJvb3RcbiAgICAgICAgY29uc3QgZnVsbFNjcmVlbkJ1dHRvbiA6IEZ1bGxTY3JlZW5JY29uQmFzZSB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgLy8gRGVwZW5kaW5nIG9uIGlmIHdlJ3JlIGNyZWF0aW5nIGFuIGludGVybmFsIGJ1dHRvbiwgb3IgdXNpbmcgYW4gZXh0ZXJuYWwgb25lXG4gICAgICAgICAgICAoISF0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZyBcbiAgICAgICAgICAgICAgICAmJiB0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZy5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5Vc2VDdXN0b21FbGVtZW50KVxuICAgICAgICAgICAgLy8gRWl0aGVyIGNyZWF0ZSBhIGZ1bGxzY3JlZW4gY2xhc3MgYmFzZWQgb24gdGhlIGV4dGVybmFsIGJ1dHRvblxuICAgICAgICAgICAgPyBuZXcgRnVsbFNjcmVlbkljb25FeHRlcm5hbCh0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZy5jdXN0b21FbGVtZW50KVxuICAgICAgICAgICAgLy8gT3IgdXNlIHRoZSBvbmUgY3JlYXRlZCBieSB0aGUgQ29udHJvbHMgaW5pdGlhbGl6ZXIgZWFybGllclxuICAgICAgICAgICAgOiBjb250cm9scy5mdWxsc2NyZWVuSWNvbjtcbiAgICAgICAgaWYgKGZ1bGxTY3JlZW5CdXR0b24pIHtcbiAgICAgICAgICAgIGZ1bGxTY3JlZW5CdXR0b24uZnVsbHNjcmVlbkVsZW1lbnQgPSAvaVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ2aWRlb1wiKVswXSA6IHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgc2V0dGluZ3MgYnV0dG9uIHRvIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IHNldHRpbmdzQnV0dG9uIDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgICEhY29udHJvbHMuc2V0dGluZ3NJY29uID8gY29udHJvbHMuc2V0dGluZ3NJY29uLnJvb3RFbGVtZW50IDogXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZy5jdXN0b21FbGVtZW50O1xuICAgICAgICBpZiAoISFzZXR0aW5nc0J1dHRvbikgc2V0dGluZ3NCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2xpY2tlZCgpO1xuICAgICAgICBpZiAoISF0aGlzLnNldHRpbmdzUGFuZWwpIHRoaXMuc2V0dGluZ3NQYW5lbC5zZXR0aW5nc0Nsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0NsaWNrZWQoKTtcblxuICAgICAgICAvLyBBZGQgV2ViWFIgYnV0dG9uIHRvIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IHhyQnV0dG9uIDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgICEhY29udHJvbHMueHJJY29uID8gY29udHJvbHMueHJJY29uLnJvb3RFbGVtZW50IDogXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWcuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuVXNlQ3VzdG9tRWxlbWVudCA/XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWcuY3VzdG9tRWxlbWVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCEheHJCdXR0b24pIHhyQnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udG9nZ2xlWFIoKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgc3RhdHMvaW5mbyBidXR0b25cbiAgICAgICAgY29uc3Qgc3RhdHNCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy5zdGF0c0ljb24gPyBjb250cm9scy5zdGF0c0ljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc3RhdHNQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnLmN1c3RvbUVsZW1lbnQ7XG4gICAgICAgIGlmICghIXN0YXRzQnV0dG9uKSBzdGF0c0J1dHRvbi5vbmNsaWNrID0gKCkgPT4gdGhpcy5zdGF0c0NsaWNrZWQoKVxuXG4gICAgICAgIGlmICghIXRoaXMuc3RhdHNQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsLnN0YXRzQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHRoaXMuc3RhdHNDbGlja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY29tbWFuZCBidXR0b25zIChpZiB3ZSBoYXZlIHNvbWV3aGVyZSB0byBhZGQgdGhlbSB0bylcbiAgICAgICAgaWYgKCEhdGhpcy5zZXR0aW5nc1BhbmVsKSB7XG4gICAgICAgICAgICAvLyBBZGQgYnV0dG9uIGZvciB0b2dnbGUgZnBzXG4gICAgICAgICAgICBjb25zdCBzaG93RlBTQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKCdTaG93IEZQUycsICdUb2dnbGUnKTtcbiAgICAgICAgICAgIHNob3dGUFNCdXR0b24uYWRkT25DbGlja0xpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZXF1ZXN0U2hvd0ZwcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHJlc3RhcnQgc3RyZWFtXG4gICAgICAgICAgICBjb25zdCByZXN0YXJ0U3RyZWFtQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKFxuICAgICAgICAgICAgICAgICdSZXN0YXJ0IFN0cmVhbScsXG4gICAgICAgICAgICAgICAgJ1Jlc3RhcnQnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdGFydFN0cmVhbUJ1dHRvbi5hZGRPbkNsaWNrTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHJlcXVlc3Qga2V5ZnJhbWVcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RLZXlmcmFtZUJ1dHRvbiA9IG5ldyBMYWJlbGxlZEJ1dHRvbihcbiAgICAgICAgICAgICAgICAnUmVxdWVzdCBrZXlmcmFtZScsXG4gICAgICAgICAgICAgICAgJ1JlcXVlc3QnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVxdWVzdEtleWZyYW1lQnV0dG9uLmFkZE9uQ2xpY2tMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVxdWVzdElmcmFtZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzU2VjdGlvbkVsZW0gPSB0aGlzLmNvbmZpZ1VJLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbC5zZXR0aW5nc0NvbnRlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICdDb21tYW5kcydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHNob3dGUFNCdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgY29tbWFuZHNTZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChyZXF1ZXN0S2V5ZnJhbWVCdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgY29tbWFuZHNTZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChyZXN0YXJ0U3RyZWFtQnV0dG9uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZSB0aGUgc2V0dGluZ3Mgd2l0aCBvbiBjaGFuZ2UgbGlzdGVuZXJzIGFuZCBhbnkgYWRkaXRpb25hbCBwZXIgZXhwZXJpZW5jZSBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBjb25maWd1cmVTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgLy8gVGhpcyBidWlsZHMgYWxsIHRoZSBzZXR0aW5ncyBzZWN0aW9ucyBhbmQgZmxhZ3MgdW5kZXIgdGhpcyBgc2V0dGluZ3NDb250ZW50YCBlbGVtZW50LlxuICAgICAgICB0aGlzLmNvbmZpZ1VJLnBvcHVsYXRlU2V0dGluZ3NFbGVtZW50KFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ29udGVudEVsZW1lbnRcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ1VJLmFkZEN1c3RvbUZsYWdPblNldHRpbmdDaGFuZ2VkTGlzdGVuZXIoXG4gICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAoaXNMaWdodE1vZGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1VJLnNldEN1c3RvbUZsYWdMYWJlbChcbiAgICAgICAgICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBgQ29sb3IgU2NoZW1lOiAke2lzTGlnaHRNb2RlID8gJ0xpZ2h0JyA6ICdEYXJrJ30gTW9kZWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29sb3JNb2RlKGlzTGlnaHRNb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckNhbGxiYWNrcygpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdhZmtXYXJuaW5nQWN0aXZhdGUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBjb3VudERvd24sIGRpc21pc3NBZmsgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Fma092ZXJsYXkoY291bnREb3duLCBkaXNtaXNzQWZrKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdVcGRhdGUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBjb3VudERvd24gfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuYWZrT3ZlcmxheS51cGRhdGVDb3VudGRvd24oY291bnREb3duKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdEZWFjdGl2YXRlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMuYWZrT3ZlcmxheS5oaWRlKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWZrVGltZWRPdXQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5hZmtPdmVybGF5LmhpZGUoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3ZpZGVvRW5jb2RlckF2Z1FQJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgYXZnUVAgfSB9KSA9PiB0aGlzLm9uVmlkZW9FbmNvZGVyQXZnUVAoYXZnUVApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y1NkcCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjU2RwKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQXV0b0Nvbm5lY3QnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0F1dG9Db25uZWN0KClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQ29ubmVjdGluZycsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQ29ubmVjdGluZygpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y0Nvbm5lY3RlZCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQ29ubmVjdGVkKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjRmFpbGVkJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNGYWlsZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3dlYlJ0Y0Rpc2Nvbm5lY3RlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGV2ZW50U3RyaW5nLCBzaG93QWN0aW9uT3JFcnJvck9uRGlzY29ubmVjdCB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3QoZXZlbnRTdHJpbmcsIHNob3dBY3Rpb25PckVycm9yT25EaXNjb25uZWN0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd2aWRlb0luaXRpYWxpemVkJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25WaWRlb0luaXRpYWxpemVkKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignc3RyZWFtTG9hZGluZycsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uU3RyZWFtTG9hZGluZygpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAncGxheVN0cmVhbUVycm9yJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgbWVzc2FnZSB9IH0pID0+IHRoaXMub25QbGF5U3RyZWFtRXJyb3IobWVzc2FnZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigncGxheVN0cmVhbScsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uUGxheVN0cmVhbSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAncGxheVN0cmVhbVJlamVjdGVkJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgcmVhc29uIH0gfSkgPT4gdGhpcy5vblBsYXlTdHJlYW1SZWplY3RlZChyZWFzb24pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnbG9hZEZyZWV6ZUZyYW1lJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgc2hvdWxkU2hvd1BsYXlPdmVybGF5IH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZEZyZWV6ZUZyYW1lKHNob3VsZFNob3dQbGF5T3ZlcmxheSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzdGF0c1JlY2VpdmVkJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgYWdncmVnYXRlZFN0YXRzIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uU3RhdHNSZWNlaXZlZChhZ2dyZWdhdGVkU3RhdHMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnbGF0ZW5jeVRlc3RSZXN1bHQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBsYXRlbmN5VGltaW5ncyB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxhdGVuY3lUZXN0UmVzdWx0cyhsYXRlbmN5VGltaW5ncylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzdHJlYW1lckxpc3RNZXNzYWdlJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgbWVzc2FnZVN0cmVhbWVyTGlzdCwgYXV0b1NlbGVjdGVkU3RyZWFtZXJJZCB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTdHJlYW1lckxpc3RNZXNzYWdlKG1lc3NhZ2VTdHJlYW1lckxpc3QsIGF1dG9TZWxlY3RlZFN0cmVhbWVySWQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc2V0dGluZ3NDaGFuZ2VkJyxcbiAgICAgICAgICAgIChldmVudCkgPT4gdGhpcy5jb25maWdVSS5vblNldHRpbmdzQ2hhbmdlZChldmVudClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByb290RWxlbWVudCBvZiB0aGUgYXBwbGljYXRpb24sIHZpZGVvIHN0cmVhbSBhbmQgYWxsIFVJIGFyZSBjaGlsZHJlbiBvZiB0aGlzIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdwbGF5ZXJVSSc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdub3NlbGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy51aUZlYXR1cmVzRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGVsZW1lbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIFVJIGZlYXR1cmVzLCBsaWtlIHRoZSBzdGF0cyBhbmQgc2V0dGluZ3MgcGFuZWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdWlGZWF0dXJlc0VsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3VpRmVhdHVyZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQuaWQgPSAndWlGZWF0dXJlcyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGRpc2Nvbm5lY3Qgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB1cGRhdGVUZXh0IC0gdGhlIHRleHQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dEaXNjb25uZWN0T3ZlcmxheSh1cGRhdGVUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNjb25uZWN0T3ZlcmxheSh1cGRhdGVUZXh0KTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZGlzY29ubmVjdCBvdmVybGF5cyBzcGFuIHRleHRcbiAgICAgKiBAcGFyYW0gdXBkYXRlVGV4dCAtIHRoZSBuZXcgY291bnRkb3duIG51bWJlclxuICAgICAqL1xuICAgIHVwZGF0ZURpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LnVwZGF0ZSh1cGRhdGVUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIGRpc2Nvbm5lY3Qgb3ZlcmxheXMgYWN0aW9uXG4gICAgICovXG4gICAgb25EaXNjb25uZWN0aW9uQWN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGN1cnJlbnQgb3ZlcmxheVxuICAgICAqL1xuICAgIGhpZGVDdXJyZW50T3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXJsYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBjb25uZWN0IG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93Q29ubmVjdE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5jb25uZWN0T3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgcGxheSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd1BsYXlPdmVybGF5KCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnBsYXlPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMucGxheU92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHRleHQgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB0ZXh0IC0gdGhlIHRleHQgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd1RleHRPdmVybGF5KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5LnVwZGF0ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbmZvT3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmluZm9PdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBlcnJvciBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93RXJyb3JPdmVybGF5KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmVycm9yT3ZlcmxheS51cGRhdGUodGV4dCk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuZXJyb3JPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIG9yIGhpZGVzIHRoZSBzZXR0aW5ncyBwYW5lbCBpZiBjbGlja2VkXG4gICAgICovXG4gICAgc2V0dGluZ3NDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwuaGlkZSgpO1xuICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIG9yIGhpZGVzIHRoZSBzdGF0cyBwYW5lbCBpZiBjbGlja2VkXG4gICAgICovXG4gICAgc3RhdHNDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwuaGlkZSgpO1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29ubmVjdCBvdmVybGF5cyBhY3Rpb25cbiAgICAgKi9cbiAgICBvbkNvbm5lY3RBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIHBsYXkgb3ZlcmxheXMgYWN0aW9uXG4gICAgICovXG4gICAgb25QbGF5QWN0aW9uKCkge1xuICAgICAgICB0aGlzLnBsYXlPdmVybGF5LmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGFmayBvdmVybGF5XG4gICAgICogQHBhcmFtIGNvdW50RG93biAtIHRoZSBjb3VudGRvd24gbnVtYmVyIGZvciB0aGUgYWZrIGNvdW50ZG93blxuICAgICAqL1xuICAgIHNob3dBZmtPdmVybGF5KGNvdW50RG93bjogbnVtYmVyLCBkaXNtaXNzQWZrOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheS51cGRhdGVDb3VudGRvd24oY291bnREb3duKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5Lm9uQWN0aW9uKCgpID0+IGRpc21pc3NBZmsoKSk7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmFma092ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgQ29ubmVjdCBPdmVybGF5IG9yIGF1dG8gY29ubmVjdFxuICAgICAqL1xuICAgIHNob3dDb25uZWN0T3JBdXRvQ29ubmVjdE92ZXJsYXlzKCkge1xuICAgICAgICAvLyBzZXQgdXAgaWYgdGhlIGF1dG8gcGxheSB3aWxsIGJlIHVzZWQgb3IgcmVndWxhciBjbGljayB0byBzdGFydFxuICAgICAgICBpZiAoIXRoaXMuc3RyZWFtLmNvbmZpZy5pc0ZsYWdFbmFibGVkKEZsYWdzLkF1dG9Db25uZWN0KSkge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29ubmVjdE92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIHdlYlJ0Y0F1dG9Db25uZWN0IE92ZXJsYXkgYW5kIGNvbm5lY3RcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0F1dG9Db25uZWN0KCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnQXV0byBDb25uZWN0aW5nIE5vdycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBmdW5jdGlvbmFsaXR5IHRvIGhhcHBlbiB3aGVuIHJlY2VpdmluZyBhIHdlYlJUQyBhbnN3ZXJcbiAgICAgKi9cbiAgICBvbldlYlJ0Y1NkcCgpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ1dlYlJUQyBDb25uZWN0aW9uIE5lZ290aWF0ZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBhIHRleHQgb3ZlcmxheSB0byBhbGVydCB0aGUgdXNlciB0aGUgc3RyZWFtIGlzIGN1cnJlbnRseSBsb2FkaW5nXG4gICAgICovXG4gICAgb25TdHJlYW1Mb2FkaW5nKCkge1xuICAgICAgICAvLyBidWlsZCB0aGUgc3Bpbm5lciBzcGFuXG4gICAgICAgIGNvbnN0IHNwaW5uZXJTcGFuOiBIVE1MU3BhbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwaW5uZXJTcGFuLmNsYXNzTmFtZSA9ICd2aXN1YWxseS1oaWRkZW4nO1xuICAgICAgICBzcGlubmVyU3Bhbi5pbm5lckhUTUwgPSAnTG9hZGluZy4uLic7XG5cbiAgICAgICAgLy8gYnVpbGQgdGhlIHNwaW5uZXIgZGl2XG4gICAgICAgIGNvbnN0IHNwaW5uZXJEaXY6IEhUTUxEaXZFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNwaW5uZXJEaXYuaWQgPSAnbG9hZGluZy1zcGlubmVyJztcbiAgICAgICAgc3Bpbm5lckRpdi5jbGFzc05hbWUgPSAnc3Bpbm5lci1ib3JkZXIgbXMtMic7XG4gICAgICAgIHNwaW5uZXJEaXYuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3N0YXR1cycpO1xuXG4gICAgICAgIC8vIGFwcGVuZCB0aGUgc3Bpbm5lciB0byB0aGUgZWxlbWVudFxuICAgICAgICBzcGlubmVyRGl2LmFwcGVuZENoaWxkKHNwaW5uZXJTcGFuKTtcblxuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnTG9hZGluZyBTdHJlYW0gJyArIHNwaW5uZXJEaXYub3V0ZXJIVE1MKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSB2aWRlbyBpcyBkaXNjb25uZWN0ZWQgLSBkaXNwbGF5cyB0aGUgZXJyb3Igb3ZlcmxheSBhbmQgcmVzZXRzIHRoZSBidXR0b25zIHN0cmVhbSB0b29scyB1cG9uIGRpc2Nvbm5lY3RcbiAgICAgKiBAcGFyYW0gZXZlbnRTdHJpbmcgLSB0aGUgZXZlbnQgdGV4dCB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBvbkRpc2Nvbm5lY3QoZXZlbnRTdHJpbmc6IHN0cmluZywgc2hvd0FjdGlvbk9yRXJyb3JPbkRpc2Nvbm5lY3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHNob3dBY3Rpb25PckVycm9yT25EaXNjb25uZWN0ID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvck92ZXJsYXkoYERpc2Nvbm5lY3RlZDogJHtldmVudFN0cmluZ31gKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KFxuICAgICAgICAgICAgICAgIGBEaXNjb25uZWN0ZWQ6ICR7ZXZlbnRTdHJpbmd9ICA8ZGl2IGNsYXNzPVwiY2xpY2thYmxlU3RhdGVcIj5DbGljayBUbyBSZXN0YXJ0PC9kaXY+YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNhYmxlIHN0YXJ0aW5nIGEgbGF0ZW5jeSBjaGVja1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBpcyBjb25uZWN0aW5nXG4gICAgICovXG4gICAgb25XZWJSdGNDb25uZWN0aW5nKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnU3RhcnRpbmcgY29ubmVjdGlvbiB0byBzZXJ2ZXIsIHBsZWFzZSB3YWl0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB3aGVuIFdlYiBSdGMgaGFzIGNvbm5lY3RlZFxuICAgICAqL1xuICAgIG9uV2ViUnRjQ29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnV2ViUlRDIGNvbm5lY3RlZCwgd2FpdGluZyBmb3IgdmlkZW8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBmYWlscyB0byBjb25uZWN0XG4gICAgICovXG4gICAgb25XZWJSdGNGYWlsZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yT3ZlcmxheSgnVW5hYmxlIHRvIHNldHVwIHZpZGVvJyk7XG4gICAgfVxuXG4gICAgb25Mb2FkRnJlZXplRnJhbWUoc2hvdWxkU2hvd1BsYXlPdmVybGF5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzaG91bGRTaG93UGxheU92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIExvZ2dlci5Mb2coTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSwgJ3Nob3dpbmcgcGxheSBvdmVybGF5Jyk7XG4gICAgICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtKCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgIH1cblxuICAgIG9uUGxheVN0cmVhbUVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNob3dFcnJvck92ZXJsYXkobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtUmVqZWN0ZWQob25SZWplY3RlZFJlYXNvbjogdW5rbm93bikge1xuICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgIH1cblxuICAgIG9uVmlkZW9Jbml0aWFsaXplZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5BdXRvUGxheVZpZGVvKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93UGxheU92ZXJsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0YXJ0aW5nIGEgbGF0ZW5jeSBjaGVja1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWwubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlcXVlc3RMYXRlbmN5VGVzdCgpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBmdW5jdGlvbmFsaXR5IHRvIGhhcHBlbiB3aGVuIGNhbGN1bGF0aW5nIHRoZSBhdmVyYWdlIHZpZGVvIGVuY29kZXIgcXBcbiAgICAgKiBAcGFyYW0gUVAgLSB0aGUgcXVhbGl0eSBudW1iZXIgb2YgdGhlIHN0cmVhbVxuICAgICAqL1xuICAgIG9uVmlkZW9FbmNvZGVyQXZnUVAoUVA6IG51bWJlcikge1xuICAgICAgICAvLyBVcGRhdGUgaW50ZXJuYWwgUVAgaW5kaWNhdG9yIGlmIG9uZSBpcyBwcmVzZW50XG4gICAgICAgIGlmICghIXRoaXMudmlkZW9RcEluZGljYXRvcikge1xuICAgICAgICAgICAgdGhpcy52aWRlb1FwSW5kaWNhdG9yLnVwZGF0ZVFwVG9vbHRpcChRUCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkluaXRpYWxTZXR0aW5ncyhzZXR0aW5nczogSW5pdGlhbFNldHRpbmdzKSB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5QaXhlbFN0cmVhbWluZ1NldHRpbmdzKSB7XG4gICAgICAgICAgICBjb25zdCBkaXNhYmxlTGF0ZW5jeVRlc3QgPVxuICAgICAgICAgICAgICAgIHNldHRpbmdzLlBpeGVsU3RyZWFtaW5nU2V0dGluZ3MuRGlzYWJsZUxhdGVuY3lUZXN0O1xuICAgICAgICAgICAgaWYgKGRpc2FibGVMYXRlbmN5VGVzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbC5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLnRpdGxlID1cbiAgICAgICAgICAgICAgICAgICAgJ0Rpc2FibGVkIGJ5IC1QaXhlbFN0cmVhbWluZ0Rpc2FibGVMYXRlbmN5VGVzdGVyPXRydWUnO1xuICAgICAgICAgICAgICAgIExvZ2dlci5JbmZvKFxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgICAgICAnLVBpeGVsU3RyZWFtaW5nRGlzYWJsZUxhdGVuY3lUZXN0ZXI9dHJ1ZSwgcmVxdWVzdGluZyBsYXRlbmN5IHJlcG9ydCBmcm9tIHRoZSB0aGUgYnJvd3NlciB0byBVRSBpcyBkaXNhYmxlZC4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU3RhdHNSZWNlaXZlZChhZ2dyZWdhdGVkU3RhdHM6IEFnZ3JlZ2F0ZWRTdGF0cykge1xuICAgICAgICAvLyBHcmFiIGFsbCBzdGF0cyB3ZSBjYW4gb2ZmIHRoZSBhZ2dyZWdhdGVkIHN0YXRzXG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC5oYW5kbGVTdGF0cyhhZ2dyZWdhdGVkU3RhdHMpO1xuICAgIH1cblxuICAgIG9uTGF0ZW5jeVRlc3RSZXN1bHRzKGxhdGVuY3lUaW1pbmdzOiBMYXRlbmN5VGVzdFJlc3VsdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLmxhdGVuY3lUZXN0LmhhbmRsZVRlc3RSZXN1bHQobGF0ZW5jeVRpbWluZ3MpO1xuICAgIH1cblxuICAgIGhhbmRsZVN0cmVhbWVyTGlzdE1lc3NhZ2UobWVzc2FnZVN0cmVhbWluZ0xpc3Q6IE1lc3NhZ2VTdHJlYW1lckxpc3QsIGF1dG9TZWxlY3RlZFN0cmVhbWVySWQ6IHN0cmluZyB8IG51bGwpIHtcbiAgICAgICAgaWYgKGF1dG9TZWxlY3RlZFN0cmVhbWVySWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2VTdHJlYW1pbmdMaXN0Lmlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEaXNjb25uZWN0T3ZlcmxheShcbiAgICAgICAgICAgICAgICAgICAgJ05vIHN0cmVhbWVycyBjb25uZWN0ZWQuIDxkaXYgY2xhc3M9XCJjbGlja2FibGVTdGF0ZVwiPkNsaWNrIFRvIFJlc3RhcnQ8L2Rpdj4nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoXG4gICAgICAgICAgICAgICAgICAgICdNdWx0aXBsZSBzdHJlYW1lcnMgZGV0ZWN0ZWQuIFVzZSB0aGUgZHJvcGRvd24gaW4gdGhlIHNldHRpbmdzIG1lbnUgdG8gc2VsZWN0IHRoZSBzdHJlYW1lcidcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGxpZ2h0L2RhcmsgY29sb3IgbW9kZVxuICAgICAqIEBwYXJhbSBpc0xpZ2h0TW9kZSAtIHNob3VsZCB3ZSB1c2UgYSBsaWdodCBvciBkYXJrIGNvbG9yIHNjaGVtZVxuICAgICAqL1xuICAgIHNldENvbG9yTW9kZShpc0xpZ2h0TW9kZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5vbkNvbG9yTW9kZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db2xvck1vZGVDaGFuZ2VkKGlzTGlnaHRNb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7XG4gICAgQ29uZmlnLFxuICAgIEZsYWdzSWRzLFxuICAgIE51bWVyaWNQYXJhbWV0ZXJzSWRzLFxuICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgVGV4dFBhcmFtZXRlcnNJZHMsXG4gICAgVGV4dFBhcmFtZXRlcnMsXG4gICAgT3B0aW9uUGFyYW1ldGVycyxcbiAgICBGbGFncyxcbiAgICBOdW1lcmljUGFyYW1ldGVycyxcbiAgICBTZXR0aW5nc0NoYW5nZWRFdmVudCxcbiAgICBTZXR0aW5nRmxhZyxcbiAgICBTZXR0aW5nTnVtYmVyLFxuICAgIFNldHRpbmdUZXh0LFxuICAgIFNldHRpbmdPcHRpb24sXG4gICAgTG9nZ2VyLFxuICAgIFNldHRpbmdCYXNlXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgU2V0dGluZ1VJRmxhZyB9IGZyb20gJy4vU2V0dGluZ1VJRmxhZyc7XG5pbXBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL1NldHRpbmdVSU51bWJlcic7XG5pbXBvcnQgeyBTZXR0aW5nVUlUZXh0IH0gZnJvbSAnLi9TZXR0aW5nVUlUZXh0JztcbmltcG9ydCB7IFNldHRpbmdVSU9wdGlvbiB9IGZyb20gJy4vU2V0dGluZ1VJT3B0aW9uJztcblxuZXhwb3J0IGNvbnN0IExpZ2h0TW9kZSA9ICdMaWdodE1vZGUnIGFzIGNvbnN0O1xudHlwZSBFeHRyYUZsYWdzID0gdHlwZW9mIExpZ2h0TW9kZTtcbmV4cG9ydCB0eXBlIEZsYWdzSWRzRXh0ZW5kZWQgPSBGbGFnc0lkcyB8IEV4dHJhRmxhZ3M7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdVSSB7XG4gICAgcHJpdmF0ZSBjdXN0b21GbGFncyA9IG5ldyBNYXA8XG4gICAgICAgIEZsYWdzSWRzRXh0ZW5kZWQsXG4gICAgICAgIFNldHRpbmdGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgZmxhZ3MgdGhhdCBjYW4gYmUgdG9nZ2xlZCAtIG9wdGlvbnMgdGhhdCBjYW4gYmUgc2V0IGluIHRoZSBhcHBsaWNhdGlvbiAtIGUuZy4gVXNlIE1pYz8gKi9cbiAgICBwcml2YXRlIGZsYWdzVWkgPSBuZXcgTWFwPFxuICAgICAgICBGbGFnc0lkc0V4dGVuZGVkLFxuICAgICAgICBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgbnVtZXJpY2FsIHNldHRpbmdzIC0gb3B0aW9ucyB0aGF0IGNhbiBiZSBpbiB0aGUgYXBwbGljYXRpb24gLSBlLmcuIE1pbkJpdHJhdGUgKi9cbiAgICBwcml2YXRlIG51bWVyaWNQYXJhbWV0ZXJzVWkgPSBuZXcgTWFwPFxuICAgICAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICAgICAgU2V0dGluZ1VJTnVtYmVyXG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgdGV4dCBzZXR0aW5ncyAtIGUuZy4gc2lnbmFsbGluZyBzZXJ2ZXIgdXJsICovXG4gICAgcHJpdmF0ZSB0ZXh0UGFyYW1ldGVyc1VpID0gbmV3IE1hcDxUZXh0UGFyYW1ldGVyc0lkcywgU2V0dGluZ1VJVGV4dD4oKTtcblxuICAgIC8qIEEgbWFwIG9mIGVudW0gYmFzZWQgc2V0dGluZ3MgLSBlLmcuIHByZWZlcnJlZCBjb2RlYyAqL1xuICAgIHByaXZhdGUgb3B0aW9uUGFyYW1ldGVyc1VpID0gbmV3IE1hcDxcbiAgICAgICAgT3B0aW9uUGFyYW1ldGVyc0lkcyxcbiAgICAgICAgU2V0dGluZ1VJT3B0aW9uXG4gICAgPigpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tIFNldHRpbmdzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZykge1xuICAgICAgICB0aGlzLmNyZWF0ZUN1c3RvbVVJU2V0dGluZ3MoY29uZmlnLnVzZVVybFBhcmFtcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZXR0aW5nc1VJQ29tcG9uZW50cyhjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBjdXN0b20gVUkgc2V0dGluZ3MgdGhhdCBhcmUgbm90IHByb3ZpZGVkIGJ5IHRoZSBQaXhlbCBTdHJlYW1pbmcgbGlicmFyeS5cbiAgICAgKi9cbiAgICBjcmVhdGVDdXN0b21VSVNldHRpbmdzKHVzZVVybFBhcmFtczogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmN1c3RvbUZsYWdzLnNldChcbiAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgIG5ldyBTZXR0aW5nRmxhZzxGbGFnc0lkc0V4dGVuZGVkPihcbiAgICAgICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAgICAgJ0NvbG9yIFNjaGVtZTogRGFyayBNb2RlJyxcbiAgICAgICAgICAgICAgICAnUGFnZSBzdHlsaW5nIHdpbGwgYmUgZWl0aGVyIGxpZ2h0IG9yIGRhcmsnLFxuICAgICAgICAgICAgICAgIGZhbHNlIC8qaWYgd2FudCB0byB1c2Ugc3lzdGVtIHByZWY6ICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSovLFxuICAgICAgICAgICAgICAgIHVzZVVybFBhcmFtcyxcbiAgICAgICAgICAgICAgICAoaXNMaWdodE1vZGU6IGJvb2xlYW4sIHNldHRpbmc6IFNldHRpbmdCYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBgQ29sb3IgU2NoZW1lOiAke2lzTGlnaHRNb2RlID8gJ0xpZ2h0JyA6ICdEYXJrJ30gTW9kZWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgVUkgd3JhcHBlciBjb21wb25lbnRzIGZvciBlYWNoIHNldHRpbmcgZWxlbWVudCBpbiBjb25maWcuXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqL1xuICAgIHJlZ2lzdGVyU2V0dGluZ3NVSUNvbXBvbmVudHMoY29uZmlnOiBDb25maWcpIHtcbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNvbmZpZy5nZXRGbGFncygpKSB7XG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuc2V0KHNldHRpbmcuaWQsIG5ldyBTZXR0aW5nVUlGbGFnKHNldHRpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgQXJyYXkuZnJvbSh0aGlzLmN1c3RvbUZsYWdzLnZhbHVlcygpKSkge1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgIG5ldyBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+KHNldHRpbmcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0VGV4dFNldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5pZCwgbmV3IFNldHRpbmdVSVRleHQoc2V0dGluZykpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0TnVtZXJpY1NldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5zZXQoXG4gICAgICAgICAgICAgICAgc2V0dGluZy5pZCxcbiAgICAgICAgICAgICAgICBuZXcgU2V0dGluZ1VJTnVtYmVyKHNldHRpbmcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0T3B0aW9uU2V0dGluZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuc2V0KFxuICAgICAgICAgICAgICAgIHNldHRpbmcuaWQsXG4gICAgICAgICAgICAgICAgbmV3IFNldHRpbmdVSU9wdGlvbihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgRE9NIGVsZW1lbnRzIGZvciBhIHNldHRpbmdzIHNlY3Rpb24gd2l0aCBhIGhlYWRpbmcuXG4gICAgICogQHBhcmFtIHNldHRpbmdzRWxlbSBUaGUgcGFyZW50IGNvbnRhaW5lciBmb3Igb3VyIERPTSBlbGVtZW50cy5cbiAgICAgKiBAcGFyYW0gc2VjdGlvbkhlYWRpbmcgVGhlIGhlYWRpbmcgZWxlbWVudCB0byBnbyBpbnRvIHRoZSBzZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIFRoZSBjb25zdHJ1Y3RlZCBET00gZWxlbWVudCBmb3IgdGhlIHNlY3Rpb24uXG4gICAgICovXG4gICAgYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoc2V0dGluZ3NFbGVtOiBIVE1MRWxlbWVudCwgc2VjdGlvbkhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICAvLyBtYWtlIHNlY3Rpb24gZWxlbWVudFxuICAgICAgICBjb25zdCBzZWN0aW9uRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgc2VjdGlvbkVsZW0uY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAvLyBtYWtlIHNlY3Rpb24gaGVhZGluZ1xuICAgICAgICBjb25zdCBwc1NldHRpbmdzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgcHNTZXR0aW5nc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy10ZXh0Jyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIudGV4dENvbnRlbnQgPSBzZWN0aW9uSGVhZGluZztcblxuICAgICAgICAvLyBhZGQgc2VjdGlvbiBhbmQgaGVhZGluZyB0byBwYXJlbnQgc2V0dGluZ3MgZWxlbWVudFxuICAgICAgICBzZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChwc1NldHRpbmdzSGVhZGVyKTtcbiAgICAgICAgc2V0dGluZ3NFbGVtLmFwcGVuZENoaWxkKHNlY3Rpb25FbGVtKTtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25FbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIGZsYWdzIHdpdGggdGhlaXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFkZCB0aGVtIHRvIHRoZSBgQ29uZmlnLmZsYWdzYCBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzRWxlbSAtIFRoZSBlbGVtZW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBpbmRpdmlkdWFsIHNldHRpbmdzIHNlY3Rpb25zLCBmbGFncywgYW5kIHNvIG9uLlxuICAgICAqL1xuICAgIHBvcHVsYXRlU2V0dGluZ3NFbGVtZW50KHNldHRpbmdzRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLyogU2V0dXAgYWxsIFBpeGVsIFN0cmVhbWluZyBzcGVjaWZpYyBzZXR0aW5ncyAqL1xuICAgICAgICBjb25zdCBwc1NldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnUGl4ZWwgU3RyZWFtaW5nJ1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIG1ha2Ugc2V0dGluZ3Mgc2hvdyB1cCBpbiBET01cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGV4dChcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy50ZXh0UGFyYW1ldGVyc1VpLmdldChUZXh0UGFyYW1ldGVycy5TaWduYWxsaW5nU2VydmVyVXJsKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdPcHRpb24oXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChPcHRpb25QYXJhbWV0ZXJzLlN0cmVhbWVySWQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQXV0b0Nvbm5lY3QpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQXV0b1BsYXlWaWRlbylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Ccm93c2VyU2VuZE9mZmVyKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sIFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Vc2VNaWMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuU3RhcnRWaWRlb011dGVkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlByZWZlclNGVSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Jc1F1YWxpdHlDb250cm9sbGVyKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkZvcmNlTW9ub0F1ZGlvKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkZvcmNlVFVSTilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5TdXBwcmVzc0Jyb3dzZXJLZXlzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkFGS0RldGVjdGlvbilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5BRktUaW1lb3V0U2VjcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5NYXhSZWNvbm5lY3RBdHRlbXB0cylcbiAgICAgICAgKTtcblxuICAgICAgICAvKiBTZXR1cCBhbGwgdmlldy91aSByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCB2aWV3U2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdVSSdcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHZpZXdTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLk1hdGNoVmlld3BvcnRSZXNvbHV0aW9uKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICB2aWV3U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Ib3ZlcmluZ01vdXNlTW9kZSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKHZpZXdTZXR0aW5nc1NlY3Rpb24sIHRoaXMuZmxhZ3NVaS5nZXQoTGlnaHRNb2RlKSk7XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIGVuY29kZXIgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3QgaW5wdXRTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ0lucHV0J1xuICAgICAgICApO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5LZXlib2FyZElucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuTW91c2VJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlRvdWNoSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5HYW1lcGFkSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5YUkNvbnRyb2xsZXJJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICAvKiBTZXR1cCBhbGwgZW5jb2RlciByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCBlbmNvZGVyU2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdFbmNvZGVyJ1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBlbmNvZGVyU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5NaW5RUClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIGVuY29kZXJTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLk1heFFQKVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHByZWZlcnJlZENvZGVjT3B0aW9uID0gdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuZ2V0KFxuICAgICAgICAgICAgT3B0aW9uUGFyYW1ldGVycy5QcmVmZXJyZWRDb2RlY1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdPcHRpb24oXG4gICAgICAgICAgICBlbmNvZGVyU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuZ2V0KE9wdGlvblBhcmFtZXRlcnMuUHJlZmVycmVkQ29kZWMpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHByZWZlcnJlZENvZGVjT3B0aW9uICYmXG4gICAgICAgICAgICBbLi4ucHJlZmVycmVkQ29kZWNPcHRpb24uc2VsZWN0b3Iub3B0aW9uc11cbiAgICAgICAgICAgICAgICAubWFwKChvKSA9PiBvLnZhbHVlKVxuICAgICAgICAgICAgICAgIC5pbmNsdWRlcygnT25seSBhdmFpbGFibGUgb24gQ2hyb21lJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmVmZXJyZWRDb2RlY09wdGlvbi5kaXNhYmxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBTZXR1cCBhbGwgd2VicnRjIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IHdlYnJ0Y1NldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnV2ViUlRDJ1xuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICB3ZWJydGNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLldlYlJUQ0ZQUylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHdlYnJ0Y1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuV2ViUlRDTWluQml0cmF0ZSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHdlYnJ0Y1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuV2ViUlRDTWF4Qml0cmF0ZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBTZXR0aW5nVGV4dCBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IHRleHQgaW4gdGhlIHRleHQgc2V0dGluZ3MgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1NlY3Rpb24gVGhlIHNldHRpbmdzIHNlY3Rpb24gSFRNTCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBzZXR0aW5nVGV4dCBUaGUgdGV4dHVhbCBzZXR0aW5ncyBvYmplY3QuXG4gICAgICovXG4gICAgYWRkU2V0dGluZ1RleHQoXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmdUZXh0PzogU2V0dGluZ1VJVGV4dFxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAoc2V0dGluZ1RleHQpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nVGV4dC5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLnRleHRQYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmdUZXh0LnNldHRpbmcuaWQsIHNldHRpbmdUZXh0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIFNldHRpbmdGbGFnIGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgZmxhZyBpbiB0aGUgQ29uZmlnLmZsYWcgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1NlY3Rpb24gVGhlIHNldHRpbmdzIHNlY3Rpb24gSFRNTCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBzZXR0aW5nRmxhZyBUaGUgc2V0dGluZ3MgZmxhZyBvYmplY3QuXG4gICAgICovXG4gICAgYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmdGbGFnPzogU2V0dGluZ1VJRmxhZzxGbGFnc0lkc0V4dGVuZGVkPlxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAoc2V0dGluZ0ZsYWcpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nRmxhZy5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuc2V0KHNldHRpbmdGbGFnLnNldHRpbmcuaWQsIHNldHRpbmdGbGFnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIG51bWVyaWMgc2V0dGluZyBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IGZsYWcgaW4gdGhlIENvbmZpZy5udW1lcmljUGFyYW1ldGVycyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdGbGFnIFRoZSBzZXR0aW5ncyBmbGFnIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZz86IFNldHRpbmdVSU51bWJlclxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmcucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLnNldChzZXR0aW5nLnNldHRpbmcuaWQsIHNldHRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGFuIGVudW0gYmFzZWQgc2V0dGluZ3MgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCBmbGFnIGluIHRoZSBDb25maWcuZW51bVBhcmFtZXRlcnMgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1NlY3Rpb24gVGhlIHNldHRpbmdzIHNlY3Rpb24gSFRNTCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBzZXR0aW5nRmxhZyBUaGUgc2V0dGluZ3MgZmxhZyBvYmplY3QuXG4gICAgICovXG4gICAgYWRkU2V0dGluZ09wdGlvbihcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZz86IFNldHRpbmdVSU9wdGlvblxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmcucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmcuc2V0dGluZy5pZCwgc2V0dGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNldHRpbmdzQ2hhbmdlZCh7IGRhdGE6IHsgaWQsIHRhcmdldCwgdHlwZSB9IH06IFNldHRpbmdzQ2hhbmdlZEV2ZW50KSB7XG4gICAgICAgIGlmICh0eXBlID09PSAnZmxhZycpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIEZsYWdzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nRmxhZztcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLmZsYWdzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLmZsYWcgIT09IF90YXJnZXQuZmxhZykge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmZsYWcgPSBfdGFyZ2V0LmZsYWc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLmxhYmVsICE9PSBfdGFyZ2V0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBfdGFyZ2V0LmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgTnVtZXJpY1BhcmFtZXRlcnNJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdOdW1iZXI7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5udW1iZXIgIT09IF90YXJnZXQubnVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubnVtYmVyID0gX3RhcmdldC5udW1iZXI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLmxhYmVsICE9PSBfdGFyZ2V0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBfdGFyZ2V0LmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIFRleHRQYXJhbWV0ZXJzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nVGV4dDtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLnRleHRQYXJhbWV0ZXJzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLnRleHQgIT09IF90YXJnZXQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLnRleHQgPSBfdGFyZ2V0LnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLmxhYmVsICE9PSBfdGFyZ2V0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBfdGFyZ2V0LmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3B0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgT3B0aW9uUGFyYW1ldGVyc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ09wdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdWlPcHRpb25zID0gc2V0dGluZy5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldE9wdGlvbnMgPSBfdGFyZ2V0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB1aU9wdGlvbnMubGVuZ3RoICE9PSB0YXJnZXRPcHRpb25zLmxlbmd0aCB8fFxuICAgICAgICAgICAgICAgICAgICAhdWlPcHRpb25zLmV2ZXJ5KCh2YWx1ZSkgPT4gdGFyZ2V0T3B0aW9ucy5pbmNsdWRlcyh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcub3B0aW9ucyA9IF90YXJnZXQub3B0aW9ucztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcuc2VsZWN0ZWQgIT09IF90YXJnZXQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5zZWxlY3RlZCA9IF90YXJnZXQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLmxhYmVsICE9PSBfdGFyZ2V0LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBfdGFyZ2V0LmxhYmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgZmxhZyBpcyB0b2dnbGVkLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZsYWcuXG4gICAgICogQHBhcmFtIG9uQ2hhbmdlTGlzdGVuZXIgVGhlIGNhbGxiYWNrIHRvIGZpcmUgd2hlbiB0aGUgdmFsdWUgY2hhbmdlcy5cbiAgICAgKi9cbiAgICBhZGRDdXN0b21GbGFnT25TZXR0aW5nQ2hhbmdlZExpc3RlbmVyKFxuICAgICAgICBpZDogRXh0cmFGbGFncyxcbiAgICAgICAgb25DaGFuZ2VMaXN0ZW5lcjogKG5ld0ZsYWdWYWx1ZTogYm9vbGVhbikgPT4gdm9pZFxuICAgICk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21GbGFncy5oYXMoaWQpKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbUZsYWdzLmdldChpZCkub25DaGFuZ2UgPSBvbkNoYW5nZUxpc3RlbmVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCBmb3IgdGhlIGZsYWcuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmxhZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgVGhlIG5ldyBsYWJlbCB0byB1c2UgZm9yIHRoZSBmbGFnLlxuICAgICAqL1xuICAgIHNldEN1c3RvbUZsYWdMYWJlbChpZDogRXh0cmFGbGFncywgbGFiZWw6IHN0cmluZykge1xuICAgICAgICBpZiAoIXRoaXMuY3VzdG9tRmxhZ3MuaGFzKGlkKSkge1xuICAgICAgICAgICAgTG9nZ2VyLldhcm5pbmcoXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICBgQ2Fubm90IHNldCBsYWJlbCBmb3IgZmxhZyBjYWxsZWQgJHtpZH0gLSBpdCBkb2VzIG5vdCBleGlzdCBpbiB0aGUgQ29uZmlnLmZsYWdzIG1hcC5gXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GbGFncy5nZXQoaWQpLmxhYmVsID0gbGFiZWw7XG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KGlkKS5sYWJlbCA9IGxhYmVsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB2YWx1ZSBvZiB0aGUgY29uZmlndXJhdGlvbiBmbGFnIHdoaWNoIGhhcyB0aGUgZ2l2ZW4gaWQuXG4gICAgICogQHBhcmFtIGlkIFRoZSB1bmlxdWUgaWQgZm9yIHRoZSBmbGFnLlxuICAgICAqIEByZXR1cm5zIFRydWUgaWYgdGhlIGZsYWcgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBpc0N1c3RvbUZsYWdFbmFibGVkKGlkOiBFeHRyYUZsYWdzKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUZsYWdzLmdldChpZCkuZmxhZyBhcyBib29sZWFuO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IFNldHRpbmdCYXNlIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYSBzZXR0aW5nIHRoYXQgaGFzIGEgdGV4dCBsYWJlbCwgYW4gYXJiaXRyYXJ5IHNldHRpbmcgdmFsdWUgaXQgc3RvcmVzLCBhbiBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJQmFzZSB7XG4gICAgX3NldHRpbmc6IFNldHRpbmdCYXNlO1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nQmFzZSkge1xuICAgICAgICB0aGlzLl9zZXR0aW5nID0gc2V0dGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdCYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgRmxhZ3NJZHMsXG4gICAgU2V0dGluZ0ZsYWdcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdVSUZsYWc8XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gRmxhZ3NJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICAvKiBXZSB0b2dnbGUgdGhpcyBjaGVja2JveCB0byByZWZsZWN0IHRoZSB2YWx1ZSBvZiBvdXIgc2V0dGluZydzIGJvb2xlYW4gZmxhZy4gKi9cbiAgICBfY2hlY2tib3g6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGlucHV0IHR5cGU9XCJjaGVja2JveFwiXG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgb25DaGFuZ2VFbWl0OiAoY2hhbmdlZFZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ0ZsYWc8Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gc2V0dGluZy5sYWJlbDtcbiAgICAgICAgdGhpcy5mbGFnID0gc2V0dGluZy5mbGFnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ0ZsYWc8Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdGbGFnPEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5fbGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgY2hlY2tib3goKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fY2hlY2tib3gpIHtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2NoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGVja2JveDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gdGhpcy5zZXR0aW5nLmlkO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuY2xhc3NMaXN0LmFkZCgndGdsLXN3aXRjaCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGlucHV0IHR5cGU9Y2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3gudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ3RnbCcpO1xuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5jbGFzc0xpc3QuYWRkKCd0Z2wtZmxhdCcpO1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzbGlkZXIuY2xhc3NMaXN0LmFkZCgndGdsLXNsaWRlcicpO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMuY2hlY2tib3gpO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHNsaWRlcik7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uIGNoYW5nZSBmcm9tIGNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLmZsYWcgIT09IHRoaXMuY2hlY2tib3guY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcuZmxhZyA9IHRoaXMuY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNldHRpbmcncyBzdG9yZWQgdmFsdWUuXG4gICAgICogQHBhcmFtIGluVmFsdWUgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHNldHRpbmcuXG4gICAgICovXG4gICAgcHVibGljIHNldCBmbGFnKGluVmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jaGVja2JveC5jaGVja2VkID0gaW5WYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGZsYWcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoZWNrYm94LmNoZWNrZWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgTnVtZXJpY1BhcmFtZXRlcnNJZHMsXG4gICAgU2V0dGluZ051bWJlclxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbi8qKlxuICogQSBudW1iZXIgc3Bpbm5lciB3aXRoIGEgdGV4dCBsYWJlbCBiZXNpZGUgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlOdW1iZXI8XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gTnVtZXJpY1BhcmFtZXRlcnNJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICBfc3Bpbm5lcjogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nTnVtYmVyPEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgdGhpcy5udW1iZXIgPSB0aGlzLnNldHRpbmcubnVtYmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ051bWJlcjxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ051bWJlcjxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBIVE1MSW5wdXRFbGVtZW50IGZvciB0aGUgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc3Bpbm5lcigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zcGlubmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIudHlwZSA9ICdudW1iZXInO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci5taW4gPSB0aGlzLnNldHRpbmcubWluLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLm1heCA9IHRoaXMuc2V0dGluZy5tYXgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIudmFsdWUgPSB0aGlzLnNldHRpbmcubnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3Bpbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tZ3JvdXAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNwaW5uZXIpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbmNoYW5nZVxuICAgICAgICAgICAgdGhpcy5zcGlubmVyLm9uY2hhbmdlID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0RWxlbSA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBOdW1iZXIucGFyc2VJbnQoaW5wdXRFbGVtLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGBDb3VsZCBub3QgcGFyc2UgdmFsdWUgY2hhbmdlIGludG8gYSB2YWxpZCBudW1iZXIgLSB2YWx1ZSB3YXMgJHtpbnB1dEVsZW0udmFsdWV9LCByZXNldHRpbmcgdmFsdWUgdG8gJHt0aGlzLnNldHRpbmcubWlufWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5udW1iZXIgIT09IHRoaXMuc2V0dGluZy5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5udW1iZXIgPSB0aGlzLnNldHRpbmcubWluO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5udW1iZXIgIT09IHBhcnNlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcubnVtYmVyID0gcGFyc2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG51bWJlciBpbiB0aGUgc3Bpbm5lciAod2lsbCBiZSBjbGFtcGVkIHdpdGhpbiByYW5nZSkuXG4gICAgICovXG4gICAgcHVibGljIHNldCBudW1iZXIobmV3TnVtYmVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zcGlubmVyLnZhbHVlID0gdGhpcy5zZXR0aW5nLmNsYW1wKG5ld051bWJlcikudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG51bWJlcigpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLnNwaW5uZXIudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgT3B0aW9uUGFyYW1ldGVyc0lkcyxcbiAgICBTZXR0aW5nT3B0aW9uXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlPcHRpb248XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gT3B0aW9uUGFyYW1ldGVyc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIC8qIEEgc2VsZWN0IGVsZW1lbnQgdGhhdCByZWZsZWN0cyB0aGUgdmFsdWUgb2YgdGhpcyBzZXR0aW5nLiAqL1xuICAgIF9zZWxlY3RvcjogSFRNTFNlbGVjdEVsZW1lbnQ7IC8vIDxzZWxlY3Q+PC9zZWxlY3Q+XG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuc2V0dGluZy5vcHRpb25zO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5nLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0b3IoKTogSFRNTFNlbGVjdEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnZm9ybS1jb250cm9sJyk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy1vcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gdGhpcy5zZXR0aW5nLmlkO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybS1ncm91cCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy5zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uIGNoYW5nZSBmcm9tIHNlbGVjdG9yXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcuc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0b3IudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnNlbGVjdGVkID0gdGhpcy5zZWxlY3Rvci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3B0aW9ucyh2YWx1ZXM6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VsZWN0b3Iub3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci5yZW1vdmUoaSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIG9wdC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuc2VsZWN0b3Iub3B0aW9uc10ubWFwKChvKSA9PiBvLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQSB1c2VyIG1heSBub3Qgc3BlY2lmeSB0aGUgZnVsbCBwb3NzaWJsZSB2YWx1ZSBzbyB3ZSBpbnN0ZWFkIHVzZSB0aGUgY2xvc2VzdCBtYXRjaC5cbiAgICAgICAgLy8gZWcgP3h4eD1IMjY0IHdvdWxkIHNlbGVjdCAnSDI2NCBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xO3BhY2tldGl6YXRpb24tbW9kZT0xO3Byb2ZpbGUtbGV2ZWwtaWQ9NDIwMDFmJ1xuICAgICAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAgICAgKG9wdGlvbjogc3RyaW5nKSA9PiBvcHRpb24uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmaWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLnZhbHVlID0gZmlsdGVyZWRMaXN0WzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3IudmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgU2V0dGluZ1RleHQsXG4gICAgVGV4dFBhcmFtZXRlcnNJZHNcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdVSVRleHQ8XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gVGV4dFBhcmFtZXRlcnNJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICAvKiBBIHRleHQgYm94IHRoYXQgcmVmbGVjdHMgdGhlIHZhbHVlIG9mIHRoaXMgc2V0dGluZy4gKi9cbiAgICBfdGV4dGJveDogSFRNTElucHV0RWxlbWVudDsgLy8gaW5wdXQgdHlwZT1cInRleHRcIlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdUZXh0PEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5zZXR0aW5nLnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nVGV4dDxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ1RleHQ8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRleHRib3goKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdGV4dGJveCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Ym94LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveC50eXBlID0gJ3RleHRib3gnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0Ym94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSB0aGlzLnNldHRpbmcuaWQ7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBpbnB1dCB0eXBlPWNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLnRleHRib3gudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy50ZXh0Ym94KTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb24gY2hhbmdlIGZyb20gY2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMudGV4dGJveC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLnRleHQgIT09IHRoaXMudGV4dGJveC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudGV4dCA9IHRoaXMudGV4dGJveC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNldHRpbmcncyBzdG9yZWQgdmFsdWUuXG4gICAgICogQHBhcmFtIGluVmFsdWUgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHNldHRpbmcuXG4gICAgICovXG4gICAgcHVibGljIHNldCB0ZXh0KGluVmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRleHRib3gudmFsdWUgPSBpblZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dGJveC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIFNob3cgYW4gb3ZlcmxheSBmb3Igd2hlbiB0aGUgc2Vzc2lvbiBpcyB1bmF0dGVuZGVkLCBpdCBiZWdpbnMgYSBjb3VudGRvd24gdGltZXIsIHdoaWNoIHdoZW4gZWxhcHNlZCB3aWxsIGRpc2Nvbm5lY3QgdGhlIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFGS092ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBhZmtPdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZmtPdmVybGF5SHRtbC5pZCA9ICdhZmtPdmVybGF5JztcbiAgICAgICAgYWZrT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGFma092ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gc29tZSB0ZXh0IGZvciBhbiBhZmsgY291bnQgZG93bi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgYWZrT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZmtPdmVybGF5SHRtbElubmVyLmlkID0gJ2Fma092ZXJsYXlJbm5lcic7XG4gICAgICAgIGFma092ZXJsYXlIdG1sSW5uZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8Y2VudGVyPk5vIGFjdGl2aXR5IGRldGVjdGVkPGJyPkRpc2Nvbm5lY3RpbmcgaW4gPHNwYW4gaWQ9XCJhZmtDb3VudERvd25OdW1iZXJcIj48L3NwYW4+IHNlY29uZHM8YnI+Q2xpY2sgdG8gY29udGludWU8YnI+PC9jZW50ZXI+JztcbiAgICAgICAgcmV0dXJuIGFma092ZXJsYXlIdG1sSW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGFuIEFmayBvdmVybGF5XG4gICAgICogQHBhcmFtIHBhcmVudEVsZW1lbnQgdGhlIGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb290RGl2OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvb3REaXYsXG4gICAgICAgICAgICBBRktPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBBRktPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGNvdW50IGRvd24gc3BhbnMgbnVtYmVyIGZvciB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBjb3VudGRvd24gdGhlIGNvdW50IGRvd24gbnVtYmVyIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHNwYW4gZm9yIHVwZGF0aW5nXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUNvdW50ZG93bihjb3VudGRvd246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IGA8Y2VudGVyPk5vIGFjdGl2aXR5IGRldGVjdGVkPGJyPkRpc2Nvbm5lY3RpbmcgaW4gPHNwYW4gaWQ9XCJhZmtDb3VudERvd25OdW1iZXJcIj4ke2NvdW50ZG93bn08L3NwYW4+IHNlY29uZHM8YnI+Q2xpY2sgdG8gY29udGludWU8YnI+PC9jZW50ZXI+YDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcblxuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuL0Jhc2VPdmVybGF5JztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIGJhc2UgYWN0aW9uIG92ZXJsYXkgc3RydWN0dXJlXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3Rpb25PdmVybGF5IGV4dGVuZHMgT3ZlcmxheUJhc2Uge1xuICAgIG9uQWN0aW9uQ2FsbGJhY2s6ICguLi5hcmdzOiBbXSkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBhY3Rpb24gb3ZlcmxheVxuICAgICAqIEBwYXJhbSByb290RGl2IHRoZSByb290IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqIEBwYXJhbSByb290RWxlbWVudCB0aGUgcm9vdCBlbGVtZW50IHRoYXQgaXMgdGhlIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY29udGVudEVsZW1lbnQgYW4gZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRleHQgZm9yIHRoZSBhY3Rpb24gb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm9vdERpdjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvb3REaXYsIHJvb3RFbGVtZW50LCBjb250ZW50RWxlbWVudCk7XG4gICAgICAgIHRoaXMub25BY3Rpb25DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8qIGRvIG5vdGhpbmcgKi8gTG9nZ2VyLkluZm8oXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAnRGlkIHlvdSBmb3JnZXQgdG8gc2V0IHRoZSBvbkFjdGlvbiBjYWxsYmFjayBpbiB5b3VyIG92ZXJsYXk/J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHRleHQgb3ZlcmxheXMgaW5uZXIgdGV4dFxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSB1cGRhdGUgdGV4dCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZSh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRleHQgIT0gbnVsbCB8fCB0ZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgbWV0aG9kIGFzIGFuIGV2ZW50IGVtaXR0ZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sgdGhlIG1ldGhvZCB0aGF0IGlzIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkXG4gICAgICovXG4gICAgb25BY3Rpb24oY2FsbEJhY2s6ICguLi5hcmdzOiBbXSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2sgPSBjYWxsQmFjaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSBhbiBldmVudCB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBldmVudCBlbWl0dGVyXG4gICAgICovXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMub25BY3Rpb25DYWxsYmFjaygpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSBiYXNlIG92ZXJsYXkgc3RydWN0dXJlXG4gKi9cbmV4cG9ydCBjbGFzcyBPdmVybGF5QmFzZSB7XG4gICAgcHJvdGVjdGVkIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcm9vdERpdjogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBvdmVybGF5XG4gICAgICogQHBhcmFtIHJvb3REaXYgdGhlIHJvb3QgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogQHBhcmFtIHJvb3RFbGVtZW50IHRoZSByb290IGVsZW1lbnQgdGhhdCBpcyB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm9vdERpdjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm9vdERpdiA9IHJvb3REaXY7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSByb290RWxlbWVudDtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudCA9IHRleHRFbGVtZW50O1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5yb290RGl2LmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5TdGF0ZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW5TdGF0ZScpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gZHVyaW5nIGNvbm5lY3Rpb24sIGhhcyBhIGJ1dHRvbiB0aGF0IGNhbiBiZSBjbGlja2VkIHRvIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3RPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgY29ubmVjdEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29ubmVjdEVsZW0uaWQgPSAnY29ubmVjdE92ZXJsYXknO1xuICAgICAgICBjb25uZWN0RWxlbS5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gY29ubmVjdEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBjb25uZWN0Q29udGVudEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29ubmVjdENvbnRlbnRFbGVtLmlkID0gJ2Nvbm5lY3RCdXR0b24nO1xuICAgICAgICBjb25uZWN0Q29udGVudEVsZW0uaW5uZXJIVE1MID0gJ0NsaWNrIHRvIHN0YXJ0JztcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RDb250ZW50RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBDb25uZWN0T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgQ29ubmVjdE92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gZHVyaW5nIGRpc2Nvbm5lY3Rpb24sIGhhcyBhIHJlY29ubmVjdGlvbiBlbGVtZW50IHRoYXQgY2FuIGJlIGNsaWNrZWQgdG8gcmVjb25uZWN0LlxuICovXG5leHBvcnQgY2xhc3MgRGlzY29ubmVjdE92ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBkaXNjb25uZWN0T3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sLmlkID0gJ2Rpc2Nvbm5lY3RPdmVybGF5JztcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBkaXNjb25uZWN0T3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyBidWlsZCB0aGUgaW5uZXIgaHRtbCBjb250YWluZXJcbiAgICAgICAgY29uc3QgZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lci5pZCA9ICdkaXNjb25uZWN0QnV0dG9uJztcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyLmlubmVySFRNTCA9ICdDbGljayBUbyBSZXN0YXJ0JztcblxuICAgICAgICByZXR1cm4gZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGRpc2Nvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgcmV0cnkgY29ubmVjdGlvbiBpY29uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBEaXNjb25uZWN0T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgRGlzY29ubmVjdE92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IFRleHRPdmVybGF5IH0gZnJvbSAnLi9UZXh0T3ZlcmxheSc7XG5cbi8qKlxuICogR2VuZXJpYyBvdmVybGF5IHVzZWQgdG8gc2hvdyB0ZXh0dWFsIGVycm9yIGluZm8gdG8gdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBFcnJvck92ZXJsYXkgZXh0ZW5kcyBUZXh0T3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZXJyb3JPdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sLmlkID0gJ2Vycm9yT3ZlcmxheSc7XG4gICAgICAgIGVycm9yT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ3RleHREaXNwbGF5U3RhdGUnO1xuICAgICAgICByZXR1cm4gZXJyb3JPdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVycm9yT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sSW5uZXIuaWQgPSAnZXJyb3JPdmVybGF5SW5uZXInO1xuICAgICAgICByZXR1cm4gZXJyb3JPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIEVycm9yT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgRXJyb3JPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBUZXh0T3ZlcmxheSB9IGZyb20gJy4vVGV4dE92ZXJsYXknO1xuXG4vKipcbiAqIEdlbmVyaWMgb3ZlcmxheSB1c2VkIHRvIHNob3cgdGV4dHVhbCBpbmZvIHRvIHRoZSB1c2VyLlxuICovXG5leHBvcnQgY2xhc3MgSW5mb092ZXJsYXkgZXh0ZW5kcyBUZXh0T3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgaW5mb092ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZm9PdmVybGF5SHRtbC5pZCA9ICdpbmZvT3ZlcmxheSc7XG4gICAgICAgIGluZm9PdmVybGF5SHRtbC5jbGFzc05hbWUgPSAndGV4dERpc3BsYXlTdGF0ZSc7XG4gICAgICAgIHJldHVybiBpbmZvT3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBpbmZvT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWxJbm5lci5pZCA9ICdtZXNzYWdlT3ZlcmxheUlubmVyJztcbiAgICAgICAgcmV0dXJuIGluZm9PdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIEluZm9PdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBJbmZvT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vQWN0aW9uT3ZlcmxheSc7XG5cbi8qKlxuICogT3ZlcmxheSBzaG93biB3aGVuIHN0cmVhbSBpcyByZWFkeSB0byBwbGF5LlxuICovXG5leHBvcnQgY2xhc3MgUGxheU92ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBwbGF5RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwbGF5RWxlbS5pZCA9ICdwbGF5T3ZlcmxheSc7XG4gICAgICAgIHBsYXlFbGVtLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBwbGF5RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIHRvZG86IGNoYW5nZSB0aGlzIHRvIGFuIHN2Z1xuICAgICAgICBjb25zdCBwbGF5T3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBwbGF5T3ZlcmxheUh0bWxJbm5lci5pZCA9ICdwbGF5QnV0dG9uJztcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuc3JjID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVBFQUFBRDVDQVlBQUFEMm1OTmtBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFBSmNFaFpjd0FBRHNNQUFBN0RBY2R2cUdRQUFBQVpkRVZZZEZOdlpuUjNZWEpsQUhCaGFXNTBMbTVsZENBMExqQXVNakh4SUdtVkFBQVNna2xFUVZSNFh1MmRDN0JkVlgySHFVQ0NJUkFTQ1BqQUZJUVJFQlJCQlNSWWJGT3Q4bElyRlVXUkZxWFdzVDV3Ykl0VXFGV3MwS3FJTVBLb1lFV3BSUzA2S0RqUzFCZVZGa1ZRYkN3K3dDZmlBd0doQ0tXUDlQdVp0VTI0dVRlNTl6ejIyWS92bS9uR2tYdHo3amxycjkrc2RmWmVhLzAzV2IxNjlRdHhHVzYyaVlpMEQ4TDdOYndZajhFZGNkUHlJeEZwQTRUMlAvRi84VWE4Q0kvR2hQblh5cStJU0pNaHJBbHh4WDloUnVZTDhTaDhTUGsxRVdrcUJIWGRFRmZjZzZ2dzNmaHMzS2I4dW9nMERRSTZYWWdyOHJPdllzSjhPTTR2LzB4RW1rSUo2b2I0UDh6SWZBTmVnQ3ZRTUlzMEJRSzVzUkJYSk15L3dJek01K0J5WEZCZVJrUW1CVUdjYllqWDVTNU1tTS9BQTNDTDhuSWlVamNFY0pBUVY5eUJYOGEvd1NlaXo1aEY2b2JnRFJQaWtHZk1DZk9YOERUY3U3eTBpTlFCb1JzMnhCWC9nM2Rpd3Z3bTNLbjhDUkVaSjRSdFZDR3VxTUtjdTlrbjR4SjA5WmZJdUNCZ293NXh5SjNzVExOekF5d3J3RjZKMjZOaEZoazFCR3NjSVY2WGhQbHV2QTZQeHgzS254YVJVVUNveGgzaWlvUTV6NW4vQlkvRkplVXRpTWd3RUthNlFseVJNTitIbjhIbjRaYmxyWWpJSUJDaXVrTWM4cDI1V3M2Wk1EK3p2QjBSbVNzRWFCSWhua3JldzVWNEVIckNpTWhjS0FGcUN2K05sK0ordUJDOW15MnlNUWhLazBKY2tlL003OEdzeTA2WUgxVGVyb2hNaFlBME1jUVZQOE56OFVEY0NsMmJMVElWZ3RIa0VGZDhEOC9FL1hGcmRHUVdxU0FRYlFoeHlLT3BtL0IwM0FjOU1rZ2tFSWEyaExnaU43OFM1bFB4MGJnSXZRRW0vWVVBdEMzRUZRbnp6ZmdudURjNnpaWitRc2R2YTRqWDVTdjRhdHdYSFptbFg5RGh1eERpa0MyUW44ZFhZVWJtUmVVamluUWJPbnRYUWx5UlRSYWZ3bGRnd3J4VithZ2kzWVJPM3JVUVYvd2NWK0xMOERIb3laelNUZWpjWFExeFJjNy91aHl6bDNrdjNMeDhkSkZ1UUtmdWVvaERuakZuWlA0by9qN20wWlFINEVzM29EUDNJY1FWMmY2WU1GK0NPWmpnVWVpWjJkSnU2TVI5Q3ZHNjNJTHZ4NHpNQ2ZPODBpUWk3WUxPMjljUVYzd2IzNHNwc3I0cnVtQkUyZ1dkdHU4aERsbjk5UzFNWGVZWDRNNmxlVVNhRHgzV0VLOGxSZFlUNWxSL3pQbGZuc3dwelllT2FvalhKNGNTZkIzUHcrZmd0dWcwVzVvSm5kTVFUMC91WkdlYVhaVnlmVFp1VjVwTnBEblFNUTN4eHNrME85VWZ6OFpEY2R2U2ZDS1RodzVwaUdkUDJpb0Y0OTZKVDBjM1djamtLUjFUNWtZV2pDVE03OERmUWhlTXlPU2dBeHJpd2NoMzVsUi92QWJQd09Yb3pTK3BIenFlSVI2T2FsMTJ3dngyZkJ5NnlVTHFndzVuaUVkRHdweVIrVnBNa2ZYc21ISXBwNHdmT3BvaEhqMjM0UmZ3Rk53RG5XYkwrS0NER2VMeGtKSDVwM2cxdmc1M0swMHVNbHJvWElaNHZHVEJTTUo4RmVaa3ptV2w2VVZHQTUzS0VOZkQvWml5TkNteW52Ty9GcGRMSURJY2RDWkRYQzhabWZPZCtkL3dKZWpaWHpJY2RDSkRYRDk1eHB3amRuUCtWNzR6SDRXdS9wTEJvUE1ZNHNtU01OK0ZLYkorQkJwbW1SdDBHa1BjREJMbXUvRmplQWk2bEZObUI1M0ZFRGVIVExQemFDb2o4MGR3QmZxTVdUWU1uY1FRTjVlc0FQc3c3bGN1bDhqNjBFRU1jZlBKRGJEM1lVN2wzS3hjT3BFMTBDa01jVHZJVkR2Zm1jL0UzWEVMdFBxakdPS1draFZncCtHZW1ERDd2Ym5QMEFFTWNYdEprZlUzNEdOeEFUb3k5eEV1dkNGdVA2dndKTXlPcVlYbDBrcGY0S0liNG01UW5jeVpUUmFwWkdHWSt3SVgyeEIzaTN2eE9zd21pMTNRYVhiWDRRSWI0bTZTWTNhL2lNZGg3bVliNXE3Q2hUWEUzYVhhYUxFU3E3ck1XNVpMTDEyQmkycUkrOEU5ZURrbXpMdWhZZTRLWEV4RDNCOHlNdCtPbCtLTDBDTHJYWUNMYUlqN1I4SjhLMTZDUjZQTE9kc01GODhROTVmc21Qb1JYb3pQeGR6TmR2VlgyK0NpR1dMSnphK0VPWFdaajhTZDBBUHcyd0lYeXhCTHFQWXkzNExuWThLOERBMXowK0VpR1dLWlNnSjlJNzRMVTJSOVIzU2EzVlM0T0laWVpxSmF5bmtXcHNqNncwdTNrU2JCaFRIRXNqSHV3eHN3cFZ3UHc2V2wrMGdUNElJWVlwa05tV0tucjF5UHFmNTRLRzVWdXBGTWtuSmhSR1pMd3B6Vlg2bisrRFo4R3JwamFwSndBUXl4REVMQ25CMVRxV1R4MS9nVWRHU2VCRFM4SVpaQlNaQmp6djc2UFA0VkhvU0d1VTVvY0VNc295QmhUc0c0Vkg5OEl4NkE4MHMzazNGQ1F4dGlHU1ZaTVBJVC9Dd216UHVoejVqSENRMXNpR1VjWkNsbnd2eHBQQVgzTEYxT1JnMk5hNGhsWEdTS25RVWpDZk5uOFBYNENOeTBkRDhaQlRTb0laWnhrekJYSS9QbjhBVE11bXpEUEFwb1NFTXNkWkV3NXp2ekR6SFQ3SmRqd3V6Wlg4TkFBeHBpbVFTWlppZk1uOFRqOGFHbFM4cGNvZkVNc1V5S2pNdzVsVE9uakh3Y2MyVFFrdEkxWmJiUWFJWllKazNDbkUwV0dabXZ3T2VoKzVobkM0MWxpS1VwVkNOend2d0pQQnk5K2JVeGFDUkRMRTBqWWI0ZlUvMHgwK3lEOGNHbHk4cFVhQnhETEUwa1FhN0NmQ2ZtTUw4RDBTTjJwMEtqR0dKcE9nbHp0V2draC9rOUNUMWl0NExHTU1UU0ZoTG1MQnJKM2V4emNKL1NqZnNORFdHSXBZMGswRC9BTS9HUnBUdjNFeHJBRUV1YnFWYUFuWTVMc1g5M3MvblFobGk2UUxVRjhuV1lJM2JuWVQrV2MvSkJEYkYwaGVxTzlqZndsZmhJbkkvZERqTWYwQkJMRjBtWXI4TnNza2lOcVMyd20ySG1neGxpNlRKNXpwd2pnLzRRZDhidUxScmhReGxpNlFNNVpqZEhCaDJIK2M3Y25VVWpmQmhETEgwaFUreTdjQ1UrSDdPWGVWNkpRbnZoUXhoaTZSc0pjMGJteS9CWitNc2JZQ1VTN1lNM2I0aWxyeVRNMlFMNVFVekJ1SHhuYnQ4MG16ZHRpRVZXcjc0Tkw4S1VjazJSOWZhTXpMeFpReXl5aG96TVdjcDVJZjR1SnN6TlA1eUFOMm1JUlI1SVZuL2RqT2ZoRWRqc3cveDRjNFpZWkhyeWpQa21QQnNQd1llVjJEUUwzcGdoRnBtWlRMRnpaRkRDbkxyTXo4RHRzVGtiTFhnemhsaGs0eVRNMmN1OENyTmpLaU56d2p6NU9sTzhDVU1zTWpjUzVxekxmZ3VteVByMkpVNlRnVGRnaUVVR295cXlucnJNdjQyVE9UT2JQMnlJUlFZbjArd3M1YndhVThyMU4zSHJFcTk2NEE4YVlwSGhTWmp2d0JTTVM1Z1B3bnJXWmZPSERMSEk2TWd6NWh5eG00SnhmNGtINEhqRHpCOHd4Q0tqSjJIT05QdWY4Yzl4SHh6UFhtWmUyQkNMaklkTXNXTXFXZndUbm9pUHdkR096THlnSVJZWlB3bHpWV1BxdGJnWGptYkJDQzlraUVYcUk4K1lzOG5pY253TjdsYWlPRGk4aUNFV3FaZU15bG1YblRDbllGeE81dHl4UkhMdThJOE5zY2hrU0ppekx2djdtSkg1cGJnWTU3WmppbjlnaUVVbVN6VXlmdzlUWlAxWTNMWkVkT1B3eTRaWXBCa2t6S24rK0IzOEtCNkYyNVdvemd5L1pJaEZta1hDbkxPL3Zvc2Z3cHd5c3FoRWRuMzRvU0VXYVNZSjh5OHcwK3dQNEdHNC9vSVIvcU1oRm1rMlZaZ3p6VTZZczJOcTdUNW0vbzhoRm1rSENYTzJQeWJNRitPKytDQkRMTkl1RXVTc3k4NTM1bHZ4WkVNczBqNnFXc3paSmJYVUVJdTBpMXZ3clpocUZadjVuVmlrUFdUcWZBNW1GOVFERCtmalB4aGlrZWFSNzc3eGRyd0FuMUFpdXo3ODBCQ0xOSXZzZE1xQkFxa050UnczWEJlS1h6REVJcE1ubzI3Q2V6ZGVpay9HQlNXbUc0WmZOTVFpa3lQaHpYcnBWR1hNNlI4cmNHN2xWZmtIaGxpa2ZoTGU3RnpLbzZLVitIdTQ1bTd6WE9FZkdtS1Jlc2tlNG9UM2szZ01ibG5pT0JpOGdDRVdxWWVNdkQvR0svRjQzS0hFY0RoNElVTXNNbDV5dytwSG1MT29YNGFESDhVekhieWdJUllaRC9uZW01SDNLandCZDhMUlYxSGtSUTJ4eUdqSjNlYWNOWjFpYXlmaHIrUDQ2aG56NG9aWVpEUmsycHp3cGg3VFgrQ3VPUDc2eGZ3UlF5d3lITmxWVklYM1ZIeDhpVmM5OEFjTnNjamdaSkZHeXBxK0dmZkh3WjcxRGdOLzFCQ0x6SjJmNDcvaVd6QmxUSWQ3MWpzTS9IRkRMREk3Y3JmNUhyd0czNFlIWTcwRnhhZUROMkdJUlRaTXdwdmpjSzdGZCtCVGNmTGhyZUROR0dLUm1jbkllejIrRXcvRmhUaTNNaXZqaGpka2lFWFdKMGZFZmhYUHdtZmk0aEtaNXNHYk04UWlhOG42NWxYNExremxoWWVWcURRWDNxUWhGbG56clBjLzhGek10c0JsMkt4cDgwendSZzJ4OUowY3huNGVwb0JabGtqVy82eDNHSGpEaGxqNlNKWkk1Z1RKOStEek1lSGR2TVNpWGZER0RiSDBpV3BiWU1xZ0pMeTdZTHRHM3Fud0FReXg5SVZzQzd3RVg0Qzc0L2gyRnRVSkg4UVFTOWZKVVRnNVFmSTQzQVBubGU3ZkRmaEFobGk2U281Ly9SaStHQlBleWExdkhpZDhNRU1zWFNNSDBYMENYNEo3NGNMUzNic0pIOUFRUzFmSVRhdnM2ZjFWZUxFZHozcUhnUTlwaUtYdFpITkMxamZuRUxwZlRwdXgrK0d0NE1NYVlta3JtVFovR1YrTENXKzNwODB6d1FjM3hOSTJza1R5QnN3aGRIdGljN1lGVGdJYXdCQkxtN2dSVDhISDRkYlluMm56VE5BSWhsamFRQ3JrdndrVDN0eXdHdjhwa20yQnhqREUwbFJ5b2tiT3Nqb0RVeUUvTjZ3TTcxUm9GRU1zVFNQaHZSUGZqWS9HQmVpMGVTWm9IRU1zVGVKMi9BRHVnKzNjVlZRM05KUWhsaWFRa2ZjZjhTbm9xRHNYYURCRExKTWlqNHJ1eGN2d2FlaklPd2cwbkNHV3Vzbnl5SVQzQ2p3TSs3bElZMVRRZ0laWTZpQTNxekx5Wm1kUlNuMGVpYzA5UWJKTjBKQ0dXTVpKd3B1Ujl3NzhFcjRRdTdrbGNGTFFvSVpZeGtYcTlPWnVjMm9XWlhOQ3Y1ZEhqZ3NhMWhETHFLbkNtMnFCMlp6dzBOTGRaQnpRd0laWVJrV216VC9EaFBkRTNLVjBNeGtuTkxRaGxtSEo5OTZFTndYSHNqa2hxNnhjSGxrWE5MWWhsa0ZKZUhQREtodnlzemtoNFczMzhhOXRoRVkzeERKWDhxZ29HeE1TM3RUcGZTek9MMTFLNm9iR044UXlXeExlTEkvTXREbWxQdmRIcDgyVGhvdGdpR1UyWk9TdHdyc0NYU0xaRkxnWWhsZzJ4RjJZYzZ6T3hxZWpDeldhQmhmRkVNdDBwTWoyVnpCMWVnL0JKYVhMU05QZzRoaGlxY2pkNWl6VVNJWDhsUHA4Rmk0dFhVV2FDaGZKRUV0SWhmd1UyYjRRVTJSN08zUmZieHZnUWhuaWZwT0QxNytKQ1c5S2ZTNUY3emkzQ1M2WUllNG5PWGo5Vy9oM2VBdyt2SFFKYVJ0Y1BFUGNML0tzOTJhOENJL0ZYZEZwYzV2aEFocmkvdkI5L0h2OEEzd1V1a1N5QzNBaERYSDMrU24rQXg2UHFaRHZFc2t1d1FVMXhOMmtPZ29uSjBpbTFHYzJKMnhSTHJ0MENTNnNJZTRXMWM2aWoyTkczbFJPbUZjdXQzUVJMckFoN2c0Sjc1WDRSN2czR3Q0K3dJVTJ4TzBuMCtaUDRhc3dCY2RjMzl3bnVPQ0d1TDNrV2UvbjhEVzRMeTRxbDFYNkJCZmVFTGVUTCtBSitBVGNCbjNXMjFlNCtJYTRQZVNPODlmd1QvR0p1QWhkSXRsMzZBU0d1UGxrWjlHMzhmV1lvM0F5OGhwZVdRT2R3UkEzbHh3QmV4TytHVlBxMDdJbnNqNTBERVBjVExLKytlMlljNndXbzk5NVpYcm9ISWE0V2R5S09RcG5PV2JhdkdtNVZDTFRReWN4eE0wZ3AwaWVqMC9HM0xBeXZESTc2Q3lHZUhKVXgrRzhIdzlFd3l0emgwNWppQ2RERHFLN0hBL0FoZWgzWGhrTU9vOGhycGUwOTZmeGQ5RDl2REk4cFZQSitMa1hQNHZQUWFmTU1qcm9VSVo0Zk9RN2I5WTNYNFU1eDhvaTJ6SjY2RmlHZVBSa2VXUk9rZndpSG9lZTNTempndzVtaUVkRFJ0MTREK2J3OVpmakRxV1pSY1lISGMwUUQwOTFGRTZPZ1AwejlPQjFxUTg2bXlFZW5LeHRUbmd6OHI0QkhYbWxmdWg0aG5qdUpMd3A5WmxxZ2FmaDdxVTVSZXFIRG1pSVowK216VmtlZVFPK0ZSOWZtbEZrY3RBUkRmSHNTSjNlZjhkcVo1R0gwRWt6b0RNYTRwbkozZWEwVDA3VE9BZXp2bmxCYVRxUlpsQTZxVHlRaERkcm0xZmhCWGd3R2w1cEpuUk9RN3lXNmpsdnd2dGVmQVp1WHBwS3BKbVVUaXRycDgwcDlabjF6UTh1VFNUU2JPaXNmUTl4cHMycGtKL3dQaGUzSzAwajBnN290SDBOOGYzNGRYd2ZIbzBXMlpaMlF1ZnRZNGl6UERLbmFid0lINEVlL3lydGhRN2NseEJubGRVUDhCSjhNU2E4N3V1VjlrTkg3bnFJYzRaVnd2c2hmQ2t1UThNcjNZRU8zZFVRWjRua0QvSERtRktmZTVTUExOSXQ2TnhkREhIQyt4RjhCYWJzaVNPdmRCYzZlSmRDZkJ0ZWhnbHZpbXo3ckZlNkR4MjlDeUhPUW8wcjhOV1lPcjBXMlpiK1FJZHZhNGl6UkRMUGVsZGk2dlNtMU9mQzhyRkUrZ01kdjQwaHpudStHbE1oZnovY0VqME9SL29KbmI5TkljNTd2UVpQeENlaEk2OUlDVWJUeWRuTjErTEptUEF1S1c5ZlJBaEVrME9jWjczWFl3NmhPd2c5djFsa0tnU2pxU0hPNW9SVDhUZHdLYnErV1dRNkNFZVRRcHc3emxtb2NUcW1UbS9PYjdib21NaUdJQ1JOQ0hHbXpUL0JzekNsUGpQeXVzcEtaRFlRbGttSCtNZjR0N2djdDBlbnpTSnpnZEJNS3NRSjcwWDRWSFRrRlJrVXdsTjNpRk01NFlONEtHNkxIa1FuTWd5RXFLNFE1MW52cFpqd1p1UTF2Q0tqZ0REVkVlSXI4WEJNZUwzYkxESktDTlc0UXB5Ujl6bzhBcmRCYjFpSmpBUENOZW9RSjd5cEZuZ3N6a2MzSm9pTUUwSTJxaERuV1c4S2p2MHh1akZCcEM0STNEQWh6Z3FySEVTWFVwL1owL3VROHJJaVVoY0ViNUFRSjd6MzRUZndKTnk1dkp5STFBMEJuRzJJRTl5WXNpZmZ3VGZpenVoM1hwRkpRZ2huRStKODMwMTR2NHVwa0w4citxaElwQWtReGcyRk9PSE56ek50UGhmM1JFZGVrU1pSUWpxVlRKdHpndVNOZUQ0ZVdINWRSSm9HQVowYTRydnhtM2docmtDbnpTSk5ocEJXSWM3L3BscGd3cHVkUlo3ZExOSUdDT3Z0SmJ3WDQyRzR1UHhJUk5vQW9VMmQzaU54VWZsUEl0SWFOdG5rL3dFR0JvTWRwRUNHSEFBQUFBQkpSVTVFcmtKZ2dnPT0nO1xuICAgICAgICBwbGF5T3ZlcmxheUh0bWxJbm5lci5hbHQgPSAnU3RhcnQgU3RyZWFtaW5nJztcbiAgICAgICAgcmV0dXJuIHBsYXlPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIFBsYXlPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBQbGF5T3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuL0Jhc2VPdmVybGF5JztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIHRleHQgb3ZlcmxheSBiYXNlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0T3ZlcmxheSBleHRlbmRzIE92ZXJsYXlCYXNlIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSB0ZXh0IG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcm9vdERpdiB0aGUgcm9vdCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKiBAcGFyYW0gcm9vdEVsZW1lbnQgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGlzIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHRFbGVtZW50IGFuIGVsZW1lbnQgdGhhdCBjb250YWlucyB0ZXh0IGZvciB0aGUgYWN0aW9uIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICBzdXBlcihyb290RGl2LCByb290RWxlbWVudCwgdGV4dEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGV4dCBvdmVybGF5cyBpbm5lciB0ZXh0XG4gICAgICogQHBhcmFtIHRleHQgdGhlIHVwZGF0ZSB0ZXh0IHRvIGJlIGluc2VydGVkIGludG8gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGV4dCAhPSBudWxsIHx8IHRleHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQganNzLCB7IFN0eWxlcyB9IGZyb20gJ2pzcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJ2pzcy1wbHVnaW4tZ2xvYmFsJztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnanNzLXBsdWdpbi1jYW1lbC1jYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclBhbGV0dGUge1xuICAgICctLWNvbG9yMCc6IHN0cmluZztcbiAgICAnLS1jb2xvcjEnOiBzdHJpbmc7XG4gICAgJy0tY29sb3IyJzogc3RyaW5nO1xuICAgICctLWNvbG9yMyc6IHN0cmluZztcbiAgICAnLS1jb2xvcjQnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I1Jzogc3RyaW5nO1xuICAgICctLWNvbG9yNic6IHN0cmluZztcbiAgICAnLS1jb2xvcjcnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFN0cmVhbWluZ0FwcGxpY2F0aW9uU3R5bGUge1xuICAgIGRlZmF1bHRMaWdodE1vZGVQYWxldHRlOiBDb2xvclBhbGV0dGUgPSB7XG4gICAgICAgICctLWNvbG9yMCc6ICcjZTJlMGRkODAnLFxuICAgICAgICAnLS1jb2xvcjEnOiAnI0ZGRkZGRicsXG4gICAgICAgICctLWNvbG9yMic6ICcjMDAwMDAwJyxcbiAgICAgICAgJy0tY29sb3IzJzogJyMwNTg1ZmUnLFxuICAgICAgICAnLS1jb2xvcjQnOiAnIzM1YjM1MCcsXG4gICAgICAgICctLWNvbG9yNSc6ICcjZmZhYjAwJyxcbiAgICAgICAgJy0tY29sb3I2JzogJyNlMWUyZGQnLFxuICAgICAgICAnLS1jb2xvcjcnOiAnI2MzYzRiZidcbiAgICB9O1xuXG4gICAgZGVmYXVsdERhcmtNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlID0ge1xuICAgICAgICAnLS1jb2xvcjAnOiAnIzFEMUYyMjgwJyxcbiAgICAgICAgJy0tY29sb3IxJzogJyMwMDAwMDAnLFxuICAgICAgICAnLS1jb2xvcjInOiAnI0ZGRkZGRicsXG4gICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAnLS1jb2xvcjUnOiAnI2ZmYWIwMCcsXG4gICAgICAgICctLWNvbG9yNic6ICcjMWUxZDIyJyxcbiAgICAgICAgJy0tY29sb3I3JzogJyMzYzNiNDAnXG4gICAgfTtcblxuICAgIGRlZmF1bHRTdHlsZXMgPSB7XG4gICAgICAgICc6cm9vdCc6IHtcbiAgICAgICAgICAgICctLWNvbG9yMCc6ICcjMUQxRjIyODAnLFxuICAgICAgICAgICAgJy0tY29sb3IxJzogJyMwMDAwMDAnLFxuICAgICAgICAgICAgJy0tY29sb3IyJzogJyNGRkZGRkYnLFxuICAgICAgICAgICAgJy0tY29sb3IzJzogJyMwNTg1ZmUnLFxuICAgICAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAgICAgJy0tY29sb3I1JzogJyNmZmFiMDAnLFxuICAgICAgICAgICAgJy0tY29sb3I2JzogJyMxZTFkMjInLFxuICAgICAgICAgICAgJy0tY29sb3I3JzogJyMzYzNiNDAnLFxuICAgICAgICAgICAgJy0tY29sb3I4JzogJyM0MTAwOGMnLFxuICAgICAgICAgICAgJy0tY29sb3I5JzogJyMzZTAwNzAnLFxuICAgICAgICAgICAgJy0tY29sb3IxMCc6ICcjMmUwMDUyJyxcbiAgICAgICAgICAgICctLWNvbG9yMTEnOiAncmdiYSg2NSwwLDEzOSwxKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5ub3NlbGVjdCc6IHtcbiAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3BsYXllclVJJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN2aWRlb0VsZW1lbnRQYXJlbnQnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMSknXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHpJbmRleDogJzMwJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgICB9LFxuICAgICAgICAnLlVpVG9vbCAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE1cHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzBweCAxMHB4JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBmb250U2l6ZTogJzAuNzVyZW0nLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuNzVweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgyNSUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcxMjUlJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJ1xuICAgICAgICB9LFxuICAgICAgICAnLlVpVG9vbDpob3ZlciAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnI2Nvbm5lY3Rpb24gLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdG9wOiAnMTI1JScsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0yNSUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0aW9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBib3R0b206ICc4JScsXG4gICAgICAgICAgICBsZWZ0OiAnNSUnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTWljaHJvbWEnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBoZWlnaHQ6ICczcmVtJyxcbiAgICAgICAgICAgIHdpZHRoOiAnM3JlbScsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzLXBhbmVsIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6ICcxMjUlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgekluZGV4OiAnMjAnLFxuICAgICAgICAgICAgcGFkZGluZzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgZmFsbGJhY2tzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzVweCAxMHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICcyMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzEyNSUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgICcjY29udHJvbHMnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzMlJyxcbiAgICAgICAgICAgIGxlZnQ6ICcyJScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNaWNocm9tYScsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzPionOiB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcwLjVyZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBoZWlnaHQ6ICcycmVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxLjc1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjY29udHJvbHMgI2FkZGl0aW9uYWxpbmZvJzoge1xuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgfSxcbiAgICAgICAgJyNmdWxsc2NyZWVuLWJ0bic6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjZyZW0gIWltcG9ydGFudCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNtaW5pbWl6ZUljb24nOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0J0biwgI3N0YXRzQnRuJzoge1xuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGJ1dHRvbic6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgd2lkdGg6ICczcmVtJyxcbiAgICAgICAgICAgIGhlaWdodDogJzNyZW0nLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuNXJlbScsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b246aG92ZXInOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjI1cyBlYXNlJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC41NXJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGJ1dHRvbjphY3RpdmUnOiB7XG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC41NXJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdCc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0J1wiLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMXJlbScsXG4gICAgICAgICAgICBmb250U2l6ZTogJzAuNzVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmhvdmVyJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnZWFzZSAwLjNzJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmRpc2FibGVkJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0J1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmFjdGl2ZSc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmZvY3VzJzoge1xuICAgICAgICAgICAgb3V0bGluZTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBpbWcnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbC13cmFwJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzAnLFxuICAgICAgICAgICAgcmlnaHQ6ICcwJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgbWluV2lkdGg6ICcyMHZ3JyxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwdncnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnLjNzIGVhc2Utb3V0JyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnLFxuICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDEwcHgpJyxcbiAgICAgICAgICAgIHdlYmtpdEJhY2tkcm9wRmlsdGVyOiAnYmx1cigxMHB4KScsXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICAgIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjApJ1xuICAgICAgICB9LFxuICAgICAgICAnLnBhbmVsLXdyYXAtdmlzaWJsZSc6IHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCUpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnBhbmVsJzoge1xuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMWVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzSGVhZGluZywgI3N0YXRzSGVhZGluZyc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgZm9udFNpemU6ICcyZW0nLFxuICAgICAgICAgICAgbWFyZ2luQmxvY2tTdGFydDogJzAuNjdlbScsXG4gICAgICAgICAgICBtYXJnaW5CbG9ja0VuZDogJzAuNjdlbScsXG4gICAgICAgICAgICBtYXJnaW5JbmxpbmVTdGFydDogJzBweCcsXG4gICAgICAgICAgICBtYXJnaW5JbmxpbmVFbmQ6ICcwcHgnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAwIDAgMnJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0Nsb3NlLCAjc3RhdHNDbG9zZSc6IHtcbiAgICAgICAgICAgIG1hcmdpbjogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMmVtJyxcbiAgICAgICAgICAgIGZsb2F0OiAncmlnaHQnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDbG9zZTphZnRlciwgI3N0YXRzQ2xvc2U6YWZ0ZXInOiB7XG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNXJlbScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdcIlxcXFwwMGQ3XCInXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDbG9zZTpob3ZlciwgI3N0YXRzQ2xvc2U6aG92ZXInOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2Vhc2UgMC4zcydcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0NvbnRlbnQsICNzdGF0c0NvbnRlbnQnOiB7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnMnJlbScsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJzJyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZyc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjE1cmVtIDEwcHggMC4xNXJlbSAxMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzLXRleHQnOiB7XG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJ1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzLW9wdGlvbic6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG4gICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJ1xuICAgICAgICB9LFxuICAgICAgICAnI2Nvbm5lY3RPdmVybGF5LCAjcGxheU92ZXJsYXksICNpbmZvT3ZlcmxheSwgI2Vycm9yT3ZlcmxheSwgI2Fma092ZXJsYXksICNkaXNjb25uZWN0T3ZlcmxheSc6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgekluZGV4OiAnMzAnLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxLjhlbScsXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjEpJyxcbiAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgdGV4dFRyYW5zZm9ybTogJ3VwcGVyY2FzZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcuY2xpY2thYmxlU3RhdGUnOiB7XG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcudGV4dERpc3BsYXlTdGF0ZSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4J1xuICAgICAgICB9LFxuICAgICAgICAnLmhpZGRlblN0YXRlJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjcGxheUJ1dHRvbiwgI2Nvbm5lY3RCdXR0b24nOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgekluZGV4OiAnMzAnXG4gICAgICAgIH0sXG4gICAgICAgICdpbWcjcGxheUJ1dHRvbic6IHtcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMjQxcHgnLFxuICAgICAgICAgICAgd2lkdGg6ICcxMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlJbnRlcmFjdGlvbic6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnXG4gICAgICAgIH0sXG4gICAgICAgICcjVUlJbnRlcmFjdGlvbkJ1dHRvbkJvdW5kYXJ5Jzoge1xuICAgICAgICAgICAgcGFkZGluZzogJzJweCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNVSUludGVyYWN0aW9uQnV0dG9uJzoge1xuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJyNoaWRkZW5JbnB1dCc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgbGVmdDogJy0xMCUnLFxuICAgICAgICAgICAgd2lkdGg6ICcwcHgnLFxuICAgICAgICAgICAgb3BhY2l0eTogJzAnXG4gICAgICAgIH0sXG4gICAgICAgICcjZWRpdFRleHRCdXR0b24nOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzQwcHgnLFxuICAgICAgICAgICAgd2lkdGg6ICc0MHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1vdmVybGF5Jzoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1zd2l0Y2gnOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLXN3aXRjaCAudGdsJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLCAudGdsOmFmdGVyLCAudGdsOmJlZm9yZSwgLnRnbCAqLCAudGdsICo6YWZ0ZXIsIC50Z2wgKjpiZWZvcmUsIC50Z2wrLnRnbC1zbGlkZXInOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHdlYmtpdEJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLnRnbDo6LW1vei1zZWxlY3Rpb24sIC50Z2w6YWZ0ZXI6Oi1tb3otc2VsZWN0aW9uLCAudGdsOmJlZm9yZTo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjphZnRlcjo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjpiZWZvcmU6Oi1tb3otc2VsZWN0aW9uLCAudGdsKy50Z2wtc2xpZGVyOjotbW96LXNlbGVjdGlvbic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLnRnbDo6c2VsZWN0aW9uLCAudGdsOmFmdGVyOjpzZWxlY3Rpb24sIC50Z2w6YmVmb3JlOjpzZWxlY3Rpb24sIC50Z2wgKjo6c2VsZWN0aW9uLCAudGdsICo6YWZ0ZXI6OnNlbGVjdGlvbiwgLnRnbCAqOmJlZm9yZTo6c2VsZWN0aW9uLCAudGdsKy50Z2wtc2xpZGVyOjpzZWxlY3Rpb24nOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc2xpZGVyJzoge30sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyJzoge1xuICAgICAgICAgICAgb3V0bGluZTogJzAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YWZ0ZXIsIC50Z2wrLnRnbC1zbGlkZXI6YmVmb3JlJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICAgICAgd2lkdGg6ICc1MCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YWZ0ZXInOiB7XG4gICAgICAgICAgICBsZWZ0OiAnMCdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YmVmb3JlJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQrLnRnbC1zbGlkZXInOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMnB4JyxcbiAgICAgICAgICAgIHdlYmtpdFRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3I2KScsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQrLnRnbC1zbGlkZXI6YWZ0ZXInOiB7XG4gICAgICAgICAgICB3ZWJraXRUcmFuc2l0aW9uOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0OmNoZWNrZWQrLnRnbC1zbGlkZXInOiB7XG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdDpjaGVja2VkKy50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3IzKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tYXBwbHknOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2sgIWltcG9ydGFudCcsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgd2lkdGg6ICc0MCUnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1jb250cm9sJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXI6ICcycHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdpbmhlcml0J1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tY29udHJvbDpob3Zlcic6IHtcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWdyb3VwJzoge1xuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzRweCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnODAlIDIwJScsXG4gICAgICAgICAgICByb3dHYXA6ICc0cHgnLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMTBweCcsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1ncm91cCBsYWJlbCc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0NvbnRhaW5lcic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzEwcHgnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3NDb250YWluZXI+IDpmaXJzdC1jaGlsZCc6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzRweCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJ1xuICAgICAgICB9LFxuICAgICAgICAnLmNvbGxhcHNlJzoge1xuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICc1JSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29scyc6IHtcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnNXB4JyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICc1cHgnLFxuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMiUnLFxuICAgICAgICAgICAgekluZGV4OiAnMTAwJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzRweCBzb2xpZCB2YXIoLS1jb2xvdXI4KScsXG4gICAgICAgICAgICBib3JkZXJUb3BXaWR0aDogJzBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0hlYWRlcic6IHtcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYydcbiAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29sc0hlYWRlcic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1jb2xvdXI4KScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnN0cmVhbVRvb2xzJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAndmFyKC0tYnV0dG9uRm9udCknLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2xpZ2h0ZXInLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnN0cmVhbVRvb2xzLXNob3duPiNzdHJlYW1Ub29sc1NldHRpbmdzLCAuc3RyZWFtVG9vbHMtc2hvd24+I3N0cmVhbVRvb2xzU3RhdHMnOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcjc3RyZWFtVG9vbHNUb2dnbGUnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcjcXVhbGl0eVN0YXR1cyc6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMzdweCcsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc0cHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc3ZnSWNvbic6IHtcbiAgICAgICAgICAgIGZpbGw6ICd2YXIoLS1jb2xvcjIpJ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN1c3RvbVN0eWxlcz86IFBhcnRpYWw8U3R5bGVzPjtcbiAgICBsaWdodE1vZGVQYWxldHRlOiBDb2xvclBhbGV0dGU7XG4gICAgZGFya01vZGVQYWxldHRlOiBDb2xvclBhbGV0dGU7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzoge1xuICAgICAgICBjdXN0b21TdHlsZXM/OiBQYXJ0aWFsPFN0eWxlcz47XG4gICAgICAgIGxpZ2h0TW9kZVBhbGV0dGU/OiBDb2xvclBhbGV0dGU7XG4gICAgICAgIGRhcmtNb2RlUGFsZXR0ZT86IENvbG9yUGFsZXR0ZTtcbiAgICB9KSB7XG4gICAgICAgIGNvbnN0IHsgY3VzdG9tU3R5bGVzLCBsaWdodE1vZGVQYWxldHRlLCBkYXJrTW9kZVBhbGV0dGUgfSA9XG4gICAgICAgICAgICBvcHRpb25zID8/IHt9O1xuICAgICAgICAvLyBPbmUgdGltZSBzZXR1cCB3aXRoIGRlZmF1bHQgcGx1Z2lucyBhbmQgc2V0dGluZ3MuXG4gICAgICAgIGNvbnN0IGpzc09wdGlvbnMgPSB7XG4gICAgICAgICAgICAvLyBKU1MgaGFzIG1hbnkgaW50ZXJlc3RpbmcgcGx1Z2lucyB3ZSBtYXkgd2lzaCB0byB0dXJuIG9uXG4gICAgICAgICAgICAvL3BsdWdpbnM6IFtmdW5jdGlvbnMoKSwgdGVtcGxhdGUoKSwgZ2xvYmFsKCksIGV4dGVuZCgpLCBuZXN0ZWQoKSwgY29tcG9zZSgpLCBjYW1lbENhc2UoKSwgZGVmYXVsdFVuaXQob3B0aW9ucy5kZWZhdWx0VW5pdCksIGV4cGFuZCgpLCB2ZW5kb3JQcmVmaXhlcigpLCBwcm9wc1NvcnQoKV1cbiAgICAgICAgICAgIHBsdWdpbnM6IFtnbG9iYWwoKSwgY2FtZWxDYXNlKCldXG4gICAgICAgIH07XG5cbiAgICAgICAganNzLnNldHVwKGpzc09wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tU3R5bGVzID0gY3VzdG9tU3R5bGVzO1xuICAgICAgICB0aGlzLmxpZ2h0TW9kZVBhbGV0dGUgPVxuICAgICAgICAgICAgbGlnaHRNb2RlUGFsZXR0ZSA/PyB0aGlzLmRlZmF1bHRMaWdodE1vZGVQYWxldHRlO1xuICAgICAgICB0aGlzLmRhcmtNb2RlUGFsZXR0ZSA9IGRhcmtNb2RlUGFsZXR0ZSA/PyB0aGlzLmRlZmF1bHREYXJrTW9kZVBhbGV0dGU7XG4gICAgfVxuXG4gICAgYXBwbHlTdHlsZVNoZWV0KCkge1xuICAgICAgICAvLyBUb2RvOiByZWZhY3RvciBjb2RlYmFzZSB0byB1c2UganNzIGF0IGEgY29tcG9uZW50IGxldmVsLCBjbGFzc2VzIGNhbiBiZSBncmFiYmVkIGxpa2Ugc286XG4gICAgICAgIC8vY29uc3Qge3BpeGVsU3RyZWFtaW5nQ2xhc3Nlc30gPSBqc3MuY3JlYXRlU3R5bGVTaGVldChzdHlsZXMpLmF0dGFjaCgpO1xuXG4gICAgICAgIC8vIGF0dGFjaCBnZW5lcmF0ZWQgc3R5bGUgc2hlZXQgdG8gcGFnZVxuICAgICAgICBqc3MuY3JlYXRlU3R5bGVTaGVldCh7XG4gICAgICAgICAgICAnQGdsb2JhbCc6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRTdHlsZXMsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21TdHlsZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYXR0YWNoKCk7XG4gICAgfVxuXG4gICAgYXBwbHlQYWxldHRlKHBhbGV0dGU6IENvbG9yUGFsZXR0ZSkge1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMCcsIHBhbGV0dGVbJy0tY29sb3IwJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjEnLCBwYWxldHRlWyctLWNvbG9yMSddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IyJywgcGFsZXR0ZVsnLS1jb2xvcjInXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMycsIHBhbGV0dGVbJy0tY29sb3IzJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjQnLCBwYWxldHRlWyctLWNvbG9yNCddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I1JywgcGFsZXR0ZVsnLS1jb2xvcjUnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNicsIHBhbGV0dGVbJy0tY29sb3I2J10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjcnLCBwYWxldHRlWyctLWNvbG9yNyddKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBsYXllcnMgY29sb3IgdmFyaWFibGVzXG4gICAgICogQHBhcmFtIGlzTGlnaHRNb2RlIC0gc2hvdWxkIHdlIHVzZSBhIGxpZ2h0IG9yIGRhcmsgY29sb3Igc2NoZW1lXG4gICAgICovXG4gICAgc2V0Q29sb3JNb2RlKGlzTGlnaHRNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0xpZ2h0TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhbGV0dGUodGhpcy5saWdodE1vZGVQYWxldHRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYWxldHRlKHRoaXMuZGFya01vZGVQYWxldHRlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEZ1bGxTY3JlZW5JY29uIH0gZnJvbSAnLi9GdWxsc2NyZWVuSWNvbic7XG5pbXBvcnQgeyBTZXR0aW5nc0ljb24gfSBmcm9tICcuL1NldHRpbmdzSWNvbic7XG5pbXBvcnQgeyBTdGF0c0ljb24gfSBmcm9tICcuL1N0YXRzSWNvbic7XG5pbXBvcnQgeyBYUkljb24gfSBmcm9tICcuL1hSSWNvbic7XG5pbXBvcnQgeyBXZWJYUkNvbnRyb2xsZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS4yJztcbmltcG9ydCB7IFVJRWxlbWVudENvbmZpZywgVUlFbGVtZW50Q3JlYXRpb25Nb2RlIH0gZnJvbSAnLi4vVUkvVUlDb25maWd1cmF0aW9uVHlwZXMnXG5cbi8qKlxuICogQ29uZmlndXJlcyBob3cgVUkgZWxlbWVudHMgdG8gY29udHJvbCB0aGUgc3RyZWFtIGFyZSBjcmVhdGVkLiBcbiAqIEJ5IGRlZmF1bHQsIGEgYnV0dG9uIHdpbGwgYmUgY3JlYXRlZCBmb3IgZWFjaCBjb250cm9sLiBUaGF0IGNhbiBiZSBvdmVycmlkZW4gcGVyLWNvbnRyb2xcbiAqIHRvIHVzZSBhbiBleHRlcm5hbGx5IHByb3ZpZGVkIGVsZW1lbnQsIG9yIHRvIGRpc2FibGUgdGhlIGVsZW1lbnQgZW50aXJlbHkuXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRyb2xzVUlDb25maWd1cmF0aW9uID0ge1xuICAgIC8vW1Byb3BlcnR5IGluIGtleW9mIENvbnRyb2xzIGFzIGAke1Byb3BlcnR5fVR5cGVgXT8gOiBVSUVsZW1lbnRUeXBlO1xuICAgIHN0YXRzQnV0dG9uVHlwZT8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgZnVsbHNjcmVlbkJ1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIHNldHRpbmdzQnV0dG9uVHlwZT8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgeHJJY29uVHlwZT8gOiBVSUVsZW1lbnRDb25maWdcbn1cblxuLy8gSWYgdGhlcmUgaXNuJ3QgYSB0eXBlIHByb3ZpZGVkLCBkZWZhdWx0IGJlaGF2aW91ciBpcyB0byBjcmVhdGUgdGhlIGVsZW1lbnQuXG5mdW5jdGlvbiBzaG91bGRDcmVhdGVCdXR0b24odHlwZSA6IFVJRWxlbWVudENvbmZpZyB8IHVuZGVmaW5lZCkgOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHR5cGUgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiAodHlwZS5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5DcmVhdGVEZWZhdWx0RWxlbWVudCk7XG59XG5cbi8qKlxuICogRWxlbWVudCBjb250YWluaW5nIHZhcmlvdXMgY29udHJvbHMgbGlrZSBzdGF0cywgc2V0dGluZ3MsIGZ1bGxzY3JlZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9scyB7XG4gICAgc3RhdHNJY29uOiBTdGF0c0ljb247XG4gICAgZnVsbHNjcmVlbkljb246IEZ1bGxTY3JlZW5JY29uO1xuICAgIHNldHRpbmdzSWNvbjogU2V0dGluZ3NJY29uO1xuICAgIHhySWNvbjogWFJJY29uO1xuXG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCB0aGUgY29udHJvbHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/IDogQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5zdGF0c0J1dHRvblR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzSWNvbiA9IG5ldyBTdGF0c0ljb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLnNldHRpbmdzQnV0dG9uVHlwZSkpe1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0ljb24gPSBuZXcgU2V0dGluZ3NJY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5mdWxsc2NyZWVuQnV0dG9uVHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbkljb24gPSBuZXcgRnVsbFNjcmVlbkljb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLnhySWNvblR5cGUpKXtcbiAgICAgICAgICAgIHRoaXMueHJJY29uID0gbmV3IFhSSWNvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGNvbnRyb2xzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnY29udHJvbHMnO1xuICAgICAgICAgICAgaWYgKCEhdGhpcy5mdWxsc2NyZWVuSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZnVsbHNjcmVlbkljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEhdGhpcy5zZXR0aW5nc0ljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzSWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISF0aGlzLnN0YXRzSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3RhdHNJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIXRoaXMueHJJY29uKSB7XG4gICAgICAgICAgICAgICAgV2ViWFJDb250cm9sbGVyLmlzU2Vzc2lvblN1cHBvcnRlZCgnaW1tZXJzaXZlLXZyJykudGhlbihcbiAgICAgICAgICAgICAgICAoc3VwcG9ydGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogRGVjbGFyZSBhZGRpdGlvbnMgdG8gYmFzZSB0eXBlcyBmb3IgY3Jvc3MgYnJvd3NlciBmdWxsc2NyZWVuIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgRG9jdW1lbnQge1xuICAgICAgICB3ZWJraXRJc0Z1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgICAgICBtb3pGdWxsU2NyZWVuPzogYm9vbGVhbjtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgICBtb3pDYW5jZWxGdWxsU2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbXNFeGl0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdEV4aXRGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbW96RnVsbFNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgICAgICBtc0Z1bGxzY3JlZW5FbGVtZW50PzogRWxlbWVudDtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgIH1cblxuICAgIGludGVyZmFjZSBIVE1MRWxlbWVudCB7XG4gICAgICAgIG1zUmVxdWVzdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtb3pSZXF1ZXN0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdFJlcXVlc3RGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0RW50ZXJGdWxsc2NyZWVuPzogKCkgPT4gdm9pZDtcbiAgICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYW4gZWxlbWVudCAoaS5lLiBidXR0b24pIHRoYXQsIHdoZW4gY2xpY2tlZCwgd2lsbCB0b2dnbGUgZnVsbHNjcmVlbiBvZiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBDYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCBhbnkgSFRNTEVsZW1lbnQsIGlmIGl0IGlzIHNldCBhcyByb290RWxlbWVudCBpbiB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuICAgIGlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIGZ1bGxzY3JlZW5FbGVtZW50OiBIVE1MRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQ7XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcm9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgICBcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBmdWxsIHNjcmVlbiBldmVudHNcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgdGhlIGRvY3VtZW50IG9yIGZ1bGxzY3JlZW5FbGVtZW50IGZ1bGxzY3JlZW4uXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBmdWxsIHNjcmVlbjsgZXhpdFxuICAgICAgICAvLyBlbHNlIGdvIGZ1bGxzY3JlZW5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZ1bGxzY3JlZW5FbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQud2Via2l0RW50ZXJGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTsgLy9mb3IgaXBob25lIHRoaXMgY29kZSB3b3JrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGZ1bGxzY3JlZW4gYnV0dG9uIG9uIGNoYW5nZVxuICAgICAqL1xuICAgIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPVxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBGdWxsU2NyZWVuSWNvbkJhc2UgdGhhdCB1c2VzIGFuIGV4dGVybmFsbHlcbiAqIHByb3ZpZGVkIEhUTUxFbGVtZW50IGZvciB0b2dnbGluZyBmdWxsIHNjcmVlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwgZXh0ZW5kcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuXG4gICAgY29uc3RydWN0b3IoZXh0ZXJuYWxCdXR0b24gOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gZXh0ZXJuYWxCdXR0b247XG4gICAgfVxuXG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgZnVsbHNjcmVlbiBpY29uIHRoYXQgY29udGFpbnMgYSBidXR0b24gYW5kIHN2Z3MgZm9yIGVhY2ggc3RhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbiBleHRlbmRzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG4gICAgX21heGltaXplSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfbWluaW1pemVJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRCdXR0b24gOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5pZCA9ICdmdWxsc2NyZWVuLWJ0bic7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5tYXhpbWl6ZUljb24pO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMubWluaW1pemVJY29uKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcblxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gY3JlYXRlZEJ1dHRvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ0Z1bGxzY3JlZW4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heGltaXplSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhpbWl6ZUljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdtYXhpbWl6ZUljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDM4NC45NyAzODQuOTcnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zODQuOTcsMTIuMDNjMC02LjcxMy01LjMxNy0xMi4wMy0xMi4wMy0xMi4wM0gyNjQuODQ3Yy02LjgzMywwLTExLjkyMiw1LjM5LTExLjkzNCwxMi4yMjNjMCw2LjgyMSw1LjEwMSwxMS44MzgsMTEuOTM0LDExLjgzOGg5Ni4wNjJsLTAuMTkzLDk2LjUxOWMwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLTAuMDEyLDEyLjAzLTUuMTk3LDEyLjAzLTEyLjAzbDAuMTkzLTEwOC4zNjljMC0wLjAzNi0wLjAxMi0wLjA2LTAuMDEyLTAuMDg0QzM4NC45NTgsMTIuMDksMzg0Ljk3LDEyLjA2NiwzODQuOTcsMTIuMDN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC40OTYsMEgxMi40MDNjLTAuMDM2LDAtMC4wNiwwLjAxMi0wLjA5NiwwLjAxMkMxMi4yODMsMC4wMTIsMTIuMjQ3LDAsMTIuMjIzLDBDNS41MSwwLDAuMTkyLDUuMzE3LDAuMTkyLDEyLjAzTDAsMTIwLjM5OWMwLDYuODMzLDUuMzksMTEuOTM0LDEyLjIyMywxMS45MzRjNi44MjEsMCwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkzNGwwLjE5Mi05Ni4zMzloOTYuMjQyYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNDMTMyLjUxNCw1LjE5NywxMjcuMzE3LDAsMTIwLjQ5NiwweidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMTIzLDM2MC45MDlIMjQuMDYxdi05Ni4yNDJjMC02LjgzMy01LjE5Ny0xMi4wMy0xMi4wMy0xMi4wM1MwLDI1Ny44MzMsMCwyNjQuNjY3djEwOC4wOTJjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NmMwLDYuNzEzLDUuMzE3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4wOTJjNi44MzMsMCwxMS45MjItNS4zOSwxMS45MzQtMTIuMjIzQzEzMi4wNTcsMzY1LjkyNiwxMjYuOTU2LDM2MC45MDksMTIwLjEyMywzNjAuOTA5eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zNzIuNzQ3LDI1Mi45MTNjLTYuODMzLDAtMTEuODUsNS4xMDEtMTEuODM4LDExLjkzNHY5Ni4wNjJoLTk2LjI0MmMtNi44MzMsMC0xMi4wMyw1LjE5Ny0xMi4wMywxMi4wM3M1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMDkyYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNi0wLjAxMiwwLjA2LDAuMDEyLDAuMDk2LDAuMDEyYzYuNzEzLDAsMTIuMDMtNS4zMTcsMTIuMDMtMTIuMDNWMjY0Ljg0N0MzODQuOTcsMjU4LjAxNCwzNzkuNTgsMjUyLjkxMywzNzIuNzQ3LDI1Mi45MTN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhpbWl6ZUljb247XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtaW5pbWl6ZUljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWluaW1pemVJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnbWluaW1pemVJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCAzODUuMzMxIDM4NS4zMzEnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWluaW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00yNjQuOTQzLDE1Ni42NjVoMTA4LjI3M2M2LjgzMywwLDExLjkzNC01LjM5LDExLjkzNC0xMi4yMTFjMC02LjgzMy01LjEwMS0xMS44NS0xMS45MzQtMTEuODM4aC05Ni4yNDJWMzYuMTgxYzAtNi44MzMtNS4xOTctMTIuMDMtMTIuMDMtMTIuMDNzLTEyLjAzLDUuMTk3LTEyLjAzLDEyLjAzdjEwOC4yNzNjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NkMyNTIuOTEzLDE1MS4zNDcsMjU4LjIzLDE1Ni42NzcsMjY0Ljk0MywxNTYuNjY1eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMjkxLDI0LjI0N2MtNi44MjEsMC0xMS44MzgsNS4xMTMtMTEuODM4LDExLjkzNHY5Ni4yNDJIMTIuMDNjLTYuODMzLDAtMTIuMDMsNS4xOTctMTIuMDMsMTIuMDNjMCw2LjgzMyw1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMjczYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNiwwLDAuMDYsMC4wMTIsMC4wOTYsMC4wMTJjNi43MTMsMCwxMi4wMy01LjMxNywxMi4wMy0xMi4wM1YzNi4xODFDMTMyLjUxNCwyOS4zNiwxMjcuMTI0LDI0LjI1OSwxMjAuMjkxLDI0LjI0N3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgzLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTIwLjM4NywyMjguNjY2SDEyLjExNWMtNi44MzMsMC4wMTItMTEuOTM0LDUuMzktMTEuOTM0LDEyLjIyM2MwLDYuODMzLDUuMTAxLDExLjg1LDExLjkzNCwxMS44MzhoOTYuMjQydjk2LjQyM2MwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNWMjQwLjg3N2MwLTAuMDM2LTAuMDEyLTAuMDYtMC4wMTItMC4wODRjMC0wLjAzNiwwLjAxMi0wLjA2LDAuMDEyLTAuMDk2QzEzMi40MTgsMjMzLjk4MywxMjcuMSwyMjguNjY2LDEyMC4zODcsMjI4LjY2NnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGg0LnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzczLjMsMjI4LjY2NkgyNjUuMDI4Yy0wLjAzNiwwLTAuMDYsMC4wMTItMC4wODQsMC4wMTJjLTAuMDM2LDAtMC4wNi0wLjAxMi0wLjA5Ni0wLjAxMmMtNi43MTMsMC0xMi4wMyw1LjMxNy0xMi4wMywxMi4wM3YxMDguMjczYzAsNi44MzMsNS4zOSwxMS45MjIsMTIuMjIzLDExLjkzNGM2LjgyMSwwLjAxMiwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkyMnYtOTYuMjQySDM3My4zYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNTMzgwLjEzNCwyMjguNjc4LDM3My4zLDIyOC42NjZ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5pbWl6ZUljb247XG4gICAgfVxuXG4gICAgb25GdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICBzdXBlci5vbkZ1bGxzY3JlZW5DaGFuZ2UoKTtcblxuICAgICAgICBjb25zdCBtaW5pbWl6ZSA9IHRoaXMubWluaW1pemVJY29uO1xuICAgICAgICBjb25zdCBtYXhpbWl6ZSA9IHRoaXMubWF4aW1pemVJY29uO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgICAgICAgLy9pb3MgZGlzYXBwZWFyaW5nIHN2ZyBmaXhcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAvL2lvcyBkaXNhcHBlYXJpbmcgc3ZnIGZpeFxuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBidXR0b24gd2l0aCBhIHRleHQgbGFiZWwgYmVzaWRlIGl0LlxuICovXG5leHBvcnQgY2xhc3MgTGFiZWxsZWRCdXR0b24ge1xuICAgIF9sYWJlbDogc3RyaW5nO1xuICAgIF9idXR0b25UZXh0OiBzdHJpbmc7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfYnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX2J1dHRvblRleHQgPSBidXR0b25UZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNsaWNrIGxpc3RlbmVyIHRvIHRoZSBidXR0b24gZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkT25DbGlja0xpc3RlbmVyKG9uQ2xpY2tGdW5jOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja0Z1bmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSFRNTElucHV0RWxlbWVudCBmb3IgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9idXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLnZhbHVlID0gdGhpcy5fYnV0dG9uVGV4dDtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWJ1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuX2xhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuY2xhc3NMaXN0LmFkZCgnYnRuLW92ZXJsYXknKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IExhdGVuY3lUZXN0UmVzdWx0cyB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5cbi8qKlxuICogTGF0ZW5jeSB0ZXN0IFVJIGVsZW1lbnRzIGFuZCByZXN1bHRzIGhhbmRsaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTGF0ZW5jeVRlc3Qge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0QnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIF9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGhlIGJ1dHRvbiBjb250YWluaW5nIHRoZSBzdGF0cyBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgaGVhZGluZ1xuICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZy5pZCA9ICdsYXRlbmN5VGVzdEhlYWRlcic7XG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZ1RleHQuaW5uZXJIVE1MID0gJ0xhdGVuY3kgVGVzdCc7XG4gICAgICAgICAgICBoZWFkaW5nLmFwcGVuZENoaWxkKGhlYWRpbmdUZXh0KTtcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgdGVzdCByZXN1bHRzIGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHNQYXJlbnRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5pZCA9ICdsYXRlbmN5VGVzdENvbnRhaW5lcic7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdHNQYXJlbnRFbGVtKTtcblxuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlkID0gJ2xhdGVuY3lTdGF0c1Jlc3VsdHMnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGF0ZW5jeVRlc3RCdXR0b24oKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnZhbHVlID0gJ1J1biBUZXN0JztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmlkID0gJ2J0bi1zdGFydC1sYXRlbmN5LXRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3RyZWFtVG9vbHMtYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGxhdGVuY3kgdGVzdCdzIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIGxhdGVuY3lUaW1pbmdzIFRoZSBsYXRlbmN5IHRlc3QgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlVGVzdFJlc3VsdChsYXRlbmN5VGltaW5nczogTGF0ZW5jeVRlc3RSZXN1bHRzKSB7XG4gICAgICAgIExvZ2dlci5Mb2coTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSwgbGF0ZW5jeVRpbWluZ3MudG9TdHJpbmcoKSwgNik7XG4gICAgICAgIGxldCBsYXRlbmN5U3RhdHNJbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5OZXQgbGF0ZW5jeSBSVFQgKG1zKTogJyArXG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5uZXR3b3JrTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5VRSBFbmNvZGUgKG1zKTogJyArIGxhdGVuY3lUaW1pbmdzLkVuY29kZU1zICsgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+VUUgQ2FwdHVyZSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLkNhcHR1cmVUb1NlbmRNcyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5Ccm93c2VyIHNlbmQgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmJyb3dzZXJTZW5kTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5mcmFtZURpc3BsYXlEZWx0YVRpbWVNcyAmJlxuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuYnJvd3NlclJlY2VpcHRUaW1lTXNcbiAgICAgICAgICAgICAgICA/ICc8ZGl2PkJyb3dzZXIgcmVjZWl2ZSBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZnJhbWVEaXNwbGF5RGVsdGFUaW1lTXMgK1xuICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PlRvdGFsIGxhdGVuY3kgKGV4Y2x1ZGluZyBicm93c2VyKSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmxhdGVuY3lFeGNsdWRpbmdEZWNvZGUgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPSBsYXRlbmN5VGltaW5ncy5lbmRUb0VuZExhdGVuY3lcbiAgICAgICAgICAgID8gJzxkaXY+VG90YWwgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZW5kVG9FbmRMYXRlbmN5ICtcbiAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSBsYXRlbmN5U3RhdHNJbm5lckhUTUw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBTZXR0aW5ncyBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0ljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3NldHRpbmdzSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3NldHRpbmdzQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc0ljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnc2V0dGluZ3NJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0NzguNzAzIDQ3OC43MDMnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ000NTQuMiwxODkuMTAxbC0zMy42LTUuN2MtMy41LTExLjMtOC0yMi4yLTEzLjUtMzIuNmwxOS44LTI3LjdjOC40LTExLjgsNy4xLTI3LjktMy4yLTM4LjFsLTI5LjgtMjkuOFxcXG5cdFx0XHRjLTUuNi01LjYtMTMtOC43LTIwLjktOC43Yy02LjIsMC0xMi4xLDEuOS0xNy4xLDUuNWwtMjcuOCwxOS44Yy0xMC44LTUuNy0yMi4xLTEwLjQtMzMuOC0xMy45bC01LjYtMzMuMlxcXG5cdFx0XHRjLTIuNC0xNC4zLTE0LjctMjQuNy0yOS4yLTI0LjdoLTQyLjFjLTE0LjUsMC0yNi44LDEwLjQtMjkuMiwyNC43bC01LjgsMzRjLTExLjIsMy41LTIyLjEsOC4xLTMyLjUsMTMuN2wtMjcuNS0xOS44XFxcblx0XHRcdGMtNS0zLjYtMTEtNS41LTE3LjItNS41Yy03LjksMC0xNS40LDMuMS0yMC45LDguN2wtMjkuOSwyOS44Yy0xMC4yLDEwLjItMTEuNiwyNi4zLTMuMiwzOC4xbDIwLDI4LjFcXFxuXHRcdFx0Yy01LjUsMTAuNS05LjksMjEuNC0xMy4zLDMyLjdsLTMzLjIsNS42Yy0xNC4zLDIuNC0yNC43LDE0LjctMjQuNywyOS4ydjQyLjFjMCwxNC41LDEwLjQsMjYuOCwyNC43LDI5LjJsMzQsNS44XFxcblx0XHRcdGMzLjUsMTEuMiw4LjEsMjIuMSwxMy43LDMyLjVsLTE5LjcsMjcuNGMtOC40LDExLjgtNy4xLDI3LjksMy4yLDM4LjFsMjkuOCwyOS44YzUuNiw1LjYsMTMsOC43LDIwLjksOC43YzYuMiwwLDEyLjEtMS45LDE3LjEtNS41XFxcblx0XHRcdGwyOC4xLTIwYzEwLjEsNS4zLDIwLjcsOS42LDMxLjYsMTNsNS42LDMzLjZjMi40LDE0LjMsMTQuNywyNC43LDI5LjIsMjQuN2g0Mi4yYzE0LjUsMCwyNi44LTEwLjQsMjkuMi0yNC43bDUuNy0zMy42XFxcblx0XHRcdGMxMS4zLTMuNSwyMi4yLTgsMzIuNi0xMy41bDI3LjcsMTkuOGM1LDMuNiwxMSw1LjUsMTcuMiw1LjVsMCwwYzcuOSwwLDE1LjMtMy4xLDIwLjktOC43bDI5LjgtMjkuOGMxMC4yLTEwLjIsMTEuNi0yNi4zLDMuMi0zOC4xXFxcblx0XHRcdGwtMTkuOC0yNy44YzUuNS0xMC41LDEwLjEtMjEuNCwxMy41LTMyLjZsMzMuNi01LjZjMTQuMy0yLjQsMjQuNy0xNC43LDI0LjctMjkuMnYtNDIuMVxcXG5cdFx0XHRDNDc4LjksMjAzLjgwMSw0NjguNSwxOTEuNTAxLDQ1NC4yLDE4OS4xMDF6IE00NTEuOSwyNjAuNDAxYzAsMS4zLTAuOSwyLjQtMi4yLDIuNmwtNDIsN2MtNS4zLDAuOS05LjUsNC44LTEwLjgsOS45XFxcblx0XHRcdGMtMy44LDE0LjctOS42LDI4LjgtMTcuNCw0MS45Yy0yLjcsNC42LTIuNSwxMC4zLDAuNiwxNC43bDI0LjcsMzQuOGMwLjcsMSwwLjYsMi41LTAuMywzLjRsLTI5LjgsMjkuOGMtMC43LDAuNy0xLjQsMC44LTEuOSwwLjhcXFxuXHRcdFx0Yy0wLjYsMC0xLjEtMC4yLTEuNS0wLjVsLTM0LjctMjQuN2MtNC4zLTMuMS0xMC4xLTMuMy0xNC43LTAuNmMtMTMuMSw3LjgtMjcuMiwxMy42LTQxLjksMTcuNGMtNS4yLDEuMy05LjEsNS42LTkuOSwxMC44bC03LjEsNDJcXFxuXHRcdFx0Yy0wLjIsMS4zLTEuMywyLjItMi42LDIuMmgtNDIuMWMtMS4zLDAtMi40LTAuOS0yLjYtMi4ybC03LTQyYy0wLjktNS4zLTQuOC05LjUtOS45LTEwLjhjLTE0LjMtMy43LTI4LjEtOS40LTQxLTE2LjhcXFxuXHRcdFx0Yy0yLjEtMS4yLTQuNS0xLjgtNi44LTEuOGMtMi43LDAtNS41LDAuOC03LjgsMi41bC0zNSwyNC45Yy0wLjUsMC4zLTEsMC41LTEuNSwwLjVjLTAuNCwwLTEuMi0wLjEtMS45LTAuOGwtMjkuOC0yOS44XFxcblx0XHRcdGMtMC45LTAuOS0xLTIuMy0wLjMtMy40bDI0LjYtMzQuNWMzLjEtNC40LDMuMy0xMC4yLDAuNi0xNC44Yy03LjgtMTMtMTMuOC0yNy4xLTE3LjYtNDEuOGMtMS40LTUuMS01LjYtOS0xMC44LTkuOWwtNDIuMy03LjJcXFxuXHRcdFx0Yy0xLjMtMC4yLTIuMi0xLjMtMi4yLTIuNnYtNDIuMWMwLTEuMywwLjktMi40LDIuMi0yLjZsNDEuNy03YzUuMy0wLjksOS42LTQuOCwxMC45LTEwYzMuNy0xNC43LDkuNC0yOC45LDE3LjEtNDJcXFxuXHRcdFx0YzIuNy00LjYsMi40LTEwLjMtMC43LTE0LjZsLTI0LjktMzVjLTAuNy0xLTAuNi0yLjUsMC4zLTMuNGwyOS44LTI5LjhjMC43LTAuNywxLjQtMC44LDEuOS0wLjhjMC42LDAsMS4xLDAuMiwxLjUsMC41bDM0LjUsMjQuNlxcXG5cdFx0XHRjNC40LDMuMSwxMC4yLDMuMywxNC44LDAuNmMxMy03LjgsMjcuMS0xMy44LDQxLjgtMTcuNmM1LjEtMS40LDktNS42LDkuOS0xMC44bDcuMi00Mi4zYzAuMi0xLjMsMS4zLTIuMiwyLjYtMi4yaDQyLjFcXFxuXHRcdFx0YzEuMywwLDIuNCwwLjksMi42LDIuMmw3LDQxLjdjMC45LDUuMyw0LjgsOS42LDEwLDEwLjljMTUuMSwzLjgsMjkuNSw5LjcsNDIuOSwxNy42YzQuNiwyLjcsMTAuMywyLjUsMTQuNy0wLjZsMzQuNS0yNC44XFxcblx0XHRcdGMwLjUtMC4zLDEtMC41LDEuNS0wLjVjMC40LDAsMS4yLDAuMSwxLjksMC44bDI5LjgsMjkuOGMwLjksMC45LDEsMi4zLDAuMywzLjRsLTI0LjcsMzQuN2MtMy4xLDQuMy0zLjMsMTAuMS0wLjYsMTQuN1xcXG5cdFx0XHRjNy44LDEzLjEsMTMuNiwyNy4yLDE3LjQsNDEuOWMxLjMsNS4yLDUuNiw5LjEsMTAuOCw5LjlsNDIsNy4xYzEuMywwLjIsMi4yLDEuMywyLjIsMi42djQyLjFINDUxLjl6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTIzOS40LDEzNi4wMDFjLTU3LDAtMTAzLjMsNDYuMy0xMDMuMywxMDMuM3M0Ni4zLDEwMy4zLDEwMy4zLDEwMy4zczEwMy4zLTQ2LjMsMTAzLjMtMTAzLjNTMjk2LjQsMTM2LjAwMSwyMzkuNCwxMzYuMDAxeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzSWNvbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgY29tcG9uZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NQYW5lbCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc2V0dGluZ3NDbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgX3NldHRpbmdzQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzZXR0aW5ncy1wYW5lbCc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhbmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChwYW5lbEVsZW0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNldHRpbmdzSGVhZGluZy5pZCA9ICdzZXR0aW5nc0hlYWRpbmcnO1xuICAgICAgICAgICAgc2V0dGluZ3NIZWFkaW5nLnRleHRDb250ZW50ID0gJ1NldHRpbmdzJztcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZChzZXR0aW5nc0hlYWRpbmcpO1xuXG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0Nsb3NlQnV0dG9uKTtcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQuaWQgPSAnc2V0dGluZ3NDb250ZW50JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ2xvc2VCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24uaWQgPSAnc2V0dGluZ3NDbG9zZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzZXR0aW5ncyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNldHRpbmdzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgc2V0dGluZ3MgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFN0YXRzIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfc3RhdHNJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc3RhdHMgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc3RhdHNCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0ljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdzdGF0c0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMzMwIDMzMCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsMC4wMDhDNzQuMDE5LDAuMDA4LDAsNzQuMDI0LDAsMTY0Ljk5OWMwLDkwLjk3Nyw3NC4wMTksMTY0Ljk5MiwxNjUsMTY0Ljk5MnMxNjUtNzQuMDE1LDE2NS0xNjQuOTkyQzMzMCw3NC4wMjQsMjU1Ljk4MSwwLjAwOCwxNjUsMC4wMDh6IE0xNjUsMjk5Ljk5MmMtNzQuNDM5LDAtMTM1LTYwLjU1Ny0xMzUtMTM0Ljk5MlM5MC41NjEsMzAuMDA4LDE2NSwzMC4wMDhzMTM1LDYwLjU1NywxMzUsMTM0Ljk5MUMzMDAsMjM5LjQzNiwyMzkuNDM5LDI5OS45OTIsMTY1LDI5OS45OTJ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSwxMzAuMDA4Yy04LjI4NCwwLTE1LDYuNzE2LTE1LDE1djk5Ljk4M2MwLDguMjg0LDYuNzE2LDE1LDE1LDE1czE1LTYuNzE2LDE1LTE1di05OS45ODNDMTgwLDEzNi43MjUsMTczLjI4NCwxMzAuMDA4LDE2NSwxMzAuMDA4eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsNzAuMDExYy0zLjk1LDAtNy44MTEsMS42LTEwLjYxLDQuMzljLTIuNzksMi43OS00LjM5LDYuNjYtNC4zOSwxMC42MXMxLjYsNy44MSw0LjM5LDEwLjYxYzIuNzksMi43OSw2LjY2LDQuMzksMTAuNjEsNC4zOXM3LjgxLTEuNiwxMC42MDktNC4zOWMyLjc5LTIuOCw0LjM5MS02LjY2LDQuMzkxLTEwLjYxcy0xLjYwMS03LjgyLTQuMzkxLTEwLjYxQzE3Mi44MSw3MS42MSwxNjguOTUsNzAuMDExLDE2NSw3MC4wMTF6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0ljb247XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTGF0ZW5jeVRlc3QgfSBmcm9tICcuL0xhdGVuY3lUZXN0JztcbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjInO1xuaW1wb3J0IHsgQWdncmVnYXRlZFN0YXRzIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuMic7XG5pbXBvcnQgeyBNYXRoVXRpbHMgfSBmcm9tICcuLi9VdGlsL01hdGhVdGlscyc7XG5cbi8qKlxuICogQSBzdGF0IHN0cnVjdHVyZSwgYW4gaWQsIHRoZSBzdGF0IHN0cmluZywgYW5kIHRoZSBlbGVtZW50IHdoZXJlIGl0IGlzIHJlbmRlcmVkLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdCB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIHN0YXQ6IHN0cmluZztcbiAgICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbn1cblxuLyoqXG4gKiBBIFVJIGNvbXBvbmVudCBjb250YWluaW5nIGFsbCB0aGUgc3RhdHMgZm9yIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzUGFuZWwge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzQ2xvc2VCdXR0b246IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0c0NvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdGlzdGljc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzUmVzdWx0OiBIVE1MRWxlbWVudDtcblxuICAgIGxhdGVuY3lUZXN0OiBMYXRlbmN5VGVzdDtcblxuICAgIC8qIEEgbWFwIHN0YXRzIHdlIGFyZSBzdG9yaW5nL3JlbmRlcmluZyAqL1xuICAgIHN0YXRzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFN0YXQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdCA9IG5ldyBMYXRlbmN5VGVzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3N0YXRzLXBhbmVsJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAnKTtcblxuICAgICAgICAgICAgY29uc3QgcGFuZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwYW5lbEVsZW0uY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsRWxlbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3RhdHNIZWFkaW5nLmlkID0gJ3N0YXRzSGVhZGluZyc7XG4gICAgICAgICAgICBzdGF0c0hlYWRpbmcudGV4dENvbnRlbnQgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHN0YXRzSGVhZGluZyk7XG5cbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzQ2xvc2VCdXR0b24pO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudC5pZCA9ICdzdGF0c0NvbnRlbnQnO1xuXG4gICAgICAgICAgICBjb25zdCBzdHJlYW1Ub29sU3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5pZCA9ICdzdHJlYW1Ub29sc1N0YXRzJztcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICAgICAgY29uc3QgY29udHJvbFN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuaWQgPSAnQ29udHJvbFN0YXRzJztcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGljcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuaWQgPSAnc3RhdGlzdGljcyc7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpY3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuaWQgPSAnc3RhdGlzdGljc0hlYWRlcic7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcblxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXNzaW9uU3RhdHMuaW5uZXJIVE1MID0gJ1Nlc3Npb24gU3RhdHMnO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKHN0cmVhbVRvb2xTdGF0cyk7XG4gICAgICAgICAgICBzdHJlYW1Ub29sU3RhdHMuYXBwZW5kQ2hpbGQoY29udHJvbFN0YXRzKTtcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZChzdGF0aXN0aWNzKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuYXBwZW5kQ2hpbGQoc3RhdGlzdGljc0hlYWRlcik7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmFwcGVuZENoaWxkKHNlc3Npb25TdGF0cyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmFwcGVuZENoaWxkKHRoaXMuc3RhdGlzdGljc0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRpc3RpY3NDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIuaWQgPSAnc3RhdGlzdGljc0NvbnRhaW5lcic7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzUmVzdWx0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c1Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzUmVzdWx0LmlkID0gJ3N0YXRpc3RpY3NSZXN1bHQnO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQuY2xhc3NMaXN0LmFkZCgnU3RhdHNSZXN1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0c0Nsb3NlQnV0dG9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uLmlkID0gJ3N0YXRzQ2xvc2UnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgc3RhdHMgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhbmVsLXdyYXAtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgdG9nZ2xlVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzdGF0cyBjb21pbmcgaW4gZnJvbSBicm93c2VyL1VFXG4gICAgICogQHBhcmFtIHN0YXRzIHRoZSBzdGF0cyBzdHJ1Y3R1cmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU3RhdHMoc3RhdHM6IEFnZ3JlZ2F0ZWRTdGF0cykge1xuICAgICAgICAvLyBmb3JtYXQgbnVtYmVyaW5nIGJhc2VkIG9uIHRoZSBicm93c2VyIGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IG51bWJlckZvcm1hdCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlLCB7XG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5ib3VuZCBkYXRhXG4gICAgICAgIGNvbnN0IGluYm91bmREYXRhID0gTWF0aFV0aWxzLmZvcm1hdEJ5dGVzKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYnl0ZXNSZWNlaXZlZCxcbiAgICAgICAgICAgIDJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ0luYm91bmREYXRhU3RhdCcsICdSZWNlaXZlZCcsIGluYm91bmREYXRhKTtcblxuICAgICAgICAvLyBQYWNrZXRzIGxvc3RcbiAgICAgICAgY29uc3QgcGFja2V0c0xvc3RTdGF0ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAncGFja2V0c0xvc3QnXG4gICAgICAgIClcbiAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5wYWNrZXRzTG9zdClcbiAgICAgICAgICAgIDogJ0Nocm9tZSBvbmx5JztcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUGFja2V0c0xvc3RTdGF0JyxcbiAgICAgICAgICAgICdQYWNrZXRzIExvc3QnLFxuICAgICAgICAgICAgcGFja2V0c0xvc3RTdGF0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQml0cmF0ZVxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ1ZpZGVvQml0cmF0ZVN0YXQnLFxuICAgICAgICAgICAgICAgICdWaWRlbyBCaXRyYXRlIChrYnBzKScsXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZS50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdBdWRpb0JpdHJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gQml0cmF0ZSAoa2JwcyknLFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZpZGVvIHJlc29sdXRpb25cbiAgICAgICAgY29uc3QgcmVzU3RhdCA9XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lV2lkdGgnXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZVdpZHRoICYmXG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lSGVpZ2h0J1xuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVIZWlnaHRcbiAgICAgICAgICAgICAgICA/IHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lV2lkdGggK1xuICAgICAgICAgICAgICAgICAgJ3gnICtcbiAgICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lSGVpZ2h0XG4gICAgICAgICAgICAgICAgOiAnQ2hyb21lIG9ubHknO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnVmlkZW9SZXNTdGF0JywgJ1ZpZGVvIHJlc29sdXRpb24nLCByZXNTdGF0KTtcblxuICAgICAgICAvLyBGcmFtZXMgZGVjb2RlZFxuICAgICAgICBjb25zdCBmcmFtZXNEZWNvZGVkID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAnZnJhbWVzRGVjb2RlZCdcbiAgICAgICAgKVxuICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc0RlY29kZWQpXG4gICAgICAgICAgICA6ICdDaHJvbWUgb25seSc7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0RlY29kZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgRGVjb2RlZCcsXG4gICAgICAgICAgICBmcmFtZXNEZWNvZGVkXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gRnJhbWVyYXRlXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdGcmFtZXJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnRnJhbWVyYXRlJyxcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZyYW1lcyBkcm9wcGVkXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0Ryb3BwZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgZHJvcHBlZCcsXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNEcm9wcGVkPy50b1N0cmluZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmNvZGVjSWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdWaWRlb0NvZGVjU3RhdCcsXG4gICAgICAgICAgICAgICAgJ1ZpZGVvIGNvZGVjJyxcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGUgY29kZWMgdG8gcmVtb3ZlIHRoZSBGbXRwIGxpbmVcbiAgICAgICAgICAgICAgICBzdGF0cy5jb2RlY3NcbiAgICAgICAgICAgICAgICAgICAgLmdldChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5jb2RlY0lkKVxuICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KCcgJylbMF0gPz8gJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuY29kZWNJZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ0F1ZGlvQ29kZWNTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gY29kZWMnLFxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZSBjb2RlYyB0byByZW1vdmUgdGhlIEZtdHAgbGluZVxuICAgICAgICAgICAgICAgIHN0YXRzLmNvZGVjc1xuICAgICAgICAgICAgICAgICAgICAuZ2V0KHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmNvZGVjSWQpXG4gICAgICAgICAgICAgICAgICAgID8uc3BsaXQoJyAnKVswXSA/PyAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJUVFxuICAgICAgICBjb25zdCBuZXRSVFQgPVxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgIHN0YXRzLmNhbmRpZGF0ZVBhaXIsXG4gICAgICAgICAgICAgICAgJ2N1cnJlbnRSb3VuZFRyaXBUaW1lJ1xuICAgICAgICAgICAgKSAmJiBzdGF0cy5pc051bWJlcihzdGF0cy5jYW5kaWRhdGVQYWlyLmN1cnJlbnRSb3VuZFRyaXBUaW1lKVxuICAgICAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0cy5jYW5kaWRhdGVQYWlyLmN1cnJlbnRSb3VuZFRyaXBUaW1lICogMTAwMFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogXCJDYW4ndCBjYWxjdWxhdGVcIjtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ1JUVFN0YXQnLCAnTmV0IFJUVCAobXMpJywgbmV0UlRUKTtcblxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdEdXJhdGlvblN0YXQnLFxuICAgICAgICAgICAgJ0R1cmF0aW9uJyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy5ydW5UaW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnQ29udHJvbHNJbnB1dFN0YXQnLFxuICAgICAgICAgICAgJ0NvbnRyb2xzIHN0cmVhbSBpbnB1dCcsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMuY29udHJvbHNTdHJlYW1JbnB1dFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFFQXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ1FQU3RhdCcsXG4gICAgICAgICAgICAnVmlkZW8gcXVhbnRpemF0aW9uIHBhcmFtZXRlcicsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMudmlkZW9FbmNvZGVyQXZnUVAudG9TdHJpbmcoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRvZG86XG4gICAgICAgIC8vc3RhdHNUZXh0ICs9IGA8ZGl2PkJyb3dzZXIgcmVjZWl2ZSB0byBjb21wb3NpdGUgKG1zKTogJHtzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5yZWNlaXZlVG9Db21wb3NpdGVNc308L2Rpdj5gO1xuXG4gICAgICAgIExvZ2dlci5Mb2coXG4gICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgYC0tLS0tLS0tLSBTdGF0cyAtLS0tLS0tLS1cXG4gJHtzdGF0c31cXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1gLFxuICAgICAgICAgICAgNlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgc3RhdCB0byB0aGUgc3RhdHMgcmVzdWx0cyBpbiB0aGUgRE9NIG9yIHVwZGF0ZXMgYW4gZXhpdGluZyBzdGF0LlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHN0YXQgdG8gYWRkL3VwZGF0ZS5cbiAgICAgKiBAcGFyYW0gc3RhdCBUaGUgY29udGVudHMgb2YgdGhlIHN0YXQuXG4gICAgICovXG4gICAgcHVibGljIGFkZE9yVXBkYXRlU3RhdChpZDogc3RyaW5nLCBzdGF0TGFiZWw6IHN0cmluZywgc3RhdDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRIVE1MID0gYCR7c3RhdExhYmVsfTogJHtzdGF0fWA7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRzTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgc3RhdFxuICAgICAgICAgICAgY29uc3QgbmV3U3RhdCA9IG5ldyBTdGF0KCk7XG4gICAgICAgICAgICBuZXdTdGF0LmlkID0gaWQ7XG4gICAgICAgICAgICBuZXdTdGF0LnN0YXQgPSBzdGF0O1xuICAgICAgICAgICAgbmV3U3RhdC50aXRsZSA9IHN0YXRMYWJlbDtcbiAgICAgICAgICAgIG5ld1N0YXQuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbmV3U3RhdC5lbGVtZW50LmlubmVySFRNTCA9IHN0YXRIVE1MO1xuICAgICAgICAgICAgLy8gYWRkIHRoZSBzdGF0IHRvIHRoZSBkb21cbiAgICAgICAgICAgIHRoaXMuc3RhdHNSZXN1bHQuYXBwZW5kQ2hpbGQobmV3U3RhdC5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNNYXAuc2V0KGlkLCBuZXdTdGF0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIHN0YXRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdHNNYXAuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZWxlbWVudC5pbm5lckhUTUwgPSBzdGF0SFRNTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKiBXaGV0aGVyIGEgc3RyZWFtIFVJIGVsZW1lbnQgaXMgaW50ZXJuYWxseSBtYWRlLCBleHRlcm5hbGx5IHByb3ZpZGVkLCBvciBkaXNhYmxlZC4gKi9cbmV4cG9ydCBlbnVtIFVJRWxlbWVudENyZWF0aW9uTW9kZSB7XG4gICAgQ3JlYXRlRGVmYXVsdEVsZW1lbnQsXG4gICAgVXNlQ3VzdG9tRWxlbWVudCxcbiAgICBEaXNhYmxlXG59XG5cbi8qKiBBIGNvbmZpZ3VyYXRpb24gZm9yIGRpZmZlcmVudCBVSSBlbGVtZW50cyB3aGljaCBjb250cm9sL2Rpc3BsYXkgaW5mbyByZWxhdGVkIHRvIHRoZSBzdHJlYW0uICovXG5leHBvcnQgdHlwZSBVSUVsZW1lbnRDb25maWcgPSB7XG4gICAgLy8gSW4gd2hpY2ggd2F5IGlzIHRoaXMgZWxlbWVudCBjcmVhdGVkP1xuICAgIGNyZWF0aW9uTW9kZSA6IFVJRWxlbWVudENyZWF0aW9uTW9kZSxcbiAgICAvLyAoT25seSByZWxldmFudCBpZiB3aGVuIG1vZGUgaXMgQ3JlYXRlQ3VzdG9tRWxlbWVudCkgVmlzdWFsaXppbmcgZWxlbWVudFxuICAgIGN1c3RvbUVsZW1lbnQ/IDogSFRNTEVsZW1lbnRcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIGEgZ2VuZXJhbCBzdHJlYW0tcmVsYXRlZCBVSSBwYW5lbC4gXG4gKiBGb3IgZXhhbXBsZTogaXMgaXQgY3JlYXRlZCwgYW5kIGlmIGl0IGlzLCB3aGF0IGtpbmQgb2YgYnV0dG9uIGlzIHVzZWQgdG8gc2hvdy9oaWRlIGl0LlxuICogVGhpcyBjb25maWd1cmF0aW9uIGlzIHVzZWQgZm9yIHRoZSBzZXR0aW5ncyBwYW5lbCBhbmQgc3RhdHMgcGFuZWwgYnkgZGVmYXVsdC5cbiAqIFxuICogTm90ZTogRm9yIGNhc2VzIHdoZXJlIHRoZSBwYW5lbCBuZWVkcyB0byBiZSBjcmVhdGVkLCBidXQgYSBidXR0b24gaXNuJ3QgbmVlZGVkLCBcbiAqIHRoZSBwYW5lbCBlbGVtZW50IGNhbiBiZSBwbGFjZWQgYW55d2hlcmUgaW4gdGhlIERPTSBhcyBuZWVkZWQgKHNlZSBBcHBsaWNhdGlvbiBjbGFzcykuIFxuICovXG5leHBvcnQgdHlwZSBQYW5lbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgLy8gSWYgcGFuZWwgaXMgZW5hYmxlZCwgSFRNTCBlbGVtZW50cyBmb3IgaXQgd2lsbCBiZSBjcmVhdGVkLCBhbmQgZnVudGlvbmFsaXR5IGJvdW5kXG4gICAgaXNFbmFibGVkIDogYm9vbGVhbixcbiAgICAvLyAoT25seSByZWxldmFudCBpZiBpc0VuYWJsZWQpIFRoZSB0eXBlIG9mIHRoZSBidXR0b24gdG8gc2hvdy9oaWRlIHRoaXMgcGFuZWxcbiAgICB2aXNpYmlsaXR5QnV0dG9uQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYW5lbEVuYWJsZWQoY29uZmlnIDogUGFuZWxDb25maWd1cmF0aW9uIHwgdW5kZWZpbmVkKSA6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhY29uZmlnIHx8ICghIWNvbmZpZyAmJiBjb25maWcuaXNFbmFibGVkKTtcbn0iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgZWxlbWVudCBzaG93aW5nIHRoZSBRUCAocXVhbnRpemF0aW9uIHBhcmFtZXRlcikgb2YgdGhlIHZpZGVvIHN0cmVhbSBhdCB0aGUgbGFzdCBlbmNvZGVkIGZyYW1lICh3ZWxsLCBsYXN0IHRyYW5zbWl0dGVkIFFQIHJlYWxseSkuXG4gKiBBIGJsb2NraWVyIGVuY29kaW5nIHdpbGwgaGF2ZSBhIGhpZ2hlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgcmVkLlxuICogQSBub24tYmxvY2t5IHN0cmVhbSB3aWxsIGhhdmUgYSBsb3dlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgZ3JlZW4uXG4gKiBUaGUgUVAgaW5kaWNhdG9yIGlzIHJlcHJlc2VudGVkIHZpc3VhbGx5IHVzaW5nIGEgV2lGaSBpY29uLlxuICovXG5leHBvcnQgY2xhc3MgVmlkZW9RcEluZGljYXRvciB7XG4gICAgdmlkZW9FbmNvZGVyQXZnUVAgPSAtMTtcblxuICAgIC8vIG5vbiBodG1sIGVsZW1lbnRzXG4gICAgc3RhdHNUZXh0ID0gJyc7XG4gICAgY29sb3IgPSAnJztcblxuICAgIC8vIHFwIGNvbG9yc1xuICAgIHJlYWRvbmx5IG9yYW5nZVFQID0gMjY7XG4gICAgcmVhZG9ubHkgcmVkUVAgPSAzNTtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3F1YWxpdHlUZXh0OiBIVE1MRWxlbWVudDtcbiAgICBfcXVhbGl0eVN0YXR1czogU1ZHRWxlbWVudDtcbiAgICBfZG90OiBTVkdFbGVtZW50O1xuICAgIF9vdXRlcjogU1ZHRWxlbWVudDtcbiAgICBfbWlkZGxlOiBTVkdFbGVtZW50O1xuICAgIF9pbm5lcjogU1ZHRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBRUCBpbmRpY2F0b3IuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBzdmcgZm9yIHRoZSBjb25uZWN0aW9uXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnY29ubmVjdGlvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcblxuICAgICAgICAgICAgLy8gYWRkIHN2ZyBpY29uIGZvciB0aGUgY29ubmVjdGlvbiBzdHJlbmd0aFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5xdWFsaXR5U3RhdHVzKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0ZXh0IHVuZGVybmVhdGggdGhlIGNvbm5lY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucXVhbGl0eVRleHQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgY29sb3JzIHRvIG5vdCBjb25uZWN0ZWQgaW5pdGlhbGx5XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVFwVG9vbHRpcCgtMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGV4dCB0aGF0IGRpc3BsYXlzIHVuZGVyIHRoZSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcXVhbGl0eVRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3F1YWxpdHlUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmlkID0gJ3F1YWxpdHlUZXh0JztcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YWxpdHlUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHF1YWxpdHlTdGF0dXMoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcXVhbGl0eVN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdpZCcsXG4gICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb25TdHJlbmd0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlTdGF0dXMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0OTQuNDUgNDk0LjQ1J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lmaSBpY29uXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuYXBwZW5kQ2hpbGQodGhpcy5kb3QpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMubWlkZGxlKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLm91dGVyKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLmlubmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVhbGl0eVN0YXR1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRvdCBhdCB0aGUgYm90dG9tIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBkb3QoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fZG90KSB7XG4gICAgICAgICAgICB0aGlzLl9kb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnY2lyY2xlJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnZG90Jyk7XG4gICAgICAgICAgICB0aGlzLl9kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JywgJzI0Ny4xMjUnKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knLCAnMzk4LjkyNScpO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdyJywgJzM1LjMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZG90O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb3V0ZXIgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBvdXRlcigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9vdXRlcikge1xuICAgICAgICAgICAgdGhpcy5fb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnb3V0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX291dGVyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNNDY3LjkyNSwyMDQuNjI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtMTExLjUtMTExLjQtMjkyLjctMTExLjQtNDA0LjEsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjNjQtNjQsMTQ5LTk5LjIsMjM5LjUtOTkuMnMxNzUuNSwzNS4yLDIzOS41LDk5LjJjMTAuMywxMC4zLDEwLjMsMjcuMSwwLDM3LjRDNDgxLjQyNSwyMDIuMDI1LDQ3NC42MjUsMjA0LjYyNSw0NjcuOTI1LDIwNC42MjV6J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtaWRkbGUgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBtaWRkbGUoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWlkZGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ21pZGRsZScpO1xuICAgICAgICAgICAgdGhpcy5fbWlkZGxlLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzk1LjIyNSwyNzcuMzI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtNzEuNC03MS4zLTE4Ny40LTcxLjMtMjU4LjgsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjOTItOTIsMjQxLjYtOTIsMzMzLjYsMGMxMC4zLDEwLjMsMTAuMywyNy4xLDAsMzcuNEM0MDguNzI1LDI3NC43MjUsNDAxLjkyNSwyNzcuMzI1LDM5NS4yMjUsMjc3LjMyNXonXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taWRkbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbm5lciBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlubmVyKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2lubmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdpbm5lcicpO1xuICAgICAgICAgICAgdGhpcy5faW5uZXIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zMjMuNjI1LDM0OC44MjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy0xNS40LTE1LjQtMzYtMjMuOS01Ny44LTIzLjlzLTQyLjQsOC41LTU3LjgsMjMuOWMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBjLTEwLjMtMTAuMy0xMC4zLTI3LjEsMC0zNy40YzI1LjQtMjUuNCw1OS4yLTM5LjQsOTUuMi0zOS40czY5LjgsMTQsOTUuMiwzOS41YzEwLjMsMTAuMywxMC4zLDI3LjEsMCwzNy40QzMzNy4yMjUsMzQ2LjIyNSwzMzAuNDI1LDM0OC44MjUsMzIzLjYyNSwzNDguODI1eidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc2V0IHRoZSBzcGVlZCBvZiB0aGUgc3RhdHVzIGxpZ2h0LlxuICAgICAqIEBwYXJhbSBzcGVlZCAtIFNldCB0aGUgc3BlZWQgb2YgdGhlIGJsaW5rLCBoaWdoZXIgbnVtYmVycyBtYWtlIHRoZSBzdGF0dXMgbGlnaHQgYmxpbmsgZmFzdGVyLlxuICAgICAqL1xuICAgIGJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IHNwZWVkO1xuICAgICAgICBsZXQgb3BhY2l0eSA9IDE7XG4gICAgICAgIGNvbnN0IHRpY2tJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG9wYWNpdHkgLT0gMC4xO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5VGV4dC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKChvcGFjaXR5IC0gMC41KSAqIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG9wYWNpdHkgPD0gMC4xKSB7XG4gICAgICAgICAgICAgICAgaWYgKC0taXRlcmF0aW9uID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aWNrSUQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwIC8gc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZXMgdGhlIFFQIHRvb2x0aXAgYnkgY29udmVydGluZyB0aGUgVmlkZW8gRW5jb2RlciBRUCB0byBhIGNvbG9yIGxpZ2h0XG4gICAgICogQHBhcmFtIFFQIC0gVGhlIHZpZGVvIGVuY29kZXIgUVAgbnVtYmVyIG5lZWRlZCB0byBmaW5kIHRoZSBhdmVyYWdlXG4gICAgICovXG4gICAgdXBkYXRlUXBUb29sdGlwKFFQOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy52aWRlb0VuY29kZXJBdmdRUCA9IFFQO1xuICAgICAgICBpZiAoUVAgPiB0aGlzLnJlZFFQKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICB0aGlzLmJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKDIpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+UG9vciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5pbm5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChRUCA+IHRoaXMub3JhbmdlUVApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgIHRoaXMuYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoMSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5CbG9ja3kgZW5jb2RpbmcgcXVhbGl0eTwvZGl2PmA7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKFFQIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnI2IwYjBiMCc7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+Tm90IGNvbm5lY3RlZDwvZGl2PmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ2xpbWUnO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5DbGVhciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVhbGl0eVRleHQuaW5uZXJIVE1MID0gdGhpcy5zdGF0c1RleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBYUiBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBYUkljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3hySWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIFhSIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3hyQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1hSJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB4ckljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5feHJJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl94ckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAneHJJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHN2ZyBncm91cCBmb3IgdGhlIHBhdGhzXG4gICAgICAgICAgICBjb25zdCBzdmdHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHN2Z0dyb3VwLmNsYXNzTGlzdC5hZGQoJ3N2Z0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5hcHBlbmRDaGlsZChzdmdHcm91cCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBwYXRocyBmb3IgdGhlIGljb24gaXRzZWxmLCB0aGUgcGF0aCBvZiB0aGUgeHIgaGVhZHNldFxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTI5IDQxYy01IDAtOSA0LTkgOXM0IDkgOSA5IDktNCA5LTktNC05LTktOXptMCAxNGMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1em00Mi0xNGMtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05LTQtOS05LTl6bTAgMTRjLTIuOCAwLTUtMi4yLTUtNXMyLjItNSA1LTUgNSAyLjIgNSA1LTIuMiA1LTUgNXptMTItMzFIMTdjLTYuNiAwLTEyIDUuNC0xMiAxMnYyOGMwIDYuNiA1LjQgMTIgMTIgMTJoMTQuNWMzLjUgMCA2LjgtMS41IDktNC4xbDMuNS00YzEuNS0xLjcgMy43LTIuNyA2LTIuN3M0LjUgMSA2IDIuN2wzLjUgNGMyLjMgMi42IDUuNiA0LjEgOSA0LjFIODNjNi42IDAgMTItNS40IDEyLTEyVjM2YzAtNi42LTUuNC0xMi0xMi0xMnptOCA0MGMwIDQuNC0zLjYgOC04IDhINjguNWMtMi4zIDAtNC41LTEtNi0yLjdsLTMuNS00Yy0yLjMtMi42LTUuNi00LjEtOS00LjEtMy41IDAtNi44IDEuNS05IDQuMWwtMy41IDRDMzYgNzEgMzMuOCA3MiAzMS41IDcySDE3Yy00LjQgMC04LTMuNi04LThWMzZjMC00LjQgMy42LTggOC04aDY2YzQuNCAwIDggMy42IDggOHYyOHonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5feHJJY29uO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmV4cG9ydCBjbGFzcyBNYXRoVXRpbHMge1xuICAgIC8qKlxuICAgICAqIGZvcm1hdHMgQnl0ZXMgY29taW5nIGluIGZvciB2aWRlbyBzdGF0c1xuICAgICAqIEBwYXJhbSBieXRlcyBudW1iZXIgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBkZWNpbWFscyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZm9ybWF0Qnl0ZXMoYnl0ZXM6IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmIChieXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZhY3RvciA9IDEwMjQ7XG4gICAgICAgIGNvbnN0IGRtID0gZGVjaW1hbHMgPCAwID8gMCA6IGRlY2ltYWxzO1xuICAgICAgICBjb25zdCBzaXplcyA9IFtcbiAgICAgICAgICAgICdCeXRlcycsXG4gICAgICAgICAgICAnS2lCJyxcbiAgICAgICAgICAgICdNaUInLFxuICAgICAgICAgICAgJ0dpQicsXG4gICAgICAgICAgICAnVGlCJyxcbiAgICAgICAgICAgICdQaUInLFxuICAgICAgICAgICAgJ0VpQicsXG4gICAgICAgICAgICAnWmlCJyxcbiAgICAgICAgICAgICdZaUInXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coZmFjdG9yKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coZmFjdG9yLCBpKSkudG9GaXhlZChkbSkpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBzaXplc1tpXVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2VwaWNnYW1lc19wc19saWJfcGl4ZWxzdHJlYW1pbmdmcm9udGVuZF91ZTVfMl9kNTc1NTJkZl9fOyIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX187IiwidmFyIHggPSB5ID0+IHsgdmFyIHggPSB7fTsgX193ZWJwYWNrX3JlcXVpcmVfXy5kKHgsIHkpOyByZXR1cm4geDsgfVxudmFyIHkgPSB4ID0+ICgpID0+IHhcbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qc3NfcGx1Z2luX2NhbWVsX2Nhc2VfZGUxMTMzNTVfXzsiLCJ2YXIgeCA9IHkgPT4geyB2YXIgeCA9IHt9OyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoeCwgeSk7IHJldHVybiB4OyB9XG52YXIgeSA9IHggPT4gKCkgPT4geFxubW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fZ2xvYmFsX2VmODZmNDIxX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgVUlPcHRpb25zLCBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnIH0gZnJvbSAnLi9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCB7IFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB9IGZyb20gJy4vU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMnO1xuXG5leHBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0FGS092ZXJsYXknO1xuZXhwb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmV4cG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmV4cG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuZXhwb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvSW5mb092ZXJsYXknO1xuZXhwb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvUGxheU92ZXJsYXknO1xuZXhwb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuZXhwb3J0IHsgQ29uZmlnVUkgfSBmcm9tICcuL0NvbmZpZy9Db25maWdVSSc7XG5leHBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJQmFzZSc7XG5leHBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJRmxhZyc7XG5leHBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXInO1xuZXhwb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJT3B0aW9uJztcbmV4cG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlUZXh0JztcbmV4cG9ydCB7IFBhbmVsQ29uZmlndXJhdGlvbiwgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9