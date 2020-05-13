import { UserModel } from 'src/app/models/user-model';
import { JwtHelperService } from "@auth0/angular-jwt";


export class AuthAppState {

  public isLogin: boolean
  public isAdmin: boolean;
  public user: UserModel = new UserModel();
  public token: any
  public socket: any
  public tokenHelper: JwtHelperService = new JwtHelperService()
   
  constructor() {
    this.token = JSON.parse(sessionStorage.getItem("jwt"))
    this.isLogin = this.token !== null;

    if (this.isLogin) {
      this.user =this.tokenHelper.decodeToken(this.token)['user']
      if (this.user.isAdmin) {
        this.isAdmin = true
      }
      else {
        this.isAdmin = false
      }
    }
  }

}