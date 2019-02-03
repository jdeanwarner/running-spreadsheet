import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from 'src/app/shared/activities/activity';

@Component({
  selector: 'app-add-kettlebell',
  templateUrl: './add-kettlebell.component.html',
  styleUrls: ['./add-kettlebell.component.css']
})
export class AddKettlebellComponent implements OnInit {

  _formGroup: FormGroup;
  @Input() set formGroup (formGroup: FormGroup) {
    formGroup.addControl('workoutName', new FormControl());
    formGroup.addControl('weight', new FormControl());
    formGroup.addControl('circuits', new FormControl());
    this._formGroup = formGroup;
  }

  @Input() set kettlebell (kettlebell: Activity) {
    if (this._formGroup && kettlebell) {
      this._formGroup.patchValue(kettlebell);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
