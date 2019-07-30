import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as activityActions from '../actions/activity.action';
import * as fromRoot from '../../../store';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { YearState } from '../reducers/year.reducer';

@Injectable()
export class ActivityEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private store: Store<fromRoot.State>
  ) {}

  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITY),
      withLatestFrom(
        this.store.select(fromRoot.getRouterState),
        (action, router) => parseInt(router.state.params.year, 10)
      ),
      mergeMap((year: number) => this.activityService.getActivitiesByYear(year)
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadActivitiesSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadActivitiesFail(error)))
          )
      )
  );

  @Effect()
  loadActivitiesOnRouteChange$: Observable<Action> = this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITY),
      mergeMap(() => this.activityService.getActivitiesByYear(2019)
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadActivitiesSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadActivitiesFail(error)))
          )
        )
  );


  @Effect()
  loadActivityTypes$: Observable<Action> =  this.actions$.pipe(
    ofType(activityActions.LOAD_ACTIVITY_TYPES),
    mergeMap(() => this.activityService.getActivityTypes()
        .pipe(
          map((activityTypes: ActivityType[]) => (new activityActions.LoadTypeSuccess(activityTypes))),
          catchError(error => of(new activityActions.LoadTypeFail(error)))
        )
      )
  );
}
