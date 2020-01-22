import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesPerMonthComponent } from './miles-per-month.component';

describe('MilesPerMonthComponent', () => {
  let component: MilesPerMonthComponent;
  let fixture: ComponentFixture<MilesPerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilesPerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilesPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
