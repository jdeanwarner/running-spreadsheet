import { ActivitiesResolver } from './../shared/resolvers/activities.resolver';
import { RacesResolver } from './../shared/resolvers/races.resolver';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals.component';

const appRoutes: Routes = [
  {
    path: ':year',
    component: GoalsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [
      RacesResolver,
      ActivitiesResolver
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
export class GoalsRoutingModule { }
