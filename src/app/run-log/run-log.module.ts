import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunLogComponent } from './run-log.component';
import { SharedModule } from '../shared/shared.module';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { RunLogRoutingModule } from './run-log-routing.module';
import { AddActivityComponent } from './add-activity/add-activity.component';

@NgModule({
  declarations: [
    RunLogComponent,
    YearComponent,
    MonthComponent,
    DayComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RunLogRoutingModule
  ],
  exports: [
    RunLogComponent
  ],
  entryComponents: [
    AddActivityComponent
  ]
})
export class RunLogModule { }
