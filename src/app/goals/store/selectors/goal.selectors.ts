import { Activity } from 'src/app/shared/activities/activity';
import { SumPropertyGoal } from './../../sum-property.goal';
import { Goal } from './../../goal';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromGoal from '../reducers/goal.reducer';
import { GoalType } from '../../goal-type.enum';
import { DefaultProjectorFn } from '@ngrx/store/src/selector';
import { CountActivityGoal } from '../../count-activity.goal';

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

export const getPinnedGoals = createSelector(
    getGoalsData,
    (goals: Goal[]) => goals.filter((goal: Goal) => goal.pinned)
);

export const getActiveGoals = createSelector(
    getGoalsData,
    (goals: Goal[]) => goals.filter((goal: Goal) =>
        new Date().getTime() > goal.startDate.toDate().getTime() &&
        new Date().getTime() < goal.endDate.toDate().getTime() &&
        !goal.pinned)
);

export const getPastGoals = createSelector(
    getGoalsData,
    (goals: Goal[]) => goals.filter((goal: Goal) =>
        new Date().getTime() > goal.endDate.toDate().getTime() &&
        !goal.pinned)
);

export const getFutureGoals = createSelector(
    getGoalsData,
    (goals: Goal[]) => goals.filter((goal: Goal) =>
        new Date().getTime() < goal.startDate.toDate().getTime() &&
        !goal.pinned)
);

export const getGoalResultsMap =
    (activitySelector: MemoizedSelector<object, Activity[], DefaultProjectorFn<Activity[]>>,
    goalSelector: MemoizedSelector<object, Goal[], DefaultProjectorFn<Goal[]>>) => createSelector(
    activitySelector,
    goalSelector,
    (activities, goals) => {
        const goalMap: {[ id: string ]: number} = {};
        goals.map((goal: Goal) => {
            switch (goal.type) {
                case GoalType.SUM_PROPERTY:
                    goalMap[goal.id] = sumPropertyGoal(<SumPropertyGoal>goal, activities);
                    break;
                case GoalType.COUNT_ACTIVITY:
                    goalMap[goal.id] = countActivityGoal(<CountActivityGoal>goal, activities);
            }
        });
        return goalMap;
    });

function sumPropertyGoal(goal: SumPropertyGoal, activities: Activity[]): number {
    return activities
        .filter((activity: Activity) => activity.activityType === goal.activityType)
        .map((activity: any) => <number>activity[goal.property])
        .reduce((prev, curr) => prev + curr);
}

function countActivityGoal(goal: CountActivityGoal, activities: Activity[]): number {
    return activities
        .filter((activity: Activity) => goal.activityTypes.includes(activity.activityType))
        .length;
}


export const getGoalsLoaded = createSelector(getGoalsState, fromGoal.getGoalsLoaded);
export const getGoalsLoading = createSelector(getGoalsState, fromGoal.getGoalsLoading);
