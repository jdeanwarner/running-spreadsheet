import { ActivityType } from 'src/app/shared/activities/activity-type';
import { Action } from '@ngrx/store';


export const LOAD_ACTIVITIES = '[Activity] Load';
export const LOAD_ACTIVITIES_SUCCESS = '[Activity] Load Success';
export const LOAD_ACTIVITIES_FAIL = '[Activity] Load Fail';
export const LOAD_ACTIVITY_TYPES = '[Activity] Load Types';
export const LOAD_ACTIVITY_TYPES_SUCCESS = '[Activity] Load Types Fail';
export const LOAD_ACTIVITY_TYPES_FAIL = '[Activity] Load Types Success';


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


export type ActivityTypeActions =  LoadType | LoadTypeSuccess | LoadTypeFail;
