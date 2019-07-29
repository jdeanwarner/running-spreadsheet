import { Activity } from './../../../shared/activities/activity';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromActivity from '../reducers/activity.reducer';

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

export const getActivitiesLoading = createSelector(getActivityState, fromActivity.getActivitiesLoading);
export const getActivitiesLoaded = createSelector(getActivityState, fromActivity.getActivitiesLoaded);

export const getActivityTypes = createSelector(getActivityState, fromActivity.getActivityTypes);
export const getActivityTypesLoading = createSelector(getActivityState, fromActivity.getActivityTypesLoading);
export const getActivityTypesLoaded = createSelector(getActivityState, fromActivity.getActivityTypesLoaded);
