import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.beforeEach(async (
    /** @type {{ app: import('../pages/Application').Application }} */{ app },
) => {
    await app.login.navigate();
    await app.login.performLogin('standard_user', 'secret_sauce');

    expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);
});

test.describe('Perform and verify sorting on the Inventory page', () => {
    test('Sorting products name A-Z', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();

        await app.inventory.sortProductNameAZ();
        const productNamesAfterSortAZ = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesAZ = [...productNamesBeforeSort].sort();
        expect(productNamesAfterSortAZ).toEqual(sortedNamesAZ);
    });
    test('Sorting products name Z-A', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();

        await app.inventory.sortProductNameZA();
        const productNamesAfterSortZA = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesZA = [...productNamesBeforeSort].sort().reverse();
        expect(productNamesAfterSortZA).toEqual(sortedNamesZA);
    });
    test('Sorting products prices Low - High', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const productPriceBeforeSort = await app.inventory.inventoryItemsPrice.allTextContents();

        await app.inventory.sortProductPriceLoHi();

        const cleanedProductPrice = await app.inventory.cleanProductPrice();

        const sortedPrices = [...productPriceBeforeSort].map(price => parseFloat(price.replace(/\$/g, ''))).sort((a, b) => a - b);
        expect(cleanedProductPrice).toEqual(sortedPrices);
    });
    test('Sorting products prices High - Low', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const productPriceBeforeSort = await app.inventory.inventoryItemsPrice.allTextContents();

        await app.inventory.sortProductPriceHiLo();

        const cleanedProductPrice = await app.inventory.cleanProductPrice();

        const sortedPrices = [...productPriceBeforeSort].map(price => parseFloat(price.replace(/\$/g, ''))).sort((a, b) => b - a);
        expect(cleanedProductPrice).toEqual(sortedPrices);
    });
});
