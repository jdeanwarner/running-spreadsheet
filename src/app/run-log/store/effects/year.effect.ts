import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import * as yearActions from '../actions/year.action';
import { Router } from '@angular/router';

@Injectable()
export class YearEffects {

  constructor(
    private actions$: Actions,
    private router: Router,
  ) {}

  changeYear$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(yearActions.CHANGE_YEAR),
      switchMap((loadAction: yearActions.ChangeYear) => {
        return this.router.navigate([`/log/${loadAction.playload}` ])
            .then( () => new yearActions.ChangeYearSuccess(loadAction.playload))
            .catch((error) => new yearActions.ChangeYearFail(error));
        }
      )
    )
  );

}
