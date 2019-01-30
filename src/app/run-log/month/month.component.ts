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
  @Input() year: number;
  @Input() set runs(runs: Run[]) {
    if (runs) {
      runs.forEach((run: Run) => {
        this.days[run.date.toDate().getDate() - 1].run = run;
      });
    }
  }
  days: Day[] = [];
  date: Date;

  constructor() { }

  ngOnInit() {
    this.date = new Date(this.year, this.monthNum, 1);
    while (this.date.getMonth() === this.monthNum) {
      this.days.push({
        date: new Date(this.date),
        run: null
      });
      this.date.setDate(this.date.getDate() + 1);
   }
  }

}
