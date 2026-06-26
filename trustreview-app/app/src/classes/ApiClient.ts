/**
 * ApiClient
 *
 * Propósito:
 *  Classe abstrata que encapsula um cliente HTTP baseado em Axios, fornecendo
 *  métodos utilitários tipados (get, post, put, delete, patch) e uma rotina
 *  centralizada de execução de requisições (`execute`) com tratamento de erro
 *  consistente.
 *
 * Uso:
 *  - Estender esta classe para implementar clientes específicos da API:
 *      class MyClient extends ApiClient { ... }
 *  - Fornecer um `baseConfig: CreateAxiosDefaults` no construtor para
 *    configurar baseURL, headers, timeouts, interceptors etc.
 *
 * Entradas:
 *  - Construtor: `baseConfig: CreateAxiosDefaults` (configurações iniciais do Axios).
 *  - Métodos: parâmetros conforme a assinatura de cada método (url, data, config).
 *
 * Contrato (resumido):
 *  - Entradas: argumentos dos métodos HTTP (url: string, data?: D, config?: AxiosRequestConfig).
 *  - Saída: `Promise<AxiosResponse<T, D>>` contendo a resposta Axios tipada.
 *  - Erros: lança `Error` com mensagem amigável quando `axios.isAxiosError(error)`;
 *    caso contrário reaponta o erro original.
 *
 * Comportamento/Implementação importante:
 *  - `this.http` é uma instância de Axios criada com `axios.create(this.baseConfig)`;
 *  - `execute<T,D>(config)` é o ponto único de execução: faz `this.http.request` e
 *    uniformiza o tratamento de erros;
 *  - Métodos HTTP (get/post/put/delete/patch) delegam para `execute` fornecendo
 *    o `method`, `url`, `data` e mesclando `config` passados pelo chamador.
 *  - Tipos genéricos:
 *     - `T` representa o tipo do `response.data` esperado;
 *     - `D` representa o tipo do `request` (payload) quando aplicável.
 *
 * Exemplos de uso:
 *  const client = new MyClient({ baseURL: '/api', headers: { Authorization: '...' } });
 *  const resp = await client.get<MyResponse>('/products');
 *  const create = await client.post<MyCreated, CreateDto>('/products', payload);
 *
 * Casos de borda / Observações:
 *  - Se a API retornar um payload de erro complexo, `error.response?.data?.message`
 *    pode não existir — a mensagem de fallback é: "Erro de comunicação com a API";
 *  - Para preservar metadados do Axios (headers, status, config), os métodos
 *    retornam o `AxiosResponse<T, D>` completo e não só `response.data`;
 *  - Em ambientes SSR verifique a compatibilidade das configurações de `baseURL`.
 *
 * A11y / Segurança / Observabilidades:
 *  - Não aplicável diretamente a UI; porém é recomendável adicionar logs/telemetria
 *    nos interceptors para monitorar falhas e latências (sem incluir dados sensíveis).
 *
 * Dependências:
 *  - axios
 *
 * Recomendações de melhoria:
 *  - Fornecer um interceptor padrão para tratar 401 (refresh token) ou mapear
 *    códigos HTTP para erros de domínio mais ricos;
 *  - Exportar utilitários auxiliares para extrair `response.data` com forma segura
 *    (por exemplo `unwrap<T>(response: AxiosResponse<T>) => T`).
 *  - Considerar retornar `T` diretamente (em vez de `AxiosResponse<T,D>`) em métodos
 *    de alto nível para simplificar chamadas de API, mantendo métodos que retornam
 *    o `AxiosResponse` quando metadados são necessários.
 */

import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
} from "axios";
import type IApiClient from "../interfaces/IApiClient";

abstract class ApiClient implements IApiClient {
  protected http: AxiosInstance;
  private baseConfig: CreateAxiosDefaults;

  protected prefix = "/api/v1";

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
        console.error("ApiClient.execute - axios error response:", error.response);
        console.error("URL:", config.url);
        console.error("BaseURL:", this.baseConfig.baseURL);

        const msg =
          error.response?.data?.message ??
          JSON.stringify(error.response?.data) ??
          "Erro de comunicação com a API";
        throw new Error(msg);
      }
      throw error;
    }
  }

  private buildUrl(url: string): string {
    if (url.startsWith(this.prefix)) return url;
    return `${this.prefix}${url}`;
  }

  get<T = unknown, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T, D>> {
    return this.execute<T, D>({
      method: "GET",
      url: this.buildUrl(url),
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
      url: this.buildUrl(url),
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
      url: this.buildUrl(url),
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
      url: this.buildUrl(url),
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
      url: this.buildUrl(url),
      data,
      ...config,
    });
  }
}

export default ApiClient;

