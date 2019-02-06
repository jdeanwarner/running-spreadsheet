import { Season } from './../shared/season';
import { ActivityService } from './../shared/activity.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  seasons: Season[];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.getSeasons().subscribe(result => this.seasons = result);
  }

}
