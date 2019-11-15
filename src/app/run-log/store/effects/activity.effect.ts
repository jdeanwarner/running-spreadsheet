import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as activityActions from '../actions/activity.action';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class ActivityEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
  ) {}

  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITY),
      switchMap((activity: activityActions.LoadActivities) => {
        return this.activityService.getActivitiesByYear(parseInt(activity.playload, 10))
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
