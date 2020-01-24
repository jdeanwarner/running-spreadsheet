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
    count: {
      count: number;
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
    },
    count: {
      count: 0,
      loaded: false,
      loading: false
    }
};

function getActivityEntities(activities: Activity[]) {
    return activities.reduce(
        (map: { [id: number]: Activity }, activity) => {
            return {
                ... map,
                [activity.id]: activity
            };
    }, {});
}

export function reducer(state: ActivityState = initialState, action: fromActivities.ActivityActions):
    ActivityState {
    switch (action.type) {
        case fromActivities.LOAD_ACTIVITIES_BY_YEAR: {
            state.activities.loading = true;
            state.activities.loaded = false;
            return state;
        }
        case fromActivities.LOAD_ACTIVITIES_BY_YEAR_SUCCESS: {
            return {
                ... state,
                activities: {
                    loading: false,
                    loaded: true,
                    entities : getActivityEntities(action.playload)
                }
            };
        }
        case fromActivities.LOAD_ACTIVITIES_BY_YEAR_FAIL: {
            state.activities.loading = false;
            state.activities.loaded = false;
            return state;
        }
        case fromActivities.LOAD_ALL_ACTIVITIES: {
            state.activities.loaded = false;
            state.activities.loading = true;
            return state;
        }
        case fromActivities.LOAD_ALL_ACTIVITIES_SUCCESS: {
            return {
                ... state,
                activities: {
                    loading: false,
                    loaded: true,
                    entities : getActivityEntities(action.playload)
                }
            };
        }
        case fromActivities.LOAD_ALL_ACTIVITIES_FAIL: {
            state.activities.loading = false;
            state.activities.loaded = false;
            return state;
        }
        case fromActivities.LOAD_ACTIVITIES_COUNT: {
          state.count.loaded = false;
          state.count.loading = true;
          return state;
      }
      case fromActivities.LOAD_ACTIVITIES_COUNT_SUCCESS: {
          return {
              ... state,
              count: {
                  loading: false,
                  loaded: true,
                  count : action.playload
              }
          };
      }
      case fromActivities.LOAD_ACTIVITIES_COUNT_FAIL: {
          state.count.loading = false;
          state.count.loaded = false;
          return state;
      }
        case fromActivities.LOAD_ACTIVITY_TYPES: {
            state.types.loading = true;
            state.types.loaded = false;
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

export const getActivitiesCountLoading = (state: ActivityState) => state.count.loading;
export const getActivitiesCountLoaded = (state: ActivityState) => state.count.loaded;
export const getActivitiesCount = (state: ActivityState) => state.count.count;

export const getActivitiesLoading = (state: ActivityState) => state.activities.loading;
export const getActivitiesLoaded = (state: ActivityState) => state.activities.loaded;
export const getActivitiesEntites = (state: ActivityState) => state.activities.entities;

export const getActivityTypesLoading = (state: ActivityState) => state.types.loading;
export const getActivityTypesLoaded = (state: ActivityState) => state.types.loaded;
export const getActivityTypes = (state: ActivityState) => state.types.data;
