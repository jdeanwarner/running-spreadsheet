import * as fromGoal from './goal.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface GoalState {
    goals: fromGoal.GoalState;
}

export const reducers: ActionReducerMap<GoalState> = {
    goals : fromGoal.reducer,
};

export const getGoalState = createFeatureSelector<GoalState>('goals');
