import * as fromRunTypes from '../actions/run-type.action';
import { RunType } from 'src/app/shared/activities/run-type';

export interface RunTypeState {
    entities: { [id: number]: RunType };
    loaded: boolean;
    loading: boolean;
}

export const initialState: RunTypeState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(state: RunTypeState = initialState, action: fromRunTypes.RunTypeActions):
    RunTypeState {
    switch (action.type) {
        case fromRunTypes.LOAD_RUN_TYPES: {
            return {
                ... state,
                loading: true
            };
        }
        case fromRunTypes.LOAD_RUN_TYPES_SUCCESS: {
            const runType = action.playload;

            const entities = runType.reduce(
                (activity: { [id: number]: RunType }, list) => {
                    return {
                        ... activity,
                        [list.id]: list
                    };
                }, {
                ...state.entities
            });
            return {
                ... state,
                loading: false,
                loaded: true,
                entities: entities
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
export const getRunTypesEntities = (state: RunTypeState) => state.entities;
