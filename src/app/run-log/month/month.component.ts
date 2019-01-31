import { Component, OnInit, Input } from '@angular/core';
import { Run } from 'src/app/shared/run';
import { Day } from 'src/app/shared/day';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  @Input() monthNum: number;
  @Input() set year( year: number) {
    this.days = [];
    this.initDate = new Date(year, this.monthNum, 1);
    const date = new Date(this.initDate);
    while (date.getMonth() === this.monthNum) {
      this.days.push({
        date: new Date(date),
        run: null
      });
      date.setDate(date.getDate() + 1);
    }
  }
  @Input() set runs(runs: Run[]) {
    if (runs) {
      this.total = 0;
      runs.forEach((run: Run) => {
        this.days[run.date.toDate().getDate() - 1].run = run;
        this.total += run.distance;
      });
    }
  }
  days: Day[];
  initDate: Date;
  total: number;

  constructor() { }

  ngOnInit() {

  }

}
