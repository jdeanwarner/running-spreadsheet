import { Action } from '@ngrx/store';
import * as YearActions from '../actions/year.action';

export interface YearState {
    data: number;
}

export const initialYear = {
    data : new Date().getFullYear()
};

export function yearReducer(state: YearState = initialYear, action: YearActions.Actions): YearState {
    switch (action.type) {
        case YearActions.CHANGE_YEAR:
            state.data += action.playload;
            console.log(state.data);
            return state;
        default:
            return state;
    }
}

export const getYear = (state: YearState) => state.data;
