
import { Action } from "../action";
import { AuthAppState } from "../app-state/auth-state";
import { ActionType } from "../action-type";


export const authReducer = (oldAppState = new AuthAppState(), action: Action): AuthAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.Login:
      newAppState.isLogin = true;
      newAppState.accessToken = action.payload['accessToken']
      newAppState.user = action.payload['user']
      newAppState.user['isAdmin'] ? newAppState.isAdmin = true : newAppState.isAdmin = false
      sessionStorage.setItem("user", JSON.stringify(action.payload['user']));
      break
    case ActionType.SocialUser:
      newAppState.socialUser = action.payload
      break
    case ActionType.AddAccessToken:
      newAppState.accessToken = action.payload
      break
    case ActionType.AddRefreshToken:
      newAppState.refreshToken = action.payload
      sessionStorage.setItem("jwt", action.payload);
      break
    case ActionType.UpdateSocket:
      newAppState.socket = action.payload
      break
    case ActionType.Logout:
      // newAppState = new AuthAppState()
      newAppState.isLogin = false
      newAppState.isAdmin = null
      newAppState.user = null
      newAppState.refreshToken = null
      newAppState.accessToken = null
      sessionStorage.clear();
  }
  return newAppState
}
