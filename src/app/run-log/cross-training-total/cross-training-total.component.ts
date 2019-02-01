import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityType } from 'src/app/shared/activities/activity-type.enum';

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
          case ActivityType.YOGA:
            this.yoga++;
            break;
          case ActivityType.BIKE:
            this.bike++;
            break;
          case ActivityType.GYM:
            this.gym++;
            break;
          case ActivityType.KETTLEBELL:
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
