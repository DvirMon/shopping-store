import { UserModel } from 'src/app/models/user-model';
import { CartModel } from 'src/app/models/cart-model';
import { CartItemModel } from 'src/app/models/cart-item-model';

export class CartAppState {

  public cart: CartModel = new CartModel()
  public isCartActive: boolean = false
  public cartItems : CartItemModel[] = []
  public cartTotalPrice : number = 0
}