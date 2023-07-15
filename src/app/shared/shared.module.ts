import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimengModule } from './primeng.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        PrimengModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        PrimengModule,
    ]
})
export class SharedModule { }
