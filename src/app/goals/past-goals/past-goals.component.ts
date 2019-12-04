import { Component, OnInit, Input } from '@angular/core';
import { Goal } from '../goal';

@Component({
  selector: 'app-past-goals',
  templateUrl: './past-goals.component.html',
  styleUrls: ['./past-goals.component.css']
})
export class PastGoalsComponent implements OnInit {

  @Input() goals: Goal[];
  @Input() results: { [id: string ]: number};

  showAll = false;

  constructor() { }

  ngOnInit() {
  }

  getTop5PastGoals(goals: Goal[]) {
    return goals.slice(0, 5);
  }

  showAllGoals() {
    this.showAll = !this.showAll;
  }

}
