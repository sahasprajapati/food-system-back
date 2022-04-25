declare namespace IExpense {
  interface Expense {
    orderIds: number[];
  }
  interface CreateExpense extends Expense {}
  interface UpdateExpense extends Expense {}

  interface AddOrders {
    orderIds: number[];
  }

  interface RemoveOrders {
    orderIds: number[];
  }
}
