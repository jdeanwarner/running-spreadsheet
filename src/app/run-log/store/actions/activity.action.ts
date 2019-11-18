import { Action } from '@ngrx/store';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { DocumentReference } from '@angular/fire/firestore';

export const LOAD_ACTIVITIES_BY_YEAR = '[Log] Load Activity By Year';
export const LOAD_ACTIVITIES_BY_YEAR_SUCCESS = '[Log] Load Activity By Year Success';
export const LOAD_ACTIVITIES_BY_YEAR_FAIL = '[Log] Load Activity By Year Fail';

export const LOAD_ALL_ACTIVITIES = '[Log] Load All Activity';
export const LOAD_ALL_ACTIVITIES_SUCCESS = '[Log] Load All Activity Success';
export const LOAD_ALL_ACTIVITIES_FAIL = '[Log] Load All Activity Fail';

export const LOAD_ACTIVITY_TYPES = '[Log] Load Activity Types';
export const LOAD_ACTIVITY_TYPES_SUCCESS = '[Log] Load Activity Types Success';
export const LOAD_ACTIVITY_TYPES_FAIL = '[Log] Load Activity Types Fail';

export const INSERT_ACTIVITY = '[Log] Insert Activity';
export const INSERT_ACTIVITY_SUCCESS = '[Log] Insert Activity Success';
export const INSERT_ACTIVITY_FAIL = '[Log] Insert Activity Fail';

export const UPDATE_ACTIVITY = '[Log] Update Activity';
export const UPDATE_ACTIVITY_SUCCESS = '[Log] Update Activity Success';
export const UPDATE_ACTIVITY_FAIL = '[Log] Update Activity Fail';

export const DELETE_ACTIVITY = '[Log] Delete Activity';
export const DELETE_ACTIVITY_SUCCESS = '[Log] Delete Activity Success';
export const DELETE_ACTIVITY_FAIL = '[Log] Delete Activity Fail';

export class LoadActivitiesByYear implements Action {
    readonly type = LOAD_ACTIVITIES_BY_YEAR;

    constructor(public playload: string) {}
}

export class LoadActivitiesByYearSuccess implements Action {
    readonly type = LOAD_ACTIVITIES_BY_YEAR_SUCCESS;

    constructor(public playload: Activity[]) {}
}

export class LoadActivitiesByYearFail implements Action {
    readonly type = LOAD_ACTIVITIES_BY_YEAR_FAIL;

    constructor(public playload: any) {}
}

export class LoadAllActivities implements Action {
    readonly type = LOAD_ALL_ACTIVITIES;
}

export class LoadAllActivitiesSuccess implements Action {
    readonly type = LOAD_ALL_ACTIVITIES_SUCCESS;

    constructor(public playload: Activity[]) {}
}

export class LoadAllActivitiesFail implements Action {
    readonly type = LOAD_ALL_ACTIVITIES_FAIL;

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

export class InsertActivity implements Action {
    readonly type = INSERT_ACTIVITY;

    constructor(public playload: Activity) {}
}

export class InsertActivitySuccess implements Action {
    readonly type = INSERT_ACTIVITY_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class InsertActivityFail implements Action {
    readonly type = INSERT_ACTIVITY_FAIL;

    constructor(public playload: any) {}
}

export class UpdateActivity implements Action {
    readonly type = UPDATE_ACTIVITY;

    constructor(public playload: Activity) {}
}

export class UpdateActivitySuccess implements Action {
    readonly type = UPDATE_ACTIVITY_SUCCESS;
}

export class UpdateActivityFail implements Action {
    readonly type = UPDATE_ACTIVITY_FAIL;

    constructor(public playload: any) {}
}

export class DeleteActivity implements Action {
    readonly type = DELETE_ACTIVITY;

    constructor(public playload: string) {}
}

export class DeleteActivitySuccess implements Action {
    readonly type = DELETE_ACTIVITY_SUCCESS;
}

export class DeleteActivityFail implements Action {
    readonly type = DELETE_ACTIVITY_FAIL;

    constructor(public playload: any) {}
}


export type ActivityActions =
    LoadActivitiesByYear |
    LoadActivitiesByYearSuccess |
    LoadActivitiesByYearFail |
    LoadAllActivities |
    LoadAllActivitiesSuccess |
    LoadAllActivitiesFail |
    LoadType |
    LoadTypeSuccess |
    LoadTypeFail |
    InsertActivity |
    InsertActivitySuccess |
    InsertActivityFail |
    UpdateActivity |
    UpdateActivitySuccess |
    UpdateActivityFail |
    DeleteActivity |
    DeleteActivityFail |
    DeleteActivitySuccess;
