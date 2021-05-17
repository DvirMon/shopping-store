import { AuthActionType } from "../action-type";
import { AuthActions } from "../actions/auth-actions";
import { AuthState } from "../state/auth-state";


export function authReducer(oldState = new AuthState(), action: AuthActions) {

  const newState: AuthState = { ...oldState }

  switch (action.type) {

    case AuthActionType.LOGIN:
      newState.isLogin = true;
      newState.accessToken = action.payload['accessToken']
      newState.user = action.payload['user']
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
      break
    case AuthActionType.LOGOUT:
      newState.isLogin = false
      newState.user = null
      newState.refreshToken = null
      newState.accessToken = null
      sessionStorage.clear()

      break
  }

  return newState


}
