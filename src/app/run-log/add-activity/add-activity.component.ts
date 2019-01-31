import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Timestamp = firestore.Timestamp;
import { firestore } from 'firebase';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent implements OnInit {

  runType: String[] = ['Workout', 'Long Run', 'Race'];
  formGroup: FormGroup = new FormGroup({
    date: new FormControl(Validators.required),
    distance: new FormControl(Validators.required),
    type: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<AddActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close({
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
