// Copyright Epic Games, Inc. All Rights Reserved.

import { SpecialKeyCodes } from './SpecialKeyCodes';
import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import { ActiveKeys } from './InputClassesFactory';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { Config, Flags } from '../Config/Config';
import { IInputController } from './IInputController';
import { CodeToKeyCode } from './KeyCodes';

/**
 * Handles the Keyboard Inputs for the document
 */
export class KeyboardController implements IInputController {
    streamMessageController: StreamMessageController;
    activeKeys: ActiveKeys;
    config: Config;

    onKeyDownListener: (event: KeyboardEvent) => void;
    onKeyUpListener: (event: KeyboardEvent) => void;
    onKeyPressListener: (event: KeyboardEvent) => void;
    onCompositionEndListener: (event: KeyboardEvent) => void;

    constructor(streamMessageController: StreamMessageController, config: Config, activeKeys: ActiveKeys) {
        this.streamMessageController = streamMessageController;
        this.config = config;
        this.activeKeys = activeKeys;

        this.onKeyDownListener = this.handleOnKeyDown.bind(this);
        this.onKeyUpListener = this.handleOnKeyUp.bind(this);
        this.onKeyPressListener = this.handleOnKeyPress.bind(this);
        this.onCompositionEndListener = this.handleOnCompositionEnd.bind(this);
    }

    register() {
        document.addEventListener('compositionend', this.onCompositionEndListener);
        document.addEventListener('keydown', this.onKeyDownListener);
        document.addEventListener('keyup', this.onKeyUpListener);
        //This has been deprecated as at Jun 13 2021
        document.addEventListener('keypress', this.onKeyPressListener);
    }

    unregister() {
        document.removeEventListener('compositionend', this.onCompositionEndListener);
        document.removeEventListener('keydown', this.onKeyDownListener);
        document.removeEventListener('keyup', this.onKeyUpListener);
        document.removeEventListener('keypress', this.onKeyPressListener);
    }

    private handleOnKeyDown(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode || keyCode === 229) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyDown')([this.getKeycode(keyboardEvent), keyboardEvent.repeat ? 1 : 0]);
        const activeKeys = this.activeKeys.getActiveKeys();
        activeKeys.push(keyCode);
        // Backspace is not considered a keypress in JavaScript but we need it
        // to be so characters may be deleted in a UE text entry field.
        if (keyCode === SpecialKeyCodes.backSpace) {
            document.dispatchEvent(
                new KeyboardEvent('keypress', {
                    charCode: SpecialKeyCodes.backSpace
                })
            );
        }

        if (this.config.isFlagEnabled(Flags.SuppressBrowserKeys) && this.isKeyCodeBrowserKey(keyCode)) {
            keyboardEvent.preventDefault();
        }
    }

    private handleOnKeyUp(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyUp')([keyCode]);

        if (this.config.isFlagEnabled(Flags.SuppressBrowserKeys) && this.isKeyCodeBrowserKey(keyCode)) {
            keyboardEvent.preventDefault();
        }
    }

    private handleOnKeyPress(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyPress')([keyCode]);
    }

    private handleOnCompositionEnd(compositionEvent: CompositionEvent) {
        if (compositionEvent.data && compositionEvent.data.length) {
            compositionEvent.data.split('').forEach((char) => {
                // This keydown, keypress, keyup flow is required to mimic the way characters are
                // normally triggered
                this.handleOnKeyDown(
                    new KeyboardEvent('keydown', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
                this.handleOnKeyPress(
                    new KeyboardEvent('keypress', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
                this.handleOnKeyUp(
                    new KeyboardEvent('keyup', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
            });
        }
    }

    /**
     * Gets the Keycode of the Key pressed
     * @param keyboardEvent - Key board Event
     * @returns - the key code of the Key
     */
    private getKeycode(keyboardEvent: KeyboardEvent) {
        // If we don't have keyCode property because browser API is deprecated then use KeyboardEvent.code instead.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#constants_for_keycode_value
        if (!('keyCode' in keyboardEvent)) {
            // Convert KeyboardEvent.code string into integer-based key code for backwards compatibility reasons.
            const event = keyboardEvent as KeyboardEvent;
            if (event.code in CodeToKeyCode) {
                return CodeToKeyCode[event.code];
            } else {
                Logger.Warning(
                    `Keyboard code of ${event.code} is not supported in our mapping, ignoring this key.`
                );
                return null;
            }
        }

        // If we made it here KeyboardEvent.keyCode is still supported so we can safely use it.

        if (keyboardEvent.keyCode === SpecialKeyCodes.shift && keyboardEvent.code === 'ShiftRight') {
            return SpecialKeyCodes.rightShift;
        } else if (
            keyboardEvent.keyCode === SpecialKeyCodes.control &&
            keyboardEvent.code === 'ControlRight'
        ) {
            return SpecialKeyCodes.rightControl;
        } else if (keyboardEvent.keyCode === SpecialKeyCodes.alt && keyboardEvent.code === 'AltRight') {
            return SpecialKeyCodes.rightAlt;
        } else {
            return keyboardEvent.keyCode;
        }
    }

    /**
     * Browser keys do not have a charCode so we only need to test keyCode.
     * @param keyCode - the browser keycode number
     */
    private isKeyCodeBrowserKey(keyCode: number) {
        // Function keys or tab key are considered "browser keys" that we may wish to suppress by preventing them being process by browser.
        return (keyCode >= 112 && keyCode <= 123) || keyCode === 9;
    }
}