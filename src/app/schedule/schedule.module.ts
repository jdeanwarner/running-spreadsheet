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

@NgModule({
  declarations: [ScheduleComponent, ListComponent, TrainingBlockComponent, WeekComponent, SeasonComponent, AddSeasonComponent],
  imports: [
    CommonModule,
    SharedModule,
    ScheduleRoutingModule
  ],
  entryComponents: [
    AddSeasonComponent
  ]
})
export class ScheduleModule { }
