import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { RunType } from 'src/app/shared/activities/run-type';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  runType: RunType[];
  activityType: ActivityType[];
  activityTypeEnum = ActivityTypeEnum;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    activityType: new FormControl(Validators.required),
    date: new FormControl(Validators.required)
  });

  runGroup: FormGroup = new FormGroup({});
  kettlebellGroup: FormGroup = new FormGroup({});
  activity: Activity;

  constructor(private dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { activity: Activity, activityTypes: ActivityType[], runTypes: RunType[] }) { }

  ngOnInit() {
    if (this.data.activity) {
      this.activity = this.data.activity;
      if (this.data.activity.id) {
        this.formGroup.patchValue(this.activity);
      }
      this.formGroup.patchValue({
        date: this.activity.date.toDate(),
      });
    }

    this.activityType = this.data.activityTypes;
    this.runType = [ { id: '', description: ''}, ...this.data.runTypes];
  }

  save() {
    if (this.formGroup.valid) {
      let saveActivity: Activity = {
        id: this.formGroup.get('id').value,
        activityType: this.formGroup.get('activityType').value,
        date: firestore.Timestamp.fromDate(<Date>this.formGroup.get('date').value)
      };

      switch (this.formGroup.get('activityType').value) {
        case ActivityTypeEnum.RUN:
          saveActivity = { ...saveActivity, ...this.runGroup.value };
          break;
        case ActivityTypeEnum.KETTLEBELL:
          saveActivity = { ...saveActivity, ...this.kettlebellGroup.value };
          break;
      }

      this.dialogRef.close(saveActivity);
    }
  }

  delete() {
    this.dialogRef.close(this.formGroup.get('id').value);
  }

  close(): void {
    this.dialogRef.close();
  }

}
