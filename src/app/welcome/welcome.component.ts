import { StravaService } from './../shared/services/strava.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private strava: StravaService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(result => {
      if (result.get('code')) {
        this.strava.getData(result.get('code')).subscribe(data => console.log(data));
      }
    });
  }

  authorizeStrava() {
    this.strava.authorize();
  }

}
