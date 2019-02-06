import { AddSeasonComponent } from './../add-season/add-season.component';
import { Season } from './../../shared/season';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() seasons: Season[];
  @Output() addSeason: EventEmitter<Season> = new EventEmitter<Season>();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  add() {
    const dialogRef = this.dialog.open(AddSeasonComponent);
    dialogRef.afterClosed().subscribe((result: Season) => {
      console.log(result);
    });
  }

}
