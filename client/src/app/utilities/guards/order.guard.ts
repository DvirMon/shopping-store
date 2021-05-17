import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenService } from '../../services/token.service';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  constructor(
    private tokenServcie: TokenService,
    private authService: AuthService,
    private dialogService: DialogService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.auth.isLogin
      ? this.tokenServcie.isTokenExpired(this.authService.auth.accessToken)
      : this.dialogService.handleLoginDialog()
  }

}
