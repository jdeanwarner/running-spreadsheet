import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromActivity from './activity.reducer';
import * as fromRunType from './run-type.reducer';
import * as fromYear from './year.reducer';

export interface LogState {
    activity: fromActivity.ActivityState;
    runTypes: fromRunType.RunTypeState;
    year: fromYear.YearState;
}

export const reducers: ActionReducerMap<LogState> = {
    activity: fromActivity.reducer,
    runTypes: fromRunType.reducer,
    year: fromYear.reducer
};

export const getLogState = createFeatureSelector<LogState>('log');

// year state
export const getYearState = createSelector(
    getLogState,
    (state: LogState) => state.year
);

export const getYear = createSelector(getYearState, fromYear.getYear);

// run type state
export const getRunTypeState = createSelector(
    getLogState,
    (state: LogState) => state.runTypes
);

export const getRunTypesEntities = createSelector(getRunTypeState, fromRunType.getRunTypesEntities);

export const getRunTypes = createSelector(
    getRunTypesEntities,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getRunTypesLoading = createSelector(getRunTypeState, fromRunType.getRunTypesLoading);
export const getRunTypesLoaded = createSelector(getRunTypeState, fromRunType.getRunTypesLoaded);
