import { checkoutUser, users } from '../../testData/users';
import { SORT_OPTIONS } from '../../utils/global.constants';
import { expect, test } from '../fixtures/pageObjectManager';

test.describe('Sauce Demo Cart Tests', () => {

    test.beforeEach(async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');
        await homeLoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify the login functionality of Sauce Demo', async ({ productPage }) => {
        await productPage.verifyProductsPageDisplayed();
        await productPage.takeScreenshot('Successful_Login');
    });

    test('Verify user can add multiple items from cart', async ({ cartPage, productPage, homeLoginPage }) => {
        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.addProductToCart('Sauce Labs Bike Light');
        await productPage.verifyCartBadgeCount(2);

        await productPage.openCart();

        await cartPage.verifyProductAvailableInCart('Sauce Labs Backpack');
        await cartPage.verifyProductAvailableInCart('Sauce Labs Bike Light');
        await cartPage.verifyCartItemCount(2);

        await homeLoginPage.logout();
    });

    test('Verify user can remove item from cart', async ({ cartPage, productPage, homeLoginPage }) => {
        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.addProductToCart('Sauce Labs Bike Light');
        await productPage.verifyCartBadgeCount(2);

        await productPage.openCart();

        await cartPage.verifyProductAvailableInCart('Sauce Labs Backpack');
        await cartPage.verifyProductAvailableInCart('Sauce Labs Bike Light');

        await cartPage.removeProductFromCart('Sauce Labs Backpack');
        await cartPage.verifyProductRemovedFromCart('Sauce Labs Backpack');

        await cartPage.verifyProductAvailableInCart('Sauce Labs Bike Light');
        await cartPage.verifyCartItemCount(1);

        await homeLoginPage.logout();
    });

    test('Verify products are sorted by Price Low to High', async ({ productPage, homeLoginPage }) => {
        await productPage.sortProductsBy(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
        await productPage.takeScreenshot('products_sorted_by_price_low_to_high');
        await productPage.verifyProductsSortedByPriceLowToHigh();
        await homeLoginPage.logout();
    });

    test('Verify user can complete purchase with multiple products', async ({ productPage, cartPage, checkoutPage, homeLoginPage }) => {
        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.addProductToCart('Sauce Labs Bike Light');

        await productPage.verifyCartBadgeCount(2);

        await productPage.openCart();

        await cartPage.verifyProductAvailableInCart('Sauce Labs Backpack');
        await cartPage.verifyProductAvailableInCart('Sauce Labs Bike Light');

        await cartPage.clickCheckout();

        await checkoutPage.enterCheckoutInformation(
            checkoutUser.firstName,
            checkoutUser.lastName,
            checkoutUser.postalCode
        );

        await checkoutPage.clickContinue();
        await checkoutPage.verifyCheckoutOverviewPageDisplayed();

        // Verify Order Summary Calculations
        const itemTotalText = await checkoutPage.itemPrice.innerText();
        const taxText = await checkoutPage.taxPrice.innerText();
        const totalText = await checkoutPage.totalPrice.innerText();

        const itemTotal = parseFloat(itemTotalText.replace(/[^0-9.]/g, ''));
        const tax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
        const actualTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

        const expectedTotal = itemTotal + tax;

        expect(actualTotal).toBe(expectedTotal);
        await expect(checkoutPage.totalPrice).toBeVisible();

        await checkoutPage.clickFinish();
        await checkoutPage.verifyOrderCompletedSuccessfully();
        await homeLoginPage.logout();
    });

});