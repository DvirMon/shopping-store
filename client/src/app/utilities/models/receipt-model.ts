export class ReceiptItemData {
 
  public constructor(
    public id: string,
    public name: string,
    public price: string,
    public quantity: string,
    public totalPrice: string,
  ) {
  }

}

export class ReceiptData {

  public constructor(
    public totalItems: ReceiptItemData[],
    public totalCartPrice: string,
  ) {
  }

}