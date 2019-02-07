import { Component, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { firestore } from 'firebase';
import { ValueAccessorService } from '../value-accessor/value-accessor.service';

@Component({
  selector: 'app-timestamp-date-picker',
  templateUrl: './timestamp-date-picker.component.html',
  styleUrls: ['./timestamp-date-picker.component.css'],
  providers: [ValueAccessorService.getProvider(TimestampDatePickerComponent)]
})
export class TimestampDatePickerComponent implements OnInit, ControlValueAccessor  {

  onChange;
  formControl: FormControl = new FormControl();
  @Input() placeholder: string;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: firestore.Timestamp): void {
    this.formControl.setValue(value.toDate());
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  valueChanged(date: Date) {
    this.onChange(firestore.Timestamp.fromDate(this.formControl.value));
  }

}
