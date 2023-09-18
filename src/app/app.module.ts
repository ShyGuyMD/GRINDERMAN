// Angular Core
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

// Application Components and Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { StyleTemplateComponent } from './style-template/style-template.component';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ExceptionService } from '@core/services';
import { AdminGuard } from './guards/admin.guard';
import { GoogleMapsModule } from '@angular/google-maps';
@NgModule({
    declarations: [
        AppComponent,
        StyleTemplateComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,
        GoogleMapsModule,
    ],
    providers: [
        AdminGuard,
        MessageService,
        ConfirmationService,
        DialogService,
        { provide: ErrorHandler, useClass: ExceptionService }],
    bootstrap: [AppComponent]
})
export class AppModule { }
