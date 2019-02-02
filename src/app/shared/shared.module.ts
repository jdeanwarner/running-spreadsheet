import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatListModule, MatCardModule, MatDividerModule, MatButtonModule,
  MatDialogModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatSelectModule, MatToolbarModule, MatSidenavModule } from '@angular/material';

import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YearSelectorComponent } from './year-selector/year-selector.component';
import { ActivityTypePipe } from './activities/activity-type.pipe';

@NgModule({
  declarations: [
    TimestampDatePipe,
    YearSelectorComponent,
    ActivityTypePipe
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
    MatSidenavModule
  ],
  providers: [
    TimestampDatePipe,
    MatDatepickerModule,
    ActivityTypePipe
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
    ActivityTypePipe
  ]
})
export class SharedModule { }
