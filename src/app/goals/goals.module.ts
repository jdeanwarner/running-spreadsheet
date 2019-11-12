import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { SharedModule } from '../shared/shared.module';
import { GoalsRoutingModule } from './goals-routing.module';
import { YearGoalsComponent } from './year-goals/year-goals.component';
import { MonthlyGoalsComponent } from './monthly-goals/monthly-goals.component';
import { PrsComponent } from './prs/prs.component';
import { FiftyStatesComponent } from './fifty-states/fifty-states.component';

@NgModule({
  declarations: [GoalsComponent, YearGoalsComponent, MonthlyGoalsComponent, PrsComponent, FiftyStatesComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoalsRoutingModule
  ]
})
export class GoalsModule { }
