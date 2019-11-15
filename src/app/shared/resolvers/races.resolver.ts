import { LoadRaces } from '../../races/store/actions/race.actions';
import * as fromStore from '../../races/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class RacesResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.RaceState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadRaces());
    }

}
