import type { ProductI } from 'src/interfaces/product';

export const rate_class = (product: ProductI) => {
  if (product.rating >= 4) {
    return 'text-green-400/60';
  } else if (product.rating >= 3) {
    return 'text-yellow-400/60';
  } else {
    return 'text-red-400/60';
  }
};
