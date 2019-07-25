import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatCardModule, MatDividerModule, MatButtonModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatTableModule, MatIconModule, MatMenuModule } from '@angular/material';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityTypePipe } from './activities/activity-type.pipe';
import { RunTypePipe } from './activities/run-type.pipe';
import { ActivityService } from './activity.service';
import { ResultTimePipe } from './result-time.pipe';
import { TimestampDatePickerComponent } from './timestamp-date-picker/timestamp-date-picker.component';

@NgModule({
  declarations: [
    TimestampDatePipe,
    ActivityTypePipe,
    RunTypePipe,
    ResultTimePipe,
    TimestampDatePickerComponent
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
    MatMenuModule
  ],
  providers: [
    TimestampDatePipe,
    MatDatepickerModule,
    ActivityTypePipe,
    RunTypePipe,
    ActivityService,
    ResultTimePipe,
    MatIconModule
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
    TimestampDatePickerComponent
  ]
})
export class SharedModule { }
