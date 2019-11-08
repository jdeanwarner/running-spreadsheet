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
import * as fromRoot from './../store';
import { RouterReducerState } from '@ngrx/router-store';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  params$: Observable<RouterReducerState<fromRoot.RouterStateUrl>>;
  activities$: Observable<Activity[]>;
  activityTypes$: Observable<ActivityType[]>;
  runTypes$: Observable<RunType[]>;

  constructor(public dialog: MatDialog, private store: Store<fromStore.LogState>,
    private rootStore: Store<fromRoot.State>, private router: Router) {
    this.activities$ = store.select(fromStore.getAllActivities);
    this.activityTypes$ = store.select(fromStore.getActivityTypes);
    this.runTypes$ = store.select(fromStore.getRunTypes);
    this.params$ = rootStore.select(fromRoot.getRouterState);
  }

  ngOnInit(): void {
    this.store.dispatch(new fromStore.LoadType());
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
