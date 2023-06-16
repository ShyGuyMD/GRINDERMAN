import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    PrimengModule
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    PrimengModule
  ]
})
export class SharedModule { }
