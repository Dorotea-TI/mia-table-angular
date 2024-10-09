import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CustomOneColumnComponent } from './custom-one-column/custom-one-column.component';
import { MiaTableModule } from 'projects/doroteati/mia-table/src/public-api';

@NgModule({
  declarations: [AppComponent, CustomOneColumnComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MiaTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
