import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';

@Component({
  selector: 'app-yearly-total',
  templateUrl: './yearly-total.component.html',
  styleUrls: ['./yearly-total.component.css']
})
export class YearlyTotalComponent implements OnInit {

  @Input() runningMiles: number;
  @Input() highEffortRuns: number;
  @Input() crossTraining: number;

  constructor() { }

  ngOnInit() {
  }

}
