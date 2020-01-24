import { LogState } from './../reducers/index';
import { getRouterState } from '../../../store/reducers/index';
import { Month } from 'src/app/shared/month.enum';
import { Activity } from '../../../shared/activities/activity';
import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromActivity from '../reducers/activity.reducer';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';

export const getActivitiesState = createSelector(
    fromFeature.getLogState,
    (state: fromFeature.LogState) => state.activity
);

export const getActivitiesEntites = createSelector(getActivitiesState, fromActivity.getActivitiesEntites);

export const getSelectedActivity = createSelector(
    getActivitiesEntites,
    getRouterState,
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

export const getActivitiesByYear = createSelector(
    getAllActivities,
    fromFeature.getLogState,
    (data: Activity[], state: LogState) =>
        data.filter((activity: Activity) => activity.date.toDate().getFullYear() === state.year.data)

);

export const getActivitiesMonthMap = createSelector(
    getActivitiesByYear,
    (data: Activity[]) => {
        const entities: {[month: string]: Activity[]} = {};
        const months = Object.values(Month);

        data.forEach((activity: Activity) => entities[months[activity.date.toDate().getMonth()].valueOf()] ?
                entities[months[activity.date.toDate().getMonth()].valueOf()].push(activity) :
                entities[months[activity.date.toDate().getMonth()].valueOf()] = [activity]);
        return entities;
    }
);

export const getActivitiesYearMap = createSelector(
  getAllActivities,
  (data: Activity[]) => {
      const entities: {[year: number]: Activity[]} = {};

      data.forEach((activity: Activity) => entities[activity.date.toDate().getFullYear()] ?
              entities[activity.date.toDate().getFullYear()].push(activity) :
              entities[activity.date.toDate().getFullYear()] = [activity]);
      return entities;
  }
);

export const getActivitiesYearMonthMap = createSelector(
  getAllActivities,
  (data: Activity[]) => {
      const entities: {[year: number]: {[month: number]: Activity[]}} = {};

      data.forEach((activity: Activity) => {
        if ( entities[activity.date.toDate().getFullYear()] ) {
          if ( entities[activity.date.toDate().getFullYear()][activity.date.toDate().getMonth()] ) {
            entities[activity.date.toDate().getFullYear()][activity.date.toDate().getMonth()].push(activity);
          } else {
            entities[activity.date.toDate().getFullYear()][activity.date.toDate().getMonth()] = [activity];
          }
        } else {
          entities[activity.date.toDate().getFullYear()] = {};
          entities[activity.date.toDate().getFullYear()][activity.date.toDate().getMonth()] = [activity];
        }
      });

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
            .map((activiy: Activity) => entities[(<Run>activiy).runType] ?
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
            .map((activiy: Activity) => entities[activiy.activityType] ?
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

export const getActivitiesCountLoading = createSelector(getActivitiesState, fromActivity.getActivitiesCountLoading);
export const getActivitiesCountLoaded = createSelector(getActivitiesState, fromActivity.getActivitiesCountLoaded);
export const getActivitiesCount = createSelector(getActivitiesState, fromActivity. getActivitiesCount);

export const getActivitiesLoading = createSelector(getActivitiesState, fromActivity.getActivitiesLoading);
export const getActivitiesLoaded = createSelector(getActivitiesState, fromActivity.getActivitiesLoaded);

export const getActivityTypes = createSelector(getActivitiesState, fromActivity.getActivityTypes);
export const getActivityTypesLoading = createSelector(getActivitiesState, fromActivity.getActivityTypesLoading);
export const getActivityTypesLoaded = createSelector(getActivitiesState, fromActivity.getActivityTypesLoaded);
