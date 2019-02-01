import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossTrainingTotalComponent } from './cross-training-total.component';

describe('CrossTrainingTotalComponent', () => {
  let component: CrossTrainingTotalComponent;
  let fixture: ComponentFixture<CrossTrainingTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrossTrainingTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossTrainingTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
