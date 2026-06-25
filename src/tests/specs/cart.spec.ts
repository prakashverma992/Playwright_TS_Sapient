import { users } from '../../testData/users';
import { test } from '../fixtures/pageObjectManager';

test.describe('Sauce Demo Cart Tests', () => {
    test.beforeEach(async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');
        await homeLoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify user can add item to cart', async ({ cartPage, productPage }) => {
        const productName = 'Sauce Labs Backpack';

        await productPage.addProductToCart(productName);
        await productPage.verifyCartBadgeCount(1);

        await productPage.openCart();

        await cartPage.verifyCartPageDisplayed();
        await cartPage.verifyProductAvailableInCart(productName);
        await cartPage.verifyCartItemCount(1);
    });

    test('Verify user can remove item from cart', async ({ cartPage, productPage }) => {
        const productName = 'Sauce Labs Backpack';

        await productPage.addProductToCart(productName);
        await productPage.openCart();

        await cartPage.verifyProductAvailableInCart(productName);

        await cartPage.removeProductFromCart(productName);
        await cartPage.verifyProductRemovedFromCart(productName);
        await cartPage.verifyCartItemCount(0);
    });

    test('Verify user can add multiple items to cart', async ({ cartPage, productPage }) => {
        await productPage.addProductToCart('Sauce Labs Backpack');
        await productPage.addProductToCart('Sauce Labs Bike Light');

        await productPage.verifyCartBadgeCount(2);

        await productPage.openCart();

        await cartPage.verifyProductAvailableInCart('Sauce Labs Backpack');
        await cartPage.verifyProductAvailableInCart('Sauce Labs Bike Light');
        await cartPage.verifyCartItemCount(2);
    });
});