declare namespace IOrder {
  type OrderStatus = "on-process" | "delivered";

  interface Order {
    orderItemIds: number[];
  }

  interface CreateOrder extends Order {}

  interface AddOrderItems {
    orderItemIds: number[];
  }

  interface RemoveOrderItems {
    orderItemIds: number[];
  }
}
