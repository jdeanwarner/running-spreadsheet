import { GoalType } from './../../goal-type.enum';
import { YearGoal } from './../../year-goal';
import { MonthGoal } from './../../month-goal';
import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRace from '../reducers/goal.reducer';

export const getGoalsState = createSelector(
    fromFeature.getGoalState,
    (state: fromFeature.GoalState) => state.goal
);

export const getGoalsData = createSelector(getGoalsState, fromRace.getGoalsData);

export const getYearGoals = createSelector(
    getGoalsData,
    (data) => {
        return data
            .filter((goal) => (<YearGoal>goal).year !== undefined &&  (<MonthGoal>goal).month === undefined)
            .reduce(
                (map: { [type: string]: YearGoal }, goal) => {
                    return {
                        ... map,
                        [goal.type]: <YearGoal>goal
                    };
                }, {});
    }
);

export const getMonthGoals = createSelector(
    getGoalsData,
    (data) => {
        return data.filter((goal) => (<MonthGoal>goal).month !== undefined);
    }
);

export const getGoalsLoaded = createSelector(getGoalsState, fromRace.getGoalsLoaded);
export const getGoalsLoading = createSelector(getGoalsState, fromRace.getGoalsLoading);
