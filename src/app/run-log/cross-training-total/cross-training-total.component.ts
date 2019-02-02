import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';

@Component({
  selector: 'app-cross-training-total',
  templateUrl: './cross-training-total.component.html',
  styleUrls: ['./cross-training-total.component.css']
})
export class CrossTrainingTotalComponent implements OnInit {

  @Input() set activities(activities: Activity[]) {
    if (activities) {
      this.yoga = 0;
      this.bike = 0;
      this.gym = 0;
      this.kettlebell = 0;

      activities.forEach((activity: Activity) => {
        switch (activity.activityType) {
          case ActivityTypeEnum.YOGA:
            this.yoga++;
            break;
          case ActivityTypeEnum.BIKE:
            this.bike++;
            break;
          case ActivityTypeEnum.GYM:
            this.gym++;
            break;
          case ActivityTypeEnum.KETTLEBELL:
            this.kettlebell++;
            break;
        }
      });
    }
  }

  yoga: number;
  bike: number;
  gym: number;
  kettlebell: number;

  constructor() { }

  ngOnInit() {
  }

}
