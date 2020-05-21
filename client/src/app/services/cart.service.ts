import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { CartModel } from '../models/cart-model';
import { store } from '../redux/store';
import { CartItemModel } from '../models/cart-item-model';
import { switchMap, tap } from 'rxjs/operators';


export interface CartActionInfo {
  cartTotalPrice: number
  cartItem: CartItemModel
}

@Injectable({
  providedIn: 'root'
})
export class CartService {


  public cartUrl: string = "http://localhost:3000/api/carts";
  public itemCartUrl: string = "http://localhost:3000/api/cart-item"

  constructor(
    private http: HttpClient,
    private formService: FormService
  ) { }

  // request section
  public getNewCart(cartItem: CartItemModel) {
    const userId = store.getState().auth.user._id
    return this.http.post<CartModel>(this.cartUrl, { userId }).pipe(
      switchMap(cart => {
        this.formService.handleStore(ActionType.AddCart, cart)
        cartItem.cartId = cart._id
        return this.addCartItem(cartItem)
      }))
  }

  public addCartItem(cartItem: CartItemModel) {
    return this.http.post(this.itemCartUrl, cartItem)
  }

  public updateCartItem(cartItem: CartItemModel) {
    return this.http.put(this.itemCartUrl + `/${cartItem._id}`, cartItem)
  }

  public deleteCartAndCartItems(_id) {
    this.http.delete(this.cartUrl + `/${_id}`).subscribe(
      () => this.formService.handleStore(ActionType.ResetCartState)
    )
  }

  

  // end of cart section

}
