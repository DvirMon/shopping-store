import { AuthActionType } from "../action-type";
import { AuthActions } from "../actions/auth-actions";
import { AuthState } from "../state/auth-state";


export function authReducer(oldState = new AuthState(), action: AuthActions) {

  let newState: AuthState = { ...oldState }

  switch (action.type) {

    case AuthActionType.LOGIN:
      newState.isLogin = true;
      newState.user = action.payload?.user
      newState.accessToken = action.payload?.token
      sessionStorage.setItem("user", JSON.stringify(action.payload['user']));
      break
    case AuthActionType.ADD_SOCIEL_USER:
      newState.socialUser = action.payload
      break
    case AuthActionType.ADD_ACCESS_TOKEN:
      newState.accessToken = action.payload
      break
    case AuthActionType.ADD_REFRESH_TOKEN:
      newState.refreshToken = action.payload
      sessionStorage.setItem("jwt", action.payload);
      break
    case AuthActionType.LOGOUT:
      sessionStorage.clear()
      newState = new AuthState()
      break
  }

  return newState


}
