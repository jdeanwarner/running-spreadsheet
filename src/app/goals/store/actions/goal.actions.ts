import { Action } from '@ngrx/store';
import { State } from 'src/app/shared/state.enum';

export const LOAD_STATES_COMPLETED = '[Goal] Load States Completed';
export const LOAD_STATES_COMPLETED_SUCCESS = '[Goal] Load States Completed Success';
export const LOAD_STATES_COMPLETED_FAIL = '[Goal] Load States Completed Fail';


export class LoadStatesCompleted implements Action {
    readonly type = LOAD_STATES_COMPLETED;
}

export class LoadStatesCompletedSuccess implements Action {
    readonly type = LOAD_STATES_COMPLETED_SUCCESS;
    constructor(public playload: State[]) {}
}

export class LoadStatesCompletedFail implements Action {
    readonly type = LOAD_STATES_COMPLETED_FAIL;
    constructor(public playload: any) {}
}


export type GoalActions =
    LoadStatesCompleted |
    LoadStatesCompletedSuccess |
    LoadStatesCompletedFail;
