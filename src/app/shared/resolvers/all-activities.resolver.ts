import { LoadAllActivities } from './../../run-log/store/actions/activity.action';
import * as fromStore from '../../run-log/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';


@Injectable()
export class AllActivitiesResolver implements Resolve<void> {

    constructor(private store: Store<fromStore.LogState>) {}

    resolve(): void {
        this.store.dispatch(new LoadAllActivities());
    }

}
