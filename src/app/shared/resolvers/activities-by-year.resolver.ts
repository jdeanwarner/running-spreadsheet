import { LoadActivitiesByYear } from '../../run-log/store/actions/activity.action';
import * as fromStore from '../../run-log/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class ActivitiesByYearResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.LogState>) {}

    resolve(route: ActivatedRouteSnapshot): void {
        this.store.dispatch(new LoadActivitiesByYear(route.paramMap.get('year')));
    }

}
