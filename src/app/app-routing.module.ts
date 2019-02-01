import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RunLogComponent } from './run-log/run-log.component';

const appRoutes: Routes = [
    {
      path: 'log',
      component: RunLogComponent
    },
    { path: '',
      redirectTo : '/log',
      pathMatch : 'full'}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }