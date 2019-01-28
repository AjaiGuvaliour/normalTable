import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicTableComponent } from './customTable/dynamic-table/dynamic-table.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicTableComponent
  ],
  imports: [
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
