import { Race } from 'src/app/shared/race';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as raceActions from '../actions/race.actions';
import { DocumentReference } from '@angular/fire/firestore';
import { ActivityService } from 'src/app/shared/services/activity.service';

@Injectable()
export class RaceEffects {

    constructor(
        private actions$: Actions,
        private activityService: ActivityService
    ) {}

  loadRaces$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(raceActions.LOAD_RACES),
      switchMap(() => {
        return this.activityService.getRaces()
          .pipe(
            map((races: Race[]) => (new raceActions.LoadRacesSuccess(races))),
            catchError(error => of(new raceActions.LoadRacesFail(error)))
          );
        }
      )
    )
  );

  addRace$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(raceActions.ADD_RACE),
        mergeMap((activity: raceActions.AddRace) => this.activityService.insertRace(activity.playload)
          .then((ref: DocumentReference) => new raceActions.AddRaceSuccess(ref))
          .catch((error) => new raceActions.AddRaceFail(error))
      )
    )
  );

  updateRace$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(raceActions.UPDATE_RACE),
        mergeMap((activity: raceActions.UpdateRace) => this.activityService.updateRace(activity.playload)
          .then(() => new raceActions.UpdateRaceSuccess())
          .catch((error) => new raceActions.UpdateRaceFail(error))
      )
    )
  );

  deleteRace$: Observable<Action> = createEffect(() => this.actions$.pipe(
        ofType(raceActions.DELETE_RACE),
        mergeMap((activity: raceActions.DeleteRace) => this.activityService.deleteRace(activity.playload)
          .then(() => new raceActions.DeleteRaceSuccess())
          .catch((error) => new raceActions.DeleteRaceFail(error))
      )
    )
  );
}
