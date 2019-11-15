import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RacesComponent } from './races.component';
import { RacesResolver } from '../shared/resolvers/races.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: RacesComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [
      RacesResolver
    ]
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
