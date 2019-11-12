import { Race } from 'src/app/shared/race';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, filter, withLatestFrom, switchMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as goalActions from '../actions/goal.actions';
import * as fromRoot from '../../../store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { State } from 'src/app/shared/state.enum';

@Injectable()
export class GoalEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService,
        private store: Store<fromRoot.State>
    ) {}

  @Effect()
  loadCompletedStatesRouteChange$: Observable<Action> = this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((routeChangeAction: RouterNavigationAction<any>) => routeChangeAction.payload.event.url.includes('goals')),
      switchMap(() => {
        return this.activityService.getCompletedStates()
          .pipe(
            map((states: State[]) => (new goalActions.LoadStatesCompletedSuccess(states))),
            catchError(error => of(new goalActions.LoadStatesCompletedFail(error)))
          );
        }
      )
  );

}
