import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { Run } from 'src/app/shared/activities/run';
import { ResizedEvent } from 'angular-resize-event';

@Component({
  selector: 'app-miles-per-year',
  templateUrl: './miles-per-year.component.html',
  styleUrls: ['./miles-per-year.component.css']
})
export class MilesPerYearComponent implements OnInit {

  yearlyMilesEntries: { name: string, value: number }[];

  multi: any[];
  view: any[] = null;

  legend = false;
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

  @Output() heightChange: EventEmitter<number> = new EventEmitter<number>();

  @Input() set activitiesYearMap( map: {[year: number]: Activity[]}) {
    this.view = [ this.container.nativeElement.offsetWidth ];

    this.yearlyMilesEntries = [];
    Object.keys(map).forEach( year => {
      this.yearlyMilesEntries.push({
        name: year,
        value: map[year]
          .filter((activity: Activity) => activity.activityType === ActivityTypeEnum.RUN)
          .reduce((total: number, activity: Activity) =>  total + (<Run>activity).distance, 0)
      });
    });

    this.multi = [{
      name: 'Year',
      series: this.yearlyMilesEntries
    }];
  }

  constructor() { }

  ngOnInit() {
  }

}
