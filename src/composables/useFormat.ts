const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const numberFormatter = new Intl.NumberFormat('pt-BR');

/**
 * Funções puras de formatação usadas em várias telas.
 * Centralizar aqui evita divergência de formato (ex.: moeda) entre componentes.
 */
export function useFormat() {
  const formatCurrency = (value: number): string => currencyFormatter.format(value);
  const formatNumber = (value: number): string => numberFormatter.format(value);

  const formatPriceWithDiscount = (price: number, discountPercentage: number): number => {
    return price - (price * discountPercentage) / 100;
  };

  return { formatCurrency, formatNumber, formatPriceWithDiscount };
}
