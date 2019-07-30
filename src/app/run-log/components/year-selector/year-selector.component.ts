import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as YearActions from '../../store/actions/year.action';


@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css']
})
export class YearSelectorComponent implements OnInit {

  @Input() year: string;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  constructor() {

  }

  ngOnInit() {
  }

  incrementYear(i: number) {
    this.change.emit(parseInt(this.year, 10) + i);
  }

}
