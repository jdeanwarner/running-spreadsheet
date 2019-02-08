import { Component, OnInit, Input } from '@angular/core';
import { Yoga } from 'src/app/shared/activities/yoga';

@Component({
  selector: 'app-yoga',
  templateUrl: './yoga.component.html',
  styleUrls: ['./yoga.component.css']
})
export class YogaComponent implements OnInit {

  @Input() yoga: Yoga;

  constructor() { }

  ngOnInit() {
  }

}
