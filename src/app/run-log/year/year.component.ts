import { Component, OnInit, Input } from '@angular/core';
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
      this.janRuns = runs.filter(run => run.date.toDate().getMonth() === 0);
    }
  }

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

  constructor() { }

  ngOnInit() {

  }

}
