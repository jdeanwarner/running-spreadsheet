import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';

const appRoutes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
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
export class WelcomeRoutingModule { }
