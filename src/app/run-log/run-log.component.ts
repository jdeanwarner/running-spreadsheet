import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatDialog } from '@angular/material';
import { Activity } from '../shared/activities/activity';
import { ActivityType } from '../shared/activities/activity-type';
import { RunType } from '../shared/activities/run-type';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import * as fromRoot from '../store';
import { RouterReducerState } from '@ngrx/router-store';
import { FormStyle } from '@angular/common';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  params$: Observable<RouterReducerState<fromRoot.RouterStateUrl>>;
  activityMonthMap$: Observable<{[month: string]: Activity[]}>;
  activityTypes$: Observable<ActivityType[]>;
  runTypes$: Observable<RunType[]>;

  totalMiles$: Observable<number>;
  countHighEfforRuns$: Observable<number>;
  countCrossTraining$: Observable<number>;

  runTypeMap$: Observable<{[type: string]: Activity[]}>;
  crossTrainingMap$: Observable<{[type: string]: Activity[]}>;

  constructor(public dialog: MatDialog, private store: Store<fromStore.LogState>,
    private rootStore: Store<fromRoot.State>, private router: Router) {
    this.activityMonthMap$ = rootStore.select(fromRoot.getActivitiesMonthMap);
    this.activityTypes$ = rootStore.select(fromRoot.getActivityTypes);
    this.runTypes$ = store.select(fromStore.getRunTypes);

    this.totalMiles$ = rootStore.select(fromRoot.getTotalRunningMiles);
    this.countHighEfforRuns$ = rootStore.select(fromRoot.getCountHighEffortRuns);
    this.countCrossTraining$ = rootStore.select(fromRoot.getCountCrossTrainingActivities);

    this.runTypeMap$ = rootStore.select(fromRoot.getRunTypeMap);
    this.crossTrainingMap$ = rootStore.select(fromRoot.getCrossTrainingMap);

    this.params$ = rootStore.select(fromRoot.getRouterState);
  }

  ngOnInit(): void {
    this.rootStore.dispatch(new fromRoot.LoadType());
    this.store.dispatch(new fromStore.LoadRunType());
  }

  changeYear(year) {
    this.router.navigate([`/log/${year}` ]);
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
          this.rootStore.dispatch(new fromRoot.DeleteActivity(result));
        } else if (result.activityType) {
          if (result.id) {
            this.rootStore.dispatch(new fromRoot.UpdateActivity(result));
          } else {
            this.rootStore.dispatch(new fromRoot.InsertActivity(result));
          }
        }
      }
    });
  }
}
