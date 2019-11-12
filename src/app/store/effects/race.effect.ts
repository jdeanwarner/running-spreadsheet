import { DELETE_RACE, DeleteRace } from './../actions/race.actions';
import { Race } from 'src/app/shared/race';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, filter, switchMap } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import * as raceActions from '../actions/race.actions';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivityService } from 'src/app/shared/activity.service';

@Injectable()
export class RaceEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService
    ) {}

  @Effect()
  loadRacesOnRouteChange$: Observable<Action> = this.actions$.pipe(
      ofType(raceActions.LOAD_RACES),
      switchMap(() => {
        return this.activityService.getRaces()
          .pipe(
            map((races: Race[]) => (new raceActions.LoadRacesSuccess(races))),
            catchError(error => of(new raceActions.LoadRacesFail(error)))
          );
        }
      )
  );

  @Effect()
  addRace$: Observable<Action> = this.actions$.pipe(
      ofType(raceActions.ADD_RACE),
      mergeMap((activity: raceActions.AddRace) => this.activityService.insertRace(activity.playload)
        .then((ref: DocumentReference) => new raceActions.AddRaceSuccess(ref))
        .catch((error) => new raceActions.AddRaceFail(error))
    )
  );

  @Effect()
  updateRace$: Observable<Action> = this.actions$.pipe(
      ofType(raceActions.UPDATE_RACE),
      mergeMap((activity: raceActions.UpdateRace) => this.activityService.updateRace(activity.playload)
        .then(() => new raceActions.UpdateRaceSuccess())
        .catch((error) => new raceActions.UpdateRaceFail(error))
    )
  );

  @Effect()
  deleteRace$: Observable<Action> = this.actions$.pipe(
      ofType(raceActions.DELETE_RACE),
      mergeMap((activity: raceActions.DeleteRace) => this.activityService.deleteRace(activity.playload)
        .then(() => new raceActions.DeleteRaceSuccess())
        .catch((error) => new raceActions.DeleteRaceFail(error))
    )
  );

}
