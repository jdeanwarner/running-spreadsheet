import { User } from './../shared/user';
import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StravaAuthService } from '../shared/services/strava-auth.service';
import { StravaFactoryService } from '../shared/services/strava-factory.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private strava: StravaAuthService, private route: ActivatedRoute, public userAuth: AuthService,
    private stravaFactory: StravaFactoryService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(result => {
      if (result.get('code')) {
        this.strava.setToken(result.get('code'));
      }
    });
  }

  authorizeStrava() {
    this.strava.authorize();
  }

  loadStravaActivities(user: User) {
    this.stravaFactory.loadStravaActivities(user);
  }

}
