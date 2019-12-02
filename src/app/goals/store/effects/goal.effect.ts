import { Goal } from '../../goal';
import { ActivityService } from '../../../shared/services/activity.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
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

    loadGoals$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(goalActions.LOAD_YEAR_GOALS),
        mergeMap(() => this.activityService.getGoals()
            .pipe(
              map((goals: Goal[]) => new goalActions.LoadYearGoalsSuccess(goals)),
              catchError(error => {
                console.log(error);
                return of(new goalActions.LoadYearGoalsFail(error));
              })
            )
          )
      )
    );

    addGoals$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(goalActions.ADD_GOAL),
        mergeMap((addAction: goalActions.AddGoal) => this.activityService.insertGoal(addAction.playload)
          .then((ref: DocumentReference) => new goalActions.AddGoalSuccess(ref))
          .catch((error) => new goalActions.AddGoalFail(error))
        )
      )
    );

    updateGoals$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(goalActions.UPDATE_GOAL),
        mergeMap((updateAction: goalActions.UpdateGoal) => this.activityService.updateGoal(updateAction.playload)
          .then(() => new goalActions.UpdateGoalSuccess())
          .catch((error) => new goalActions.UpdateGoalFail(error))
        )
      )
    );

    deleteGoals$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(goalActions.DELETE_GOAL),
        mergeMap((deleteAction: goalActions.DeleteGoal) => this.activityService.deleteGoal(deleteAction.playload)
          .then(() => new goalActions.DeleteGoalSuccess())
          .catch((error) => new goalActions.DeleteGoalFail(error))
        )
      )
    );
}
