import { DocumentReference } from '@angular/fire/firestore';
import { Goal } from './../../goal';
import { Action } from '@ngrx/store';

export const LOAD_YEAR_GOALS = '[Goal] Load Year Goals Completed';
export const LOAD_YEAR_GOALS_SUCCESS = '[Goal] Load Year Goals Completed Success';
export const LOAD_YEAR_GOALS_FAIL = '[Goal] Load Year Goals Completed Fail';

export const ADD_GOAL = '[Goal] Add Goal';
export const ADD_GOAL_SUCCESS = '[Goal] Add Goal Success';
export const ADD_GOAL_FAIL = '[Goal] Add Goal Fail';

export const UPDATE_GOAL = '[Goal] Update Goal';
export const UPDATE_GOAL_SUCCESS = '[Goal] Update Goal Success';
export const UPDATE_GOAL_FAIL = '[Goal] Update Goal Fail';

export const DELETE_GOAL = '[Goal] Delete Goal';
export const DELETE_GOAL_SUCCESS = '[Goal] Delete Goal Success';
export const DELETE_GOAL_FAIL = '[Goal] Delete Goal Fail';

export class LoadYearGoals implements Action {
    readonly type = LOAD_YEAR_GOALS;
    constructor(public playload: string) {}
}

export class LoadYearGoalsSuccess implements Action {
    readonly type = LOAD_YEAR_GOALS_SUCCESS;
    constructor(public playload: Goal[]) {}
}

export class LoadYearGoalsFail implements Action {
    readonly type = LOAD_YEAR_GOALS_FAIL;
    constructor(public playload: any) {}
}

export class AddGoal implements Action {
    readonly type = ADD_GOAL;
    constructor(public playload: Goal) {}
}

export class AddGoalSuccess implements Action {
    readonly type = ADD_GOAL_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class AddGoalFail implements Action {
    readonly type = ADD_GOAL_FAIL;
    constructor(public playload: any) {}
}

export class UpdateGoal implements Action {
    readonly type = UPDATE_GOAL;
    constructor(public playload: Goal) {}
}

export class UpdateGoalSuccess implements Action {
    readonly type = UPDATE_GOAL_SUCCESS;
}

export class UpdateGoalFail implements Action {
    readonly type = UPDATE_GOAL_FAIL;
    constructor(public playload: any) {}
}

export class DeleteGoal implements Action {
    readonly type = DELETE_GOAL;
    constructor(public playload: string) {}
}

export class DeleteGoalSuccess implements Action {
    readonly type = DELETE_GOAL_SUCCESS;
}

export class DeleteGoalFail implements Action {
    readonly type = DELETE_GOAL_FAIL;
    constructor(public playload: any) {}
}

export type GoalActions =
    LoadYearGoals |
    LoadYearGoalsSuccess |
    LoadYearGoalsFail |
    AddGoal |
    AddGoalSuccess |
    AddGoalFail |
    UpdateGoal |
    UpdateGoalSuccess |
    UpdateGoalFail |
    DeleteGoal |
    DeleteGoalSuccess |
    DeleteGoalFail;
