// import { LoadType, LoadTypeSuccess, ActivityActions, ActivityActionTypes } from './../actions/activity.actions';
import { ActivityType } from '../../../shared/activities/activity-type';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { LoadTypeSuccess } from '../actions/activity-type.actions';
import * as activityActions from '../actions/activity-type.actions';

@Injectable()
export class ActivityTypeEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}

  // loadActivityTypes$ = this.actions$.ofType(activityActions.ActivityActionTypes.LoadType)

  @Effect()
  loadActivityTypes$: Observable<Action> =  this.actions$.pipe(
      ofType(activityActions.LOAD_ACTIVITY_TYPES),
      mergeMap(() => this.activityService.getActivityTypes()
          .pipe(
            map((activityTypes: ActivityType[]) => (new LoadTypeSuccess(activityTypes))),
            catchError(error => of(new activityActions.LoadTypeFail(error)))
          )
        )
      );

}
