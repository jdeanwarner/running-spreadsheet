import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';
import { Run } from 'src/app/shared/run';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  runType: String[] = ['Workout', 'Long Run', 'Race'];
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    date: new FormControl(Validators.required),
    distance: new FormControl(Validators.required),
    type: new FormControl()
  });

  constructor(private dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { run: Run }) { }

  ngOnInit() {
    this.formGroup.patchValue({
      date: this.data.run.date.toDate(),
    });

    if (this.data.run && this.data.run.id) {
      this.formGroup.patchValue({
        id: this.data.run.id,
        distance: this.data.run.distance,
        type: this.data.run.type
      });
    }
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        id: this.formGroup.get('id').value,
        date: Timestamp.fromDate(<Date>this.formGroup.get('date').value),
        distance: this.formGroup.get('distance').value,
        type: this.formGroup.get('type').value
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
