import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    private readonly pageTitle: Locator;
    private readonly productItems: Locator;
    private readonly cartIcon: Locator;
    private readonly cartBadge: Locator;
    private readonly sortDropdown: Locator;
    private readonly productNames: Locator;
    private readonly productPrices: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('.title');
        this.productItems = page.locator('.inventory_item');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
    }

    async verifyProductsPageDisplayed(): Promise<void> {
        await expect(this.pageTitle).toHaveText('Products');
        await expect(this.productItems.first()).toBeVisible();
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    async removeProductFromProductsPage(productName: string): Promise<void> {
        const product = this.page.locator('.inventory_item').filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    async verifyCartBadgeCount(expectedCount: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }

    async openCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async sortProductsBy(optionValue: string): Promise<void> {
        await this.sortDropdown.selectOption(optionValue);
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allTextContents();

        return prices.map(price => Number(price.replace('$', '').trim()));
    }

    async verifyProductsSortedByNameAscending(): Promise<void> {
        const actualNames = await this.getProductNames();
        const expectedNames = [...actualNames].sort();

        expect(actualNames).toEqual(expectedNames);
    }

    async verifyProductsSortedByNameDescending(): Promise<void> {
        const actualNames = await this.getProductNames();
        const expectedNames = [...actualNames].sort().reverse();

        expect(actualNames).toEqual(expectedNames);
    }

    async verifyProductsSortedByPriceLowToHigh(): Promise<void> {
        const actualPrices = await this.getProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);
    }

    async verifyProductsSortedByPriceHighToLow(): Promise<void> {
        const actualPrices = await this.getProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);

        expect(actualPrices).toEqual(expectedPrices);
    }
}