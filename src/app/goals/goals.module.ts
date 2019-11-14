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
import { AddGoalComponent } from './add-goal/add-goal.component';

@NgModule({
  declarations: [
    GoalsComponent,
    YearGoalsComponent,
    MonthlyGoalsComponent,
    PrsComponent,
    FiftyStatesComponent,
    DistanceComponent,
    AddGoalComponent],
  imports: [
    CommonModule,
    SharedModule,
    GoalsRoutingModule,
    StoreModule.forFeature('goals', reducers),
    StoreModule.forFeature('races', fromRoot.reducers),
    StoreModule.forFeature('activity', fromRoot.reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    EffectsModule.forFeature(fromRoot.effects)
  ],
  entryComponents: [
    AddGoalComponent
  ]
})
export class GoalsModule { }
