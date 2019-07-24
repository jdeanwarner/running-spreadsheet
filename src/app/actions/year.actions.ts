import { Action } from '@ngrx/store';

export const CHANGE_YEAR = '[YEAR] Change';

export class ChangeYear implements Action {
    readonly type = CHANGE_YEAR;

    constructor(public playload: number) {}
}


export type Actions = ChangeYear;
