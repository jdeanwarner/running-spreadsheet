import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { Race } from '../shared/race';
import { AddRaceComponent } from './add-race/add-race.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'date', 'distance', 'result'];
  dataSource: Race[];

  constructor(private activityService: ActivityService, private dialog: MatDialog) { }

  ngOnInit() {
    this.activityService.getRaces().subscribe((result: Race[]) => this.dataSource = result);
  }

  openRace(race: Race) {
    const dialogRef = this.dialog.open(AddRaceComponent, {
      minWidth: '20%',
      maxWidth: '99%',
      data : {
        race: race
      }
    });

    dialogRef.afterClosed().subscribe((result: Race | string) => {
      if (result) {
        if (typeof result === 'string') {
          this.activityService.deleteRace(result);
        } else if (result.name) {
          if (result.id) {
            this.activityService.updateRace(result);
          } else {
            this.activityService.insertRace(result);
          }
        }
      }
    });
  }

}
