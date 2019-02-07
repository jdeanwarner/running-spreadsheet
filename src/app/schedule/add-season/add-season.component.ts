import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.css']
})
export class AddSeasonComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    description: new FormControl(null, Validators.required)
  });

  constructor(private dialogRef: MatDialogRef<AddSeasonComponent>) { }

  ngOnInit() {
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.get('description').value);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
