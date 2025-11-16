/**
 * Product / Tag / Review interfaces
 *
 * Propósito:
 *  Definir os tipos relacionados a produtos, tags e reviews usados pela aplicação
 *  e pelos serviços que comunicam com a API.
 *
 * Uso:
 *  - `IProduct`: representa um produto (campos principais: id, name, description, tags, ratings, imageUrl).
 *  - `ITag`: representa uma tag associada a um produto.
 *  - `ReviewDTO`: payload usado para criar uma review.
 *  - `IReview`: representação de uma review retornada pela API.
 *
 * Observação:
 *  - Vários campos são opcionais (`id`, timestamps, listas) e dependem do comportamento do backend.
 */

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  tags?: ITag[];
  overallRating?: number;
  imageUrl?: string;
  reviewsCount?: number;
  reviews?: IReview[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ITag {
  id?: string;
  name: string;
  description?: string;
}

export interface ReviewDTO {
  title: string;
  userId: string;
  productId: string;
  userName?: string;
  description?: string;
  likes?: number;
  dislikes?: number;
  pros?: string[];
  con?: string[];
  rating: number;
}

export interface IReview {
  id?: string;
  title?: string;
  userId: string;
  productId: string;
  userName: string;
  pros: string[];
  con: string[];
  rating: number;
  description?: string;
  likes?: number;
  dislikes?: number;
  createdAt?: string;
  updatedAt?: string;
}
