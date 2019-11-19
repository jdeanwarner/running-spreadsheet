import { RacesResolver } from './../shared/resolvers/races.resolver';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalsComponent } from './goals.component';
import { GoalsResolver } from '../shared/resolvers/goals.resolver';
import { AllActivitiesResolver } from '../shared/resolvers/all-activities.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: GoalsComponent,
    resolve: [
      RacesResolver,
      AllActivitiesResolver,
      GoalsResolver
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
