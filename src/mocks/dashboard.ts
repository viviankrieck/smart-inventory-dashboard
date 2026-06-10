import type { DashboardResponse } from 'src/interfaces/dashboard';

export const dashboardMock: DashboardResponse = {
  metrics: {
    total_products: 248,
    total_categories: 18,
    inventory_value: 157850.75,
    low_stock_products: 7,
  },

  monthly_movements: [
    {
      month: 'Jan',
      entries: 120,
      exits: 95,
    },
    {
      month: 'Fev',
      entries: 140,
      exits: 110,
    },
    {
      month: 'Mar',
      entries: 175,
      exits: 145,
    },
    {
      month: 'Abr',
      entries: 190,
      exits: 160,
    },
    {
      month: 'Mai',
      entries: 210,
      exits: 185,
    },
    {
      month: 'Jun',
      entries: 230,
      exits: 205,
    },
  ],

  low_stock_products: [
    {
      id: 1,
      name: 'Mouse Logitech M170',
      sku: 'MOU-001',
      quantity: 3,
      minimum_quantity: 10,
    },
    {
      id: 2,
      name: 'Teclado Mecânico Redragon',
      sku: 'TEC-002',
      quantity: 2,
      minimum_quantity: 8,
    },
    {
      id: 3,
      name: 'Monitor LG 24"',
      sku: 'MON-003',
      quantity: 1,
      minimum_quantity: 5,
    },
  ],

  recent_movements: [
    {
      id: 1,
      product_name: 'Mouse Logitech M170',
      type: 'entry',
      quantity: 50,
      created_at: '2026-06-09 09:15',
    },
    {
      id: 2,
      product_name: 'Monitor LG 24"',
      type: 'exit',
      quantity: 3,
      created_at: '2026-06-09 10:20',
    },
    {
      id: 3,
      product_name: 'Notebook Dell Inspiron',
      type: 'exit',
      quantity: 1,
      created_at: '2026-06-09 11:05',
    },
  ],
};
