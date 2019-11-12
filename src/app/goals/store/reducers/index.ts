import * as fromGoal from './goal.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface GoalState {
    goal: fromGoal.GoalState;
}

export const reducers: ActionReducerMap<GoalState> = {
    goal : fromGoal.reducer,
};

export const getRaceState = createFeatureSelector<GoalState>('goals');
