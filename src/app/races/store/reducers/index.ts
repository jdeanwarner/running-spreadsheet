import * as fromRace from './race.reducer';
import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface RaceState {
    race: fromRace.RaceState;
}

export const reducers: ActionReducerMap<RaceState> = {
    race : fromRace.reducer,
};

export const getRaceState = createFeatureSelector<RaceState>('races');
