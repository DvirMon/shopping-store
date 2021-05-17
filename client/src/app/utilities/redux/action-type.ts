export enum ActionType {

  // Auth ActionType
  Login,
  Logout,
  SocialUser,
  AddAccessToken,
  AddRefreshToken,

  // Cart ActionType
  AddCart,
  SetCartItems,
  SetCartPrice,
  AddCartItem,
  UpdateCartItem,
  DeleteCartItem,
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
