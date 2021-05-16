import { CartItemModel, CurrentItemModel } from './cart-item-model'
import { ProductModel } from './product-model';

export class CartModel {

  public constructor(
    private _id?: string,
    private userId?: string,
    private isActive?: boolean,
    private createDate?: Date,
    private items?: CurrentItemModel[],

  ) { }

  static create(payload: CartModel) {

    return new CartModel(
      payload._id,
      payload?.userId ? payload.userId : null,
      payload.isActive ? payload.isActive : true,
      payload.createDate ? payload.createDate : new Date(),
      payload?.items ? payload.items : [],
    )
  }

  static getSessionCart(): CartModel {

    const cart = JSON.parse(sessionStorage.getItem("cart"))
    if (cart) {
      return this.create(cart)
    }
    return new CartModel()

  }

  static setSeeeionCart(cart) {
    console.log(1)
    sessionStorage.setItem("cart", JSON.stringify(cart))
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
      return this.items
        .map(item => item.quantity * item.productRef.price)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
    }
    return 0
  }


  // METHODS SECTION

  // method to find cart item index by id
  private findItemIndex(_id: string): number {

    if (_id !== null) {
      return this.items.findIndex(item => item._id === _id);
    }

  }

  private findItemIndexByProduct(_id: string): number {
    return this.items.findIndex(item => item.productRef?._id === _id);
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
  public isCartItem(currentItem: CurrentItemModel): boolean {
    if (this.findCartItem(currentItem.productRef._id)) {
      return true
    }
    return false
  }


  public addItem(currentItem: CurrentItemModel) {


    if (this.isCartItem(currentItem)) {
      return
    }
    const items = this.getItems()
    items.push(currentItem)
    this.items = [...items]
  }

  public updateItem(currentItem: CurrentItemModel) {


    const itemIndex = this.findItemIndex(currentItem._id) >= 0
      ? this.findItemIndex(currentItem._id)
      : this.findItemIndexByProduct(currentItem.productRef._id)

    if (itemIndex >= 0) {

      const items = this.getItems()
      items[itemIndex] = { ...currentItem }

      this.setItems(items)
    }


  }

  public deleteitem(_id: string) {

    const itemIndex = this.findItemIndex(_id) >= 0
      ? this.findItemIndex(_id)
      : this.findItemIndexByProduct(_id)


    if (itemIndex >= 0) {
      const items = this.getItems()
      items.splice(itemIndex, 1)
      this.setItems(items)
    }
  }

  public findProduct(): ProductModel {

    if (this.items.length > 0) {
      return this.items[0].productRef
    }
    return null

  }


}

