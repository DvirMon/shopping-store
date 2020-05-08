import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ErrorHandler } from '@angular/core';

import { ErrorsService } from './app/services/errors.service';
import { AuthInterceptorService } from './app/interceptors/auth-interceptor.service';

export const config = {
  development: false,
  port: 3000,
  portAuth: 4000,
  globalSettings: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false }
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsService
    },
 
  ]

};
 