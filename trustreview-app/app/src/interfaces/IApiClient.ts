import type { AxiosRequestConfig, AxiosResponse } from "axios";

export default interface IApiClient {
  execute<T = unknown, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>>;

  get<T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>>;

  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>>;

  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>>;

  delete<T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>>;

  patch<T = unknown, D = unknown>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, Partial<D>>>;
}
