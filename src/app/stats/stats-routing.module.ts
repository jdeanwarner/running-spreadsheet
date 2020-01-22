import { StatsComponent } from './stats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllActivitiesResolver } from '../shared/resolvers/all-activities.resolver';

const appRoutes: Routes = [
  {
    path: '',
    component: StatsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: [
      AllActivitiesResolver
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
export class StatsRoutingModule { }
