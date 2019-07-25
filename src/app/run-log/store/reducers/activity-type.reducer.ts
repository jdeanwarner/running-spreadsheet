import { ActivityType } from '../../../shared/activities/activity-type';
import * as fromActivities from '../actions/activity-type.action';

export interface ActivityTypeState {
    data: ActivityType[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: ActivityTypeState = {
    data: [],
    loaded: false,
    loading: false
};

export function activityTypeReducer(state: ActivityTypeState = initialState, action: fromActivities.ActivityTypeActions):
    ActivityTypeState {
    switch (action.type) {
        case fromActivities.LOAD_ACTIVITY_TYPES: {
            return {
                ... state,
                loading: true
            };
        }
        case fromActivities.LOAD_ACTIVITY_TYPES_SUCCESS: {
            const data = action.playload;
            return {
                ... state,
                loading: false,
                loaded: true,
                data: data
            };
        }
        case fromActivities.LOAD_ACTIVITY_TYPES_FAIL: {
            return {
                ... state,
                loading: false,
                loaded: false
            };
        }
        default:
            return state;
    }

    return state;
}

export const getActivityTypesLoading = (state: ActivityTypeState) => state.loading;
export const getActivityTypesLoaded = (state: ActivityTypeState) => state.loaded;
export const getActivityTypes = (state: ActivityTypeState) => state.data;
