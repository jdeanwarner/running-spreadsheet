import { Goal } from './../../goal';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as goalActions from '../actions/goal.actions';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class GoalEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService
    ) {}

    @Effect()
    loadGoals$: Observable<Action> =  this.actions$.pipe(
      ofType(goalActions.LOAD_YEAR_GOALS),
      mergeMap((loadAction: goalActions.LoadYearGoals) => this.activityService.getGoals(parseInt(loadAction.playload, 10))
          .pipe(
            map((goals: Goal[]) => new goalActions.LoadYearGoalsSuccess(goals)),
            catchError(error => of(new goalActions.LoadYearGoalsFail(error)))
          )
        )
    );

    @Effect()
    addGoals$: Observable<Action> =  this.actions$.pipe(
      ofType(goalActions.ADD_GOAL),
      mergeMap((addAction: goalActions.AddGoal) => this.activityService.insertGoal(addAction.playload)
        .then((ref: DocumentReference) => new goalActions.AddGoalSuccess(ref))
        .catch((error) => new goalActions.AddGoalFail(error))
      )
    );

    @Effect()
    updateGoals$: Observable<Action> =  this.actions$.pipe(
      ofType(goalActions.UPDATE_GOAL),
      mergeMap((updateAction: goalActions.UpdateGoal) => this.activityService.updateGoal(updateAction.playload)
        .then(() => new goalActions.UpdateGoalSuccess())
        .catch((error) => new goalActions.UpdateGoalFail(error))
      )
    );

    @Effect()
    deleteGoals$: Observable<Action> =  this.actions$.pipe(
      ofType(goalActions.DELETE_GOAL),
      mergeMap((deleteAction: goalActions.DeleteGoal) => this.activityService.deleteGoal(deleteAction.playload)
        .then(() => new goalActions.DeleteGoalSuccess())
        .catch((error) => new goalActions.DeleteGoalFail(error))
      )
    );
}
