import { AddGoalComponent } from './add-goal/add-goal.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromLog from '../run-log/store';
import * as fromRoot from '../store';
import * as fromStore from './store';
import * as fromRaces from '../races/store';
import { Store } from '@ngrx/store';
import { Race } from '../shared/race';
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
  goals$: Observable<Goal[]>;
  yearMiles$: Observable<number>;
  crossTraining$: Observable<number>;
  highEffortRuns$: Observable<number>;

  resultsMap$: Observable<{[ goalName: string ]: number}>;

  constructor(private rootStore: Store<fromRoot.State>, private store: Store<fromStore.GoalState>,
    private raceStore: Store<fromRaces.RaceState>, private logStore: Store<fromLog.LogState>,
    public dialog: MatDialog, private router: Router) {
    this.completedStates$ = this.rootStore.select(fromRaces.getStatesCompleted);

    this.fiveKPR$ = this.raceStore.select(fromRaces.get5kPR);
    this.tenKPR$ = this.raceStore.select(fromRaces.get10kPR);
    this.fifteenKPR$ = this.raceStore.select(fromRaces.get15kPR);
    this.halfMarathonPR$ = this.raceStore.select(fromRaces.getHalfMarathonPR);
    this.marathonPR$ = this.raceStore.select(fromRaces.getMarathonPR);

    this.fiftyKs$ = this.raceStore.select(fromRaces.get50Ks);
    this.fiftyMs$ = this.raceStore.select(fromRaces.get50Milers);
    this.hundredKs$ = this.raceStore.select(fromRaces.get100Ks);
    this.hundredMs$ = this.raceStore.select(fromRaces.get100Milers);

    this.goals$ = this.store.select(fromStore.getGoalsData);
    this.yearMiles$ = this.logStore.select(fromLog.getTotalRunningMiles);
    this.crossTraining$ = this.logStore.select(fromLog.getCountCrossTrainingActivities);
    this.highEffortRuns$ = this.logStore.select(fromLog.getCountHighEffortRuns);

    this.resultsMap$ = this.store.select(fromStore.getGoalResultsMap(fromLog.getAllActivities));
  }

  ngOnInit() {

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
          this.store.dispatch(new fromStore.DeleteGoal(result));
        } else {
          if (result.id) {
            this.store.dispatch(new fromStore.UpdateGoal(result));
          } else {
            this.store.dispatch(new fromStore.AddGoal(result));
          }
        }
      }
    });
  }

  changeYear(year) {
    this.router.navigate([`/goals/${year}` ]);
  }

}
