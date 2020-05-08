import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './share-modules/core.module';
import { SharedModule } from './share-modules/shared.module'

import { AuthModule } from './auth/auth.module';

import { AppComponent } from './components/app/app.component';
import { BarComponent } from './components/bar/bar.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module'; 



@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    AboutComponent,
    HomeComponent,
    InfoComponent,
    PageNotFoundComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule, 
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
