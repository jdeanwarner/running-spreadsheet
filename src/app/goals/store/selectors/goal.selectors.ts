import { Race } from 'src/app/shared/race';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromRace from '../reducers/goal.reducer';

export const getGoalsState = createSelector(
    fromFeature.getRaceState,
    (state: fromFeature.GoalState) => state.goal
);

export const getStatesCompletedData = createSelector(getGoalsState, fromRace.getStatesCompletedData);

export const getStatesCompletedDistinct = createSelector(
    getStatesCompletedData,
    (data) => {
        return data.filter((x, i, a) => a.indexOf(x) === i);
    }
);


export const getStatesCompletedLoaded = createSelector(getGoalsState, fromRace.getStatesCompletedLoaded);
export const getStatesCompletedLoading = createSelector(getGoalsState, fromRace.getStatesCompletedLoading);
