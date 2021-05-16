import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { TokenService } from '../../services/token.service';
import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {

  private isLogin: boolean = store.getState().auth.isLogin

  constructor(
    private tokenServcie: TokenService,
    private dialogService : DialogService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLogin ? this.tokenServcie.isTokenExpired('accessToken') : this.dialogService.handleLoginDialog()
  }

}
