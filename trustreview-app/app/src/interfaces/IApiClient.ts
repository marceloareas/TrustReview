/**
 * IApiClient
 *
 * Propósito:
 *  Interface que define a API do cliente HTTP utilizado pela aplicação. Baseada
 *  em Axios, normaliza os métodos de requisição (execute, get, post, put, delete, patch)
 *  com tipos genéricos para request/response.
 *
 * Uso:
 *  - Implementar esta interface (ex.: `ApiClient`) para fornecer um cliente
 *    HTTP compatível com os serviços da aplicação.
 *
 * Assinatura resumida:
 *  - execute<T, D>(config: AxiosRequestConfig<D>): Promise<AxiosResponse<T, D>>
 *  - get/post/put/delete/patch<T, D>(...): Promise<AxiosResponse<T, D>>
 *
 * Observação:
 *  - Os métodos retornam o `AxiosResponse` completo (não apenas `response.data`) para
 *    preservar metadados (status, headers, config) quando necessário.
 */
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
