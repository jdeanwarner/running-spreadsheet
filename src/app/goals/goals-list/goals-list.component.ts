import { Params } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../goal';
import { GoalStatus } from '../goal-status.enum';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.css']
})
export class GoalsListComponent implements OnInit {

  @Input() name: string;
  @Input() list: Goal[];
  @Input() results: { [id: string ]: number};

  constructor() { }

  ngOnInit() {
  }

  getStatus(goal: Goal, result: number): GoalStatus {
    if (result > goal.value) {
      return GoalStatus.COMPLETE;
    } else if (this.isActiveGoal(goal) && this.getPace(goal, result) > goal.value) {
      return GoalStatus.ON_PACE;
    } else if (this.isActiveGoal(goal) && this.getPace(goal, result) < goal.value) {
      return GoalStatus.BEHIND_PACE;
    } else {
      return GoalStatus.FAILED;
    }
  }

  isActiveGoal(goal: Goal) {
    return new Date().getTime() >= goal.startDate.toDate().getTime() && new Date().getTime() <= goal.endDate.toDate().getTime();
  }

  getPace(goal: Goal, result: number) {
    return (result / this.getDaysFromGoalStart(goal)) * 365;
  }

  getDaysFromGoalStart(goal: Goal) {
    const diffInTime = new Date().getTime() - goal.startDate.toDate().getTime();
    return diffInTime / (1000 * 3600 * 24);
  }

}
