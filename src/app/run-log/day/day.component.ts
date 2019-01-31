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
  @Output() selected: EventEmitter<Run> = new EventEmitter<Run>();

  constructor() { }

  ngOnInit() {
  }

  edit() {
    if (this.day && this.day.run) {
      this.selected.emit(this.day.run);
    }
  }

}
