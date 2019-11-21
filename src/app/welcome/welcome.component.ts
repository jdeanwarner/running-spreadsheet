import { AuthService } from './../shared/services/auth.service';
import { StravaService } from './../shared/services/strava.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaAuthService } from '../shared/services/strava-auth.service';
import { Observable } from 'rxjs';
import { User } from '../shared/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private strava: StravaAuthService, private route: ActivatedRoute, public userAuth: AuthService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(result => {
      if (result.get('code')) {
        setTimeout(() => this.strava.setToken(result.get('code')), 2000);
      }
    });
  }

  authorizeStrava() {
    this.strava.authorize();
  }

}
