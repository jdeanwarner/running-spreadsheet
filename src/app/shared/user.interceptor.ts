import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserOwned } from './user-owned';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept<T extends UserOwned>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<any>> {
        request.body.userId = this.auth.currentUserValue.uid;
        console.log(request);
        return next.handle(request);

    }
}
