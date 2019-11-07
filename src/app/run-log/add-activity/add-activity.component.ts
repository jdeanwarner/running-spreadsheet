import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firestore } from 'firebase';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';
import { ActivityType } from 'src/app/shared/activities/activity-type';
import { RunType } from 'src/app/shared/activities/run-type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  runTypes$: Observable<RunType[]>;
  activityTypes$: Observable<ActivityType[]>;
  activityTypeEnum = ActivityTypeEnum;
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    activityType: new FormControl(Validators.required),
    date: new FormControl(Validators.required)
  });

  runGroup: FormGroup = new FormGroup({});
  kettlebellGroup: FormGroup = new FormGroup({});
  yogaGroup: FormGroup = new FormGroup({});
  activity: Activity;

  constructor(private dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      activity: Activity,
      activityTypes: Observable<ActivityType[]>,
      runTypes: Observable<RunType[]>
    }) { }

  ngOnInit() {
    if (this.data.activity) {
      this.activity = this.data.activity;
      if (this.data.activity.id) {
        this.formGroup.patchValue(this.activity);
      }
      this.formGroup.patchValue({
        date: this.activity.date,
      });
    }

    this.activityTypes$ = this.data.activityTypes;
    this.runTypes$ = this.data.runTypes;
  }

  save() {
    if (this.formGroup.valid) {
      let saveActivity: Activity = this.formGroup.value;

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
