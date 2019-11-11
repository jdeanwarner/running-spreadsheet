import { Race } from 'src/app/shared/race';
import { Action } from '@ngrx/store';
import { DocumentReference } from '@angular/fire/firestore';

export const LOAD_RACES = '[Races] Load Races';
export const LOAD_RACES_SUCCESS = '[Races] Load Races Success';
export const LOAD_RACES_FAIL = '[Races] Load Races Fail';

export const ADD_RACE = '[Races] Add Race';
export const ADD_RACE_SUCCESS = '[Races] Add Race Success';
export const ADD_RACE_FAIL = '[Races] Add Race Fail';

export const UPDATE_RACE = '[Races] Update Race';
export const UPDATE_RACE_SUCCESS = '[Races] Update Race Success';
export const UPDATE_RACE_FAIL = '[Races] Update Race Fail';

export const DELETE_RACE = '[Races] Delete Race';
export const DELETE_RACE_SUCCESS = '[Races] Delete Race Success';
export const DELETE_RACE_FAIL = '[Races] Delete Race Fail';


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

export class AddRace implements Action {
    readonly type = ADD_RACE;
    constructor(public playload: Race) {}
}

export class AddRaceSuccess implements Action {
    readonly type = ADD_RACE_SUCCESS;
    constructor(public playload: DocumentReference) {}
}

export class AddRaceFail implements Action {
    readonly type = ADD_RACE_FAIL;
    constructor(public playload: any) {}
}

export class UpdateRace implements Action {
    readonly type = UPDATE_RACE;
    constructor(public playload: Race) {}
}

export class UpdateRaceSuccess implements Action {
    readonly type = UPDATE_RACE_SUCCESS;
}

export class UpdateRaceFail implements Action {
    readonly type = UPDATE_RACE_FAIL;
    constructor(public playload: any) {}
}

export class DeleteRace implements Action {
    readonly type = DELETE_RACE;
    constructor(public playload: string) {}
}

export class DeleteRaceSuccess implements Action {
    readonly type = DELETE_RACE_SUCCESS;
}

export class DeleteRaceFail implements Action {
    readonly type = DELETE_RACE_FAIL;
    constructor(public playload: any) {}
}

export type RaceActions =
    LoadRaces |
    LoadRacesSuccess |
    LoadRacesFail |
    AddRace |
    AddRaceSuccess |
    AddRaceFail |
    UpdateRace |
    UpdateRaceSuccess |
    UpdateRaceFail |
    DeleteRace |
    DeleteRaceSuccess |
    DeleteRaceFail;
