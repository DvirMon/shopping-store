
import { Action } from "@ngrx/store";
import { SocialUser } from "angularx-social-login";
import { AuthActionType } from "../action-type";

export class Login implements Action {

  public type = AuthActionType.LOGIN

  constructor
    (public payload?: any) { }
}


export class AddSocielUser implements Action {

  public type = AuthActionType.ADD_SOCIEL_USER

  constructor
    (public payload: SocialUser) { }
}

export class AddAccessToken implements Action {

  public type = AuthActionType.ADD_ACCESS_TOKEN

  constructor
    (public payload: string) { }
}

export class AddRefreshToken implements Action {

  public type = AuthActionType.ADD_REFRESH_TOKEN

  constructor
    (public payload: string) { }
}

export class Logout implements Action {

  public type = AuthActionType.LOGOUT
  constructor
    (public payload?: any) { }

}


export type AuthActions =
  | Login
  | AddSocielUser
  | AddAccessToken
  | AddRefreshToken
  | Logout

