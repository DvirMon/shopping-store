import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenService } from '../../services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.auth.isLogin
      ? this.tokenService.isTokenExpired(this.authService.auth.accessToken)
      : this.dialogService.handleLoginDialog()
  }

}
