import { LoadActivities } from './../../run-log/store/actions/activity.action';
import * as fromStore from '../../run-log/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class ActivitiesResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.LogState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadActivities(route.paramMap.get('year')));
    }

}
