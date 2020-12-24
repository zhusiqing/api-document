import { AxiosRequestConfig } from 'axios';
import http, { InterfaceResponseData } from './handle';

export const get = (url: string, data?: object, config?: AxiosRequestConfig): Promise<InterfaceResponseData> => http({
  url,
  method: 'get',
  params: data,
  ...config
});

export const put = (url: string, data: object, config?: AxiosRequestConfig): Promise<InterfaceResponseData> => http({
  url,
  method: 'put',
  data,
  ...config
});

export const post = (url: string, data: object, config?: object): Promise<InterfaceResponseData> => http({
  url,
  method: 'post',
  data,
  ...config
});

export const del = (url: string, data?: object, config?: object): Promise<InterfaceResponseData> => http({
  url,
  method: 'delete',
  params: data,
  ...config
});
