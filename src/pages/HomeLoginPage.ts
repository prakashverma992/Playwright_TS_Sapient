import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomeLoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loginLogo: Locator;
    private readonly menuButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator('#login-button');
        this.loginLogo = page.getByRole('heading', { name: 'Swag Labs' });
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    async verifyLoginPageDisplayed(): Promise<void> {
        await expect(this.loginLogo).toBeVisible();
        await expect(this.loginLogo).toHaveText('Swag Labs');
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

}