import * as fromRace from './race.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface RaceState {
    races: fromRace.RaceState;
}

export const reducers: ActionReducerMap<RaceState> = {
    races : fromRace.reducer,
};

export const getRaceState = createFeatureSelector<RaceState>('races');
