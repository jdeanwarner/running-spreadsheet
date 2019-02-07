import { TrainingBlock } from './../../shared/training-block';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Season } from 'src/app/shared/season';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.css']
})
export class AddSeasonComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddSeasonComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { season: Season }) { }

  ngOnInit() {
    let season: Season = null;
    if (this.data && this.data.season) {
      season = this.data.season;
    } else {
      season = new Season();
    }

    const trainingBlocksArr: FormArray = new FormArray([]);
    if (season.trainingBlocks) {
      season.trainingBlocks.forEach((trainingBlock: TrainingBlock) => {
        trainingBlocksArr.push(this.getTrainingBlock(trainingBlock));
      });
    }

    this.formGroup = new FormGroup({
      id: new FormControl(season.id),
      description: new FormControl(season.description, Validators.required),
      trainingBlocks: trainingBlocksArr
    });
  }

  save() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  addTrainingBlock() {
    (<FormArray>this.formGroup.get('trainingBlocks')).push(this.getTrainingBlock(null));
  }

  getTrainingBlock(trainingBlock: TrainingBlock): FormGroup {
    const trainingBlockGrp = new FormGroup({
      description: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required)
    });
    if (trainingBlock) {
      trainingBlockGrp.setValue(trainingBlock);
    }

    return trainingBlockGrp;
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
