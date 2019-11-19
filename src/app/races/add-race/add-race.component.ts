import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RaceStatus } from 'src/app/shared/race-status.enum';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Race } from 'src/app/shared/race';
import { firestore } from 'firebase';

@Component({
  selector: 'app-add-race',
  templateUrl: './add-race.component.html',
  styleUrls: ['./add-race.component.css']
})
export class AddRaceComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(null, Validators.required),
    location: new FormGroup({
      state: new FormControl(),
      city: new FormControl()
    }),
    date: new FormControl(null, Validators.required),
    distance: new FormControl(),
    status: new FormControl(),
    result: new FormControl(),
    raceUrl: new FormControl(),
    resultUrl: new FormControl()
  });

  raceStatus: string[] = Object.keys(RaceStatus);

  constructor(private dialogRef: MatDialogRef<AddRaceComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { race: Race }) { }

  ngOnInit() {
    if (this.data.race) {
      this.formGroup.patchValue(this.data.race);
    }
  }

  delete() {
    this.dialogRef.close(this.data.race.id);
  }

  save() {
    if (this.formGroup.valid) {
      const saveRace: Race = this.formGroup.value;
      this.dialogRef.close(saveRace);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
