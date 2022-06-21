export class ReceiptItemModel {

  public constructor(
    public id: string,
    public name: string,
    public price: string,
    public quantity: string,
    public totalPrice: string,
  ) {
  }

}
