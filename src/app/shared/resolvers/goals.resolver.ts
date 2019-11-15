
import * as fromStore from '../../goals/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadYearGoals } from '../../goals/store';


@Injectable()
export class GoalsResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.GoalState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadYearGoals(route.paramMap.get('year')));
    }

}
