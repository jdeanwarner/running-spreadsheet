import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoalsComponent } from './goals.component';
import { SharedModule } from '../shared/shared.module';
import { GoalsRoutingModule } from './goals-routing.module';

@NgModule({
  declarations: [GoalsComponent],
  imports: [
    SharedModule,
    GoalsRoutingModule
  ]
})
export class GoalsModule { }
