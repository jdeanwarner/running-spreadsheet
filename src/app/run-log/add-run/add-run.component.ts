import { Component, OnInit, Input } from '@angular/core';
import { RunType } from 'src/app/shared/activities/run-type';
import { FormGroup, FormControl } from '@angular/forms';
import { Activity } from 'src/app/shared/activities/activity';

@Component({
  selector: 'app-add-run',
  templateUrl: './add-run.component.html',
  styleUrls: ['./add-run.component.css']
})
export class AddRunComponent implements OnInit {

  @Input() runTypes: RunType[];

  _formGroup: FormGroup;
  @Input() set formGroup (formGroup: FormGroup) {
    formGroup.addControl('runType', new FormControl());
    formGroup.addControl('distance', new FormControl());
    this._formGroup = formGroup;
  }

  @Input() set run (run: Activity) {
    if (this._formGroup && run) {
      this._formGroup.patchValue(run);
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
