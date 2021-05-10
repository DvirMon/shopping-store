// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ROUTING
import { AppRoutingModule } from './app-routing.module';

// SHARED MODULES
import { CoreModule } from './share-modules/core.module';
import { SharedModule } from './share-components/shared-components.module'
import { MaterialModule } from './share-modules/material.module';

// GOOGLE SIGN IN MODULES
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

// COMPONENTS

import { RootComponent } from './components/root/root.component';
import { AppComponent } from './components/app/app.component';
import { BarComponent } from './components/bar/bar.component';

import { DashbordComponent } from './components/dashbord/dashbord.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MembersComponent } from './components/members/members.component';
import { ProductsSlideComponent } from './components/products-slide/products-slide.component';

import { InfoComponent } from './components/info/info.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// ENVIROMENT
import { environment } from '../environments/environment';

// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngrxStore } from './utilities/ngrx/store';



@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    RootComponent,
    InfoComponent,
    GoogleSignInComponent,
    PageNotFoundComponent,
    HomePageComponent,
    MembersComponent,
    ProductsSlideComponent,
    DashbordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(ngrxStore),
    StoreDevtoolsModule.instrument({
      name: 'NgRx App',
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    MaterialModule,
    SocialLoginModule,

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
  ], bootstrap: [AppComponent],
})
export class AppModule { }
