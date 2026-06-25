import { users } from '../../testData/users';
import { test } from '../fixtures/pageObjectManager';

test.describe('Sauce Demo Login Tests', () => {
    test('Verify standard user can login successfully', async ({ homeLoginPage, productPage }) => {
        await homeLoginPage.navigateTo('/');
        await homeLoginPage.verifyLoginPageDisplayed();

        await homeLoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );

        await productPage.verifyProductsPageDisplayed();
    });

    test('Verify locked out user cannot login', async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');

        await homeLoginPage.login(
            users.lockedOutUser.username,
            users.lockedOutUser.password
        );

        await homeLoginPage.verifyLoginErrorMessage(
            'Epic sadface: Sorry, this user has been locked out.'
        );
    });

    test('Verify error message for invalid credentials', async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');

        await homeLoginPage.login(
            users.invalidUser.username,
            users.invalidUser.password
        );

        await homeLoginPage.verifyLoginErrorMessage(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });
});
