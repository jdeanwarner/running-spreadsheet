import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromRace from './race.reducer';
import * as fromActivity from './activity.reducer';
import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    race: fromRace.RaceState;
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
    activity: fromActivity.ActivityState;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
    race : fromRace.reducer,
    activity: fromActivity.reducer
};

export const getActivityState = createFeatureSelector<State>('activity');
export const getRaceState = createFeatureSelector<State>('races');
export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;

        return { url, queryParams, params };
    }
}
