import { CartItemModel, CurrentItemModel } from './cart-item-model'

export class CartModel {

  public constructor(
    private _id?: string,
    private userId?: string,
    private isActive?: boolean,
    private createDate?: Date,
    private items?: CurrentItemModel[],
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

  public getItems(): CurrentItemModel[] {
    return this.items ? [...this.items] : []
  }

  public setItems(items: CurrentItemModel[]): void {
    this.items = [...items];
  }

  public getTotalPrice(): number {
    if (this.items.length > 0) {
      this.totalPrice = this.items
        .map(item => item.quantity * item.productRef.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      return this.totalPrice
    }
    return 0
  }

  public setTotalPrice(totalPrice: number): void {
    this.totalPrice = totalPrice;
  }

  // METHODS SECTION

  // method to find cart item index by id
  private findItemIndex(_id: string): number {
    return this.items.findIndex(item => item._id === _id);
  }


  // method to fins cart item by product
  public findCartItem(productRef: string): CurrentItemModel {

    if (this.items.length > 0) {
      return this.items.find((cartItem) => cartItem.productRef._id === productRef
      )
    }
    return null
  }

  // mtethod to find if cart item exist
  public isCartItem(cartItem: CartItemModel): boolean {
    if (this.findCartItem(cartItem.productRef)) {
      return true
    }
    return false
  }

  public addItem(cartItem: CurrentItemModel) {
    this.items.push(cartItem)
  }

  public updateItem(cartItem: CurrentItemModel) {

    const itemIndex = this.findItemIndex(cartItem._id);

    if (itemIndex >= 0) {
      this.items[itemIndex] = { ...cartItem }
    }

  }

  public deleteitem(_id: string) {
    const itemIndex = this.findItemIndex(_id);
    if (itemIndex >= 0) {
      this.items.splice(itemIndex, 1)
    }
  }


}

