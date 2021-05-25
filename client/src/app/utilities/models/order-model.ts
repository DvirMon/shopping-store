import { CurrentItemModel } from "./cart-item-model";

export class OrderModel {

  public constructor(

    public _id?: string,
    public userId?: string,
    public cartRef?: string,
    public totalPrice?: number,
    public shippingDate?: Date | string,
    public orderDate?: Date | string,
    public creditCard?: string,
    public city?: string,
    public street?: string
  ) { }
}
export class OrderHistoryModel {

  public constructor(

    public _id?: string,
    public cartRef?: string,
    public totalPrice?: number,
    public user?: { fullName: string },
    public shippingDate?: Date | string,
    public orderDate?: Date | string,
    public items?: CurrentItemModel[]
  ) { }
}

