import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from 'src/app/shared/day';
import { Run } from 'src/app/shared/run';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() date: Date;
  @Input() day: Day;

  constructor() { }

  ngOnInit() {
  }

}
