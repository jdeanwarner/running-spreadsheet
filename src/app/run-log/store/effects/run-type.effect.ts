import { ActivityService } from '../../../shared/services/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as runTypeActions from '../actions/run-type.action';
import { RunType } from 'src/app/shared/activities/run-type';

@Injectable()
export class RunTypeEffects {

  constructor(
    private actions$: Actions,
    private activityService: ActivityService
  ) {}

  @Effect()
  loadRunTypes$: Observable<Action> =  this.actions$.pipe(
      ofType(runTypeActions.LOAD_RUN_TYPES),
      mergeMap(() => this.activityService.getRunTypes()
          .pipe(
            map((activityTypes: RunType[]) => (new runTypeActions.LoadRunTypeSuccess(activityTypes))),
            catchError(error => of(new runTypeActions.LoadRunTypeFail(error)))
          )
        )
      );

}
