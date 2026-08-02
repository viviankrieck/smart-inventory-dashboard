import { defineStore } from 'pinia';
import { productService } from 'src/services/productService';
import type { Product, ProductCategory } from 'src/interfaces/product';

interface ProductsState {
  items: Product[];
  categories: ProductCategory[];
  total: number;
  page: number;
  rowsPerPage: number;
  search: string;
  category: string | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Estado da tela de listagem de produtos (busca, filtro e paginação).
 * Para uma visão consolidada do catálogo (dashboard, estoque baixo,
 * indicador do header) veja `useInventoryStore`.
 */
export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    items: [],
    categories: [],
    total: 0,
    page: 1,
    rowsPerPage: 10,
    search: '',
    category: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await productService.list({
          limit: this.rowsPerPage,
          skip: (this.page - 1) * this.rowsPerPage,
          ...(this.search && { search: this.search }),
          ...(this.category && { category: this.category }),
        });

        this.items = response.products;
        this.total = response.total;
      } catch {
        this.error = 'Não foi possível carregar os produtos. Tente novamente.';
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCategories() {
      try {
        this.categories = await productService.listCategories();
      } catch {
        this.categories = [];
      }
    },

    setPage(page: number) {
      this.page = page;
      void this.fetchProducts();
    },

    setSearch(search: string) {
      this.search = search;
      this.page = 1;
      void this.fetchProducts();
    },

    setCategory(category: string | null) {
      this.category = category;
      this.page = 1;
      void this.fetchProducts();
    },
  },
});
