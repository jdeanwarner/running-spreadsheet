import { AppState } from './../../app.state';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/activities/run';
import { Day } from 'src/app/shared/day';
import { firestore } from 'firebase';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { RunType } from 'src/app/shared/activities/run-type';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() activityTypes: ActivityType[];
  @Input() runTypes: RunType[];
  @Input() set year(year: number) {
    this.yearNum = year;
    this.initDays();
  }
  @Input() set monthNum (month: number) {
    this.month = month;
    this.initDays();
  }
  @Input() set activities(activities: Activity[]) {
    this.getMilageTotal(activities);
  }
  @Output() selected: EventEmitter<Activity> = new EventEmitter<Activity>();

  yearNum: number;
  month: number;
  days: Day[];
  initDate: Date;
  total: number;

  constructor() {}

  ngOnInit() {

  }

  clearActivities() {
    if (this.days) {
      this.days.forEach((day: Day) => {
        day.activities = [];
      });
    }
  }

  initDays() {
    if (this.yearNum && this.month >= 0) {
      this.days = [];
      this.initDate = new Date(this.yearNum, this.month, 1);
      const date = new Date(this.initDate);
      while (date.getMonth() === this.month) {
        this.days.push({
          date: new Date(date),
          activities: []
        });
        date.setDate(date.getDate() + 1);
      }
    }
  }

  getMilageTotal(activities: Activity[]) {
    if (activities && this.days) {
      this.total = 0;
      this.clearActivities();
      activities.forEach((activity: Activity) => {
        this.days[activity.date.toDate().getDate() - 1].activities.push(activity);
        if (activity.activityType === ActivityTypeEnum.RUN) {
          this.total += (<Run>activity).distance;
        }
      });
      this.total = Math.round(this.total * 100) / 100;
    }
  }

  activitySelected(activity: Activity) {
    this.selected.emit(activity);
  }

  daySelected(date: Date) {
    const activity = new Activity;
    activity.date = firestore.Timestamp.fromDate(date);
    this.selected.emit(activity);
  }
}
