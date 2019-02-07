import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualActivitiesComponent } from './actual-activities.component';

describe('ActualActivitiesComponent', () => {
  let component: ActualActivitiesComponent;
  let fixture: ComponentFixture<ActualActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
