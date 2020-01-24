import { StravaInterceptor } from './strava.interceptor';
import { StravaAuthService } from './services/strava-auth.service';
import { AllActivitiesResolver } from './resolvers/all-activities.resolver';
import { ActivitiesByYearResolver } from './resolvers/activities-by-year.resolver';
import { RacesResolver } from './resolvers/races.resolver';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityTypePipe } from './activities/activity-type.pipe';
import { RunTypePipe } from './activities/run-type.pipe';
import { ActivityService } from './services/activity.service';
import { ResultTimePipe } from './result-time.pipe';
import { TimestampDatePickerComponent } from './timestamp-date-picker/timestamp-date-picker.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { GoalsResolver } from './resolvers/goals.resolver';
import { RoundPipe } from './round.pipe';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StravaService } from './services/strava.service';
import { AngularFireFunctionsModule, FUNCTIONS_REGION, FunctionsRegionToken } from '@angular/fire/functions';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerDirective } from './loading/loading-spinner.directive';
import { LoadingComponent } from './loading/loading/loading.component';
import { ActivitiesCountResolver } from './resolvers/activities-count.resolver';

@NgModule({
  declarations: [
    TimestampDatePipe,
    ActivityTypePipe,
    RunTypePipe,
    ResultTimePipe,
    TimestampDatePickerComponent,
    LocationPickerComponent,
    YearSelectorComponent,
    RoundPipe,
    LoadingSpinnerDirective,
    LoadingComponent
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [
    TimestampDatePipe,
    MatDatepickerModule,
    ActivityTypePipe,
    RunTypePipe,
    ActivityService,
    ResultTimePipe,
    MatIconModule,
    RacesResolver,
    ActivitiesByYearResolver,
    AllActivitiesResolver,
    GoalsResolver,
    StravaService,
    StravaAuthService,
    ActivitiesCountResolver,
    { provide: FunctionsRegionToken, useValue: 'us-central1' },
    { provide: HTTP_INTERCEPTORS, useClass: StravaInterceptor, multi: true }
  ],
  exports: [
    FlexLayoutModule,
    MatListModule,
    TimestampDatePipe,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    ActivityTypePipe,
    RunTypePipe,
    MatTableModule,
    ResultTimePipe,
    MatMenuModule,
    TimestampDatePickerComponent,
    LocationPickerComponent,
    YearSelectorComponent,
    MatProgressBarModule,
    RoundPipe,
    MatProgressSpinnerModule,
    LoadingSpinnerDirective,
    MatCheckboxModule
  ],
  entryComponents: [
    LoadingComponent
  ]
})
export class SharedModule { }
