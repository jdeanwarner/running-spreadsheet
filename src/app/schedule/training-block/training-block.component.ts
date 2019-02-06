import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TrainingBlock } from 'src/app/shared/training-block';

@Component({
  selector: 'app-training-block',
  templateUrl: './training-block.component.html',
  styleUrls: ['./training-block.component.css']
})
export class TrainingBlockComponent implements OnInit {

  _trainingBlock: TrainingBlock;
  @Input() set trainingBlock( trainingBlock: TrainingBlock) {
    this._trainingBlock =  trainingBlock;
    let date = this.getMonday(trainingBlock.startDate.toDate());
    this.weeks.push(date);
    while (this.addDays(date, 7) < trainingBlock.endDate.toDate()) {
      this.weeks.push(this.addDays(date, 7));
      date = this.addDays(date, 7);
    }
  }
  @Input() scheduledActivities: Activity[];
  @Output() update: EventEmitter<TrainingBlock> = new EventEmitter<TrainingBlock>();
  weeks: Date[] = [];

  constructor() { }

  ngOnInit() {

  }

  getMonday(date: Date): Date {
    const day = date.getDay(),
    diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  addDays(date: Date, days: number): Date {
    console.log(date.getDate());
    return new Date(new Date().setDate(date.getDate() + days));
  }

  getActivitiesForWeek(startDate: Date): Activity[] {
    if (startDate && this.scheduledActivities) {
      return this.scheduledActivities.filter((activity: Activity) => {
        if (activity.date && activity.date.toDate() >= startDate && activity.date.toDate() <= this.addDays(startDate, 7) ) {
          return activity;
        }
      });
    }
  }

  addWeekStart() {
    console.log(this.addDays(this.weeks[0], -7));
    this.weeks = [this.addDays(this.weeks[0], -7), ...this.weeks];
    console.log(this.weeks);
  }

  addWeekEnd() {
    this.weeks.push(this.addDays(this.weeks[this.weeks.length - 1], 7));
    console.log(this.weeks);
  }
}
