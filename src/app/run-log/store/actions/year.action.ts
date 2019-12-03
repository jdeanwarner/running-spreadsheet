import { Action } from '@ngrx/store';

export const CHANGE_YEAR = '[YEAR] Change';
export const CHANGE_YEAR_SUCCESS = '[YEAR] Change Success';
export const CHANGE_YEAR_FAIL = '[YEAR] Change Fail';

export class ChangeYear implements Action {
    readonly type = CHANGE_YEAR;

    constructor(public playload: number) {}
}

export class ChangeYearSuccess implements Action {
    readonly type = CHANGE_YEAR_SUCCESS;

    constructor(public playload: number) {}
}

export class ChangeYearFail implements Action {
    readonly type = CHANGE_YEAR_FAIL;

    constructor(public playload: any) {}
}


export type Actions = ChangeYear | ChangeYearSuccess | ChangeYearFail;
