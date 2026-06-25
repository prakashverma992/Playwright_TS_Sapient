import { checkoutUser, users } from '../../testData/users';
import { test } from '../fixtures/pageObjectManager';

test.describe('Sauce Demo Checkout Tests', () => {
    test.beforeEach(async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');
        await homeLoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify user can complete purchase successfully', async ({ productPage, cartPage, checkoutPage }) => {
        const productName = 'Sauce Labs Backpack';

        await productPage.addProductToCart(productName);
        await productPage.verifyCartBadgeCount(1);

        await productPage.openCart();

        await cartPage.verifyCartPageDisplayed();
        await cartPage.verifyProductAvailableInCart(productName);

        await cartPage.clickCheckout();

        await checkoutPage.verifyCheckoutInformationPageDisplayed();

        await checkoutPage.enterCheckoutInformation(
            checkoutUser.firstName,
            checkoutUser.lastName,
            checkoutUser.postalCode
        );

        await checkoutPage.clickContinue();

        await checkoutPage.verifyCheckoutOverviewPageDisplayed();

        await checkoutPage.clickFinish();

        await checkoutPage.verifyOrderCompletedSuccessfully();
    });

    test('Verify user can complete purchase with multiple products', async ({ productPage, cartPage, checkoutPage }) => {
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

        await checkoutPage.clickFinish();
        await checkoutPage.verifyOrderCompletedSuccessfully();
    });
});