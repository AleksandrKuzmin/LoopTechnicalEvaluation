import { Page, Locator, expect } from '@playwright/test';

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
    await this.page.goto('https://animated-gingersnap-8cf7f2.netlify.app/', { waitUntil: 'networkidle' });
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  getLoginSuccessIndicator(): Locator {
    return this.page.locator('h1:has-text("Projects")');
  }

  getErrorMessage(): Locator {
    return this.page.getByText('Invalid username or password');
  }
}
