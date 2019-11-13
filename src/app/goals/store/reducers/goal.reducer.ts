import * as fromGoal from '../actions/goal.actions';
import { State } from 'src/app/shared/state.enum';
import { Goal } from '../../goal';

export interface GoalState {
    goals: {
        data: Goal[];
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: GoalState = {
    goals: {
        data: [],
        loaded: false,
        loading: false
    }
};

export function reducer(state: GoalState = initialState, action: fromGoal.GoalActions):
    GoalState {
    switch (action.type) {
        case fromGoal.LOAD_YEAR_GOALS: {
            state.goals.loading = true;
            state.goals.loaded = false;
            return state;
        }
        case fromGoal.LOAD_YEAR_GOALS_SUCCESS: {
            const states = action.playload;
            return {
                ... state,
                goals: {
                    loading: false,
                    loaded: true,
                    data : states
                }
            };
        }
        case fromGoal.LOAD_YEAR_GOALS_FAIL: {
            state.goals.loading = false;
            state.goals.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getGoalsLoading = (state: GoalState) => state.goals.loading;
export const getGoalsLoaded = (state: GoalState) => state.goals.loaded;
export const getGoalsData = (state: GoalState) => state.goals.data;
