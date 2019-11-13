import { GoalType } from './../goal-type.enum';
import { YearGoal } from './../year-goal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-year-goals',
  templateUrl: './year-goals.component.html',
  styleUrls: ['./year-goals.component.css']
})
export class YearGoalsComponent implements OnInit {

  @Input() yearGoals: { [type: string]: YearGoal };

  goalTypes = GoalType;

  constructor() { }

  ngOnInit() {
  }

}
