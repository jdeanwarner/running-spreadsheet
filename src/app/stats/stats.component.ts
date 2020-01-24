import { Component, OnInit } from '@angular/core';
import * as fromLog from '../run-log/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Activity } from '../shared/activities/activity';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  activitiesByYear$: Observable<{[year: number]: Activity[]}>;
  activitiesByYearMonth$: Observable<{[year: number]: {[month: string]: Activity[]}}>;
  activitiesCount$: Observable<number>;

  constructor(private logStore: Store<fromLog.LogState>) {
    this.activitiesByYear$ = this.logStore.select(fromLog.getActivitiesYearMap);
    this.activitiesByYearMonth$ = this.logStore.select(fromLog.getActivitiesYearMonthMap);
    this.activitiesCount$ = this.logStore.select(fromLog.getActivitiesCount);
  }

  ngOnInit() {
  }

  allActivitiesLoaded(activityCount: number, activities: {[year: number]: Activity[]}) {
    if (activityCount && activityCount > 0 && activities) {
      const allActivities = Array.prototype.concat.apply([], Object.values(activities));
      return allActivities.length === activityCount;
    } else {
      return false;
    }
  }

}
