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
import { AppComponent } from './components/app/app.component';
import { BarComponent } from './components/bar/bar.component';

import { RootComponent } from './components/root/root.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MembersComponent } from './components/members/members.component';
import { ProductsSlideComponent } from './components/products-slide/products-slide.component';
import { ProductsCateogoriesComponent } from './components/products-cateogories/products-cateogories.component';

import { InfoComponent } from './components/info/info.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// ENVIROMENT
import { environment } from '../environments/environment';



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
    ProductsCateogoriesComponent,
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
