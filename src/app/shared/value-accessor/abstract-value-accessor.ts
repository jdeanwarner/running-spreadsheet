import { ControlValueAccessor } from '@angular/forms';

export abstract class AbstractValueAccessor<T> implements ControlValueAccessor {
  _value: T;
  get value(): T { return this._value; }
  set value(v: T) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  writeValue(value: T) {
    this._value = value;
    // warning: comment below if only want to emit on user intervention
    this.onChange(value);
  }

  onChange = (_) => {};
  onTouched = () => {};
  registerOnChange(fn: (_: T) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
