import { Race } from 'src/app/shared/race';
import { Action } from '@ngrx/store';

export const LOAD_RACES = '[Races] Load Races';
export const LOAD_RACES_SUCCESS = '[Races] Load Races Success';
export const LOAD_RACES_FAIL = '[Races] Load Races Fail';


export class LoadRaces implements Action {
    readonly type = LOAD_RACES;
}

export class LoadRacesSuccess implements Action {
    readonly type = LOAD_RACES_SUCCESS;
    constructor(public playload: Race[]) {}
}

export class LoadRacesFail implements Action {
    readonly type = LOAD_RACES_FAIL;
    constructor(public playload: any) {}
}



export type RaceActions =
    LoadRaces |
    LoadRacesSuccess |
    LoadRacesFail;
