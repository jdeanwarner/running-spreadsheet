import { GoalType } from './../goal-type.enum';
import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../goal';

@Component({
  selector: 'app-year-goals',
  templateUrl: './year-goals.component.html',
  styleUrls: ['./year-goals.component.css']
})
export class YearGoalsComponent implements OnInit {

  @Input() goals: Goal;
  @Input() yearMiles: number;

  goalTypes = GoalType;

  constructor() { }

  ngOnInit() {
  }

}
