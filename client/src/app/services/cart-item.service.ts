import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CartItemModel, CurrentItemModel } from '../utilities/models/cart-item-model';
import { CartModel } from '../utilities/models/cart-model';
import * as  CartActions from "../utilities/ngrx/action";
import { cartState } from '../utilities/ngrx/state/cart-state';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private cartItemSubject = new Subject<CurrentItemModel>();


  private url: string = `${environment.server}/api/cart-item`


  constructor(
    private http : HttpClient,
    private ngrxStore: Store<{ cart: typeof cartState }>,

  ) { }


  // GETTER SECTION

  public getCartItemSubject(): Subject<CurrentItemModel> {
    return this.cartItemSubject
  }

  // HTTP SECTION


  // GET request - get latest cart items : : http://localhost:3000/api/cart-item/:cartId"
  public getCurentCartItems(cart: CartModel): Observable<CartModel> {
    return this.http.get<CurrentItemModel[]>(this.url + `/${cart.get_id()}`).pipe(
      map(currentItems => {
        cart.setItems(currentItems)
        return cart
      })
    )
  }

  // POST request - add cart item : http://localhost:3000/api/cart-item"
  public addCartItem(cartItem: CartItemModel): Observable<CurrentItemModel> {
    return this.http.post<CurrentItemModel>(this.url, cartItem).pipe(
      tap((currentItem: CurrentItemModel) => {
        this.ngrxStore.dispatch(new CartActions.AddCartItem(currentItem))
      })
    )
  }

  // PUT request - update cart item : http://localhost:3000/api/cart-item/:_id"
  public updateCartItem(cartItem: CartItemModel): Observable<CurrentItemModel> {
    return this.http.put<CurrentItemModel>(this.url + `/${cartItem._id}`, cartItem).pipe(
      tap((currentItem: CurrentItemModel) => {
        this.ngrxStore.dispatch(new CartActions.UpdateCartItem(currentItem))
      }))
  }

  // DELETE request - delete cart item : http://localhost:3000/api/cart-item/:_id"
  public deleteCartItem(_id) {
    this.http.delete(this.url + `/${_id}`).subscribe(
      () => {
        this.ngrxStore.dispatch(new CartActions.DeleteCartItem(_id))
        // this.formService.handleStore(ActionType.DeleteReceiptItem, _id)
      }
    )
  }

  public emitCartItem(cartItem: CurrentItemModel) {
    return this.cartItemSubject.next(cartItem)
  }

}
