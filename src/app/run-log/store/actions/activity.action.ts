import { Action } from '@ngrx/store';
import { Activity } from 'src/app/shared/activities/activity';

export const LOAD_ACTIVITY = '[Log] Load Activity';
export const LOAD_ACTIVITY_SUCCESS = '[Log] Load Activity Fail';
export const LOAD_ACTIVITY_FAIL = '[Log] Load Activity Success';


export class LoadActivities implements Action {
    readonly type = LOAD_ACTIVITY;
}

export class LoadActivitiesSuccess implements Action {
    readonly type = LOAD_ACTIVITY_SUCCESS;

    constructor(public playload: Activity[]) {}
}

export class LoadActivitiesFail implements Action {
    readonly type = LOAD_ACTIVITY_FAIL;

    constructor(public playload: any) {}
}


export type ActivityActions =  LoadActivities | LoadActivitiesSuccess | LoadActivitiesFail;
