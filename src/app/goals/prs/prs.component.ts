import { Component, OnInit, Input } from '@angular/core';
import { Race } from 'src/app/shared/race';

@Component({
  selector: 'app-prs',
  templateUrl: './prs.component.html',
  styleUrls: ['./prs.component.css']
})
export class PrsComponent implements OnInit {

  @Input() pr5K: Race;
  @Input() pr10K: Race;
  @Input() pr15K: Race;
  @Input() prHalfMarathon: Race;
  @Input() prMarathon: Race;

  constructor() { }

  ngOnInit() {

  }

}
