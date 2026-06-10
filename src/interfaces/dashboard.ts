export interface DashboardMetrics {
  total_products: number;
  total_categories: number;
  inventory_value: number;
  low_stock_products: number;
}

export interface MonthlyMovement {
  month: string;
  entries: number;
  exits: number;
}

export interface LowStockProduct {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  minimum_quantity: number;
}

export interface RecentMovement {
  id: number;
  product_name: string;
  type: 'entry' | 'exit';
  quantity: number;
  created_at: string;
}

export interface DashboardResponse {
  metrics: DashboardMetrics;
  monthly_movements: MonthlyMovement[];
  low_stock_products: LowStockProduct[];
  recent_movements: RecentMovement[];
}
