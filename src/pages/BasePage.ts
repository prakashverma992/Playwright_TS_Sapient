import { Locator, Page, expect } from '@playwright/test';

export class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async clickElement(locator: Locator): Promise<void> {
        await locator.click();
    }

    async enterText(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async getText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() || '';
    }

    async verifyElementVisible(locator: Locator): Promise<void> {
        await expect(locator).toBeVisible();
    }

    async verifyUrlContains(text: string): Promise<void> {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    async takeScreenshot(text: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${text}.png`, fullPage: true });
    }

    async assertScreenshot(text: string): Promise<void> {
        await expect(this.page).toHaveScreenshot(`screenshots/${text}.png`, { fullPage: true });
    }

}