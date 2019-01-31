import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/run';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.css']
})
export class YearComponent implements OnInit {

  @Input() year: number;
  @Input() set runs(runs: Run[]) {
    if (runs) {
      console.log(runs);
      this.janRuns = runs.filter(run => run.date.toDate().getMonth() === 0);
      this.febRuns = runs.filter(run => run.date.toDate().getMonth() === 1);
      this.marRuns = runs.filter(run => run.date.toDate().getMonth() === 2);
      this.aprRuns = runs.filter(run => run.date.toDate().getMonth() === 3);
      this.mayRuns = runs.filter(run => run.date.toDate().getMonth() === 4);
      this.junRuns = runs.filter(run => run.date.toDate().getMonth() === 5);
      this.julyRuns = runs.filter(run => run.date.toDate().getMonth() === 6);
      this.augRuns = runs.filter(run => run.date.toDate().getMonth() === 7);
      this.sepRuns = runs.filter(run => run.date.toDate().getMonth() === 8);
      this.octRuns = runs.filter(run => run.date.toDate().getMonth() === 9);
      this.novRuns = runs.filter(run => run.date.toDate().getMonth() === 10);
      this.decRuns = runs.filter(run => run.date.toDate().getMonth() === 11);
      this.mobileMonthToShow = this.getRunsByMonth(this.mobileMonth);
    }
  }

  @Output() incrementYear: EventEmitter<number> = new EventEmitter<number>();
  @Output() daySelected: EventEmitter<Run> = new EventEmitter<Run>();

  janRuns: Run[];
  febRuns: Run[];
  marRuns: Run[];
  aprRuns: Run[];
  mayRuns: Run[];
  junRuns: Run[];
  julyRuns: Run[];
  augRuns: Run[];
  sepRuns: Run[];
  octRuns: Run[];
  novRuns: Run[];
  decRuns: Run[];

  mobileMonth: number;
  mobileMonthToShow: Run[];

  constructor() { }

  ngOnInit() {
    this.mobileMonth = new Date().getMonth();
  }

  incrementMonth(i: number) {
    if (this.mobileMonth === 11 && i === 1) {
      this.mobileMonth = 0;
      this.incrementYear.emit(1);
    } else if (this.mobileMonth === 0 && i === -1) {
      this.mobileMonth = 11;
      this.incrementYear.emit(-1);
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

  getRunsByMonth(monthNum: number): Run[] {
    const monthRuns: Run[][] = [];
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
