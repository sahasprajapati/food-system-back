import { OrderItem } from "../../entity/order/orderItem.entity";

declare namespace IOrderItem {
  interface OrderItem {
    foodId: number;
    quantity: number;
  }
  interface AddOrderItem extends OrderItem {}

  interface UpdateOrderItem extends OrderItem {}
}
