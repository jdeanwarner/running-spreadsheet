import { Component, OnInit, Input } from '@angular/core';
import { State } from 'src/app/shared/state.enum';

@Component({
  selector: 'app-fifty-states',
  templateUrl: './fifty-states.component.html',
  styleUrls: ['./fifty-states.component.css']
})
export class FiftyStatesComponent implements OnInit {

  @Input() set completedStates(states: State[]) {
    states.forEach(state => this.statesEntities[state].completed = true);
    this.statesArray = Object.values(this.statesEntities);
  }

  statesEntities: { [key: string]: StateDisplay } = {};
  statesArray: StateDisplay[] = [];

  constructor() {

  }

  ngOnInit() {
    Object.keys(State).forEach(key => this.statesEntities[key] = {key: key, value: State[key], completed: false});
  }
}

class StateDisplay {
  key: string;
  value: string;
  completed: boolean;
}
