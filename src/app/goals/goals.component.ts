import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../store';
import { Store } from '@ngrx/store';
import { State } from '../shared/state.enum';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  completedStates$: Observable<State[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.completedStates$ = this.store.select(fromRoot.getStatesCompleted);
  }

  ngOnInit() {
  }

}
