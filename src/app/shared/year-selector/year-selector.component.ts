import { AppState } from './../../app.state';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as YearActions from '../../run-log/store/actions/year.actions';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  year: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.year = store.select('year');
  }

  ngOnInit() {
  }

  incrementYear(i: number) {
    this.store.dispatch(new YearActions.ChangeYear(i));
  }

}
