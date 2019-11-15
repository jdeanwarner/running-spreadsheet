import { Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../goal';
import { GoalStatus } from '../goal-status.enum';

@Component({
  selector: 'app-year-goals',
  templateUrl: './year-goals.component.html',
  styleUrls: ['./year-goals.component.css']
})
export class YearGoalsComponent implements OnInit {

  @Input() goals: Goal;
  @Input() yearMiles: number;

  constructor() { }

  ngOnInit() {
  }

  getStatus(current: number, goal: number): GoalStatus {
    if (current > goal) {
      return GoalStatus.COMPLETE;
    } else if (this.getPace(current) > goal) {
      return GoalStatus.ON_PACE;
    } else if (this.getPace(current) < goal) {
      return GoalStatus.BEHIND_PACE;
    } else {
      return GoalStatus.FAILED;
    }
  }

  getPace(current: number) {
    return (current / this.getDayOfTheYear()) * 365;
  }

  getDayOfTheYear() {
    const myDate = new Date();
    const year = myDate.getFullYear();
    const firstJan = new Date(year, 0, 1);
    const differenceInMillieSeconds = myDate.getMilliseconds() - firstJan.getMilliseconds();
    return (differenceInMillieSeconds / (1000 * 60 * 60 * 24) + 1);
  }

}
