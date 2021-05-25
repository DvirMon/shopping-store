import { OrderActionType } from "../action-type";
import { OrderActions } from "../actions/order-action";
import { OrderState } from "../state/orders.state";

export const orderReducer = (oldState = new OrderState(), action: OrderActions): OrderState => {

  const newState = { ...oldState }


  switch (action.type) {
    case OrderActionType.ADD_ORDER:
      // const history = [...newState.history]
      newState.history.push(action.payload);
      break;
    case OrderActionType.SET_HISTORY:
      newState.history = [...action.payload];
      break;
    case OrderActionType.SET_YEARS:
      newState.years = action.payload
      break;
  }

  return newState

}
