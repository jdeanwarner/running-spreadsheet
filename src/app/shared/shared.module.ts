import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatCardModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TimestampDatePipe } from './timestamp-date.pipe';

@NgModule({
  declarations: [
    TimestampDatePipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
    TimestampDatePipe
  ],
  exports: [
    BrowserAnimationsModule,
    MatListModule,
    TimestampDatePipe,
    MatCardModule
  ]
})
export class SharedModule { }
