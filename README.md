# Playwright Test Automation Project

## Overview
This project is a **Playwright-based test automation framework** designed to automate the login process and verify tasks within different sections of a web application. It follows the **Page Object Model (POM)** for better maintainability and scalability.

## Features
✅ **Page Object Model (POM)** - Separates UI interactions from test logic  
✅ **Data-Driven Testing** - Uses JSON files to define test cases dynamically  
✅ **Dynamic Locators** - Ensures robust element selection  
✅ **Debugging & Error Handling** - Implements logging and visibility checks  

## Project Structure
```
/automation-project
│── /tests                  # Contains test cases for login and task verification
│   ├── login.spec.ts
│   ├── task.spec.ts
│── /pages                  # Stores reusable page objects for different UI components
│   ├── loginPage.ts
│   ├── dashboardPage.ts
│── /data                   # Holds test data for data-driven testing
│   ├── loginTestData.json
│   ├── testCases.json
│── playwright.config.ts    # Configures Playwright settings
│── package.json            # Dependencies and scripts
│── tsconfig.json           # TypeScript configuration
│── README.md               # Documentation (this file)
```

## Installation & Setup

### 1️⃣ Install Dependencies
Make sure you have **Node.js** installed, then run:
```sh
npm install
npx playwright install
```

### 2️⃣ Run Tests
To execute all tests:
```sh
npx playwright test
```
To run a specific test file:
```sh
npx playwright test tests/task.spec.ts
```

### 3️⃣ Debug Mode
If tests are failing, use Playwright's debug mode:
```sh
npx playwright test --debug
```

## Key Files

### 🔹 `loginPage.ts` (Page Object for Login)
Handles login functionality:
```ts
async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
```

### 🔹 `dashboardPage.ts` (Page Object for Tasks)
Verifies tasks inside a specific column:
```ts
async verifyTaskInColumn(column: string, task: string, tags: string[]): Promise<void> {
    const columnHeading = this.page.locator(`h2:has-text("${column}")`);
    await expect(columnHeading).toBeVisible({ timeout: 10000 });
}
```

### 🔹 `testCases.json` (Data-Driven Test Cases)
Stores test scenarios in JSON format:
```json
[
  {
    "scenario": "Verify Implement User Authentication in To Do",
    "app": "Web Application",
    "column": "To Do",
    "task": "Implement user authentication",
    "tags": ["Feature", "High Priority"]
  }
]
```

## Troubleshooting

### ❓ Locators Not Found / Timeouts?
- Use Playwright debug mode: `npx playwright test --debug`
- Print elements found before asserting visibility:
```ts
console.log(await columnContainer.allInnerTexts());
```

### ❓ Errors Due to Strict Mode?
If Playwright finds multiple elements:
```ts
getByText("Web Application", { exact: true }) resolved to 2 elements
```
Fix it by refining the locator:
```ts
await this.page.getByRole("button", { name: /Web Application/i }).click();
```

## Contributing
Feel free to fork this repository and submit pull requests to improve the framework.

## License
This project is licensed under the MIT License.

---

🚀 Happy Testing with Playwright! 🚀
