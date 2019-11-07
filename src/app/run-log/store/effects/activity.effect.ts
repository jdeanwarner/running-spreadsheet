import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as activityActions from '../actions/activity.action';
import * as fromRoot from '../../../store';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { YearState } from '../reducers/year.reducer';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class ActivityEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private store: Store<fromRoot.State>
  ) {}

  private getYear: Observable<number> = this.store.select(fromRoot.getRouterState).pipe(
    map((router) => parseInt(router.state.params.year, 10))
  );

  /*@Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITY),
      withLatestFrom(
        this.store.select(fromRoot.getRouterState),
        (action, router) => parseInt(router.state.params.year, 10)
      ),
      switchMap((year: number) => {
        console.log(year);
        return this.activityService.getActivitiesByYear(year)
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadActivitiesSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadActivitiesFail(error)))
          );
        }
      )
  );*/

  @Effect()
  loadActivitiesOnRouteChange$: Observable<Action> = this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((routeChangeAction: RouterNavigationAction<any>) => routeChangeAction.payload.event.url.includes('log/')),
      withLatestFrom(
        this.store.select(fromRoot.getRouterState),
        (action, router) => parseInt(router.state.params.year, 10)
      ),
      switchMap((year: number) => {
        console.log(year);
        return this.activityService.getActivitiesByYear(year)
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadActivitiesSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadActivitiesFail(error)))
          );
        }
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
