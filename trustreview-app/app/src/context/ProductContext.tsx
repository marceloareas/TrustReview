import React, { createContext, useCallback, useEffect, useState } from "react";
import { productService } from "../services";
import type { IProduct } from "../interfaces/Product";

interface ProductContextProps {
  products: IProduct[];
  loading: boolean;
  error?: string | null;
  loadProducts: () => Promise<void>;
  searchProducts: (term: string) => Promise<IProduct[]>;
  getProductById: (id: string) => Promise<IProduct | null>;
  getRelatedProducts: (id: string) => Promise<IProduct[]>;
  createProduct: (product: Partial<IProduct>) => Promise<IProduct>;
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (e: any) {
      setError(e?.message || "Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductsByTerm(term);
      setProducts(data || []);
      return data || [];
    } catch (e: any) {
      setError(e?.message || "Erro ao buscar produtos");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id);
      return data || null;
    } catch (e: any) {
      setError(e?.message || "Erro ao obter produto");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRelatedProducts = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getRelatedProducts(id);
      return data || [];
    } catch (e: any) {
      setError(e?.message || "Erro ao obter produtos relacionados");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (product: Partial<IProduct>) => {
    setLoading(true);
    setError(null);
    try {
      const created = await productService.createProduct(product);
      setProducts((prev) => (created ? [created, ...prev] : prev));
      return created;
    } catch (e: any) {
      setError(e?.message || "Erro ao criar produto");
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // initial load
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        loadProducts,
        searchProducts,
        getProductById,
        getRelatedProducts,
        createProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
