/**
 * services/index
 *
 * Propósito:
 *  Inicializar e exportar instâncias dos serviços da aplicação usando a
 *  configuração de cliente HTTP padrão (`TrApiClient`). Fornece um ponto
 *  central para importar serviços (productService, tagService, reviewService, userService).
 *
 * Uso:
 *  import { productService } from '../services';
 *  const products = await productService.getProducts();
 *
 * Entradas:
 *  - Usa `TrApiClient` (configurado via `import.meta.env.VITE_API_URL`) como
 *    cliente HTTP compartilhado.
 *
 * Comportamento:
 *  - Cria uma instância `apiClient = new TrApiClient()` e instancia os serviços
 *    com esse cliente, exportando-os para uso pela aplicação.
 */

import TrApiClient from "../classes/TrApiClient";
import ProductService from "./Product";
import ReviewService from "./Review";
import TagService from "./Tag";
import UserService from "./User";

const apiClient = new TrApiClient();

export const productService = new ProductService(apiClient);
export const tagService = new TagService(apiClient);
export const reviewService = new ReviewService(apiClient);
export const userService = new UserService(apiClient);
