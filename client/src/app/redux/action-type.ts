export enum ActionType {
    
  // Auth ActionType
  Login,
  Logout,
  AddAccessToken,
  AddRefreshToken,
  UpdateSocket,

  // Cart ActionType
  AddCart,
  IsCartActive,
  SetCartItems,
  SetCartPrice,
  AddCartItem,
  UpdatedItemCart,
  DeleteCartItem,
  ResetCartState,
  
  // Receipt Actions
  AddReceiptItem,
  DeleteReceiptItem,
  ResetReceiptState,
  GetOrderData
  
} 