import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledActivitiesComponent } from './scheduled-activities.component';

describe('ScheduledActivitiesComponent', () => {
  let component: ScheduledActivitiesComponent;
  let fixture: ComponentFixture<ScheduledActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
