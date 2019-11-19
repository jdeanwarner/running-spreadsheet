import { Activity } from 'src/app/shared/activities/activity';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditWeekScheduleComponent } from '../edit-week-schedule/edit-week-schedule.component';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {

  @Input() startDate: Date;
  @Input() scheduledActivities: Activity[];
  @Input() actualActivities: Activity[];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editWeek() {
    const dialogRef = this.dialog.open(EditWeekScheduleComponent, {
      data: {
        startDate: this.startDate,
        scheduledActivities: this.scheduledActivities
      },
      minWidth: '60%',
    });
    dialogRef.afterClosed().subscribe((scheduledActivities: Activity[]) => {

    });
  }

}
