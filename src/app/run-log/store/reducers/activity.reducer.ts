import { Activity } from 'src/app/shared/activities/activity';
import * as fromActivities from '../actions/activity.action';

export interface ActivityState {
    data: Activity[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: ActivityState = {
    data: [],
    loaded: false,
    loading: false
};

export function activityReducer(state: ActivityState = initialState, action: fromActivities.ActivityActions):
    ActivityState {
    switch (action.type) {
        case fromActivities.LOAD_ACTIVITY: {
            return {
                ... state,
                loading: true
            };
        }
        case fromActivities.LOAD_ACTIVITY_SUCCESS: {
            const data = action.playload;
            return {
                ... state,
                loading: false,
                loaded: true,
                data: data
            };
        }
        case fromActivities.LOAD_ACTIVITY_FAIL: {
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

export const getActivitiesLoading = (state: ActivityState) => state.loading;
export const getActivitiesLoaded = (state: ActivityState) => state.loaded;
export const getActivities = (state: ActivityState) => state.data;
