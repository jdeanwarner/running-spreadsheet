import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
      path: 'goals',
      loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)
    },
    {
      path: 'schedule',
      loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
    },
    {
      path: 'races',
      loadChildren: () => import('./races/races.module').then(m => m.RacesModule)
    },
    {
      path: 'log',
      loadChildren: () => import('./run-log/run-log.module').then(m => m.RunLogModule)
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
