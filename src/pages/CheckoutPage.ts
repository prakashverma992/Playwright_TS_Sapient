import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly cancelButton: Locator;
    private readonly checkoutTitle: Locator;
    private readonly orderCompleteHeader: Locator;
    private readonly orderCompleteText: Locator;
    private readonly summaryTotalLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.checkoutTitle = page.locator('.title');
        this.orderCompleteHeader = page.locator('.complete-header');
        this.orderCompleteText = page.locator('.complete-text');
        this.summaryTotalLabel = page.locator('.summary_total_label');
    }

    async verifyCheckoutInformationPageDisplayed(): Promise<void> {
        await expect(this.checkoutTitle).toHaveText('Checkout: Your Information');
    }

    async enterCheckoutInformation(
        firstName: string,
        lastName: string,
        postalCode: string
    ): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async verifyCheckoutOverviewPageDisplayed(): Promise<void> {
        await expect(this.checkoutTitle).toHaveText('Checkout: Overview');
        await expect(this.summaryTotalLabel).toBeVisible();
    }

    async clickFinish(): Promise<void> {
        await this.finishButton.click();
    }

    async verifyOrderCompletedSuccessfully(): Promise<void> {
        await expect(this.checkoutTitle).toHaveText('Checkout: Complete!');
        await expect(this.orderCompleteHeader).toHaveText('Thank you for your order!');
        await expect(this.orderCompleteText).toBeVisible();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }
}