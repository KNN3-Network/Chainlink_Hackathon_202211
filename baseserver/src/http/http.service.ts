import { Injectable, Inject, Logger } from '@nestjs/common';
import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';

// logging.axios-interceptor.ts
const LOGGING_CONFIG_KEY = Symbol('kLoggingAxiosInterceptor');

@Injectable()
export class HttpService {
  private readonly logger = new Logger('Http');
  axiosInstance: AxiosInstance;

  constructor(@Inject('AXIOS') private readonly config: AxiosRequestConfig) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const instance = axios.create(this.config);
    instance.interceptors.request.use(
      function (conf) {
        conf[LOGGING_CONFIG_KEY] = {
          startTime: Date.now(),
        };
        return conf;
      },
      function (err) {
        return Promise.reject(err);
      },
    );
    instance.interceptors.response.use(
      function (res: any) {
        const { startTime } = res.config[LOGGING_CONFIG_KEY];
        const endTime = Date.now();
        const duration = endTime - startTime;
        const log = `axios调用接口路由:${res.config.url};请求时间: ${duration}ms`;
        self.logger.log(log);
        return res;
      },
      function (err) {
        self.logger.error(err);
        return Promise.reject(err);
      },
    );
    this.axiosInstance = instance;
  }

  async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.get(url, config);
  }

  async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.put(url, data, config);
  }

  async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.delete(url, config);
  }

  async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.post(url, data, config);
  }

  async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.patch(url, data, config);
  }

  async request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return await this.axiosInstance.request(config);
  }
}
