import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(app: string): Promise<void> {
    // Use a role-based locator with a regular expression to match the button's name
    const appButton = this.page.locator('button:has-text("Web Application")').first();
    await appButton.click();
    await this.page.waitForLoadState('networkidle');
  }
  
  // Verify a task is present in a given column, along with its tags
  async verifyTaskInColumn(column: string, task: string, tags: string[]): Promise<void> {
    const columnHeading = this.page.locator(`h2:has-text("${column}")`);
    await expect(columnHeading).toBeVisible({ timeout: 10000 });
  
    // Locate the column container to ensure the task is within the correct column
    const columnContainer = columnHeading.locator('..');
    // Locate the task card
    const taskCard = columnContainer.locator('*', { hasText: task }).first();
    await expect(taskCard).toBeVisible({ timeout: 10000 });
    
    // Verify the task has the expected tags
    for (const tag of tags) {
      const tagLocator = taskCard.locator('span.px-2.py-1.rounded-full.text-xs.font-medium.bg-blue-100.text-blue-800');
      const tagCount = await tagLocator.count();
      if (tagCount === 0) {
        throw new Error(`Tag "${tag}" not found in task "${task}". Inspect the UI structure.`);
      }
      await expect(tagLocator).toBeVisible();
    }
  }
}
