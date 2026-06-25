import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomeLoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly loginLogo: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.loginLogo = page.locator('.login_logo');
    }

    async verifyLoginPageDisplayed(): Promise<void> {
        await expect(this.loginLogo).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}