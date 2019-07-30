import { Activity } from 'src/app/shared/activities/activity';
import * as fromActivities from '../actions/activity.action';
import { ActivityType } from 'src/app/shared/activities/activity-type';

export interface ActivityState {
    types: {
        data: ActivityType[];
        loaded: boolean;
        loading: boolean;
    };
    activities: {
        entities: { [id: number]: Activity };
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: ActivityState = {
    types: {
        data: [],
        loaded: false,
        loading: false
    },
    activities: {
        entities: {},
        loaded: false,
        loading: false
    }
};

export function reducer(state: ActivityState = initialState, action: fromActivities.ActivityActions):
    ActivityState {
    switch (action.type) {
        case fromActivities.LOAD_ACTIVITY: {
            state.activities.loading = true;
            return state;
        }
        case fromActivities.LOAD_ACTIVITY_SUCCESS: {
            const activities = action.playload;
            const entities = activities.reduce(
                (activity: { [id: number]: Activity }, list) => {
                    return {
                        ... activity,
                        [list.id]: list
                    };
                }, {
                ...state.activities.entities
            });
            return {
                ... state,
                activities: {
                    loading: false,
                    loaded: true,
                    entities
                }
            };
        }
        case fromActivities.LOAD_ACTIVITY_FAIL: {
            state.activities.loading = false;
            state.activities.loaded = false;
            return state;
        }
        case fromActivities.LOAD_ACTIVITY_TYPES: {
            state.types.loading = true;
            return state;
        }
        case fromActivities.LOAD_ACTIVITY_TYPES_SUCCESS: {
            const data = action.playload;
            return {
                ... state,
                types: {
                    loading: false,
                    loaded: true,
                    data: data
                }
            };
        }
        case fromActivities.LOAD_ACTIVITY_TYPES_FAIL: {
            state.types.loading = false;
            state.types.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getActivitiesLoading = (state: ActivityState) => state.activities.loading;
export const getActivitiesLoaded = (state: ActivityState) => state.activities.loaded;
export const getActivitiesEntites = (state: ActivityState) => state.activities.entities;

export const getActivityTypesLoading = (state: ActivityState) => state.types.loading;
export const getActivityTypesLoaded = (state: ActivityState) => state.types.loaded;
export const getActivityTypes = (state: ActivityState) => state.types.data;
