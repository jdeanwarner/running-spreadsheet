import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunLogComponent } from './run-log.component';
import { ActivitiesByYearResolver } from '../shared/resolvers/activities-by-year.resolver';

const appRoutes: Routes = [
  {
    path: ':year',
    component: RunLogComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [
      ActivitiesByYearResolver
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
