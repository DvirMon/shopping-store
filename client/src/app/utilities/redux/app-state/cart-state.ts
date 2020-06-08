import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from '../../models/product-model';
import { CartItemModel } from '../../models/cart-item-model';

export class CartAppState {

  public cart: CartModel = new CartModel()
  public cartItems: CartItemModel[] = []
  public cartProducts: ProductModel[] = []
  public isCartActive: boolean = false
  public cartTotalPrice: number = 0
}