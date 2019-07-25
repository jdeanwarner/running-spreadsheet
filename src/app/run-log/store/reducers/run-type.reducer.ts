import * as fromRunTypes from '../actions/run-type.action';
import { RunType } from 'src/app/shared/activities/run-type';

export interface RunTypeState {
    data: RunType[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: RunTypeState = {
    data: [],
    loaded: false,
    loading: false
};

export function runTypeReducer(state: RunTypeState = initialState, action: fromRunTypes.RunTypeActions):
    RunTypeState {
    switch (action.type) {
        case fromRunTypes.LOAD_RUN_TYPES: {
            return {
                ... state,
                loading: true
            };
        }
        case fromRunTypes.LOAD_RUN_TYPES_SUCCESS: {
            const data = action.playload;
            return {
                ... state,
                loading: false,
                loaded: true,
                data: data
            };
        }
        case fromRunTypes.LOAD_RUN_TYPES_FAIL: {
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

export const getRunTypesLoading = (state: RunTypeState) => state.loading;
export const getRunTypesLoaded = (state: RunTypeState) => state.loaded;
export const getRunTypes = (state: RunTypeState) => state.data;
