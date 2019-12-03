import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatDialog } from '@angular/material/dialog';
import { Activity } from '../shared/activities/activity';
import { ActivityType } from '../shared/activities/activity-type';
import { RunType } from '../shared/activities/run-type';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import * as fromRoot from '../store';
import { RouterReducerState } from '@ngrx/router-store';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  params$: Observable<RouterReducerState<fromRoot.RouterStateUrl>>;
  activityMonthMap$: Observable<{[month: string]: Activity[]}>;
  activitiesLoading$: Observable<boolean>;

  activityTypes$: Observable<ActivityType[]>;
  runTypes$: Observable<RunType[]>;

  totalMiles$: Observable<number>;
  countHighEfforRuns$: Observable<number>;
  countCrossTraining$: Observable<number>;

  runTypeMap$: Observable<{[type: string]: Activity[]}>;
  crossTrainingMap$: Observable<{[type: string]: Activity[]}>;

  constructor(public dialog: MatDialog, private store: Store<fromStore.LogState>,
    private rootStore: Store<fromRoot.State>) {
    this.activityMonthMap$ = store.select(fromStore.getActivitiesMonthMap);
    this.activitiesLoading$ = store.select(fromStore.getActivitiesLoading);

    this.activityTypes$ = store.select(fromStore.getActivityTypes);
    this.runTypes$ = store.select(fromStore.getRunTypes);

    this.totalMiles$ = store.select(fromStore.getTotalRunningMiles);
    this.countHighEfforRuns$ = store.select(fromStore.getCountHighEffortRuns);
    this.countCrossTraining$ = store.select(fromStore.getCountCrossTrainingActivities);

    this.runTypeMap$ = store.select(fromStore.getRunTypeMap);
    this.crossTrainingMap$ = store.select(fromStore.getCrossTrainingMap);

    this.params$ = rootStore.select(fromRoot.getRouterState);
  }

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadType());
    this.store.dispatch(new fromStore.LoadRunType());
  }

  changeYear(year) {
    this.store.dispatch(new fromStore.ChangeYear(year));
  }

  daySelected(activity: Activity) {
    this.openActivity(activity);
  }

  addActivity() {
    this.openActivity(new Activity());
  }

  openActivity(activity: Activity) {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      minWidth: '20%',
      maxWidth: '99%',
      data : {
        activity: activity,
        activityTypes: this.activityTypes$,
        runTypes: this.runTypes$
      }
    });

    dialogRef.afterClosed().subscribe((result: Activity | string) => {
      if (result) {
        if (typeof result === 'string') {
          this.store.dispatch(new fromStore.DeleteActivity(result));
        } else if (result.activityType) {
          if (result.id) {
            this.store.dispatch(new fromStore.UpdateActivity(result));
          } else {
            this.store.dispatch(new fromStore.InsertActivity(result));
          }
        }
      }
    });
  }
}
