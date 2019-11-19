import { Activity } from 'src/app/shared/activities/activity';
import { AddSeasonComponent } from './../add-season/add-season.component';
import { Season } from './../../shared/season';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  _seasons: Season[];
  @Input() set seasons(seasons: Season[]) {
    if (seasons) {
      this._seasons = seasons.sort((season1: Season, season2: Season) => {
        const season1StartDate = this.getSeasonStartDate(season1);
        const season2StartDate = this.getSeasonStartDate(season2);
        if (season1StartDate > season2StartDate) {
          return -1;
        }
        if (season1StartDate < season2StartDate) {
          return 1;
        }
        return 0;
      });
    }
  }
  @Output() addSeason: EventEmitter<Season> = new EventEmitter<Season>();
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  getSeasonStartDate(season: Season): number {
    if (season && season.trainingBlocks) {
      return Math.max(...season.trainingBlocks.map(block => block.startDate.seconds));
    } else {
      return 0;
    }
  }

  add() {
    const dialogRef = this.dialog.open(AddSeasonComponent, {
      minWidth: '60%',
    });
    dialogRef.afterClosed().subscribe((result: Season) => {
      if (result) {
        this.addSeason.emit(result);
      }
    });
  }

  clicked(id: string) {
    this.selected.emit(id);
  }

}
