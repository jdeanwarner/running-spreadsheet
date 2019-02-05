import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Activity } from './activities/activity';
import { map } from 'rxjs/operators';
import { ActivityType } from './activities/activity-type';
import { RunType } from './activities/run-type';
import { Race } from './race';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private db: AngularFirestore) { }

  getActivitiesByYear(year: number): Observable<Activity[]> {
    return this.db.collection<Activity>('runs', ref =>
      ref.where('date', '>=', new Date(year, 0, 1))
        .where('date', '<', new Date(year + 1, 0, 1))
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
  }

  getActivityTypes(): Observable<ActivityType[]> {
    return this.db.collection<ActivityType>('activityType').valueChanges();
  }

  getRunTypes(): Observable<RunType[]> {
    return this.db.collection<RunType>('runType').valueChanges();
  }

  deleteActivity(id: string): void {
    this.db.collection('runs').doc(id).delete();
  }

  updateActivity(activity: Activity): void {
    this.db.collection('runs').doc(activity.id).set(activity);
  }

  insertActivity(activity: Activity): void {
    this.db.collection('runs').add(activity);
  }

  getRaces(): Observable<Race[]> {
    return this.db.collection<Race>('races', ref =>
      ref.orderBy('date', 'desc')).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Race>[]) => {
        return actions.map((a: DocumentChangeAction<Race>) => {
          const data: Race = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  updateRace(race: Race): void {
    this.db.collection('races').doc(race.id).set(race);
  }

  insertRace(race: Race): void {
    this.db.collection('races').add(race);
  }

  deleteRace(id: string): void {
    this.db.collection('races').doc(id).delete();
  }
}
