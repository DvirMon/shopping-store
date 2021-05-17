import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// RXJS
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// MODELS
import { ProductModel } from '../utilities/models/product-model';
import { CartItemModel, CurrentItemModel } from '../utilities/models/cart-item-model';
import { CartModel } from '../utilities/models/cart-model';

// NGRX
import { Store } from '@ngrx/store';
import { cartState } from '../utilities/ngrx/state/cart-state';
import * as  CartActions from "../utilities/ngrx/actions/cart-action";

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private currentItemSubject = new Subject<CurrentItemModel>();

  private url: string = `${environment.server}/api/cart-item`;

  constructor(
    private http: HttpClient,
    private ngrxStore: Store<{ cart: typeof cartState }>,

  ) { }


  // GETTER SECTION

  public getCartItemSubject(): Subject<CurrentItemModel> {
    return this.currentItemSubject
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
    return this.http.post<CurrentItemModel>(this.url, cartItem)
      .pipe(
        tap((currentItem: CurrentItemModel) => {
          this.ngrxStore.dispatch(new CartActions.AddCartItem(currentItem))
        })
      )
  }

  // POST request - add cart item : http://localhost:3000/api/cart-item/all"
  public addItems(cart: CartModel, items: CartItemModel[]): Observable<CartModel> {
    return this.http.post<CurrentItemModel[]>(this.url + "/all", items)
      .pipe(
        map((items: CurrentItemModel[]) => {
          cart.setItems(items)
          return cart
        })
      )
  }

  // PUT request - update cart item : http://localhost:3000/api/cart-item/:_id"
  public updateCartItem(cartItem: CartItemModel): Observable<CurrentItemModel> {
    return this.http.put<CurrentItemModel>(this.url + `/${cartItem._id}`, cartItem)
      .pipe(
        tap((currentItem: CurrentItemModel) => {
          this.ngrxStore.dispatch(new CartActions.UpdateCartItem(currentItem))
        }))
  }

  // DELETE request - delete cart item : http://localhost:3000/api/cart-item/:_id"
  public deleteCartItem(_id: string) {
    this.http.delete(this.url + `/${_id}`).subscribe(
      () => {
        this.ngrxStore.dispatch(new CartActions.DeleteCartItem(_id))
        // this.formService.handleStore(ActionType.DeleteReceiptItem, _id)
      }
    )
  }

  // SUBJET SECTION

  public emitCurrentItem(cartItem: CurrentItemModel) {
    return this.currentItemSubject.next(cartItem)
  }

  //LOGIC SECTION

  public addTempItem(product: ProductModel, quantity: number): CurrentItemModel {
    const currentItem = CurrentItemModel.create(product, quantity, null)
    this.ngrxStore.dispatch(new CartActions.AddCartItem(currentItem))
    return currentItem
  }

  public updateTempItem(product: ProductModel, quantity: number): CurrentItemModel {
    const currentItem = CurrentItemModel.create(product, quantity, null)
    this.ngrxStore.dispatch(new CartActions.UpdateCartItem(currentItem))
    return currentItem
  }

  public deleteTempItem(_id: string) {
    this.ngrxStore.dispatch(new CartActions.DeleteCartItem(_id))
  }

  public setCartItemsAsCurrentItems(cart: CartModel): CartItemModel[] {
    return cart.getItems().map(
      (item: CurrentItemModel) => {
        return {
          productRef: item.productRef._id,
          quantity: item.quantity,
          cartId: cart.get_id()
        }
      })
  }

}
