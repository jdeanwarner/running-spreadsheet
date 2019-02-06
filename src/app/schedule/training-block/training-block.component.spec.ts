import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingBlockComponent } from './training-block.component';

describe('TrainingBlockComponent', () => {
  let component: TrainingBlockComponent;
  let fixture: ComponentFixture<TrainingBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
