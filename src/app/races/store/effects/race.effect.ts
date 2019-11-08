import { Race } from 'src/app/shared/race';
import { ActivityService } from '../../../shared/activity.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, filter, withLatestFrom, switchMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as raceActions from '../actions/race.actions';
import * as fromRoot from '../../../store';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class RaceEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService,
        private store: Store<fromRoot.State>
    ) {}

  @Effect()
  loadRacesOnRouteChange$: Observable<Action> = this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((routeChangeAction: RouterNavigationAction<any>) => routeChangeAction.payload.event.url.includes('races')),
      switchMap(() => {
        return this.activityService.getRaces()
          .pipe(
            map((races: Race[]) => (new raceActions.LoadRacesSuccess(races))),
            catchError(error => of(new raceActions.LoadRacesFail(error)))
          );
        }
      )
  );

}
