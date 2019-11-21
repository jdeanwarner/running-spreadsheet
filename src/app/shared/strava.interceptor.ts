import { StravaAuthService } from './services/strava-auth.service';
import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';


@Injectable()
export class StravaInterceptor implements HttpInterceptor {
  constructor(private userAuth: AuthService, private stravaAuth: StravaAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('strava')) {
        console.log('intercepted');
        return this.stravaAuth.checkRefreshToken().pipe(
            switchMap(() => next.handle(req))
        );
    } else {
        return next.handle(req);
    }
  }
}
