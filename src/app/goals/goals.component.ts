import { AddGoalComponent } from './add-goal/add-goal.component';
import { getYearGoals } from './store/selectors/goal.selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromLog from '../run-log/store';
import * as fromRoot from '../store';
import * as fromStore from './store';
import { Store } from '@ngrx/store';
import { State } from '../shared/state.enum';
import { Race } from '../shared/race';
import { YearGoal } from './year-goal';
import { MonthGoal } from './month-goal';
import { MatDialog } from '@angular/material';
import { Goal } from './goal';
import { RouterReducerState } from '@ngrx/router-store';
import { Router } from '@angular/router';

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

  params$: Observable<RouterReducerState<fromRoot.RouterStateUrl>>;
  yearGoals$: Observable<{ [type: string]: YearGoal }>;
  yearMiles$: Observable<number>;

  monthGoals$: Observable<MonthGoal[]>;

  constructor(private rootStore: Store<fromRoot.State>, private store: Store<fromRoot.State>,
    public dialog: MatDialog, private router: Router) {
    this.completedStates$ = this.rootStore.select(fromRoot.getStatesCompleted);

    this.fiveKPR$ = this.rootStore.select(fromRoot.get5kPR);
    this.tenKPR$ = this.rootStore.select(fromRoot.get10kPR);
    this.fifteenKPR$ = this.rootStore.select(fromRoot.get15kPR);
    this.halfMarathonPR$ = this.rootStore.select(fromRoot.getHalfMarathonPR);
    this.marathonPR$ = this.rootStore.select(fromRoot.getMarathonPR);

    this.fiftyKs$ = this.rootStore.select(fromRoot.get50Ks);
    this.fiftyMs$ = this.rootStore.select(fromRoot.get50Milers);
    this.hundredKs$ = this.rootStore.select(fromRoot.get100Ks);
    this.hundredMs$ = this.rootStore.select(fromRoot.get100Milers);

    this.yearGoals$ = this.store.select(fromStore.getYearGoals);
    this.yearMiles$ = this.rootStore.select(fromLog.getTotalRunningMiles);

    this.monthGoals$ = <Observable<MonthGoal[]>>this.store.select(fromStore.getMonthGoals);
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadYearGoals());
  }

  addGoal() {
    const dialogRef = this.dialog.open(AddGoalComponent, {
      minWidth: '20%',
      maxWidth: '99%',
      data : {

      }
    });

    dialogRef.afterClosed().subscribe((result: Goal | string) => {
      if (result) {
        if (typeof result === 'string') {
          // this.store.dispatch(new fromStore.DeleteActivity(result));
        } else {
          if (result.id) {
            // this.store.dispatch(new fromStore.UpdateActivity(result));
          } else {
            // this.store.dispatch(new fromStore.InsertActivity(result));
          }
        }
      }
    });
  }

  changeYear(year) {
    this.router.navigate([`/goals/${year}` ]);
  }

}
