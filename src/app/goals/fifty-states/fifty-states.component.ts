import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/shared/state.enum';

@Component({
  selector: 'app-fifty-states',
  templateUrl: './fifty-states.component.html',
  styleUrls: ['./fifty-states.component.css']
})
export class FiftyStatesComponent implements OnInit {

  statesArray = Object.keys(State).map(k => ({key: k, value: State[k]}));

  constructor() { }

  ngOnInit() {
  }

}
