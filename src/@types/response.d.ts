declare namespace IResponse {
  interface Message {
    statusCode: number;
    message: string;
  }
  interface Response<T> {
    success?: Message;
    error?: Message;
    data?: T;
  }
}
