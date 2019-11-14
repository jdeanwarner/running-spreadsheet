import { Component, OnInit, Input } from '@angular/core';
import { Activity } from 'src/app/shared/activities/activity';
import { ActivityTypeEnum } from 'src/app/shared/activities/activity-type.enum';

@Component({
  selector: 'app-cross-training-total',
  templateUrl: './cross-training-total.component.html',
  styleUrls: ['./cross-training-total.component.css']
})
export class CrossTrainingTotalComponent implements OnInit {

  @Input() yoga: number;
  @Input() bike: number;
  @Input() gym: number;
  @Input() kettlebell: number;

  constructor() { }

  ngOnInit() {
  }

}
