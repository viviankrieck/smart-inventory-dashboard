import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';

export function useDependencies() {
  const q = useQuasar();
  const router = useRouter();
  const route = useRoute();

  return {
    q,
    router,
    route,
  };
}
