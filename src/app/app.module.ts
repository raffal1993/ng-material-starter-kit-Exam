import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {CatsComponentModule} from "./components/cats/cats.component-module";
import {CatsServiceModule} from "./services/cats.service-module";
import {CitiesServiceModule} from "./services/cities.service-module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CatsComponentModule,
    CatsServiceModule,
    CitiesServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
