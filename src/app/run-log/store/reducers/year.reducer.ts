import { Action } from '@ngrx/store';
import * as YearActions from './../actions/year.actions';

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
            return state;
        default:
            return state;
    }
}

export const getYear = (state: YearState) => state.data;
