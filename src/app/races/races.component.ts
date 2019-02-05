import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { Race } from '../shared/race';
import { AddRaceComponent } from './add-race/add-race.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  displayedColumnsMap = [
    { def: 'name', showMobile: true },
    { def: 'date', showMobile: true },
    { def: 'distance', showMobile: false },
    { def: 'result', showMobile: true },
    { def: 'raceUrl', showMobile: false },
    { def: 'resultUrl', showMobile: false },
    { def: 'status', showMobile: false }];

  displayedColumns: string[];

  dataSource: Race[];
  isLarge$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private activityService: ActivityService, private dialog: MatDialog) { }

  ngOnInit() {
    this.activityService.getRaces().subscribe((result: Race[]) => this.dataSource = result);

    this.isLarge$.subscribe((isLarge: boolean) => {
      this.getDisplayedColumns(isLarge);
    });
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

  addRace() {
    this.openRace(new Race());
  }

  goTo(url: string) {
    window.open(url);
  }

  getDisplayedColumns(isLarge: boolean) {
    this.displayedColumns = this.displayedColumnsMap
      .filter(cd => isLarge || cd.showMobile)
      .map(cd => cd.def);
  }

}
