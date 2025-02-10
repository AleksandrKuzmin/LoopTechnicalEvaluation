import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import loginTestData from '../data/loginTestData.json';
import testCases from '../data/testCases.json';

test.describe('Task Board Verification', () => {
  // Find valid login credentials
  const validLogin = loginTestData.find((data) => data.scenario === 'Valid Login');
  if (!validLogin) throw new Error('Valid Login data not found');

  const { email, password } = validLogin;

  for (const tc of testCases) {
    test(tc.scenario, async ({ page }) => {
      // Step 1: Login
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(email, password);
      await expect(loginPage.getLoginSuccessIndicator()).toBeVisible({ timeout: 10000 });

      // Step 2: Navigate & Verify Task
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.navigateTo(tc.app);
      await dashboardPage.verifyTaskInColumn(tc.column, tc.task, tc.tags);
    });
  }
});
