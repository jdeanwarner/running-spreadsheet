import { Race } from 'src/app/shared/race';
import { Component, OnInit, Input } from '@angular/core';
import { State } from 'src/app/shared/state.enum';

@Component({
  selector: 'app-fifty-states',
  templateUrl: './fifty-states.component.html',
  styleUrls: ['./fifty-states.component.css']
})
export class FiftyStatesComponent implements OnInit {

  @Input() set completedStates(races: Race[]) {
    if (races) {
      races.forEach(race => this.statesEntities[race.location.state].completed = true);
      this.statesArray = Object.values(this.statesEntities);
    }
  }

  statesEntities: { [key: string]: StateDisplay } = {};
  statesArray: StateDisplay[] = [];

  constructor() {
    Object.keys(State).forEach(key => this.statesEntities[key] = {key: key, value: State[key], completed: false});
  }

  ngOnInit() {
  }
}

class StateDisplay {
  key: string;
  value: string;
  completed: boolean;
}
