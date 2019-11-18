import { Swim } from './../../../shared/activities/swim';
import { Kettlebell } from 'src/app/shared/activities/kettlebell';
import { Bike } from './../../../shared/activities/bike';
import { Run } from 'src/app/shared/activities/run';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Activity } from 'src/app/shared/activities/activity';
import { SumPropertyGoal } from './../../sum-property.goal';
import { Goal } from './../../goal';
import { createSelector, MemoizedSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromGoal from '../reducers/goal.reducer';
import * as fromActivities from '../../../run-log/store';
import { Type } from '@angular/compiler';
import { GoalType } from '../../goal-type.enum';
import { DefaultProjectorFn } from '@ngrx/store/src/selector';

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

export const getGoalResultsMap = (activitySelector: MemoizedSelector<object, Activity[], DefaultProjectorFn<Activity[]>>) => createSelector(
    activitySelector,
    getGoalsData,
    (activities, goals) => {
        const goalMap: {[ id: string ]: number} = {};
        goals.map((goal: Goal) => {
            switch (goal.type) {
                case GoalType.SUM_PROPERTY:
                    goalMap[goal.id] = sumPropertyGoal(<SumPropertyGoal>goal, activities);
                    break;
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


export const getGoalsLoaded = createSelector(getGoalsState, fromGoal.getGoalsLoaded);
export const getGoalsLoading = createSelector(getGoalsState, fromGoal.getGoalsLoading);
