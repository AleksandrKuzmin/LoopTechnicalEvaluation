// pages/loginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Sign in' });
  }

  async navigate(): Promise<void> {
    // Navigate to the demo app URL.
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  getLoginSuccessIndicator(): Locator {
    // For example, after a successful login, a "Welcome" text appears.
    // Adjust this locator based on actual application behavior.
    return this.page.getByRole('heading', { name: 'Projects' });
  }

  getErrorMessage(): Locator {
    // Assume that an error message container appears with the class 'error-message'
    return this.page.getByText('Invalid username or password');
  }
}
