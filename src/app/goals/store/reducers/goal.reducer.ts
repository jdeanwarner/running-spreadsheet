import * as fromGoal from '../actions/goal.actions';
import { State } from 'src/app/shared/state.enum';

export interface GoalState {
    states: {
        data: State[];
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: GoalState = {
    states: {
        data: [],
        loaded: false,
        loading: false
    }
};

export function reducer(state: GoalState = initialState, action: fromGoal.GoalActions):
    GoalState {
    switch (action.type) {
        case fromGoal.LOAD_STATES_COMPLETED: {
            state.states.loading = true;
            state.states.loaded = false;
            return state;
        }
        case fromGoal.LOAD_STATES_COMPLETED_SUCCESS: {
            const states = action.playload;
            return {
                ... state,
                states: {
                    loading: false,
                    loaded: true,
                    data : states
                }
            };
        }
        case fromGoal.LOAD_STATES_COMPLETED_FAIL: {
            state.states.loading = false;
            state.states.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getStatesCompletedLoading = (state: GoalState) => state.states.loading;
export const getStatesCompletedLoaded = (state: GoalState) => state.states.loaded;
export const getStatesCompletedData = (state: GoalState) => state.states.data;
