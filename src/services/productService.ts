import { http } from 'src/services/http';
import type {
  Product,
  ProductListResponse,
  ProductQueryParams,
  ProductCategory,
} from 'src/interfaces/product';

/**
 * Camada de acesso à API de produtos (DummyJSON).
 * Mantém toda a URL/param building isolada dos componentes e da store.
 */
export const productService = {
  async list(params: ProductQueryParams = {}): Promise<ProductListResponse> {
    const { search, category, ...rest } = params;

    if (search) {
      const { data } = await http.get<ProductListResponse>('/products/search', {
        params: { q: search, ...rest },
      });
      return data;
    }

    if (category) {
      const { data } = await http.get<ProductListResponse>(`/products/category/${category}`, {
        params: rest,
      });
      return data;
    }

    const { data } = await http.get<ProductListResponse>('/products', { params: rest });
    return data;
  },

  async getById(id: number): Promise<Product> {
    const { data } = await http.get<Product>(`/products/${id}`);
    return data;
  },

  async listCategories(): Promise<ProductCategory[]> {
    const { data } = await http.get<ProductCategory[]>('/products/categories');
    return data;
  },

  async create(payload: Partial<Product>): Promise<Product> {
    const { data } = await http.post<Product>('/products/add', payload);
    return data;
  },

  async update(id: number, payload: Partial<Product>): Promise<Product> {
    const { data } = await http.put<Product>(`/products/${id}`, payload);
    return data;
  },

  async remove(id: number): Promise<Product> {
    const { data } = await http.delete<Product>(`/products/${id}`);
    return data;
  },
};
