import { createReducer, on } from '@ngrx/store';
import { incrementYear, createActivity, editActivity } from './run-log.actions';

export const initialState = new Date().getFullYear();

export const counterReducer = createReducer(initialState,
  //on(increment, state => state + 1),
  //on(decrement, state => state - 1),
  //on(reset, state => 0),
);
