import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKettlebellComponent } from './add-kettlebell.component';

describe('AddKettlebellComponent', () => {
  let component: AddKettlebellComponent;
  let fixture: ComponentFixture<AddKettlebellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKettlebellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKettlebellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
