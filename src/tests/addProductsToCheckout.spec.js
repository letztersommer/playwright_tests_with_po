import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test data/users';
import { getProductNames, getProductDescriptions, getProductPrices } from '../utils/getProductData';
import { cleanedPrices } from '../utils/cleanPrices';
import { countArraySum } from '../utils/countArraySum';

test('Add several random products to the Shopping Cart and verify', async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    let products;

    await test.step('Open login page', async () => {
        await app.login.navigate();
    });

    await test.step('Perform login', async () => {
        const { username, password } = users.standardUser;
        await app.login.performLogin(username, password);

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
    });

    await test.step('Add random products to Cart', async () => {
        products = await app.inventory.addRandomProductsToCart();
    });

    await test.step('Open Shopping Cart page', async () => {
        await app.baseSwagLab.openShoppingCart();
    });

    await test.step('Verify the number of added products', async () => {
        await expect(app.shoppingCart.cartItems).toHaveCount(products.length);
    });

    await test.step('Open Checkout page', async () => {
        await app.shoppingCart.openCheckout();
    });

    await test.step('Fill in the Checkout fields and continue', async () => {
        const { firstName, lastName, zipCode } = users.standardUser;
        await app.CheckoutStepOne.fillCheckoutData(firstName, lastName, zipCode);
    });

    await test.step('Verify Name, Description, Price of added products', async () => {
        await expect(app.CheckoutStepTwo.checkoutProductNames).toHaveText(getProductNames(products));
        await expect(app.CheckoutStepTwo.checkoutProductDescriptions).toHaveText(getProductDescriptions(products));
        await expect(app.CheckoutStepTwo.checkoutProductPrices).toHaveText(getProductPrices(products));
    });

    const productPrices = await app.CheckoutStepTwo.checkoutProductPrices.allTextContents();
    const cleanedProductPrices = cleanedPrices(productPrices);
    const subtotalTotalPrice = countArraySum(...cleanedProductPrices);

    await test.step('Verify calculated Subtotal Price', async () => {
        const productPricesCheckout = await app.CheckoutStepTwo.subtotalPrice.allTextContents();
        const cleanedPricesCheckout = cleanedPrices(productPricesCheckout);

        await expect(cleanedPricesCheckout).toStrictEqual(subtotalTotalPrice);
    });

    await test.step('Verify calculated Total Price', async () => {
        const productTax = await app.CheckoutStepTwo.tax.allTextContents();
        const cleanedTax = cleanedPrices(productTax);
        const totalPrice = [Math.round((cleanedTax[0] + subtotalTotalPrice[0]) * 100) / 100];

        const totalPriceCheckout = await app.CheckoutStepTwo.totalPrice.allTextContents();
        const cleanedTotalPriceCheckout = cleanedPrices(totalPriceCheckout);

        await expect(cleanedTotalPriceCheckout).toStrictEqual(totalPrice);
    });
});
