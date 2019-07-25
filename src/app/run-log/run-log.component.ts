import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatDialog } from '@angular/material';
import { Activity } from '../shared/activities/activity';
import { ActivityType } from '../shared/activities/activity-type';
import { RunType } from '../shared/activities/run-type';
import { ActivityService } from '../shared/activity.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromStore from './store';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  year$: Observable<number>;
  activities: Activity[];
  activityTypes$: Observable<ActivityType[]>;
  runTypes$: Observable<RunType[]>;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    // private activityService: ActivityService,
    private store: Store<fromStore.LogState>) {
    // this.year = store.select('year');
    this.activityTypes$ = store.select(fromStore.getActivityTypes);
    this.runTypes$ = store.select(fromStore.getRunTypes);
    this.year$ = store.select(fromStore.getYear);
  }

  ngOnInit(): void {
    /*this.year.subscribe(result => {
      this.activityService.getActivitiesByYear(result).subscribe((activities: Activity[]) => this.activities = activities );
    });*/
    // this.store.dispatch(new fromStore.LoadType());
    // this.activityService.getActivityTypes().subscribe((activityTypes: ActivityType[]) =>  this.activityTypes = activityTypes );
    // this.activityService.getRunTypes().subscribe((runTypes: RunType[]) => this.runTypes = runTypes );

    this.store.dispatch(new fromStore.LoadType());
    this.store.dispatch(new fromStore.LoadRunType());

    this.activityTypes$.subscribe(result => console.log(result));
    this.runTypes$.subscribe(result => console.log(result));
    this.year$.subscribe(result => console.log(result));

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
        // activityTypes: this.activityTypes,
        // runTypes: this.runTypes
      }
    });

    dialogRef.afterClosed().subscribe((result: Activity | string) => {
      if (result) {
        if (typeof result === 'string') {
          // this.activityService.deleteActivity(result);
        } else if (result.activityType) {
          if (result.id) {
            // this.activityService.updateActivity(result);
          } else {
            // this.activityService.insertActivity(result);
          }
        }
      }
    });
  }
}
