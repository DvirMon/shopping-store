import { BreakpointObserver } from '@angular/cdk/layout';
import { SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/utilities/models/user-model';

export class AuthAppState {

  public isLogin: boolean
  public isAdmin: boolean;
  public socialUser: SocialUser
  public user: UserModel = new UserModel();
  public refreshToken: any
  public accessToken: any
  public socket: any
  public isMobile: Observable<boolean>

  constructor(

  ) {

    this.refreshToken = sessionStorage.getItem("jwt")
    this.isLogin = this.refreshToken !== null;

    if (this.isLogin) {
      this.user = JSON.parse(sessionStorage.getItem("user"))

      if (this.user) {
        this.isAdmin = this.user.isAdmin
      }
    }
  }

}
