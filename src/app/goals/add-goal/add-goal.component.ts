import { Yoga } from 'src/app/shared/activities/yoga';
import { Swim } from './../../shared/activities/swim';
import { Run } from 'src/app/shared/activities/run';
import { Kettlebell } from 'src/app/shared/activities/kettlebell';
import { Bike } from './../../shared/activities/bike';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { GoalType } from './../goal-type.enum';
import { Month } from './../../shared/month.enum';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Goal } from '../goal';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    type: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    pinned: new FormControl(),
    value: new FormControl()
  });

  GOAL_TYPE = GoalType;
  ACTIVITY_TYPES = ActivityTypeEnum;
  showMonth = false;
  activityProperties: string[] = [];

  constructor(private dialogRef: MatDialogRef<AddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { goal: Goal }) { }

  ngOnInit() {
    if (this.data.goal) {
      this.formGroup.patchValue(this.data.goal);
    }
  }

  changeGoalType(type: GoalType) {
    this.removeExtraControls();
    if (type === GoalType.COUNT_PROPERTY) {
      this.formGroup.addControl('property', new FormControl());
      this.formGroup.addControl('propertyValue', new FormArray([
        new FormControl()
      ]));
    } else if (type === GoalType.COUNT_ACTIVITY) {
      this.formGroup.addControl('activityTypes', new FormArray([
        new FormControl()
      ]));
    } else if (type === GoalType.SUM_PROPERTY) {
      this.formGroup.addControl('activityType', new FormControl());
      this.formGroup.addControl('property', new FormControl());
    }
  }

  getProperties(activityType: ActivityTypeEnum) {
    this.activityProperties = [];
    switch (activityType) {
      case ActivityTypeEnum.BIKE:
        this.activityProperties = Object.keys(new Bike());
        break;
      case ActivityTypeEnum.KETTLEBELL:
        this.activityProperties = Object.keys(new Kettlebell());
        break;
      case ActivityTypeEnum.RUN:
        this.activityProperties = Object.keys(new Run());
        break;
      case ActivityTypeEnum.SWIM:
        this.activityProperties = Object.keys(new Swim());
        break;
      case ActivityTypeEnum.YOGA:
        this.activityProperties = Object.keys(new Yoga());
        break;
    }


    const run = new Run();
    console.log(Object.keys(run));
    console.log(this.activityProperties);
  }

  removeExtraControls() {
    this.formGroup.removeControl('property');
    this.formGroup.removeControl('propertyValue');
    this.formGroup.removeControl('activityTypes');
    this.formGroup.removeControl('activityType');
    this.formGroup.removeControl('property');
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
