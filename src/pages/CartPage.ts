import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private readonly cartTitle: Locator;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page) {
        super(page);
        this.cartTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async verifyCartPageDisplayed(): Promise<void> {
        await expect(this.cartTitle).toHaveText('Your Cart');
    }

    async verifyProductAvailableInCart(productName: string): Promise<void> {
        await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toBeVisible();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = this.page.locator('.cart_item').filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    async verifyProductRemovedFromCart(productName: string): Promise<void> {
        await expect(this.page.locator('.cart_item').filter({ hasText: productName })).toHaveCount(0);
    }

    async verifyCartItemCount(expectedCount: number): Promise<void> {
        await expect(this.cartItems).toHaveCount(expectedCount);
    }

    async clickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async clickContinueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }
}
``