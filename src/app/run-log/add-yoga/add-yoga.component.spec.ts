import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYogaComponent } from './add-yoga.component';

describe('AddYogaComponent', () => {
  let component: AddYogaComponent;
  let fixture: ComponentFixture<AddYogaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYogaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
