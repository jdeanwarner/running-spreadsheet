import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromActivity from './activity.reducer';
import * as fromRunType from './run-type.reducer';
import * as fromYear from './year.reducer';

export interface LogState {
    activity: fromActivity.ActivityState;
    runType: fromRunType.RunTypeState;
    year: fromYear.YearState;
}

export const reducers: ActionReducerMap<LogState> = {
    activity: fromActivity.activityReducer,
    runType: fromRunType.runTypeReducer,
    year: fromYear.yearReducer
};

export const getLogState = createFeatureSelector<LogState>('log');

// activity state
export const getActivityState = createSelector(
    getLogState,
    (state: LogState) => state.activity
);

export const getActivitiesEntites = createSelector(getActivityState, fromActivity.getActivitiesEntites);

export const getAllActivities = createSelector(
    getActivitiesEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getActivitiesLoading = createSelector(getActivityState, fromActivity.getActivitiesLoading);
export const getActivitiesLoaded = createSelector(getActivityState, fromActivity.getActivitiesLoaded);

export const getActivityTypes = createSelector(getActivityState, fromActivity.getActivityTypes);
export const getActivityTypesLoading = createSelector(getActivityState, fromActivity.getActivityTypesLoading);
export const getActivityTypesLoaded = createSelector(getActivityState, fromActivity.getActivityTypesLoaded);

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
