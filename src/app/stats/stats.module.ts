import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { MilesPerYearComponent } from './miles-per-year/miles-per-year.component';
import { MilesPerMonthComponent } from './miles-per-month/miles-per-month.component';
import { StatsRoutingModule } from './stats-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '../run-log/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularResizedEventModule } from 'angular-resize-event';



@NgModule({
  declarations: [StatsComponent, MilesPerYearComponent, MilesPerMonthComponent],
  imports: [
    CommonModule,
    SharedModule,
    StatsRoutingModule,
    StoreModule.forFeature('log', reducers),
    EffectsModule.forFeature(effects),
    NgxChartsModule,
    AngularResizedEventModule
  ]
})
export class StatsModule { }
