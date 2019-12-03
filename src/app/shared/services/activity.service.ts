import { UserOwned } from './../user-owned';
import { AuthService } from './auth.service';
import { Activity } from 'src/app/shared/activities/activity';
import { User } from '../user';
import { Goal } from '../../goals/goal';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { ActivityType } from '../activities/activity-type';
import { RunType } from '../activities/run-type';
import { Race } from '../race';
import { Season } from '../season';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private db: AngularFirestore, private userAuth: AuthService) { }

  getActivitiesByYear(year: number): Observable<Activity[]> {
    const getRequest = (user: User) => this.db.collection<Activity>('activities', ref =>
      ref.where('date', '>=', new Date(year, 0, 1))
        .where('date', '<', new Date(year + 1, 0, 1))
        .where('userId', '==', user.uid)
    ).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Activity>[]) => {
        return actions.map((a: DocumentChangeAction<Activity>) => {
          const data: Activity = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.makeUserOwnedGetRequest(getRequest);
  }

  getAllActivities(): Observable<Activity[]> {
    const getRequest = (user: User): Observable<Activity[]> =>
     this.db.collection<Activity>('activities', ref =>
        ref.where('userId', '==', user.uid)).snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<Activity>[]) => {
          return actions.map((a: DocumentChangeAction<Activity>) => {
            const data: Activity = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );

    return this.makeUserOwnedGetRequest(getRequest);
  }

  makeUserOwnedGetRequest(func: (user: User) => Observable<any>): Observable<any> {
    return this.userAuth.user$.pipe(
      take(1),
      switchMap((user: User) => func(user))
    );
  }

  makeUserOwnedSetRequest<T extends UserOwned>(userObj: T, func: (userObj: T) => Promise<DocumentReference>): Promise<DocumentReference> {
    return this.userAuth.user$
      .toPromise()
      .then((user: User) => func({ ...userObj, userId: user.uid }));
  }

  updateActivities(activities: Activity[]): void {
      let batch = this.db.firestore.batch();
      let commitCount = 1;
      activities.forEach((activity: Activity, index) => {
        if ( (index / commitCount) > 499) {
          batch.commit();
          batch = this.db.firestore.batch();
          commitCount++;
        }
        batch.set(this.db.collection('activities').doc(activity.id).ref, activity, {merge : true});
      });
      console.log('committing');
      batch.commit();
  }

  insertActivities(activities: Activity[]): void {
    console.log(activities);
    this.userAuth.user$
      .subscribe((user: User) => {
        let batch = this.db.firestore.batch();
        let commitCount = 1;
        activities.forEach((activity: Activity, index) => {
          if ( (index / commitCount) > 499) {
            batch.commit();
            batch = this.db.firestore.batch();
            commitCount++;
          }

          const act: Activity = { ...activity, userId: user.uid };
          console.log(act);
          batch.set(this.db.collection('activities').doc(this.db.createId()).ref, act);
        });
        console.log('committing');
        batch.commit();
      });

}

  getActivityTypes(): Observable<ActivityType[]> {
    return this.db.collection<ActivityType>('activityType').valueChanges();
  }

  getRunTypes(): Observable<RunType[]> {
    return this.db.collection<RunType>('runType').valueChanges();
  }

  deleteActivity(id: string): Promise<void> {
    return this.db.collection('activities').doc(id).delete();
  }

  updateActivity(activity: Activity): Promise<void> {
    return this.db.collection('activities').doc(activity.id).set(activity);
  }

  insertActivity(activity: Activity): Promise<DocumentReference> {
    const request = (act: Activity) => this.db.collection('activities').add(act);

    return this.makeUserOwnedSetRequest(activity, request);
  }

  getRaces(): Observable<Race[]> {
    const request = (user: User) => this.db.collection<Race>('races', ref =>
      ref.where('userId', '==', user.uid)
        .orderBy('date', 'desc')).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Race>[]) => {
        return actions.map((a: DocumentChangeAction<Race>) => {
          const data: Race = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.makeUserOwnedGetRequest(request);
  }

  updateRace(race: Race): Promise<void> {
    return this.db.collection('races').doc(race.id).set(race);
  }

  insertRace(race: Race): Promise<DocumentReference> {
    const request = (userRace: Race) => this.db.collection('activities').add(userRace);
    return this.makeUserOwnedSetRequest(race, request);
  }

  deleteRace(id: string): Promise<void> {
    return this.db.collection('races').doc(id).delete();
  }

  getSeasons(): Observable<Season[]> {
    return this.db.collection<Season>('season').snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Season>[]) => {
        return actions.map((a: DocumentChangeAction<Season>) => {
          const data: Season = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  insertSeason(season: Season): void {
    this.db.collection('season').add(season);
  }

  updateSeason(season: Season): void {
    this.db.collection('season').doc(season.id).set(season);
  }

  deleteSeason(id: string): void {
    this.db.collection('season').doc(id).delete();
  }

  getScheduledActivities(seasonId: string): Observable<Activity[]> {
    return this.db.collection('season').doc(seasonId).collection<Activity>('scheduledActivity').valueChanges();
  }

  getGoals(): Observable<Goal[]> {
    const request = (user: User) => this.db.collection<Goal>('goals', ref =>
      ref.where('userId', '==', user.uid))
    .snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Goal>[]) => {
        return actions.map((a: DocumentChangeAction<Goal>) => {
          const data: Goal = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.makeUserOwnedGetRequest(request);
  }

  insertGoal(goal: Goal): Promise<DocumentReference> {
    const request = (userGoal: Goal) => this.db.collection('activities').add(userGoal);
    return this.makeUserOwnedSetRequest(goal, request);
  }

  updateGoal(goal: Goal): Promise<void> {
    return this.db.collection('goal').doc(goal.id).set(goal);
  }

  deleteGoal(id: string): Promise<void> {
    return this.db.collection('goal').doc(id).delete();
  }
}
