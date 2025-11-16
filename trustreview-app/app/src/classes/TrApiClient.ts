/**
 * TrApiClient
 *
 * Propósito:
 *  Implementação concreta de `ApiClient` com a configuração base usada pela
 *  aplicação TrustReview. Centraliza `baseURL` e headers padrão para chamadas
 *  à API (JSON) usando a variável de ambiente `VITE_API_URL`.
 *
 * Uso:
 *  - Importar e instanciar quando necessário para criar clientes específicos
 *    de recurso, ou estender para adicionar métodos de API:
 *      const client = new TrApiClient();
 *      class ProductsClient extends TrApiClient { getAll() { return this.get('/products') } }
 *
 * Entradas / Configuração:
 *  - Construtor sem parâmetros; utiliza `import.meta.env.VITE_API_URL` como
 *    `baseURL` e define headers JSON padrão:
 *      - Content-Type: application/json
 *      - Accept: application/json
 *
 * Comportamento/Observações:
 *  - Herdando de `ApiClient`, provê métodos tipados (get/post/put/delete/patch)
 *    e o tratamento de erro centralizado definido em `ApiClient.execute`.
 *  - Não adiciona interceptors por padrão; interceptors (auth, logging, retry)
 *    podem ser configurados na subclasse ou após instanciar o cliente.
 *  - Em ambientes onde `import.meta.env.VITE_API_URL` não esteja definido, o
 *    `baseURL` pode ficar vazio — trate isso em tempo de build/ configuração.
 *
 * Exemplos:
 *  const api = new TrApiClient();
 *  const resp = await api.get<MyResponse>('/products');
 *
 * Casos de borda / Recomendações:
 *  - Tokens de autenticação: adicione um interceptor que injete `Authorization`
 *    usando um token guardado no storage ou contexto, e trate 401 para
 *    refresh de token quando aplicável.
 *  - Timeout e retry: configurar `baseConfig.timeout` ou um interceptor de
 *    retry para chamadas de rede sensíveis.
 *  - Testes: para testes unitários, mockar axios ou instanciar `TrApiClient`
 *    com `baseURL` apontando para um mock server.
 *
 * Recomendações de melhoria:
 *  - Exportar uma instância singleton (`export const api = new TrApiClient()`) se
 *    for desejável um cliente compartilhado por toda a aplicação.
 *  - Adicionar interceptors padrão (auth, logging, métricas) na construção ou
 *    oferecer hooks para config externa.
 */

import ApiClient from "./ApiClient";

class TrApiClient extends ApiClient {
  constructor() {
    super({
      baseURL: `${import.meta.env.VITE_API_URL}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    this.http.interceptors.request.use((config) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = config.headers || {};
          (config.headers as any)["Authorization"] = `Bearer ${token}`;
        }
      } catch (e) {
        console.error("TrApiClient - erro ao adicionar token Authorization no cabeçalho.", e);
      }

      return config;
    });
  }
  
}

export default TrApiClient;
