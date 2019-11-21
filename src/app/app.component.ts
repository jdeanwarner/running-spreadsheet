import { ActivityService } from 'src/app/shared/services/activity.service';
import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  items: Observable<any[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, private activityService: ActivityService) {

  }

  ngOnInit(): void {
    // this.auth.user$.subscribe((user) => this.activityService.updateAllRaces(user.uid));
  }
}
