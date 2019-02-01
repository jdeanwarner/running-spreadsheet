import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunTypeTotalComponent } from './run-type-total.component';

describe('RunTypeTotalComponent', () => {
  let component: RunTypeTotalComponent;
  let fixture: ComponentFixture<RunTypeTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunTypeTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunTypeTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
