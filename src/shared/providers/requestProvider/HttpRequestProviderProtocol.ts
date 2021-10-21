import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpRequestConfig extends AxiosRequestConfig {} // eslint-disable-line

export interface HttpResponse<T = any> extends AxiosResponse<T> {} // eslint-disable-line

export interface HttpRequestProviderProtocol {
  get<T>(url: string, config: HttpRequestConfig): Promise<HttpResponse<T>>;
  post<T>(url: string, data: any, config: HttpRequestConfig): Promise<HttpResponse<T>>;
}
