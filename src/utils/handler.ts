import { Response } from "express";

export const formatResponse = async <T>(
  repoCall: Promise<T>,
  errorMessage?: IResponse.Message,
  successMessage?: IResponse.Message
): Promise<IResponse.Response<T>> => {
  let response: IResponse.Response<T> = {};

  try {
    response.data = await repoCall;
    if (successMessage) response.success = successMessage;
  } catch (error) {
    if (errorMessage) response.error = errorMessage;
    else response.error = error;
  }
  return response;
};

export const responseHandler = <T>(
  res: Response,
  responseData: IResponse.Response<T>
) => {
  if (responseData.error) {
    res
      .status(responseData.error?.statusCode ?? 400)
      .send({ error: responseData.error.message });
    return;
  }

  res
    .status(responseData.success?.statusCode ?? 200)
    .send({ data: responseData.data, message: responseData.success.message });
};
