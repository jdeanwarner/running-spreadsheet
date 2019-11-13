import { Month } from './../../shared/month.enum';
import { GoalType } from './../goal-type.enum';
import { GoalPeriod } from './../goal-period.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    goalPeriod: new FormControl(),
    type: new FormControl(),
    value: new FormControl(),
    month: new FormControl(),
    year: new FormControl()
  });

  GOAL_PERIOD = GoalPeriod;
  GOAL_TYPE = GoalType;

  goalPeriodArray = Object.keys(GoalPeriod).map(k => ({key: k, value: GoalPeriod[k]}));
  goalTypeArray = Object.keys(GoalType).map(k => ({key: k, value: GoalType[k]}));
  monthArray = Object.keys(Month).map(k => ({key: k, value: Month[k]}));

  constructor() { }

  ngOnInit() {
  }

  delete() {

  }

  save() {

  }

  close() {

  }

}
