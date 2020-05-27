
export class OrderModel {

  public constructor(

    public _id? : string,
    public userId?: string,
    public cartId?: string,
    public shippingDate?: Date,
    public totalPrice?: number,
    public orderDate?: Date,
    public creditCard?: string,
    public city?: string,
    public street?: string
  ) { }
}

