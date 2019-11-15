import { Month } from './../../shared/month.enum';
import { GoalType } from './../goal-type.enum';
import { GoalPeriod } from './../goal-period.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectChange, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Goal } from '../goal';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    type: new FormControl(),
    value: new FormControl(),
    month: new FormControl(),
    year: new FormControl()
  });

  GOAL_PERIOD = GoalPeriod;
  GOAL_TYPE = GoalType;
  MONTH = Month;
  showMonth = false;

  constructor(private dialogRef: MatDialogRef<AddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { goal: Goal }) { }

  ngOnInit() {
    if (this.data.goal) {
      this.formGroup.patchValue(this.data.goal);
    }
  }

  periodChange(period: MatSelectChange ) {
    this.showMonth = period.value === GoalPeriod.MONTH;
  }

  delete() {
    this.dialogRef.close(this.data.goal.id);
  }

  save() {
    if (this.formGroup.valid) {
      const saveGaol: Goal = this.formGroup.value;
      this.dialogRef.close(saveGaol);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
