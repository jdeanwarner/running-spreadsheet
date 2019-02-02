import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from 'src/app/shared/day';
import { Run } from 'src/app/shared/activities/run';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {

  @Input() day: Day;
  @Input() activityTypes: ActivityType[];
  @Output() activitySelected: EventEmitter<Activity> = new EventEmitter<Activity>();
  @Output() daySelected: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  selected(activity: Activity): void {
    this.activitySelected.emit(activity);
  }

  dateClicked(date: Date): void {
    this.daySelected.emit(date);
  }

}
