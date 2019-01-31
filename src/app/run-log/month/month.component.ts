import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Run } from 'src/app/shared/run';
import { Day } from 'src/app/shared/day';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';
import { defaultKeyValueDiffers } from '@angular/core/src/change_detection/change_detection';

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
  @Input() set runs(runs: Run[]) {
    if (runs && this.days) {
      this.total = 0;
      runs.forEach((run: Run) => {
        this.days[run.date.toDate().getDate() - 1].run = run;
        this.total += run.distance;
      });
    }
  }
  @Output() daySelected: EventEmitter<Run> = new EventEmitter<Run>();

  days: Day[];
  initYear: number;
  initMonth: number;
  initDate: Date;
  total: number;

  constructor() { }

  ngOnInit() {

  }

  initDays() {
    if (this.initYear && this.initMonth >= 0) {
      this.days = [];
      this.initDate = new Date(this.initYear, this.initMonth, 1);
      const date = new Date(this.initDate);
      while (date.getMonth() === this.initMonth) {
        this.days.push({
          date: new Date(date),
          run: null
        });
        date.setDate(date.getDate() + 1);
      }
    }
  }

  selected(day: Day) {
    if (!day.run) {
      day.run = new Run();
      day.run.date = Timestamp.fromDate(day.date);
    }
    this.daySelected.emit(day.run);
  }
}
