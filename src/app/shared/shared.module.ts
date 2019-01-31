import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatCardModule, MatDividerModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TimestampDatePipe } from './timestamp-date.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TimestampDatePipe
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [
    TimestampDatePipe
  ],
  exports: [
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatListModule,
    TimestampDatePipe,
    MatCardModule,
    MatDividerModule
  ]
})
export class SharedModule { }
