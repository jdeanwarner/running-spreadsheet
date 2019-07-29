import { Action } from '@ngrx/store';
import { RunType } from 'src/app/shared/activities/run-type';

export const LOAD_RUN_TYPES = '[Log] Load Run Types';
export const LOAD_RUN_TYPES_SUCCESS = '[Log] Load Run Types Success';
export const LOAD_RUN_TYPES_FAIL = '[Log] Load Run Types Fail';


export class LoadRunType implements Action {
    readonly type = LOAD_RUN_TYPES;
}

export class LoadRunTypeSuccess implements Action {
    readonly type = LOAD_RUN_TYPES_SUCCESS;

    constructor(public playload: RunType[]) {}
}

export class LoadRunTypeFail implements Action {
    readonly type = LOAD_RUN_TYPES_FAIL;

    constructor(public playload: any) {}
}


export type RunTypeActions =  LoadRunType | LoadRunTypeSuccess | LoadRunTypeFail;
