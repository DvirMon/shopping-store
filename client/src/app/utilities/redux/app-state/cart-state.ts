import { UserModel } from 'src/app/utilities/models/user-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';

export class CartAppState {

  public cart: CartModel = new CartModel()
  public cartItems : CartItemModel[] = []
  public isCartActive: boolean = false
  public cartTotalPrice : number = 0
}