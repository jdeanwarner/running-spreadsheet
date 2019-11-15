import { Race } from 'src/app/shared/race';
import * as fromRace from '../actions/race.actions';

export interface RaceState {
    races: {
        entities: { [id: number]: Race };
        loaded: boolean;
        loading: boolean;
    };
}

export const initialState: RaceState = {
    races: {
        entities: {},
        loaded: false,
        loading: false
    }
};

export function reducer(state: RaceState = initialState, action: fromRace.RaceActions):
    RaceState {
    switch (action.type) {
        case fromRace.LOAD_RACES: {
            state.races.loading = true;
            return state;
        }
        case fromRace.LOAD_RACES_SUCCESS: {
            const activities = action.playload;
            const entities = activities.reduce(
                (map: { [id: number]: Race }, activity) => {
                    return {
                        ... map,
                        [activity.id]: activity
                    };
                }, {});
            return {
                ... state,
                races: {
                    loading: false,
                    loaded: true,
                    entities : entities
                }
            };
        }
        case fromRace.LOAD_RACES_FAIL: {
            state.races.loading = false;
            state.races.loaded = false;
            return state;
        }
        case fromRace.ADD_RACE: {
            state.races.loading = true;
            state.races.loaded = false;
            return state;
        }
        case fromRace.ADD_RACE_SUCCESS: {
            state.races.loading = false;
            state.races.loaded = true;
            return state;
        }
        case fromRace.ADD_RACE_FAIL: {
            state.races.loading = false;
            state.races.loaded = false;
            return state;
        }
        case fromRace.UPDATE_RACE: {
            state.races.loading = true;
            state.races.loaded = false;
            return state;
        }
        case fromRace.UPDATE_RACE_SUCCESS: {
            state.races.loading = false;
            state.races.loaded = true;
            return state;
        }
        case fromRace.UPDATE_RACE_FAIL: {
            state.races.loading = false;
            state.races.loaded = false;
            return state;
        }
        default:
            return state;
    }
}

export const getRacesLoading = (state: RaceState) => state.races.loading;
export const getRacesLoaded = (state: RaceState) => state.races.loaded;
export const getRacesEntites = (state: RaceState) => state.races.entities;
