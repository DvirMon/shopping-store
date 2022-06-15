import { OrderHistoryModel, OrderModel } from "src/app/feat-modules/order/components/order-form/order-model"

export class OrderState {

  public history: OrderHistoryModel[] = []
  public years: number[] = []
  public currentOrder: OrderModel


}
