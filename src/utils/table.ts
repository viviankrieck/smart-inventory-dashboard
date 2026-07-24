import type { ColumnI } from 'src/interfaces/table';

/**
 *
 * @param name
 * @param options Partial<ColumnI> containing column options
 * @returns ColumnI object with default values applied
 * @example options = {
 *  label: 'name',
 *  field: 'name',
 *  sortable: true,
 *  required: true,
 *  format: (val) => val.toUpperCase(),
 *  style: 'color: red;',
 *  classes: 'text-bold',
 *  align: 'center'
 * }
 */
export function column(name: string, options?: Partial<ColumnI>): ColumnI {
  return {
    name,
    label: options?.label || name,
    field: options?.field || name,
    sortable: options?.sortable || false,
    required: options?.required || false,
    format: options?.format || ((val) => String(val)),
    style: options?.style || '',
    classes: options?.classes || '',
    align: options?.align || 'left',
  };
}
