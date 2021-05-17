import { SocialUser } from 'angularx-social-login';
import { UserModel } from 'src/app/utilities/models/user-model';

export class AuthState {

  public user: UserModel = new UserModel();
  public isLogin: boolean
  public socialUser: SocialUser
  public refreshToken: any
  public accessToken: any

  constructor(

  ) {

    this.refreshToken = sessionStorage.getItem("jwt")
    this.isLogin = this.refreshToken !== null;

    if (this.isLogin) {
      this.user = JSON.parse(sessionStorage.getItem("user"))

    }
  }

}
