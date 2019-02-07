import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Season } from 'src/app/shared/season';
import { TrainingBlock } from 'src/app/shared/training-block';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  @Input() season: Season;
  @Input() scheduledActivities: Activity[];
  @Output() addTrainingBlock: EventEmitter<TrainingBlock> = new EventEmitter<TrainingBlock>();

  week: Date[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  getScheduleForTrainingBlock(trainingBlock: TrainingBlock): Activity[] {
    if (this.scheduledActivities) {
      return this.scheduledActivities.filter((activity: Activity) => {
        if (activity.date >= trainingBlock.startDate && activity.date <= trainingBlock.endDate) {
          return activity;
        }
      });
    }
  }

  addBlock() {
    this.addTrainingBlock.emit();
  }
}
