import { Month } from 'src/app/shared/month.enum';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/activities/run';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { RunType } from 'src/app/shared/activities/run-type';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  @Input() activityTypes: ActivityType[];
  @Input() activityMonthMap: {[month: string]: Activity[]};
  @Input() runTypes: RunType[];
  @Input() year: string;

  @Output() daySelected: EventEmitter<Run> = new EventEmitter<Run>();
  @Output() changeYear: EventEmitter<number> = new EventEmitter<number>();

  MONTHS = Month;

  mobileMonth: number;
  mobileMonthToShow: Activity[];

  constructor() {}

  ngOnInit() {
    this.mobileMonth = new Date().getMonth();
  }

  incrementMonth(i: number) {
    let year = parseInt(this.year, 10);
    if (this.mobileMonth === 11 && i === 1) {
      this.mobileMonth = 0;
      this.changeYear.emit(year += 1);
    } else if (this.mobileMonth === 0 && i === -1) {
      this.mobileMonth = 11;
      this.changeYear.emit(year -= 1);
    } else {
      this.mobileMonth += i;
      this.mobileMonthToShow = this.activityMonthMap[this.getMonthName(this.mobileMonth)];
    }
  }

  selected(run: Run) {
    this.daySelected.emit(run);
  }

  getMonthName(i: number) {
    const monthNums = Object.values(Month);
    return monthNums[i].valueOf();
  }
}
