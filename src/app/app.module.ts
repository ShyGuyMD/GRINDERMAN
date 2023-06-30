// Angular Core
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';

// Application Components and Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { StyleTemplateComponent } from './style-template/style-template.component';
import { HttpClientModule } from '@angular/common/http';
import { ExceptionService } from '@core/services';

@NgModule({
  declarations: [
    AppComponent,
    StyleTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide : ErrorHandler, useClass: ExceptionService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
