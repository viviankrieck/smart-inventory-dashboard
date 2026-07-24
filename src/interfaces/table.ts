export interface ColumnI {
  name: string;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: string | ((row: Record<string, unknown>) => string | number | boolean);
  sortable?: boolean;
  required?: boolean;
  format?: (val: unknown, row: Record<string, unknown>) => string;
  style?: string | ((row: Record<string, unknown>) => string);
  classes?: string | ((row: Record<string, unknown>) => string);
}
