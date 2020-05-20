
export class OrderModel {

  public constructor(

    public userId?: string,
    public cartId?: string,
    public shipmentDate?: Date,
    public orderDate?: Date,
    public totalPrice?: number,
    public creditCard?: string,
    public city?: string,
    public street?: string
  ) { }
}