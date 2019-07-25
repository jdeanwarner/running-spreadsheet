import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromActivity from './activity.reducer';
import * as fromActivityType from './activity-type.reducer';
import * as fromRunType from './run-type.reducer';
import * as fromYear from './year.reducer';

export interface LogState {
    activity: fromActivity.ActivityState;
    activityType: fromActivityType.ActivityTypeState;
    runType: fromRunType.RunTypeState;
    year: fromYear.YearState;
}

export const reducers: ActionReducerMap<LogState> = {
    activity: fromActivity.activityReducer,
    activityType: fromActivityType.activityTypeReducer,
    runType: fromRunType.runTypeReducer,
    year: fromYear.yearReducer
};

export const getLogState = createFeatureSelector<LogState>('log');

// activity state
export const getActivityState = createSelector(
    getLogState,
    (state: LogState) => state.activity
);

export const getActivities = createSelector(getActivityState, fromActivity.getActivities);
export const getActivitiesLoading = createSelector(getActivityState, fromActivity.getActivitiesLoading);
export const getActivitiesLoaded = createSelector(getActivityState, fromActivity.getActivitiesLoaded);

// activity type state
export const getActivityTypeState = createSelector(
    getLogState,
    (state: LogState) => state.activityType
);

export const getActivityTypes = createSelector(getActivityTypeState, fromActivityType.getActivityTypes);
export const getActivityTypesLoading = createSelector(getActivityTypeState, fromActivityType.getActivityTypesLoading);
export const getActivityTypesLoaded = createSelector(getActivityTypeState, fromActivityType.getActivityTypesLoaded);

// year state
export const getYearState = createSelector(
    getLogState,
    (state: LogState) => state.year
);

export const getYear = createSelector(getYearState, fromYear.getYear);

// run type state
export const getRunTypeState = createSelector(
    getLogState,
    (state: LogState) => state.runType
);

export const getRunTypes = createSelector(getRunTypeState, fromRunType.getRunTypes);
export const getRunTypesLoading = createSelector(getRunTypeState, fromRunType.getRunTypesLoading);
export const getRunTypesLoaded = createSelector(getRunTypeState, fromRunType.getRunTypesLoaded);
