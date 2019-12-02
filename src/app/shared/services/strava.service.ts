import { environment } from './../../../environments/environment';
import { StravaActivity } from './../models/strava/strava-activity';
import { User } from './../user';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StravaActivityParams } from '../models/strava/strava-activity-params';
import * as querystring from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor( private http: HttpClient ) { }

  getAllActivitiesForUser(params: StravaActivityParams): Observable<StravaActivity[]> {
    return this.http.get<StravaActivity[]>(
      `${environment.strava.url}/api/v3/athlete/activities?${querystring.stringify(params)}`);
  }


}
