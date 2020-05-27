
export class OrderModel {

  public constructor(

    public _id?: string,
    public userId?: string,
    public cartId?: string,
    public totalPrice?: number,
    public shippingDate?: Date | string,
    public orderDate?: Date | string,
    public creditCard?: string,
    public city?: string,
    public street?: string
  ) { }
}

