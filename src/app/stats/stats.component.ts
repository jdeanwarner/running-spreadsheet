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

  constructor(private logStore: Store<fromLog.LogState>) {
    this.activitiesByYear$ = this.logStore.select(fromLog.getActivitiesYearMap);
  }

  ngOnInit() {
  }

}
