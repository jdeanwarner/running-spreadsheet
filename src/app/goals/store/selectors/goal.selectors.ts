import { Goal } from './../../goal';
import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromGoal from '../reducers/goal.reducer';

export const getGoalsState = createSelector(
    fromFeature.getGoalState,
    (state: fromFeature.GoalState) => state.goals
);

export const getGoalsData = createSelector(getGoalsState, fromGoal.getGoalsData);

export const getGoalsEntities = createSelector(
    getGoalsData,
    (data) => {
        return data
            .reduce(
                (map: { [type: string]: Goal }, goal) => {
                    return {
                        ... map,
                        [goal.id]: goal
                    };
                }, {});
    }
);

export const getGoalsLoaded = createSelector(getGoalsState, fromGoal.getGoalsLoaded);
export const getGoalsLoading = createSelector(getGoalsState, fromGoal.getGoalsLoading);
