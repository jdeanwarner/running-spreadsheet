import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunLogComponent } from './run-log.component';
import { SharedModule } from '../shared/shared.module';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';

@NgModule({
  declarations: [
    RunLogComponent,
    YearComponent,
    MonthComponent,
    DayComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RunLogComponent
  ]
})
export class RunLogModule { }
