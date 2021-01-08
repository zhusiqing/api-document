import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { notification } from 'antd';
import { ERR_CODE, NOT_LOGIN_PAGE } from '../utils/map';
import observer from '../utils/observer';


// const routeChangeEvent = new Event('router:change');
const notificationKey = 'request';
// const { REACT_APP_URL } = process.env

const instance = axios.create({
  // baseURL: REACT_APP_URL,
  timeout: 10e3,
  validateStatus: status => status >= 200 && status < 300
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})
export interface InterfaceResponseData {
  code?: number
  success: boolean
  message?: string
  data?: any
}

const http = (options: AxiosRequestConfig) :Promise<InterfaceResponseData> => instance(options).then((res: AxiosResponse) => {
  const { code, message, success, data: result } = res.data;
  const formatData: InterfaceResponseData = {
    code,
    success,
    message,
    data: result
  }
  const path = window.location.pathname
  if (code === ERR_CODE.NOT_LOGIN && !NOT_LOGIN_PAGE.includes(path)) {
    // window.dispatchEvent(routeChangeEvent)
    observer.emit('router:change', '/login')
  } else if (code !== 200) {
    notification.error({
      message: message || '服务出错！',
      key: notificationKey
    })
  }
  return formatData
}).catch((err: AxiosError) => {
  const { message = '' } = err;
  if (~message.indexOf('timeout')) {
    notification.error({
      message: '请求超时',
      key: notificationKey
    });
  } else {
    const text = err?.message || '出现了某种错误'
    notification.error({
      message: text,
      key: notificationKey
    });
  }
  return { success: false };
});
export default http;
