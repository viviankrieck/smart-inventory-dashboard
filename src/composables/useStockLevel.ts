import { useSettingsStore } from 'src/stores/settings';
import type { StockLevel } from 'src/interfaces/product';

/**
 * Regra única de classificação de estoque (esgotado / baixo / normal),
 * reaproveitada na tabela de produtos, no dashboard e em badges.
 * O limite de "estoque baixo" é definido pelo usuário em Configurações.
 */
export function useStockLevel() {
  const settingsStore = useSettingsStore();

  const getStockLevel = (stock: number): StockLevel => {
    if (stock === 0) return 'out';
    if (stock <= settingsStore.lowStockThreshold) return 'low';
    return 'ok';
  };

  const stockLevelColor: Record<StockLevel, string> = {
    out: 'negative',
    low: 'warning',
    ok: 'positive',
  };

  const stockLevelLabel: Record<StockLevel, string> = {
    out: 'Esgotado',
    low: 'Estoque baixo',
    ok: 'Em estoque',
  };

  return { getStockLevel, stockLevelColor, stockLevelLabel };
}
