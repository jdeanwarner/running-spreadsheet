import { DeleteRace, UpdateRace, AddRace } from './store';
import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/services/activity.service';
import { Race } from '../shared/race';
import { AddRaceComponent } from './add-race/add-race.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import * as fromRoot from '../store';
import * as fromStore from './store';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from '@angular/fire/auth';

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
  loggedInUserId: string;

  races$: Observable<Race[]>;
  isLarge$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Large)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog,
    private store: Store<fromStore.RaceState>, private afAuth: AngularFireAuth) {
      this.races$ = this.store.select(fromStore.getAllRaces);
    }

  ngOnInit() {
    this.afAuth.authState.subscribe((user: firebase.User) => this.loggedInUserId = user.uid);

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
          this.store.dispatch(new DeleteRace(result));
        } else if (result.name) {
          if (result.id) {
            this.store.dispatch(new UpdateRace(result));
          } else {
            this.store.dispatch(new AddRace({ ...result, userId: this.loggedInUserId }));
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
