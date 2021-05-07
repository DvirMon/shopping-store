import { CartItemModel } from './cart-item-model'

export class CartModel {



  public constructor(
    private _id?: string,
    private userId?: string,
    private isActive?: boolean,
    private createDate?: Date,
    private items?: CartItemModel[],
    private totalPrice?: number

  ) { }

  static create(payload: CartModel) {
    return new CartModel(
      payload._id,
      payload?.userId,
      payload.isActive,
      payload.createDate,
      payload?.items ? payload.items : [],
      payload.totalPrice
    )
  }


  public get_id(): string {
    return this._id;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public setIsActive(isActice: boolean) {
    this.isActive = isActice
  }

  public getCreateDate(): Date {
    return this.createDate;
  }

  public getItems(): CartItemModel[] {
    return this.items ? [...this.items] : []
  }

  public setItems(items: CartItemModel[]): void {
    this.items = [...items];
  }

  public getTotalPrice(): number {
    return this.totalPrice;
  }

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }

  // METHODS SECTION
  private findIndexItem(cartItem: CartItemModel): number {
    return this.items.findIndex(item => item._id === cartItem._id);
  }

  public findCartItem(productId: string): CartItemModel {

    if (this.items.length > 0) {
      return this.items.find((cartItem) => cartItem.productId === productId
      )
    }
    return null
  }

  public isCartItem(productId: string): boolean {
    if (this.findCartItem(productId)) {
      return true
    }
    return false
  }

  public addItem(cartItem: CartItemModel) {
    this.items.push(cartItem)
  }

  public updateItem(cartItem: CartItemModel) {

    const itemIndex = this.findIndexItem(cartItem);

    if (itemIndex >= 0) {
      this.items[itemIndex] = { ...cartItem }
    }

    // this.items.find(itemToUpdate => {
    //   if (itemToUpdate._id === cartItem._id) {
    //     for (const prop in cartItem) {
    //       if (prop in itemToUpdate) {
    //         itemToUpdate[prop] = cartItem[prop]
    //       }
    //     }
    //   }
    // })
  }

  public deleteitem(cartItem: CartItemModel) {
    const itemIndex = this.findIndexItem(cartItem);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }

}

export class CurrentCartModel {
  public price?: number
  public cartItems?: CartItemModel[]
}

export class CurrentModel {

  private price: number
  private cartItems: CartItemModel[]

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    this.price = price;
  }

  public getCartItems(): CartItemModel[] {
    return this.cartItems;
  }

  public setCartItems(cartItems: CartItemModel[]): void {
    this.cartItems = cartItems;
  }

}
