import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KettlebellComponent } from './kettlebell.component';

describe('KettlebellComponent', () => {
  let component: KettlebellComponent;
  let fixture: ComponentFixture<KettlebellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KettlebellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KettlebellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
