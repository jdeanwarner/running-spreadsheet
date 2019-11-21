import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as querystring from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class StravaService {

  constructor(private http: HttpClient, private functions: AngularFireFunctions ) { }


  authorize() {
    const params = {
      client_id: 40965,
      redirect_uri: 'http://localhost:4200/welcome',
      response_type: 'code',
      scope: 'activity:read',
    };
    const authorizationUri = 'https://www.strava.com/oauth/authorize?' + querystring.stringify(params);
    window.location.href = authorizationUri;
    event.preventDefault();
  }

  getData(code) {
    // const callable = this.functions.httpsCallable('oath/callback');
    // return callable({});
    return this.http.post<any>('https://www.strava.com/oauth/token', {
      client_id: 40965,
      client_secret: '2d4812780713694b118ac9daab5483e160fab9f9',
      code: code
    });
  }
}
