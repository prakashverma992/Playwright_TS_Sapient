import { users } from '../../testData/users';
import { SORT_OPTIONS } from '../../utils/global.constants';
import { test } from '../fixtures/pageObjectManager';

test.describe('Sauce Demo Product Sorting Tests', () => {
    test.beforeEach(async ({ homeLoginPage }) => {
        await homeLoginPage.navigateTo('/');
        await homeLoginPage.login(
            users.standardUser.username,
            users.standardUser.password
        );
    });

    test('Verify products are sorted by Name A to Z', async ({ productPage }) => {
        await productPage.sortProductsBy(SORT_OPTIONS.NAME_A_TO_Z);
        await productPage.verifyProductsSortedByNameAscending();
    });

    test('Verify products are sorted by Name Z to A', async ({ productPage }) => {
        await productPage.sortProductsBy(SORT_OPTIONS.NAME_Z_TO_A);
        await productPage.verifyProductsSortedByNameDescending();
    });

    test('Verify products are sorted by Price Low to High', async ({ productPage }) => {
        await productPage.sortProductsBy(SORT_OPTIONS.PRICE_LOW_TO_HIGH);
        await productPage.verifyProductsSortedByPriceLowToHigh();
    });

    test('Verify products are sorted by Price High to Low', async ({ productPage }) => {
        await productPage.sortProductsBy(SORT_OPTIONS.PRICE_HIGH_TO_LOW);
        await productPage.verifyProductsSortedByPriceHighToLow();
    });
});