import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import type IApiClient from "../interfaces/IApiClient";

abstract class ApiClient implements IApiClient {
  private http: AxiosInstance;
  private baseConfig: CreateAxiosDefaults;

  constructor(baseConfig: CreateAxiosDefaults) {
    this.baseConfig = baseConfig;
    this.http = axios.create(this.baseConfig);
  }

  async execute<T = unknown, D = unknown>(
    config: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    try {
      const response = await this.http.request<T, AxiosResponse<T, D>>(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ?? "Erro de comunicação com a API",
        );
      }
      throw error;
    }
  }

  get<T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    return this.execute<T, D>({
      method: "GET",
      url,
      ...config,
    });
  }

  post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    return this.execute<T, D>({
      method: "POST",
      url,
      data,
      ...config,
    });
  }

  put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    return this.execute<T, D>({
      method: "PUT",
      url,
      data,
      ...config,
    });
  }

  delete<T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    return this.execute<T, D>({
      method: "DELETE",
      url,
      ...config,
    });
  }

  patch<T = unknown, D = unknown>(
    url: string,
    data?: Partial<D>,
    config?: AxiosRequestConfig<Partial<D>>,
  ): Promise<AxiosResponse<T, Partial<D>>> {
    return this.execute<T, Partial<D>>({
      method: "PATCH",
      url,
      data,
      ...config,
    });
  }
}

export default ApiClient;
