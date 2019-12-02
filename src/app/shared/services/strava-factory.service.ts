import { ActivityService } from './activity.service';
import { StravaService } from './strava.service';
import { User } from './../user';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { Activity } from '../activities/activity';
import { StravaActivity } from '../models/strava/strava-activity';
import { StravaActivityParams } from '../models/strava/strava-activity-params';

@Injectable({
  providedIn: 'root'
})
export class StravaFactoryService {

  constructor(private stravaService: StravaService, private activityService: ActivityService) { }

  loadStravaActivities() {
    forkJoin([
      this.getAllStravaActivities(),
      this.activityService.getAllActivities().pipe(
        take(1)
      )
    ]).subscribe(([ stravaActivities, activities]) => {
      console.log({ stravaActivities, activities });
    });
  }

  getAllStravaActivities(): Observable<StravaActivity[]> {
    let stravaActivities: StravaActivity[] = [];
    const params: StravaActivityParams = {
      per_page: 100,
      page: 1
    };

    const getActivities = (activityParams: StravaActivityParams): Observable<StravaActivity[]> => {
      return this.stravaService.getAllActivitiesForUser(activityParams).pipe(
        switchMap((activities: StravaActivity[]) => {
          stravaActivities = stravaActivities.concat(activities);
          if ( activities.length === 100 ) {
            return getActivities({ ...activityParams, page: activityParams.page += 1 });
          } else {
            return of(stravaActivities);
          }
        })
      );
    };

    return getActivities(params);
  }

  getActivityDateMap(activities: Activity[]) {
    // return activities.reduce
  }
}
