import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from 'src/app/shared/activities/activity';

@Component({
  selector: 'app-add-yoga',
  templateUrl: './add-yoga.component.html',
  styleUrls: ['./add-yoga.component.css']
})
export class AddYogaComponent implements OnInit {

  _formGroup: FormGroup;
  @Input() set formGroup (formGroup: FormGroup) {
    formGroup.addControl('videoName', new FormControl());
    formGroup.addControl('duration', new FormControl());
    formGroup.addControl('focus', new FormControl());
    formGroup.addControl('url', new FormControl());
    this._formGroup = formGroup;
  }

  @Input() set yoga (yoga: Activity) {
    if (this._formGroup && yoga) {
      this._formGroup.patchValue(yoga);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
