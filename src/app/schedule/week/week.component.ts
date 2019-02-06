import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Input() startDate: Date;
  @Input() scheduledActivities: Activity[];

  constructor() { }

  ngOnInit() {
  }

}
