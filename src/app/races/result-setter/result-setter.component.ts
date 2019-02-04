import { Component, OnInit } from '@angular/core';
import { ValueAccessorService } from 'src/app/shared/value-accessor/value-accessor.service';
import { FormGroup, FormControl, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-result-setter',
  templateUrl: './result-setter.component.html',
  styleUrls: ['./result-setter.component.css'],
  providers: [ValueAccessorService.getProvider(ResultSetterComponent)]
})
export class ResultSetterComponent implements OnInit, ControlValueAccessor {

  onChange;

  formGroup: FormGroup = new FormGroup({
    hours: new FormControl(),
    minutes: new FormControl(),
    seconds: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: number): void {
    const hours   = Math.floor(value / 3600);
    const minutes = Math.floor((value - (hours * 3600)) / 60);
    const seconds = value - (hours * 3600) - (minutes * 60);
    this.formGroup.get('hours').setValue(hours);
    this.formGroup.get('minutes').setValue(minutes);
    this.formGroup.get('seconds').setValue(seconds);
  }
  registerOnChange(fn: any ): void {
    this.onChange = fn;
  }
  change() {
    this.onChange((this.formGroup.get('hours').value * 60 * 60) +
    (this.formGroup.get('minutes').value * 60) +
    (this.formGroup.get('seconds').value));
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
