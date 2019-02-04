import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesComponent } from './races.component';
import { RacesRoutingModule } from './race-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddRaceComponent } from './add-race/add-race.component';
import { ResultSetterComponent } from './result-setter/result-setter.component';

@NgModule({
  declarations: [RacesComponent, AddRaceComponent, ResultSetterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RacesRoutingModule
  ],
  entryComponents: [
    AddRaceComponent
  ]
})
export class RacesModule { }
