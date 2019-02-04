import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesComponent } from './races.component';
import { RacesRoutingModule } from './race-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RacesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RacesRoutingModule
  ]
})
export class RacesModule { }
