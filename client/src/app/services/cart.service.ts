import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { CartModel } from '../models/cart-model';
import { store } from '../redux/store';
import { CartItemModel } from '../models/cart-item-model';
import { switchMap, tap } from 'rxjs/operators';



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
    this.http.post<CartModel>(this.cartUrl, { userId }).pipe(
      switchMap(cart => {
        this.formService.handleStore(ActionType.AddCart, cart)
        cartItem.cartId = cart._id
        return this.http.post(this.itemCartUrl, cartItem)
      })).subscribe(
        (cartItem: CartItemModel) => {
          this.formService.handleStore(ActionType.AddCartItem, cartItem)
        }
      )
  }

  public addCartItem(cartItem: CartItemModel) {
    return this.http.post(this.itemCartUrl, cartItem)
  }

  public updateCartItem(cartItem: CartItemModel) {
    return this.http.put(this.itemCartUrl + `/${cartItem._id}`, cartItem)

  }

  // end of cart section


  //logic action section

}
