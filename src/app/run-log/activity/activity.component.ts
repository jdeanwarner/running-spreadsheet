import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { ActivityType } from 'src/app/shared/activities/activity-type';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() activity: Activity;
  @Input() activityTypes: ActivityType[];

  activityTypeEnum = ActivityTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
