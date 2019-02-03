import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunLogComponent } from './run-log.component';
import { SharedModule } from '../shared/shared.module';
import { YearComponent } from './year/year.component';
import { MonthComponent } from './month/month.component';
import { DayComponent } from './day/day.component';
import { RunLogRoutingModule } from './run-log-routing.module';
import { AddActivityComponent } from './add-activity/add-activity.component';
import { ActivityComponent } from './activity/activity.component';
import { RunComponent } from './run/run.component';
import { YearlyTotalComponent } from './yearly-total/yearly-total.component';
import { RunTypeTotalComponent } from './run-type-total/run-type-total.component';
import { CrossTrainingTotalComponent } from './cross-training-total/cross-training-total.component';
import { AddRunComponent } from './add-run/add-run.component';
import { AddKettlebellComponent } from './add-kettlebell/add-kettlebell.component';
@NgModule({
  declarations: [
    RunLogComponent,
    YearComponent,
    MonthComponent,
    DayComponent,
    AddActivityComponent,
    ActivityComponent,
    RunComponent,
    YearlyTotalComponent,
    RunTypeTotalComponent,
    CrossTrainingTotalComponent,
    AddRunComponent,
    AddKettlebellComponent
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
