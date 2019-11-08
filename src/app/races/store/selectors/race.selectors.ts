import { Race } from 'src/app/shared/race';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromRace from '../reducers/race.reducer';

export const getRacesState = createSelector(
    fromFeature.getRaceState,
    (state: fromFeature.RaceState) => state.race
);

export const getRaceEntites = createSelector(getRacesState, fromRace.getRacesEntites);

export const getAllRaces = createSelector(
    getRaceEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getActivitiesLoading = createSelector(getRacesState, fromRace.getRacesLoading);
export const getActivitiesLoaded = createSelector(getRacesState, fromRace.getRacesLoaded);
