import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from './schedule.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { path: '',
    redirectTo : '',
    pathMatch : 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class ScheduleRoutingModule { }
