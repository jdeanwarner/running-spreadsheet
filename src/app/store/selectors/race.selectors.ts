import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRace from '../reducers/race.reducer';
import { Race } from 'src/app/shared/race';

export const getRacesState = createSelector(
    fromFeature.getRaceState,
    (state: fromFeature.State) => state.race
);

export const getRaceEntites = createSelector(getRacesState, fromRace.getRacesEntites);

export const getAllRaces = createSelector(
    getRaceEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const getStatesCompleted = createSelector(
    getAllRaces,
    (entities) => {
        return Object.values(entities)
            .filter((race: Race) => race.distance >= 26.2)
            .filter((race: Race) => race.location)
            .sort((a: Race, b: Race) => a.location.state < b.location.state ? -1 : a.location.state > b.location.state ? 1 : 0);
    }
);

export const getActivitiesLoading = createSelector(getRacesState, fromRace.getRacesLoading);
export const getActivitiesLoaded = createSelector(getRacesState, fromRace.getRacesLoaded);
