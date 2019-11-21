import { StravaConfig } from './../strava-config';
import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { StravaToken } from '../strava-token';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class StravaAuthService {

  private config: BehaviorSubject<StravaConfig>;

  constructor( private http: HttpClient, private afs: AngularFirestore, private userAuth: AuthService ) {
    this.getStravaConfig().subscribe((config: StravaConfig) => {
      console.log(config);
      if (!this.config) {
        this.config = new BehaviorSubject<StravaConfig>(config);
      }
      this.config.next(config);
    });
  }

  getStravaConfig(): Observable<StravaConfig> {
    return this.afs.doc<StravaConfig>(`config/STRAVA`).valueChanges();
  }

  async authorize() {
    const params = {
      client_id: environment.strava.clientId,
      redirect_uri: environment.strava.redirectUrl,
      response_type: 'code',
      scope: 'activity:read',
    };
    const authorizationUri = `${environment.strava.url}/oauth/authorize?${querystring.stringify(params)}`;
    window.location.href = authorizationUri;
    event.preventDefault();
  }

  setToken(code: string) {
    forkJoin([
      this.getToken(code),
      this.userAuth.user$.pipe(
        take(1)
      )
    ]).subscribe(([token, user]) => {
      this.afs.doc(`users/${user.uid}`).set({ ...user, strava: token }, {merge: true});
    });
  }

  getToken(code: string): Observable<StravaToken> {
    return this.http.post<any>('https://www.strava.com/api/v3/oauth/token', {
      client_id: this.config.value.clientId,
      client_secret: this.config.value.clientSecret,
      code: code
    });
  }

  refreshToken(refreshToken: string): Observable<StravaToken> {
    return this.http.post<any>('https://www.strava.com/api/v3/oauth/token', {
      client_id: this.config.value.clientId,
      client_secret: this.config.value.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });
  }
}
