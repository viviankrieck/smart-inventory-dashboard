import { dashboardMock } from 'src/mocks/dashboard';
import { delay } from 'src/utils/delay';

export async function getDashboardData() {
  await delay(1000);

  return dashboardMock;
}
