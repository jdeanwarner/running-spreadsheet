import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type.enum';
import { RunType } from 'src/app/shared/activities/run-type.enum';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  runType: String[] = ['', ...Object.keys(RunType)];
  activityType: String[] = Object.keys(ActivityType);
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    activityType: new FormControl(Validators.required),
    date: new FormControl(Validators.required),
    distance: new FormControl(Validators.required),
    runType: new FormControl()
  });

  constructor(private dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { activity: Activity }) { }

  ngOnInit() {
    if (this.data.activity) {
      if (this.data.activity.id) {
        this.formGroup.patchValue(this.data.activity);
      }
      this.formGroup.patchValue({
        date: this.data.activity.date.toDate(),
      });
    }
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        id: this.formGroup.get('id').value,
        activityType: this.formGroup.get('activityType').value,
        date: firestore.Timestamp.fromDate(<Date>this.formGroup.get('date').value),
        distance: this.formGroup.get('distance').value,
        runType: this.formGroup.get('runType').value
      });
    }
  }

  delete() {
    this.dialogRef.close(this.formGroup.get('id').value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
