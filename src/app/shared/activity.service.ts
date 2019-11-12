import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Activity } from './activities/activity';
import { map } from 'rxjs/operators';
import { ActivityType } from './activities/activity-type';
import { RunType } from './activities/run-type';
import { Race } from './race';
import { Season } from './season';
import { State } from './state.enum';

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

  deleteActivity(id: string): Promise<void> {
    return this.db.collection('runs').doc(id).delete();
  }

  updateActivity(activity: Activity): Promise<void> {
    return this.db.collection('runs').doc(activity.id).set(activity);
  }

  insertActivity(activity: Activity): Promise<DocumentReference> {
    return this.db.collection('runs').add(activity);
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

  updateRace(race: Race): Promise<void> {
    return this.db.collection('races').doc(race.id).set(race);
  }

  insertRace(race: Race): Promise<DocumentReference> {
    return this.db.collection('races').add(race);
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

  getCompletedStates(): Observable<State[]> {
    return this.db.collection<Race>('race', ref =>
      ref.where('distance', '>=', 26.2)
    ).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Race>[]) => {
        return actions.map((a: DocumentChangeAction<Race>) => {
          const data: Race = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        }).map((race: Race) => race.location.state);
      })
    );
  }
}
