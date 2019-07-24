import { AppState } from './../../app.state';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/activities/run';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { RunType } from 'src/app/shared/activities/run-type';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as YearActions from './../../actions/year.actions';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  @Input() activityTypes: ActivityType[];
  @Input() runTypes: RunType[];
  @Input() set activities(activities: Activity[]) {
    if (activities) {
      this.janRuns = activities.filter(run => run.date.toDate().getMonth() === 0);
      this.febRuns = activities.filter(run => run.date.toDate().getMonth() === 1);
      this.marRuns = activities.filter(run => run.date.toDate().getMonth() === 2);
      this.aprRuns = activities.filter(run => run.date.toDate().getMonth() === 3);
      this.mayRuns = activities.filter(run => run.date.toDate().getMonth() === 4);
      this.junRuns = activities.filter(run => run.date.toDate().getMonth() === 5);
      this.julyRuns = activities.filter(run => run.date.toDate().getMonth() === 6);
      this.augRuns = activities.filter(run => run.date.toDate().getMonth() === 7);
      this.sepRuns = activities.filter(run => run.date.toDate().getMonth() === 8);
      this.octRuns = activities.filter(run => run.date.toDate().getMonth() === 9);
      this.novRuns = activities.filter(run => run.date.toDate().getMonth() === 10);
      this.decRuns = activities.filter(run => run.date.toDate().getMonth() === 11);
      this.mobileMonthToShow = this.getRunsByMonth(this.mobileMonth);
    }
  }

  @Output() daySelected: EventEmitter<Run> = new EventEmitter<Run>();

  janRuns: Activity[];
  febRuns: Activity[];
  marRuns: Activity[];
  aprRuns: Activity[];
  mayRuns: Activity[];
  junRuns: Activity[];
  julyRuns: Activity[];
  augRuns: Activity[];
  sepRuns: Activity[];
  octRuns: Activity[];
  novRuns: Activity[];
  decRuns: Activity[];

  mobileMonth: number;
  mobileMonthToShow: Activity[];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.mobileMonth = new Date().getMonth();
  }

  incrementMonth(i: number) {
    if (this.mobileMonth === 11 && i === 1) {
      this.mobileMonth = 0;
      this.store.dispatch(new YearActions.ChangeYear(1));
    } else if (this.mobileMonth === 0 && i === -1) {
      this.mobileMonth = 11;
      this.store.dispatch(new YearActions.ChangeYear(-1));
    } else {
      this.mobileMonth += i;
      this.mobileMonthToShow = this.getRunsByMonth(this.mobileMonth);
    }
  }

  getDate(year: number, month: number): Date {
    return new Date(year, month, 1);
  }

  monthName(monthNum: number): String {
    const month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    return month[monthNum];
  }

  getRunsByMonth(monthNum: number): Activity[] {
    const monthRuns: Activity[][] = [];
    monthRuns[0] = this.janRuns;
    monthRuns[1] = this.febRuns;
    monthRuns[2] = this.marRuns;
    monthRuns[3] = this.aprRuns;
    monthRuns[4] = this.mayRuns;
    monthRuns[5] = this.junRuns;
    monthRuns[6] = this.julyRuns;
    monthRuns[7] = this.augRuns;
    monthRuns[8] = this.sepRuns;
    monthRuns[9] = this.octRuns;
    monthRuns[10] = this.novRuns;
    monthRuns[11] = this.decRuns;
    return monthRuns[monthNum];
  }

  selected(run: Run) {
    this.daySelected.emit(run);
  }
}
