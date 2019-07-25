import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as YearActions from '../../store/actions/year.action';
import * as fromStore from '../../store';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  year$: Observable<number>;

  constructor(private store: Store<fromStore.LogState>) {
    this.year$ = store.select(fromStore.getYear);
  }

  ngOnInit() {
  }

  incrementYear(i: number) {
    this.store.dispatch(new YearActions.ChangeYear(i));
  }

}
