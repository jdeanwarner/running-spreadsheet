import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activity';
import { ActivityType } from 'src/app/shared/activity-type.enum';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  @Input() activity: Activity;

  activityType = ActivityType;

  constructor() { }

  ngOnInit() {
  }

}
