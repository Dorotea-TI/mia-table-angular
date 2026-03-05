import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { CustomOneColumnComponent } from './custom-one-column/custom-one-column.component';
import { MiaTableModule } from 'projects/doroteati/mia-table/src/public-api';

@NgModule({ declarations: [AppComponent, CustomOneColumnComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MiaTableModule], providers: [provideHttpClient(withInterceptorsFromDi()), provideClientHydration(withEventReplay())] })
export class AppModule {}
