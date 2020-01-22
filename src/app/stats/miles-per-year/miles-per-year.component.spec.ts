import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesPerYearComponent } from './miles-per-year.component';

describe('MilesPerYearComponent', () => {
  let component: MilesPerYearComponent;
  let fixture: ComponentFixture<MilesPerYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilesPerYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilesPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
