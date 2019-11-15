import { Goal } from './../../goal';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as goalActions from '../actions/goal.actions';

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
}
