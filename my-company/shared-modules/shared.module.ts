import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from '../libs/ui/src';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    AccordionModule,
    BrowserAnimationsModule,
    UiModule,
  ],
  exports: [AccordionModule, BrowserAnimationsModule, BrowserModule, UiModule],
})
// @ts-ignore
export class SharedModule {}
