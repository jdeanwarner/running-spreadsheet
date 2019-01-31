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
