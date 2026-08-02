import { defineStore } from 'pinia';
import { productService } from 'src/services/productService';
import { useSettingsStore } from 'src/stores/settings';
import type { Product } from 'src/interfaces/product';

interface InventoryState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
}

/**
 * Mantém uma visão completa do catálogo (não paginada) para alimentar o
 * dashboard, a página de estoque baixo e o indicador no cabeçalho —
 * evitando que cada tela repita sua própria chamada/lógica de agregação.
 */
export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryState => ({
    items: [],
    isLoading: false,
    error: null,
    lastFetchedAt: null,
  }),

  getters: {
    totalProducts: (state) => state.items.length,
    totalStock: (state) => state.items.reduce((sum, p) => sum + p.stock, 0),
    totalValue: (state) => state.items.reduce((sum, p) => sum + p.stock * p.price, 0),

    outOfStockItems: (state) => state.items.filter((p) => p.stock === 0),

    lowStockItems(state): Product[] {
      const settingsStore = useSettingsStore();
      return state.items
        .filter((p) => p.stock > 0 && p.stock <= settingsStore.lowStockThreshold)
        .sort((a, b) => a.stock - b.stock);
    },

    criticalItems(): Product[] {
      return [...this.outOfStockItems, ...this.lowStockItems];
    },

    stockByCategory: (state) => {
      const map = new Map<string, number>();
      for (const product of state.items) {
        map.set(product.category, (map.get(product.category) ?? 0) + product.stock);
      }
      return [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([category, stock]) => ({ category, stock }));
    },
  },

  actions: {
    async fetchAll(force = false) {
      // Evita refazer a chamada em toda navegação: os dados só ficam
      // realmente desatualizados entre uma sessão e outra.
      if (this.items.length > 0 && !force) return;

      this.isLoading = true;
      this.error = null;

      try {
        const response = await productService.list({ limit: 0 });
        this.items = response.products;
        this.lastFetchedAt = Date.now();
      } catch {
        this.error = 'Não foi possível carregar os dados do inventário.';
      } finally {
        this.isLoading = false;
      }
    },
  },
});
