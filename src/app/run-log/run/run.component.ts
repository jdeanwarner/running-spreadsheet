import { Component, OnInit, Input } from '@angular/core';
import { Run } from 'src/app/shared/activities/run';
import { RunType } from 'src/app/shared/activities/run-type';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {

  @Input() run: Run;
  @Input() runTypes: RunType[];

  constructor() { }

  ngOnInit() {
  }

}
