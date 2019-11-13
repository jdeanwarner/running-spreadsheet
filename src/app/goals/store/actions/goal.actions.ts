import { YearGoal } from './../../year-goal';
import { Action } from '@ngrx/store';
import { Goal } from '../../goal';

export const LOAD_YEAR_GOALS = '[Goal] Load Year Goals Completed';
export const LOAD_YEAR_GOALS_SUCCESS = '[Goal] Load Year Goals Completed Success';
export const LOAD_YEAR_GOALS_FAIL = '[Goal] Load Year Goals Completed Fail';

export class LoadYearGoals implements Action {
    readonly type = LOAD_YEAR_GOALS;
}

export class LoadYearGoalsSuccess implements Action {
    readonly type = LOAD_YEAR_GOALS_SUCCESS;
    constructor(public playload: Goal[]) {}
}

export class LoadYearGoalsFail implements Action {
    readonly type = LOAD_YEAR_GOALS_FAIL;
    constructor(public playload: any) {}
}

export type GoalActions =
    LoadYearGoals |
    LoadYearGoalsSuccess |
    LoadYearGoalsFail;
