import { EnduranceActivity } from './../activities/endurance-activity';
import { Swim } from './../activities/swim';
import { Kettlebell } from './../activities/kettlebell';
import { RunTypeEnum } from './../activities/run-type.enum';
import { StravaActivity } from './../models/strava/strava-activity';
import { ActivityTypeEnum } from './../activities/activity-type.enum';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityService } from './activity.service';
import { StravaService } from './strava.service';
import { User } from './../user';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { StravaActivityParams } from '../models/strava/strava-activity-params';
import { StravaActivityType } from '../models/strava/strava-activity-type.enum';
import { Run } from '../activities/run';
import { firestore } from 'firebase';
import { Bike } from '../activities/bike';
import { RunType } from '../activities/run-type';

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
      const combined: Activity[] = this.getCombinedActivitiesList(activities, stravaActivities);
      this.activityService.updateActivities(combined.filter((activity: Activity) => activity.id ));
      this.activityService.insertActivities(combined.filter((activity: Activity) => !activity.id ));
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

    const entities: {[date: number]: { [id: string]: Activity}} = {};

    activities.forEach((activity: Activity) => {
      const dateAsNumber: number = Math.floor(activity.date.toDate().getTime() / (1000 * 60 * 60 * 24));
      return entities[dateAsNumber] = { ...entities[dateAsNumber], [activity.id]: activity};
    });
    return entities;
  }

  getStravaActivityDateMap(activities: StravaActivity[]) {

    const entities: {[date: number]: StravaActivity[]} = {};

    activities.forEach((activity: StravaActivity) => {
      const dateAsNumber: number = Math.floor(new Date(activity.start_date_local).getTime() / (1000 * 60 * 60 * 24));
      return entities[dateAsNumber] ?
        entities[dateAsNumber].push(activity) :
        entities[dateAsNumber] = [activity];
    });
    return entities;
  }

  getCombinedActivitiesList(loadedActivities: Activity[], stravaActivities: StravaActivity[]): Activity[] {
    const loadedActivitiesEntities: {[date: number]: { [id: string]: Activity}} = this.getActivityDateMap(loadedActivities);
    const stravaActivitiesEntities: {[date: number]: StravaActivity[]} = this.getStravaActivityDateMap(stravaActivities);

    Object.keys(stravaActivitiesEntities).forEach((dateAsNumber: string) => {
      const strava: StravaActivity[] = stravaActivitiesEntities[dateAsNumber];
      const loaded: Activity[] = loadedActivitiesEntities[dateAsNumber] ? Object.values(loadedActivitiesEntities[dateAsNumber]) : [];

      strava.forEach((stravaActivity: StravaActivity, index: number) => {
        const matchedActivity: Activity[] = loaded
          .filter((activity: Activity) => this.getActivityType(stravaActivity.type) === activity.activityType)
          .filter((activity: Activity) => Math.trunc((stravaActivity.distance / 1609.344) * 10) / 10 ===
            Math.trunc((<EnduranceActivity>activity).distance * 10) / 10);

        if (matchedActivity.length === 1) {
          loadedActivitiesEntities[dateAsNumber][matchedActivity[0].id] = <Activity>{ ...matchedActivity[0], stravaId: stravaActivity.id };
        } else {
          if (!loadedActivitiesEntities[dateAsNumber]) {
            loadedActivitiesEntities[dateAsNumber] = {};
          }
          loadedActivitiesEntities[dateAsNumber][0 - index] = this.createActivity(stravaActivity);
        }
      });
    });

    // console.log(loadedActivitiesEntities);
    // console.log(Object.values(loadedActivitiesEntities));
    let returnArr: Activity[] = [];
    Object.values(loadedActivitiesEntities).forEach((entity: ({[id: string]: Activity })) => {
      returnArr = returnArr.concat(Object.values(entity));
    });
    // console.log(returnArr);

    return returnArr;
  }

  createActivity(stravaActivity: StravaActivity) {
    let activity: Activity = {
      activityType: this.getActivityType(stravaActivity.type),
      date: firestore.Timestamp.fromDate(new Date(stravaActivity.start_date_local)),
      stravaId: stravaActivity.id
    };

    switch (this.getActivityType(stravaActivity.type)) {
      case ActivityTypeEnum.RUN:
        activity = <Run>{
          ...activity,
          distance: Math.trunc((stravaActivity.distance / 1609.344) * 100) / 100,
          runType: this.getRunType(stravaActivity.workout_type)
        };
        break;
      case ActivityTypeEnum.BIKE:
        activity = <Bike>{
          ...activity,
          distance: Math.trunc((stravaActivity.distance / 1609.344) * 100) / 100,
        };
        break;
      case ActivityTypeEnum.SWIM:
        activity = <Swim>{
          ...activity,
          distance: Math.trunc((stravaActivity.distance / 1609.344) * 100) / 100,
        };
        break;
      default:
        activity = {
          ...activity
        };
        break;
    }

    return activity;
  }

  getRunType(workoutType: number) {
    let runType = null;
    if (workoutType) {
      switch (workoutType) {
        case 1:
          runType = Object.keys(RunTypeEnum)[0];
          break;
        case 2:
          runType = Object.keys(RunTypeEnum)[1];
          break;
        case 3:
          runType = Object.keys(RunTypeEnum)[2];
          break;
      }
    }
    return runType;
  }

  getActivityType(type: StravaActivityType): ActivityTypeEnum {
    switch (type) {
      case StravaActivityType.Run:
        return ActivityTypeEnum.RUN;
      case StravaActivityType.Ride:
        return ActivityTypeEnum.BIKE;
      case StravaActivityType.Swim:
        return ActivityTypeEnum.SWIM;
      case StravaActivityType.Yoga:
        return ActivityTypeEnum.YOGA;
      case StravaActivityType.WeightTraining:
      case StravaActivityType.Workout:
        return ActivityTypeEnum.GYM;
      default:
        return ActivityTypeEnum.OTHER;
    }
  }
}
