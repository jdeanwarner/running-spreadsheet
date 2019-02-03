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

@Component({
  selector: 'app-run-log',
  templateUrl: './run-log.component.html',
  styleUrls: ['./run-log.component.css']
})
export class RunLogComponent implements OnInit {

  items: Observable<any[]>;
  activities: Observable<Activity[]>;
  activityTypes: ActivityType[];
  runTypes: RunType[];
  year: number;
  constructor(private db: AngularFirestore, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: {year: number}) => {
      if (params.year) {
        this.year = +params.year;
      } else {
        this.year = new Date().getFullYear();
      }

      this.activities = this.db.collection<Activity>('runs', ref =>
        ref.where('date', '>=', new Date(this.year, 0, 1))
          .where('date', '<', new Date(this.year + 1, 0, 1))
      ).snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<Activity>[]) => {
          return actions.map((a: DocumentChangeAction<Activity>) => {
            const data: Activity = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
    });

    this.db.collection<ActivityType>('activityType').valueChanges().subscribe((activityTypes: ActivityType[]) => {
      this.activityTypes = activityTypes;
    });

    this.db.collection<ActivityType>('runType').valueChanges().subscribe((runTypes: RunType[]) => {
      this.runTypes = runTypes;
    });
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
          this.db.collection('runs').doc(result).delete();
        } else if (result.activityType) {
          if (result.id) {
            this.db.collection('runs').doc(result.id).set(result);
          } else {
            this.db.collection('runs').add(result);
          }
        }
      }
    });
  }
}
