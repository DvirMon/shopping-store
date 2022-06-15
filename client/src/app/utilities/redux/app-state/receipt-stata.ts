import { OrderModel } from 'src/app/feat-modules/order/components/order-form/order-model';
import { ReceiptItemModel } from 'src/app/utilities/models/receipt-model';

export class ReceiptAppState {

  public receipt: ReceiptItemModel[] = [];
  public orderDetails : OrderModel = new OrderModel()

}
