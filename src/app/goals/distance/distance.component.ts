import { Component, OnInit, Input } from '@angular/core';
import { Race } from 'src/app/shared/race';

@Component({
  selector: 'app-distance',
  templateUrl: './distance.component.html',
  styleUrls: ['./distance.component.css']
})
export class DistanceComponent implements OnInit {

  @Input() fiftyKs: Race[];
  @Input() fiftyMs: Race[];
  @Input() hundredKs: Race[];
  @Input() hundredMs: Race[];

  constructor() { }

  ngOnInit() {
  }

}
