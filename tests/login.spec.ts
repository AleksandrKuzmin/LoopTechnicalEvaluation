// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import loginTestData from '../data/loginTestData.json';

// Define a type for our test data.
type LoginTestData = {
  scenario: string;
  email: string;
  password: string;
  expectedOutcome: 'success' | 'failure';
};

test.describe('Login Automation Tests', () => {
  // Loop over each test case in the JSON data.
  for (const data of loginTestData as LoginTestData[]) {
    test(data.scenario, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate();
      await loginPage.login(data.email, data.password);

      if (data.expectedOutcome === 'success') {
        // Verify a success indicator appears (e.g., "Welcome" text).
        await expect(loginPage.getLoginSuccessIndicator()).toBeVisible({ timeout: 5000 });
      } else {
        // Verify an error message is shown.
        await expect(loginPage.getErrorMessage()).toBeVisible({ timeout: 5000 });
      }
    });
  }
});
