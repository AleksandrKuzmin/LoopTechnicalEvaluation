import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginTestData from '../data/loginTestData.json';

test.describe('Login Tests', () => {
  for (const data of loginTestData) {
    test(data.scenario, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(data.email, data.password);

      if (data.expectedOutcome === 'success') {
        await expect(loginPage.getLoginSuccessIndicator()).toBeVisible({ timeout: 5000 });
      } else {
        await expect(loginPage.getErrorMessage()).toBeVisible({ timeout: 5000 });
      }
    });
  }
});
