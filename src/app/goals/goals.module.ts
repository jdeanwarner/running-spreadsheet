import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { SharedModule } from '../shared/shared.module';
import { GoalsRoutingModule } from './goals-routing.module';
import { YearGoalsComponent } from './year-goals/year-goals.component';
import { MonthlyGoalsComponent } from './monthly-goals/monthly-goals.component';
import { PrsComponent } from './prs/prs.component';
import { FiftyStatesComponent } from './fifty-states/fifty-states.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import * as fromRoot from '../store';
import { DistanceComponent } from './distance/distance.component';

@NgModule({
  declarations: [GoalsComponent, YearGoalsComponent, MonthlyGoalsComponent, PrsComponent, FiftyStatesComponent, DistanceComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoalsRoutingModule,
    StoreModule.forFeature('goals', reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects)
  ]
})
export class GoalsModule { }
