import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';
import { Run } from 'src/app/shared/activities/run';
import { RunTypeEnum } from 'src/app/shared/activities/run-type.enum';

@Component({
  selector: 'app-run-type-total',
  templateUrl: './run-type-total.component.html',
  styleUrls: ['./run-type-total.component.css']
})
export class RunTypeTotalComponent implements OnInit {

  @Input() runTypeMap: {[type: string]: Activity[]};

  TYPE = RunTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
