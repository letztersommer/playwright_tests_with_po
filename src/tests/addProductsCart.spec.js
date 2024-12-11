import { expect } from '@playwright/test';
import { test } from '../fixtures/base';
import { users } from '../test data/users';
import { getProductNames, getProductDescriptions, getProductPrices } from '../utils/getProductData';

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
   
    await test.step('Verify count of products (Header Badge)', async () => {
    await expect(app.baseSwagLab.shoppingCartBadge).toHaveText(`${app.inventory.randomInt}`);
    });

    await test.step('Open Shopping Cart page', async () => {
    await app.baseSwagLab.openShoppingCart();
    });
    
    await test.step('Verify the number of added products', async () => {
    await expect(app.shoppingCart.cartItems).toHaveCount(app.inventory.randomInt);
    });

    await test.step('Verify Name, Description, Price of added products', async () => {
    await expect(app.shoppingCart.inventoryNames).toHaveText(getProductNames(products));
    await expect(app.shoppingCart.inventoryDescriptions).toHaveText(getProductDescriptions(products));
    await expect(app.shoppingCart.inventoryPrices).toHaveText(getProductPrices(products));
    });

});
