import { Goal } from './../../goal';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as goalActions from '../actions/goal.actions';
import * as fromRoot from '../../../store';

@Injectable()
export class GoalEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService,
        private store: Store<fromRoot.State>
    ) {}

    @Effect()
    loadGoals$: Observable<Action> =  this.actions$.pipe(
      ofType(goalActions.LOAD_YEAR_GOALS),
      withLatestFrom(
        this.store.select(fromRoot.getRouterState),
        (action, router) => parseInt(router.state.params.year, 10)
      ),
      mergeMap((year: number) => this.activityService.getGoals(year)
          .pipe(
            map((goals: Goal[]) => new goalActions.LoadYearGoalsSuccess(goals)),
            catchError(error => of(new goalActions.LoadYearGoalsFail(error)))
          )
        )
    );
}
