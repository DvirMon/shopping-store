import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormService } from './form.service';

import { CartModel, CurrentCartModel } from '../models/cart-model';
import { CartItemModel } from '../models/cart-item-model';

import { switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { store } from '../redux/store';
import { ActionType } from '../redux/action-type';

import { environment } from 'src/environments/environment';


export interface CartActionInfo {
  cartTotalPrice: number
  cartItem: CartItemModel
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemQuantity = new Subject<CartItemModel>();

  public cartUrl: string = `${environment.server}/api/carts`;
  public cartItemUrl: string = `${environment.server}/api/cart-item`

  constructor(
    private http: HttpClient,
    private formService: FormService
  ) { }

  // request section

  // GET request - latest cart : http://localhost:3000/api/carts/latest/:cartId"
  public getLatestCart(userId): Observable<CartModel> {
    return this.http.get<CartModel>(this.cartUrl + `/latest/${userId}`)
  }

  // POST request - create new cart : http://localhost:3000/api/carts"
  public getNewCart(cartItem: CartItemModel): Observable<Object> {
    const userId = store.getState().auth.user._id
    return this.http.post<CartModel>(this.cartUrl, { userId }).pipe(
      switchMap(cart => {
        this.formService.handleStore(ActionType.AddCart, cart)
        cartItem.cartId = cart._id
        return this.addCartItem(cartItem)
      }))
  }

  // PATCH request - change cart status : http://localhost:3000/api/carts/:cartId"
  public deactivateCart(cartId: string) : Observable<Object> {
    return this.http.patch(this.cartUrl + `/${cartId}`, { isActive: false })
  }

  // GET request - get latest cart items : : http://localhost:3000/api/cart-item/:cartId"
  public getLatestCartItems(cartId): Observable<CurrentCartModel> {
    return this.http.get<CurrentCartModel>(this.cartItemUrl + `/${cartId}`)

  }

  // ------------------------------------------------//

  // POST request - add cart item : http://localhost:3000/api/cart-item"
  public addCartItem(cartItem: CartItemModel): Observable<Object> {
    return this.http.post(this.cartItemUrl, cartItem)
  }

  // PUT request - update cart item : http://localhost:3000/api/cart-item/:_id"
  public updateCartItem(cartItem: CartItemModel) : Observable<Object>{
    return this.http.put(this.cartItemUrl + `/${cartItem._id}`, cartItem)
  }

  // DELETE request - delete cart item : http://localhost:3000/api/cart-item/:_id"
  public deleteCartItem(_id) {
    this.http.delete(this.cartItemUrl + `/${_id}`).subscribe(
      () => {
        this.formService.handleStore(ActionType.DeleteCartItem, _id)
        this.formService.handleStore(ActionType.DeleteReceiptItem, _id)
      }
    )

  }

  // DELETE request -delete cart and cart item : http://localhost:3000/api/carts/:_id"
  public deleteCartAndCartItems(_id) {
    this.http.delete(this.cartUrl + `/${_id}`).subscribe(
      () => {
        this.formService.handleStore(ActionType.ResetCartState)
      }
    )
  }

  // end of cart section

}
