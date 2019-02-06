import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input } from '@angular/core';
import { Season } from 'src/app/shared/season';
import { TrainingBlock } from 'src/app/shared/training-block';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  @Input() season: Season;
  @Input() scheduledActivities: Activity[];

  week: Date[] = [];

  constructor() { }

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
}
