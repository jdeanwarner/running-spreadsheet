import { ActivitiesResolver } from './../shared/resolvers/activities.resolver';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunLogComponent } from './run-log.component';

const appRoutes: Routes = [
  {
    path: ':year',
    component: RunLogComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [
      ActivitiesResolver
    ]
  },
  { path: '',
    redirectTo : '',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class RunLogRoutingModule { }
