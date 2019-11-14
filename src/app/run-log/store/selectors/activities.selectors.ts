import { Activity } from './../../../shared/activities/activity';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromActivity from '../reducers/activity.reducer';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';

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
