import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../store';
import { Store } from '@ngrx/store';
import { State } from '../shared/state.enum';
import { Race } from '../shared/race';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {

  completedStates$: Observable<Race[]>;

  fiveKPR$: Observable<Race>;
  tenKPR$: Observable<Race>;
  fifteenKPR$: Observable<Race>;
  halfMarathonPR$: Observable<Race>;
  marathonPR$: Observable<Race>;

  fiftyKs$: Observable<Race[]>;
  fiftyMs$: Observable<Race[]>;
  hundredKs$: Observable<Race[]>;
  hundredMs$: Observable<Race[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.completedStates$ = this.store.select(fromRoot.getStatesCompleted);

    this.fiveKPR$ = this.store.select(fromRoot.get5kPR);
    this.tenKPR$ = this.store.select(fromRoot.get10kPR);
    this.fifteenKPR$ = this.store.select(fromRoot.get15kPR);
    this.halfMarathonPR$ = this.store.select(fromRoot.getHalfMarathonPR);
    this.marathonPR$ = this.store.select(fromRoot.getMarathonPR);

    this.fiftyKs$ = this.store.select(fromRoot.get50Ks);
    this.fiftyMs$ = this.store.select(fromRoot.get50Milers);
    this.hundredKs$ = this.store.select(fromRoot.get100Ks);
    this.hundredMs$ = this.store.select(fromRoot.get100Milers);
  }

  ngOnInit() {
  }

}
