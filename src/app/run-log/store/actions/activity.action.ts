import { Action } from '@ngrx/store';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';

export const LOAD_ACTIVITY = '[Log] Load Activity';
export const LOAD_ACTIVITY_SUCCESS = '[Log] Load Activity Fail';
export const LOAD_ACTIVITY_FAIL = '[Log] Load Activity Success';

export const LOAD_ACTIVITY_TYPES = '[Log] Load Activity Types';
export const LOAD_ACTIVITY_TYPES_SUCCESS = '[Log] Load Activity Types Fail';
export const LOAD_ACTIVITY_TYPES_FAIL = '[Log] Load Activity Types Success';


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

export class LoadType implements Action {
    readonly type = LOAD_ACTIVITY_TYPES;
}

export class LoadTypeSuccess implements Action {
    readonly type = LOAD_ACTIVITY_TYPES_SUCCESS;

    constructor(public playload: ActivityType[]) {}
}

export class LoadTypeFail implements Action {
    readonly type = LOAD_ACTIVITY_TYPES_FAIL;

    constructor(public playload: any) {}
}


export type ActivityActions =
    LoadActivities |
    LoadActivitiesSuccess |
    LoadActivitiesFail |
    LoadType |
    LoadTypeSuccess |
    LoadTypeFail;
