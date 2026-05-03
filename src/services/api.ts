import { AppConfig } from '../config/appConfig';
import type { ApiError, ApiResponse } from '../types/api.types';

const { baseUrl, timeout } = AppConfig.api;

const buildHeaders = (token?: string): HeadersInit => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const withTimeout = (promise: Promise<Response>): Promise<Response> => {
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), timeout);
  return promise.finally(() => clearTimeout(timer));
};

const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  if (!res.ok) {
    const error: ApiError = await res.json().catch(() => ({
      message: 'An unexpected error occurred',
      code: res.status,
    }));
    throw error;
  }
  return res.json() as Promise<ApiResponse<T>>;
};

export const apiClient = {
  get: <T>(path: string, token?: string) =>
    withTimeout(fetch(`${baseUrl}${path}`, { headers: buildHeaders(token) })).then(
      res => handleResponse<T>(res),
    ),

  post: <T>(path: string, body: unknown, token?: string) =>
    withTimeout(
      fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: buildHeaders(token),
        body: JSON.stringify(body),
      }),
    ).then(res => handleResponse<T>(res)),

  put: <T>(path: string, body: unknown, token?: string) =>
    withTimeout(
      fetch(`${baseUrl}${path}`, {
        method: 'PUT',
        headers: buildHeaders(token),
        body: JSON.stringify(body),
      }),
    ).then(res => handleResponse<T>(res)),

  patch: <T>(path: string, body: unknown, token?: string) =>
    withTimeout(
      fetch(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: buildHeaders(token),
        body: JSON.stringify(body),
      }),
    ).then(res => handleResponse<T>(res)),

  delete: <T>(path: string, token?: string) =>
    withTimeout(
      fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: buildHeaders(token),
      }),
    ).then(res => handleResponse<T>(res)),
};
