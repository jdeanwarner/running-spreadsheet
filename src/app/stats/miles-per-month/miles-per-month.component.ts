import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';
import { Month } from 'src/app/shared/month.enum';

@Component({
  selector: 'app-miles-per-month',
  templateUrl: './miles-per-month.component.html',
  styleUrls: ['./miles-per-month.component.css']
})
export class MilesPerMonthComponent implements OnInit {

  yearlyMilesEntries: { name: string, value: number }[];

  multi: any[];
  view: any[] = null;

  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = false;
  yAxisLabel = 'Miles';
  yScaleMin = 100;
  yScaleMax = 300;
  period: string;

  @ViewChild('container', {static: true}) container: ElementRef;

  @Input() set activitiesByYearMonth (activities: {[year: number]: {[month: number]: Activity[]}}) {

    this.view = [ this.container.nativeElement.offsetWidth ];

    const months = Object.values(Month);
    this.multi = [];
    Object.keys(activities).forEach( year => {
      this.multi.push({
        name: year,
        series: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map( month => {
          return {
            name: months[month],
            value: activities[year][month] ? activities[year][month]
              .filter((activity: Activity) => activity.activityType === ActivityTypeEnum.RUN)
              .reduce((total: number, activity: Activity) =>  total + (<Run>activity).distance, 0) : 0
          };
        })
      });
    });
  }

  constructor() { }

  ngOnInit() {
  }

}
