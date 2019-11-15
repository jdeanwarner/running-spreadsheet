import { Month } from './../../shared/month.enum';
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
    year: new FormControl(),
    miles: new FormControl(),
    crossTraining: new FormControl(),
    highEffortRuns: new FormControl(),
    months: new FormGroup({
      JANUARY: new FormControl(),
      FEBRUARY: new FormControl(),
      MARCH: new FormControl(),
      APRIL: new FormControl(),
      MAY: new FormControl(),
      JUNE: new FormControl(),
      JULY: new FormControl(),
      AUGUST: new FormControl(),
      SEPTEMBER: new FormControl(),
      OCTOBER: new FormControl(),
      NOVEMBER: new FormControl(),
      DECEMBER: new FormControl(),
    })
  });

  MONTHS = Month;
  showMonth = false;

  constructor(private dialogRef: MatDialogRef<AddGoalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { goal: Goal }) { }

  ngOnInit() {
    if (this.data.goal) {
      this.formGroup.patchValue(this.data.goal);
    }
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
