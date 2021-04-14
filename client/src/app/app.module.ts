import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CoreModule } from './share-modules/core.module';
import { SharedModule } from './share-components/shared-components.module'

// GOOGLE SIGN IN MODULES
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { AppComponent } from './components/app/app.component';
import { BarComponent } from './components/bar/bar.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { environment } from '../environments/environment';
import { MaterialModule } from './share-modules/material.module';



@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PageNotFoundComponent,
    HomeComponent,
    InfoComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    SocialLoginModule

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],  bootstrap: [AppComponent],
})
export class AppModule { }
