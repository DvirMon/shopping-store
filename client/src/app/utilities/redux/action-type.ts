export enum ActionType {

  // Auth ActionType
  Login,
  Logout,
  SocialUser,
  AddAccessToken,
  AddRefreshToken,
  UpdateSocket,

  // Cart ActionType
  AddCart,
  IsCartActive,
  SetCartItems,
  SetCartProducts,
  AddCartProduct,
  SetCartPrice,
  AddCartItem,
  UpdatedItemCart,
  DeleteCartItem,
  DeleteCartProduct,
  ResetCartState,
  
  // Receipt Actions
  AddReceiptItem,
  DeleteReceiptItem,
  ResetReceiptState,
  GetOrderData,
  
  // Products Actions
  AddProduct,
  SetProducts, 
  GetCategories,
  SetProductsPaginationData,
  AddProductsPaginationData,
  UpdateProduct,
} 