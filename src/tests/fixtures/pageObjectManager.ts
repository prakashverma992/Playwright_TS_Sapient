import { test as base } from '@playwright/test';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { HomeLoginPage } from '../../pages/HomeLoginPage';
import { ProductsPage } from '../../pages/ProductsPage';

type pageObjects = {
    homeLoginPage: HomeLoginPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    productPage: ProductsPage;
}

export const test = base.extend<pageObjects>({
    homeLoginPage: async ({ page }, use) => {
        const loginPage = new HomeLoginPage(page);
        use(loginPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        use(checkoutPage);
    },

    productPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        use(productsPage);
    },

});

export const expect = test.expect;