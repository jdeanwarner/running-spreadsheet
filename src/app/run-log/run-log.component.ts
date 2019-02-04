import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Run } from '../shared/activities/run';
import { Router, ActivatedRoute } from '@angular/router';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Activity } from '../shared/activities/activity';
import { ActivityType } from '../shared/activities/activity-type';
import { RunType } from '../shared/activities/run-type';
import { ActivityService } from '../shared/activity.service';

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  activities: Activity[];
  activityTypes: ActivityType[];
  runTypes: RunType[];
  year: number;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private activityService: ActivityService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: {year: number}) => {
      if (params.year) {
        this.year = +params.year;
      } else {
        this.year = new Date().getFullYear();
      }

      this.activityService.getActivitiesByYear(this.year).subscribe((activities: Activity[]) => this.activities = activities );
    });

    this.activityService.getActivityTypes().subscribe((activityTypes: ActivityType[]) =>  this.activityTypes = activityTypes );
    this.activityService.getRunTypes().subscribe((runTypes: RunType[]) => this.runTypes = runTypes );
  }

  incrementYear(i: number) {
    this.router.navigate(['/log'], {
      queryParams: {
        year: this.year += i
      }
    });
  }

  daySelected(activity: Activity) {
    this.openActivity(activity);
  }

  addActivity() {
    this.openActivity(null);
  }

  openActivity(activity: Activity) {
    const dialogRef = this.dialog.open(AddActivityComponent, {
      minWidth: '20%',
      maxWidth: '99%',
      data : {
        activity: activity,
        activityTypes: this.activityTypes,
        runTypes: this.runTypes
      }
    });

    dialogRef.afterClosed().subscribe((result: Activity | string) => {
      if (result) {
        if (typeof result === 'string') {
          this.activityService.deleteActivity(result);
        } else if (result.activityType) {
          if (result.id) {
            this.activityService.updateActivity(result);
          } else {
            this.activityService.insertActivity(result);
          }
        }
      }
    });
  }
}
