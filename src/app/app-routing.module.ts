import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
    {
      path: 'welcome',
      loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
    },
    {
      path: 'goals',
      loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: 'schedule',
      loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: 'races',
      loadChildren: () => import('./races/races.module').then(m => m.RacesModule),
      canActivate: [ AuthGuard ]
    },
    {
      path: 'log',
      loadChildren: () => import('./run-log/run-log.module').then(m => m.RunLogModule),
      canActivate: [ AuthGuard ]
    },
    { path: '',
      redirectTo : '/welcome',
      pathMatch : 'full'}
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
