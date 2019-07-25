import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as activityActions from '../actions/activity.action';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';

@Injectable()
export class ActivityEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}

  @Effect()
  loadActivities$: Observable<Action> = this.actions$.pipe(
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
