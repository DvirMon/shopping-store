import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './share-modules/core.module';
import { SharedModule } from './share-modules/shared.module'

import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './components/app/app.component';
import { BarComponent } from './components/bar/bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PageNotFoundComponent,
    HomeComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
