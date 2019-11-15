import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-meter',
  templateUrl: './progress-meter.component.html',
  styleUrls: ['./progress-meter.component.css']
})
export class ProgressMeterComponent implements OnInit {

  @Input() title: string;
  @Input() goal: number;
  @Input() current: number;

  constructor() { }

  ngOnInit() {
  }

  getPercentComplete(val: number, goal: number) {
    return val / goal * 100;
  }

}
