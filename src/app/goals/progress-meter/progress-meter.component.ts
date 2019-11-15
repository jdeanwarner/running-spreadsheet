import { Component, OnInit, Input } from '@angular/core';
import { GoalStatus } from '../goal-status.enum';

@Component({
  selector: 'app-progress-meter',
  templateUrl: './progress-meter.component.html',
  styleUrls: ['./progress-meter.component.css']
})
export class ProgressMeterComponent implements OnInit {

  @Input() title: string;
  @Input() goal: number;
  @Input() current: number;
  @Input() status: GoalStatus;

  constructor() { }

  ngOnInit() {
  }

  getPercentComplete(val: number, goal: number) {
    return val / goal * 100;
  }

  getClass(status: GoalStatus) {
    return status === GoalStatus.COMPLETE ? 'completed' :
      status === GoalStatus.FAILED ? 'failed' :
      status === GoalStatus.ON_PACE ? 'on-pace' : 'failed';
  }

}
