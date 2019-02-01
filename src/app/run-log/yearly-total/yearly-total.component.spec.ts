import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyTotalComponent } from './yearly-total.component';

describe('YearlyTotalComponent', () => {
  let component: YearlyTotalComponent;
  let fixture: ComponentFixture<YearlyTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
