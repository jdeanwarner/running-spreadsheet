import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-monthly-goals',
  templateUrl: './monthly-goals.component.html',
  styleUrls: ['./monthly-goals.component.css']
})
export class MonthlyGoalsComponent implements OnInit {

  @Input() monthlyGoalMap: { [month: string]: number };

  constructor() { }

  ngOnInit() {
  }

}
