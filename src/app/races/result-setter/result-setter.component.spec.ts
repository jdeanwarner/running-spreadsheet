import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSetterComponent } from './result-setter.component';

describe('ResultSetterComponent', () => {
  let component: ResultSetterComponent;
  let fixture: ComponentFixture<ResultSetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
