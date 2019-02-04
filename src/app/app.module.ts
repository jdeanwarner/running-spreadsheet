import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { RunLogModule } from './run-log/run-log.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    FlexLayoutModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RunLogModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
