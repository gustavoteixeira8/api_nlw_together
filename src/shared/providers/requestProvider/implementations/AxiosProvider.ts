import axios from 'axios';
import {
  HttpRequestConfig,
  HttpRequestProviderProtocol,
  HttpResponse,
} from '../HttpRequestProviderProtocol';

export class AxiosProvider implements HttpRequestProviderProtocol {
  public async get<T>(url: string, config: HttpRequestConfig): Promise<HttpResponse<T>> {
    return axios.get<T, HttpResponse<T>>(url, config);
  }

  public async post<T>(
    url: string,
    data: any,
    config: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    return axios.post<T, HttpResponse<T>>(url, data, config);
  }
}
