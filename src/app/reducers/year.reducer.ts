import { Action } from '@ngrx/store';
import * as YearActions from './../actions/year.actions';

export const initialState = new Date().getFullYear();

export function yearReducer(state: number = initialState, action: YearActions.Actions) {
    switch (action.type) {
        case YearActions.CHANGE_YEAR:
            return state += action.playload;
        default:
            return state;
    }
}
