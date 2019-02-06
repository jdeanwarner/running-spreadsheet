import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatCardModule, MatDividerModule, MatButtonModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatTableModule, MatIconModule, MatMenuModule } from '@angular/material';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { ActivityTypePipe } from './activities/activity-type.pipe';
import { RunTypePipe } from './activities/run-type.pipe';
import { ActivityService } from './activity.service';
import { ResultTimePipe } from './result-time.pipe';

@NgModule({
  declarations: [
    TimestampDatePipe,
    YearSelectorComponent,
    ActivityTypePipe,
    RunTypePipe,
    ResultTimePipe
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
    YearSelectorComponent,
    ActivityTypePipe,
    RunTypePipe,
    MatTableModule,
    ResultTimePipe,
    MatMenuModule
  ]
})
export class SharedModule { }
