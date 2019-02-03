import { Component, OnInit, Input } from '@angular/core';
import { Kettlebell } from 'src/app/shared/activities/kettlebell';

@Component({
  selector: 'app-kettlebell',
  templateUrl: './kettlebell.component.html',
  styleUrls: ['./kettlebell.component.css']
})
export class KettlebellComponent implements OnInit {

  @Input() kettlebell: Kettlebell;

  constructor() { }

  ngOnInit() {
  }

}
