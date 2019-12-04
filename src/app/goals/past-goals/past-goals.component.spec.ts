import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastGoalsComponent } from './past-goals.component';

describe('PastGoalsComponent', () => {
  let component: PastGoalsComponent;
  let fixture: ComponentFixture<PastGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
