import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiftyStatesComponent } from './fifty-states.component';

describe('FiftyStatesComponent', () => {
  let component: FiftyStatesComponent;
  let fixture: ComponentFixture<FiftyStatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiftyStatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiftyStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
