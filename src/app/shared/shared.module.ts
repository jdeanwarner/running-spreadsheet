import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatCardModule, MatDividerModule, MatButtonModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatTableModule } from '@angular/material';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { ActivityTypePipe } from './activities/activity-type.pipe';
import { RunTypePipe } from './activities/run-type.pipe';
import { ActivityService } from './activity.service';
import { ResultTimePipe } from './result-time.pipe';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    TimestampDatePipe,
    YearSelectorComponent,
    ActivityTypePipe,
    RunTypePipe,
    ResultTimePipe,
    ToolbarComponent
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
    MatTableModule
  ],
  providers: [
    TimestampDatePipe,
    MatDatepickerModule,
    ActivityTypePipe,
    RunTypePipe,
    ActivityService,
    ResultTimePipe
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
    ToolbarComponent
  ]
})
export class SharedModule { }
