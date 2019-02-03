
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals.component';

const appRoutes: Routes = [
  {
    path: '',
    component: GoalsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
export class GoalsRoutingModule { }