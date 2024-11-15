// Copyright Epic Games, Inc. All Rights Reserved.

import type { NumericParametersIds } from './Config';
import { SettingBase } from './SettingBase';

/**
 * A number setting object with a text label. Min and max limit the range of allowed values.
 */
export class SettingNumber<CustomIds extends string = NumericParametersIds> extends SettingBase {
    _min: number;
    _max: number;

    id: NumericParametersIds | CustomIds;
    onChangeEmit: (changedValue: number) => void;

    constructor(
        id: NumericParametersIds | CustomIds,
        label: string,
        description: string,
        min: number,
        max: number,
        defaultNumber: number,
        useUrlParams: boolean,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        super(id, label, description, defaultNumber, defaultOnChangeListener);

        this._min = min;
        this._max = max;

        // attempt to read the number from the url params
        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.number = defaultNumber;
        } else {
            const parsedValue = Number.parseFloat(this.getURLParam(this.id));
            this.number = Number.isNaN(parsedValue) ? defaultNumber : parsedValue;
        }
        this.useUrlParams = useUrlParams;
    }

    protected getValueAsString(): string {
        return this.number.toString();
    }

    /**
     * Set the number value (will be clamped within range).
     */
    public set number(newNumber: number) {
        this.value = this.clamp(newNumber);
    }

    /**
     * @returns The number stored.
     */
    public get number(): number {
        return this.value as number;
    }

    /**
     * Clamps a number between the min and max values (inclusive).
     * @param inNumber The number to clamp.
     * @returns The clamped number.
     */
    public clamp(inNumber: number): number {
        return Math.max(Math.min(this._max, inNumber), this._min);
    }

    /**
     * Returns the minimum value
     * @returns The minimum value
     */
    public get min(): number {
        return this._min;
    }

    /**
     * Returns the maximum value
     * @returns The maximum value
     */
    public get max(): number {
        return this._max;
    }

    /**
     * Add a change listener to the number object.
     */
    public addOnChangedListener(onChangedFunc: (newNumber: number) => void) {
        this.onChange = onChangedFunc;
    }
}
