import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { Race } from '../shared/race';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'distance', 'result'];
  dataSource: Race[];

  constructor(private activityService: ActivityService) { }

  ngOnInit() {
    this.activityService.getRaces().subscribe((result: Race[]) => this.dataSource = result);
  }

}
