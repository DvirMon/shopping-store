
import { Action } from "../action";
import { AuthAppState } from "../app-state/auth-state";
import { ActionType } from "../action-type";


export const authReducer = (oldAppState = new AuthAppState(), action: Action): AuthAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.Login:
      newAppState.isLogin = true;
      newAppState.token = action.payload['token']
      newAppState.user = action.payload['user']
      newAppState.user['isAdmin'] ? newAppState.isAdmin = true : newAppState.isAdmin = false
      sessionStorage.setItem("jwt", JSON.stringify(action.payload['token']));
      break
    case ActionType.UpdateSocket:
      newAppState.socket = action.payload
      break
    case ActionType.Logout:
      newAppState.isLogin = false
      newAppState.isAdmin = null
      newAppState.user = null
      newAppState.token = null
      sessionStorage.clear();
  }
  return newAppState
}
