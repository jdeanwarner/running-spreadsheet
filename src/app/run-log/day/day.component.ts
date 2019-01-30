import { Component, OnInit, Input } from '@angular/core';
import { Day } from 'src/app/shared/day';

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
