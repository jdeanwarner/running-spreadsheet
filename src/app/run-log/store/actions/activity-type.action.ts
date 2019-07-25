import { ActivityType } from 'src/app/shared/activities/activity-type';
import { Action } from '@ngrx/store';

export const LOAD_ACTIVITY_TYPES = '[Log] Load Activity Types';
export const LOAD_ACTIVITY_TYPES_SUCCESS = '[Log] Load Activity Types Fail';
export const LOAD_ACTIVITY_TYPES_FAIL = '[Log] Load Activity Types Success';


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
