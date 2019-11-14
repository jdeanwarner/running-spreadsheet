import { Month } from 'src/app/shared/month.enum';
import { Activity } from './../../../shared/activities/activity';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromActivity from '../reducers/activity.reducer';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';

export const getActivityState = createSelector(
    fromFeature.getLogState,
    (state: fromFeature.LogState) => state.activity
);

export const getActivitiesEntites = createSelector(getActivityState, fromActivity.getActivitiesEntites);

export const getSelectedActivity = createSelector(
    getActivitiesEntites,
    fromRoot.getRouterState,
    (entities, router): Activity => {
        return router.state && entities[router.state.params.activityId];
    }
);

export const getAllActivities = createSelector(
    getActivitiesEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getActivitiesMonthMap = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        const entities: {[month: string]: Activity[]} = {};
        const months = Object.values(Month);

        data.forEach((activity: Activity) => entities[months[activity.date.toDate().getMonth()].valueOf()] ?
                entities[months[activity.date.toDate().getMonth()].valueOf()].push(activity) :
                entities[months[activity.date.toDate().getMonth()].valueOf()] = [activity]);
        return entities;
    }
);

export const getTotalRunningMiles = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        return Math.round(data
            .filter((activiy: Activity) => activiy.activityType === ActivityTypeEnum.RUN)
            .map((activiy: Activity) => (<Run>activiy).distance)
            .reduce((prev, curr) => prev + curr, 0) * 100) / 100;
    }
);

export const getCountHighEffortRuns = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        return data
            .filter((activiy: Activity) => activiy.activityType === ActivityTypeEnum.RUN)
            .filter((activiy: Activity) => (<Run>activiy).runType)
            .length;
    }
);

export const getRunTypeMap = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        const entities: {[type: string]: Activity[]} = {};

        data
            .filter((activiy: Activity) => activiy.activityType === ActivityTypeEnum.RUN)
            .filter((activiy: Activity) => (<Run>activiy).runType)
            .forEach((activiy: Activity) => entities[(<Run>activiy).runType] ?
                entities[(<Run>activiy).runType].push(activiy) :
                entities[(<Run>activiy).runType] = [activiy]);
        return entities;
    }
);

export const getCountWorkouts = createSelector(
    getAllActivities,
    (data: Activity[]) => getRunTypeCounts(data, RunTypeEnum.WORKOUT)
);

export const getCountLongRuns = createSelector(
    getAllActivities,
    (data: Activity[]) => getRunTypeCounts(data, RunTypeEnum.LONG_RUN)
);

export const getCountRaces = createSelector(
    getAllActivities,
    (data: Activity[]) => getRunTypeCounts(data, RunTypeEnum.RACE)
);

function getRunTypeCounts(data: Activity[], type: RunTypeEnum): number {
    return data
        .filter((activiy: Activity) => activiy.activityType === ActivityTypeEnum.RUN)
        .filter((activiy: Activity) => (<Run>activiy).runType === type)
        .length;
}

export const getCrossTrainingMap = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        const entities: {[type: string]: Activity[]} = {};

        data
            .filter((activiy: Activity) => activiy.activityType !== ActivityTypeEnum.RUN)
            .forEach((activiy: Activity) => entities[activiy.activityType] ?
                entities[activiy.activityType].push(activiy) :
                entities[activiy.activityType] = [activiy]);
        return entities;
    }
);

export const getCountYoga = createSelector(
    getAllActivities,
    (data: Activity[]) => getCrossTrainingCounts(data, ActivityTypeEnum.YOGA)
);

export const getCountBike = createSelector(
    getAllActivities,
    (data: Activity[]) => getCrossTrainingCounts(data, ActivityTypeEnum.BIKE)
);

export const getCountGym = createSelector(
    getAllActivities,
    (data: Activity[]) => getCrossTrainingCounts(data, ActivityTypeEnum.GYM)
);

export const getCountKettlebell = createSelector(
    getAllActivities,
    (data: Activity[]) => getCrossTrainingCounts(data, ActivityTypeEnum.KETTLEBELL)
);

function getCrossTrainingCounts(data: Activity[], type: ActivityTypeEnum): number {
    return data
        .filter((activiy: Activity) => activiy.activityType === type)
        .length;
}

export const getCountCrossTrainingActivities = createSelector(
    getAllActivities,
    (data: Activity[]) => {
        return data
            .filter((activiy: Activity) => activiy.activityType !== ActivityTypeEnum.RUN)
            .length;
    }
);

export const getActivitiesLoading = createSelector(getActivityState, fromActivity.getActivitiesLoading);
export const getActivitiesLoaded = createSelector(getActivityState, fromActivity.getActivitiesLoaded);

export const getActivityTypes = createSelector(getActivityState, fromActivity.getActivityTypes);
export const getActivityTypesLoading = createSelector(getActivityState, fromActivity.getActivityTypesLoading);
export const getActivityTypesLoaded = createSelector(getActivityState, fromActivity.getActivityTypesLoaded);
