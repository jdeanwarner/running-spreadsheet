import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesComponent } from './races.component';
import { RacesRoutingModule } from './race-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddRaceComponent } from './add-race/add-race.component';
import { ResultSetterComponent } from './result-setter/result-setter.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from '../store';

@NgModule({
  declarations: [RacesComponent, AddRaceComponent, ResultSetterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RacesRoutingModule,
    StoreModule.forFeature('races', reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects)
  ],
  entryComponents: [
    AddRaceComponent
  ]
})
export class RacesModule { }
