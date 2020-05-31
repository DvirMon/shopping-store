import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ErrorHandler } from '@angular/core';

import { ErrorsService } from './app/utilities/interceptors/errors.service';
import { AuthInterceptorService } from './app/utilities/interceptors/auth-interceptor.service';

export const config = {
  development: false,
  port: 3000,
  portAuth: 4000,
  baseProductUrl : "/products/beverages/5e91e29b9c08fc560ce2cf32"

};
 