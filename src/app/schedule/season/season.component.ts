import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Season } from 'src/app/shared/season';
import { TrainingBlock } from 'src/app/shared/training-block';
import { MatDialog } from '@angular/material';
import { AddSeasonComponent } from '../add-season/add-season.component';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  @Input() season: Season;
  @Input() scheduledActivities: Activity[];
  @Output() update: EventEmitter<Season> = new EventEmitter<Season>();
  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  week: Date[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  getScheduleForTrainingBlock(trainingBlock: TrainingBlock): Activity[] {
    if (this.scheduledActivities) {
      return this.scheduledActivities.filter((activity: Activity) => {
        if (activity.date >= trainingBlock.startDate && activity.date <= trainingBlock.endDate) {
          return activity;
        }
      });
    }
  }

  edit() {
    const dialogRef = this.dialog.open(AddSeasonComponent, {
      data: {
        season: this.season
      },
      minWidth: '60%',
    });
    dialogRef.afterClosed().subscribe((result: string | Season) => {
      if (typeof result === 'string') {
        this.delete.emit(result);
      } else if (result.id) {
        this.update.emit(result);
      }
    });
  }
}
