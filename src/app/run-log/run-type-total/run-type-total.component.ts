import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';

@Component({
  selector: 'app-run-type-total',
  templateUrl: './run-type-total.component.html',
  styleUrls: ['./run-type-total.component.css']
})
export class RunTypeTotalComponent implements OnInit {

  @Input() set activities(activities: Activity[]) {
    if (activities) {
      this.workout = 0;
      this.longRun = 0;
      this.race = 0;

      activities.forEach((activity: Activity) => {
        if (activity.activityType === ActivityTypeEnum.RUN) {
          if ((<Run>activity).runType === RunTypeEnum.WORKOUT) {
            this.workout++;
          } else if ((<Run>activity).runType === RunTypeEnum.LONG_RUN) {
            this.longRun++;
          } else if ((<Run>activity).runType === RunTypeEnum.RACE) {
            this.race++;
          }
        }
      });
    }
  }

  workout: number;
  longRun: number;
  race: number;

  constructor() { }

  ngOnInit() {
  }

}
