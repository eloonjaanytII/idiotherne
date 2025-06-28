import { FetchBaseQueryError} from "@reduxjs/toolkit/query";
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorResponse } from "../services/types/common";

export function parseErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined
): string | undefined {
  if (!error) return undefined;

  if ('data' in error && error.data && typeof error.data === 'object') {
    return (error.data as ErrorResponse).message;
  }

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  return 'Неизвестная ошибка';
}