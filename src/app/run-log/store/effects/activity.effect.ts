import { getRouterState } from '../../../store/reducers/index';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, switchMap, filter } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as activityActions from '../actions/activity.action';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { DocumentReference } from '@angular/fire/firestore';
import { State } from '../../../store/reducers/index';

@Injectable()
export class ActivityEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private store: Store<State>,
    private rootStore: Store<State>
  ) {}

  private getYear: Observable<number> = this.store.select(getRouterState).pipe(
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
      filter((routeChangeAction: RouterNavigationAction<any>) =>
        routeChangeAction.payload.event.url.includes('log') ||
        routeChangeAction.payload.event.url.includes('goals')),
      withLatestFrom(
        this.store.select(getRouterState),
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

  @Effect()
  insertActivity$: Observable<Action> =  this.actions$.pipe(
    ofType(activityActions.INSERT_ACTIVITY),
    mergeMap((activity: activityActions.InsertActivity) => this.activityService.insertActivity(activity.playload)
        .then( (ref: DocumentReference) => new activityActions.InsertActivitySuccess(ref))
        .catch((error) => new activityActions.InsertActivityFail(error))
    )
  );

  @Effect()
  updateActivity$: Observable<Action> =  this.actions$.pipe(
    ofType(activityActions.UPDATE_ACTIVITY),
    mergeMap((activity: activityActions.UpdateActivity) => this.activityService.updateActivity(activity.playload)
        .then( () => new activityActions.UpdateActivitySuccess())
        .catch((error) => new activityActions.UpdateActivityFail(error))
    )
  );

  @Effect()
  deleteActivity$: Observable<Action> =  this.actions$.pipe(
    ofType(activityActions.DELETE_ACTIVITY),
    mergeMap((activity: activityActions.DeleteActivity) => this.activityService.deleteActivity(activity.playload)
        .then( () => new activityActions.DeleteActivitySuccess())
        .catch((error) => new activityActions.DeleteActivityFail(error))
    )
  );
}
