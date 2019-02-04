import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacesComponent } from './races.component';

const appRoutes: Routes = [
  {
    path: '',
    component: RacesComponent,
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
export class RacesRoutingModule { }
