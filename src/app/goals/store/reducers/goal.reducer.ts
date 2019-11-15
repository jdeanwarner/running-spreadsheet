import * as fromGoal from '../actions/goal.actions';
import { State } from 'src/app/shared/state.enum';
import { Goal } from '../../goal';

export interface GoalState {
    data: Goal[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: GoalState = {
    data: [],
    loaded: false,
    loading: false
};

export function reducer(state: GoalState = initialState, action: fromGoal.GoalActions):
    GoalState {
    switch (action.type) {
        case fromGoal.LOAD_YEAR_GOALS: {
            state.loading = true;
            state.loaded = false;
            return state;
        }
        case fromGoal.LOAD_YEAR_GOALS_SUCCESS: {
            const states = action.playload;
            return {
                ... state,
                loading: false,
                loaded: true,
                data : states
            };
        }
        case fromGoal.LOAD_YEAR_GOALS_FAIL: {
            state.loading = false;
            state.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getGoalsLoading = (state: GoalState) => state.loading;
export const getGoalsLoaded = (state: GoalState) => state.loaded;
export const getGoalsData = (state: GoalState) => state.data;
