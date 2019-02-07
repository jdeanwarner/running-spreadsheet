import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampDatePickerComponent } from './timestamp-date-picker.component';

describe('TimestampDatePickerComponent', () => {
  let component: TimestampDatePickerComponent;
  let fixture: ComponentFixture<TimestampDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
