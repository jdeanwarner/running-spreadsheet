import { Season } from './../shared/season';
import { ActivityService } from './../shared/activity.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  seasons: Season[];
  activeSeason: Season;

  constructor(private route: ActivatedRoute, private router: Router,
    private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.getSeasons().subscribe((seasons: Season[]) => {
      this.seasons = seasons;

      this.route.queryParams.subscribe((params: {seasonId: string}) => {
        console.log(this.seasons);
        if (params.seasonId) {
          this.activeSeason = this.seasons.filter((season: Season) => season.id === params.seasonId)[0];
        } else {
          this.activeSeason = this.seasons[0];
        }
        this.activityService.getScheduledActivities(this.activeSeason.id).subscribe(result => console.log(result));
        console.log(this.activeSeason);
      });
    });
  }

}
