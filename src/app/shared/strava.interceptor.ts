import { User } from './user';
import { StravaAuthService } from './services/strava-auth.service';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class StravaInterceptor implements HttpInterceptor {
  constructor(private userAuth: AuthService, private stravaAuth: StravaAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('strava') && !req.url.includes('oauth/token')) {
        return this.stravaAuth.checkRefreshToken().pipe(
            switchMap((user: User) => {
              console.log(user);
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${user.strava.access_token}`
                }
              });
              console.log(req);
              return next.handle(req);
            })
        );
    } else {
        return next.handle(req);
    }
  }
}
