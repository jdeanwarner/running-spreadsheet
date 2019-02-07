import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.css']
})
export class AddSeasonComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(null, Validators.required),
    trainingBlocks: new FormArray([])
  });

  constructor(private dialogRef: MatDialogRef<AddSeasonComponent>) { }

  ngOnInit() {
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  addTrainingBlock() {
    (<FormArray>this.formGroup.get('trainingBlocks')).push(new FormGroup({
      description: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    }));
  }

  deleteTrainingBlock(i: number) {
    (<FormArray>this.formGroup.get('trainingBlocks')).removeAt(i);
  }

  deleteSeason() {
    this.dialogRef.close(this.formGroup.get('id').value);
  }

  close() {
    this.dialogRef.close();
  }

}
