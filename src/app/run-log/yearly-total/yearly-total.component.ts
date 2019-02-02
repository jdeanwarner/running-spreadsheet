import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';

@Component({
  selector: 'app-yearly-total',
  templateUrl: './yearly-total.component.html',
  styleUrls: ['./yearly-total.component.css']
})
export class YearlyTotalComponent implements OnInit {

  @Input() set activities(activities: Activity[]) {
    if (activities) {
      this.runningMiles = 0;
      this.highEffortRuns = 0;
      this.crossTraining = 0;

      activities.forEach((activity: Activity) => {
        if (activity.activityType === ActivityTypeEnum.RUN) {
          this.runningMiles += (<Run>activity).distance;
          if ((<Run>activity).runType) {
            this.highEffortRuns++;
          }
        } else {
          this.crossTraining ++;
        }
      });
    }
  }

  runningMiles: number;
  highEffortRuns: number;
  crossTraining: number;

  constructor() { }

  ngOnInit() {
  }

}
