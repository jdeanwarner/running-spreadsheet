import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRace from '../reducers/race.reducer';
import { Race } from 'src/app/shared/race';
import { RaceStatus } from 'src/app/shared/race-status.enum';

export const getRacesState = createSelector(
    fromFeature.getRaceState,
    (state: fromFeature.RaceState) => state.races
);

export const getRaceEntites = createSelector(getRacesState, fromRace.getRacesEntites);

export const getAllRaces = createSelector(
    getRaceEntites,
    (entities) => {
        return Object.keys(entities).map(id => entities[id]);
    }
);

export const get5kPR = createSelector(
    getAllRaces,
    (entities) => getPR(3.1, entities)
);

export const get10kPR = createSelector(
    getAllRaces,
    (entities) => getPR(6.2, entities)
);

export const get15kPR = createSelector(
    getAllRaces,
    (entities) => getPR(9.3, entities)
);

export const getHalfMarathonPR = createSelector(
    getAllRaces,
    (entities) => getPR(13.1, entities)
);

export const getMarathonPR = createSelector(
    getAllRaces,
    (entities) => getPR(26.2, entities)
);

export const get50Ks = createSelector(
    getAllRaces,
    (entities) => getDistance(31, entities)
);

export const get50Milers = createSelector(
    getAllRaces,
    (entities) => getDistance(50, entities)
);

export const get100Ks = createSelector(
    getAllRaces,
    (entities) => getDistance(62, entities)
);

export const get100Milers = createSelector(
    getAllRaces,
    (entities) => getDistance(100, entities)
);

function getPR(distance: number, entities: { [id: number]: Race }): Race {
    return getDistance(distance, entities)
        .filter((race: Race) => race.status === RaceStatus.COMPLETE)
        .sort((a: Race, b: Race) => a.result < b.result ? -1 : a.result > b.result ? 1 : 0)[0];
}

function getDistance(distance: number, entities: { [id: number]: Race }): Race[] {
    return Object.values(entities)
        .filter((race: Race) => race.distance === distance);
}

export const getStatesCompleted = createSelector(
    getAllRaces,
    (entities) => {
        return Object.values(entities)
            .filter((race: Race) => race.distance >= 26.2)
            .filter((race: Race) => race.location)
            .sort((a: Race, b: Race) => a.location.state < b.location.state ? -1 : a.location.state > b.location.state ? 1 : 0);
    }
);

export const getRacesLoading = createSelector(getRacesState, fromRace.getRacesLoading);
export const getRacesLoaded = createSelector(getRacesState, fromRace.getRacesLoaded);
