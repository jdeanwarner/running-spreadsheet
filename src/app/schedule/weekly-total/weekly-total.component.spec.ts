import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTotalComponent } from './weekly-total.component';

describe('WeeklyTotalComponent', () => {
  let component: WeeklyTotalComponent;
  let fixture: ComponentFixture<WeeklyTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
