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
        if (params.seasonId) {
          this.activeSeason = this.seasons.filter((season: Season) => season.id === params.seasonId)[0];
        } else {
          this.activeSeason = this.getActiveSeason(seasons);
        }
      });
    });
  }

  getActiveSeason(seasons: Season[]): Season {
    let activeSeason: Season = seasons.filter((season: Season) => {
      const startDate = this.getStartDate(season);
      const endDate = this.getEndDate(season);
      if (new Date(startDate) < new Date() && new Date(endDate) > new Date()) {
        return season;
      }
    })[0];

    if (!activeSeason) {
      activeSeason = seasons.sort((season1: Season, season2: Season) => {
        if (Math.abs(this.getStartDate(season1) - new Date().getTime()) >
          Math.abs(this.getStartDate(season2) - new Date().getTime())) {
          return -1;
        }
        if (Math.abs(this.getStartDate(season1) - new Date().getTime()) <
          Math.abs(this.getStartDate(season2) - new Date().getTime())) {
          return 1;
        }
        return 0;
      })[0];
    }

    return activeSeason;
  }

  getStartDate(season: Season) {
    if (season && season.trainingBlocks) {
      return Math.min(...season.trainingBlocks.map(block => block.startDate.toDate().getTime()));
    } else {
      return 0;
    }
  }

  getEndDate(season: Season) {
    if (season && season.trainingBlocks) {
      return Math.max(...season.trainingBlocks.map(block => block.endDate.toDate().getTime()));
    } else {
      return 0;
    }
  }

  addSeason(season: Season): void {
    this.activityService.insertSeason(season);
  }

  changeSeason(seasonId: string) {
    this.router.navigate(['/schedule'], {
      queryParams: {
        seasonId: seasonId
      }
    });
  }

}
