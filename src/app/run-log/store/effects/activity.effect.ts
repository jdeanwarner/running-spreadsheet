import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
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

  loadActivitiesByYear$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITIES_BY_YEAR),
      switchMap((loadAction: activityActions.LoadActivitiesByYear) => {
        return this.activityService.getActivitiesByYear(parseInt(loadAction.playload, 10))
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadActivitiesByYearSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadActivitiesByYearFail(error)))
          );
        }
      )
    )
  );

  loadAllActivities$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(activityActions.LOAD_ALL_ACTIVITIES),
      switchMap(() => {
        return this.activityService.getAllActivities()
          .pipe(
            map((activityTypes: Activity[]) => (new activityActions.LoadAllActivitiesSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadAllActivitiesFail(error)))
          );
        }
      )
    )
  );

  loadActivityTypes$: Observable<Action> =  createEffect(() => this.actions$.pipe(
    ofType(activityActions.LOAD_ACTIVITY_TYPES),
    mergeMap(() => this.activityService.getActivityTypes()
        .pipe(
          map((activityTypes: ActivityType[]) => (new activityActions.LoadTypeSuccess(activityTypes))),
          catchError(error => of(new activityActions.LoadTypeFail(error)))
        )
      )
    )
  );

  insertActivity$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(activityActions.INSERT_ACTIVITY),
      mergeMap((activity: activityActions.InsertActivity) => this.activityService.insertActivity(activity.playload)
          .then( (ref: DocumentReference) => new activityActions.InsertActivitySuccess(ref))
          .catch((error) => new activityActions.InsertActivityFail(error))
      )
    )
  );

  updateActivity$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(activityActions.UPDATE_ACTIVITY),
      mergeMap((activity: activityActions.UpdateActivity) => this.activityService.updateActivity(activity.playload)
          .then( () => new activityActions.UpdateActivitySuccess())
          .catch((error) => new activityActions.UpdateActivityFail(error))
      )
    )
  );

  deleteActivity$: Observable<Action> =  createEffect(() => this.actions$.pipe(
      ofType(activityActions.DELETE_ACTIVITY),
      mergeMap((activity: activityActions.DeleteActivity) => this.activityService.deleteActivity(activity.playload)
          .then( () => new activityActions.DeleteActivitySuccess())
          .catch((error) => new activityActions.DeleteActivityFail(error))
      )
    )
  );
}
