import { AddGoalComponent } from './add-goal/add-goal.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromLog from '../run-log/store';
import * as fromRoot from '../store';
import * as fromStore from './store';
import * as fromRaces from '../races/store';
import { Store } from '@ngrx/store';
import { Race } from '../shared/race';
import { MatDialog } from '@angular/material/dialog';
import { Goal } from './goal';
import { RouterReducerState } from '@ngrx/router-store';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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
  pinnedGoals$: Observable<Goal[]>;
  activeGoals$: Observable<Goal[]>;
  futureGoals$: Observable<Goal[]>;
  pastGoals$: Observable<Goal[]>;
  goalsLoading$: Observable<boolean>;

  pinnedGoalResults$: Observable<{[ goalName: string ]: number}>;
  activeGoalResults$: Observable<{[ goalName: string ]: number}>;
  futureGoalResults$: Observable<{[ goalName: string ]: number}>;
  pastGoalResults$: Observable<{[ goalName: string ]: number}>;

  loggedInUserId: string;

  constructor(private rootStore: Store<fromRoot.State>, private store: Store<fromStore.GoalState>,
    private raceStore: Store<fromRaces.RaceState>, private logStore: Store<fromLog.LogState>,
    public dialog: MatDialog, private router: Router, private afAuth: AngularFireAuth) {
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

    this.pinnedGoals$ = this.store.select(fromStore.getPinnedGoals);
    this.activeGoals$ = this.store.select(fromStore.getActiveGoals);
    this.futureGoals$ = this.store.select(fromStore.getFutureGoals);
    this.pastGoals$ = this.store.select(fromStore.getPastGoals);
    this.goalsLoading$ = this.store.select(fromStore.getGoalsLoading);

    this.pinnedGoalResults$ = this.store.select(fromStore.getGoalResultsMap(fromLog.getAllActivities, fromStore.getPinnedGoals));
    this.activeGoalResults$ = this.store.select(fromStore.getGoalResultsMap(fromLog.getAllActivities, fromStore.getActiveGoals));
    this.futureGoalResults$ = this.store.select(fromStore.getGoalResultsMap(fromLog.getAllActivities, fromStore.getFutureGoals));
    this.pastGoalResults$ = this.store.select(fromStore.getGoalResultsMap(fromLog.getAllActivities, fromStore.getPastGoals));
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
            this.store.dispatch(new fromStore.AddGoal({ ...result, userId: this.loggedInUserId }));
          }
        }
      }
    });
  }

  changeYear(year) {
    this.router.navigate([`/goals/${year}` ]);
  }

}
