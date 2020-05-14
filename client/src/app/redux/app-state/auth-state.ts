import { User } from 'src/app/services/auth.service';

  
export class AuthAppState {
 
  public isLogin: boolean
  public isAdmin: boolean;
  public user: User;
  public refreshToken: any
  public accessToken: any
  public socket: any
   
  constructor() {
    this.refreshToken = JSON.parse(sessionStorage.getItem("jwt"))
    this.isLogin = this.refreshToken !== null;

    if (this.isLogin) {
      this.user = JSON.parse(sessionStorage.getItem("user"))
      if (this.user.isAdmin) {
        this.isAdmin = true
      }
      else {
        this.isAdmin = false
      }
    }
  }

}