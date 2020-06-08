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
  SetCartProducts,
  SetCartPrice,
  AddCartItem,
  UpdatedItemCart,
  DeleteCartItem,
  ResetCartState,

  // Receipt Actions
  AddReceiptItem,
  DeleteReceiptItem,
  ResetReceiptState,
  GetOrderData,

  // Products Actions
  GetAllProducts,
  GetCategories,
  SetProductsPaginationData,
  AddProductsPaginationData,
  AddProduct,
  UpdateProduct,
} 