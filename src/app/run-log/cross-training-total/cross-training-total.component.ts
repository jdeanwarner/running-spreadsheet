import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { ActivityType } from 'src/app/shared/activities/activity-type';

@Component({
  selector: 'app-cross-training-total',
  templateUrl: './cross-training-total.component.html',
  styleUrls: ['./cross-training-total.component.css']
})
export class CrossTrainingTotalComponent implements OnInit {

  @Input() crossTrainingMap: {[type: string]: Activity[]};
  @Input() activityTypes: ActivityType[];

  TYPE = ActivityTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
