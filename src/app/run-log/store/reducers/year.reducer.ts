import { Action } from '@ngrx/store';
import * as YearActions from '../actions/year.action';

export interface YearState {
    data: number;
}

export const initialYear = {
    data : new Date().getFullYear()
};

export function reducer(state: YearState = initialYear, action: YearActions.Actions): YearState {
    switch (action.type) {
        case YearActions.CHANGE_YEAR:
            return state;
        case YearActions.CHANGE_YEAR_SUCCESS:
            state.data = action.playload;
            return state;
        case YearActions.CHANGE_YEAR_FAIL:
            return state;
        default:
            return state;
    }
}

export const getYear = (state: YearState) => state.data;
