import { SocialUser } from 'angularx-social-login';
import { User } from 'src/app/utilities/models/user.model';

export class AuthState {

  public user: User
  public isLogin: boolean
  public socialUser: SocialUser
  public refreshToken: string
  public accessToken: string

  constructor(

  ) {

    this.refreshToken = sessionStorage.getItem("jwt")
    this.isLogin = this.refreshToken !== null;

    if (this.isLogin) {
      this.user = JSON.parse(sessionStorage.getItem("user"))

    }
  }

}
