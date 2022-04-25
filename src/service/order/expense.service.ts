import { Expense } from "../../entity/order/expense.entity";
import { ExpenseRepository } from "../../repositories/order/expense.repository";
import { OrderRepository } from "../../repositories/order/order.repository";
import { formatResponse } from "../../utils/handler";

export class ExpenseService {
  static repository = new ExpenseRepository();

  static async listAll(): Promise<IResponse.Response<Array<Expense>>> {
    const res = formatResponse(
      this.repository.find(),
      { statusCode: 401, message: "Error while fetching expense" },
      { statusCode: 200, message: "Expenses fetched successfully" }
    );

    return res;
  }

  static async getOneById(id: number): Promise<IResponse.Response<Expense>> {
    const res = formatResponse(
      this.repository.findOneById(id),
      { statusCode: 401, message: "Error while fetching expense" },
      { statusCode: 200, message: "Expense fetched successfully" }
    );
    return res;
  }

  static async create(orderIds: number[]): Promise<IResponse.Response<void>> {
    const orderRepository = new OrderRepository();
    // Get parameters from body
    const expense = new Expense();

    const ordersResponse = await formatResponse(
      orderRepository.findByIds(orderIds),
      {
        statusCode: 400,
        message: "Error while fetching order",
      }
    );

    if (ordersResponse.error) {
      return { error: ordersResponse.error };
    }

    expense.orders = ordersResponse.data;

    // If all ok, send 201 response
    const res = formatResponse(
      this.repository.save(expense),
      { statusCode: 409, message: "Error while creating expense" },
      { statusCode: 201, message: "Expense saved successfully" }
    );

    return res;
  }

  static async delete(id: number): Promise<IResponse.Response<void>> {
    const response = formatResponse(
      this.repository.delete(id),
      {
        statusCode: 404,
        message: "Expense not found",
      },
      { statusCode: 200, message: "Expense deleted succesfully" }
    );
    return response;
  }

  static async addOrders(
    id: number,
    orderIds: number[]
  ): Promise<IResponse.Response<void>> {
    const orderRepository = new OrderRepository();
    const ordersResponse = await formatResponse(
      orderRepository.findByIds(orderIds),
      {
        statusCode: 404,
        message: "Orders not found",
      }
    );
    // If error return
    if (ordersResponse.error) {
      return { error: ordersResponse.error };
    }

    const expenseResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "Expense not found",
      }
    );
    // If error return
    if (expenseResponse.error) {
      return { error: expenseResponse.error };
    }

    expenseResponse.data.orders = [
      ...expenseResponse.data.orders,
      ...ordersResponse.data,
    ];

    const response = await formatResponse(
      this.repository.save(expenseResponse.data),
      {
        statusCode: 409,
        message: "Orders could not be inserted.",
      },
      {
        statusCode: 200,
        message: "Orders added to expense",
      }
    );
    return response;
  }

  static async removeOrders(
    id: number,
    orderIds: number[]
  ): Promise<IResponse.Response<void>> {
    const expenseResponse = await formatResponse(
      this.repository.findOneById(id),
      {
        statusCode: 404,
        message: "Expense not found",
      }
    );
    // If error return
    if (expenseResponse.error) {
      return { error: expenseResponse.error };
    }

    expenseResponse.data.orders = expenseResponse.data.orders.filter(
      (order) => !orderIds.includes(order.id)
    );

    const response = await formatResponse(
      this.repository.save(expenseResponse.data),
      {
        statusCode: 409,
        message: "Orders could not be removed.",
      },
      {
        statusCode: 200,
        message: "Orders removed from expense",
      }
    );
    return response;
  }
}
