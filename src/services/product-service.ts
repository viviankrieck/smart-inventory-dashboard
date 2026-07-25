import { useApi } from 'src/composables/api';

export default function useProductService() {
  const { list, find, update, create, remove } = useApi('products');

  return {
    list,
    find,
    update,
    create,
    remove,
  };
}
