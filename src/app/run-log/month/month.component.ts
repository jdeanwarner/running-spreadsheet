import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/activities/run';
import { Day } from 'src/app/shared/day';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type.enum';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() set year(year: number) {
    this.initYear = year;
    this.initDays();
  }
  @Input() set monthNum(month: number) {
    this.initMonth = month;
    this.initDays();
  }
  @Input() set activities(activities: Activity[]) {
    if (activities && this.days) {
      this.total = 0;
      this.clearActivities();
      activities.forEach((activity: Activity) => {
        this.days[activity.date.toDate().getDate() - 1].activities.push(activity);
        if (activity.activityType === ActivityType.RUN) {
          this.total += (<Run>activity).distance;
        }
      });
    }
  }
  @Output() selected: EventEmitter<Activity> = new EventEmitter<Activity>();

  days: Day[];
  initYear: number;
  initMonth: number;
  initDate: Date;
  total: number;

  constructor() { }

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
    if (this.initYear && this.initMonth >= 0) {
      this.days = [];
      this.initDate = new Date(this.initYear, this.initMonth, 1);
      const date = new Date(this.initDate);
      while (date.getMonth() === this.initMonth) {
        this.days.push({
          date: new Date(date),
          activities: []
        });
        date.setDate(date.getDate() + 1);
      }
    }
  }

  activitySelected(activity: Activity) {
    this.selected.emit(activity);
  }

  daySelected(date: Date) {
    const activity = new Activity;
    activity.date = Timestamp.fromDate(date);
    this.selected.emit(activity);
  }
}
