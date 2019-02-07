import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { ListComponent } from './list/list.component';
import { TrainingBlockComponent } from './training-block/training-block.component';
import { WeekComponent } from './week/week.component';
import { SeasonComponent } from './season/season.component';
import { SharedModule } from '../shared/shared.module';
import { AddSeasonComponent } from './add-season/add-season.component';
import { WeeklyTotalComponent } from './weekly-total/weekly-total.component';
import { ScheduledActivitiesComponent } from './scheduled-activities/scheduled-activities.component';
import { ActualActivitiesComponent } from './actual-activities/actual-activities.component';
import { EditWeekScheduleComponent } from './edit-week-schedule/edit-week-schedule.component';

@NgModule({
  declarations: [
    ScheduleComponent,
    ListComponent,
    TrainingBlockComponent,
    WeekComponent,
    SeasonComponent,
    AddSeasonComponent,
    WeeklyTotalComponent,
    ScheduledActivitiesComponent,
    ActualActivitiesComponent,
    EditWeekScheduleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ScheduleRoutingModule
  ],
  entryComponents: [
    AddSeasonComponent,
    EditWeekScheduleComponent
  ]
})
export class ScheduleModule { }
