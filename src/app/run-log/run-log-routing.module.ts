
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunLogComponent } from './run-log.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RunLogComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  { path: '',
    redirectTo : 'log',
    pathMatch : 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class RunLogRoutingModule { }
