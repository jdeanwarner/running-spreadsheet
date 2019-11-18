import { AllActivitiesResolver } from './resolvers/all-activities.resolver';
import { ActivitiesByYearResolver } from './resolvers/activities-by-year.resolver';
import { RacesResolver } from './resolvers/races.resolver';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatCardModule, MatDividerModule, MatButtonModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatTableModule, MatIconModule,
  MatMenuModule, MatProgressBarModule } from '@angular/material';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityTypePipe } from './activities/activity-type.pipe';
import { RunTypePipe } from './activities/run-type.pipe';
import { ActivityService } from './activity.service';
import { ResultTimePipe } from './result-time.pipe';
import { TimestampDatePickerComponent } from './timestamp-date-picker/timestamp-date-picker.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { GoalsResolver } from './resolvers/goals.resolver';
import { RoundPipe } from './round.pipe';

@NgModule({
  declarations: [
    TimestampDatePipe,
    ActivityTypePipe,
    RunTypePipe,
    ResultTimePipe,
    TimestampDatePickerComponent,
    LocationPickerComponent,
    YearSelectorComponent,
    RoundPipe
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
    MatProgressBarModule
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
    GoalsResolver
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
    RoundPipe
  ]
})
export class SharedModule { }
