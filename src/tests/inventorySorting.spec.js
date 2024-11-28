import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

test.describe('Perform and verify sorting on the Inventory page', () => {
    test('Sorting products name A-Z', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);

        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();

        await app.inventory.sortProductNameAZ();
        const productNamesAfterSortAZ = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesAZ = [...productNamesBeforeSort].sort();
        expect(sortedNamesAZ).toEqual(productNamesAfterSortAZ);
    });
    test('Sorting products name Z-A', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);

        const productNamesBeforeSort = await app.inventory.inventoryItems.allTextContents();

        await app.inventory.sortProductNameZA();
        const productNamesAfterSortZA = await app.inventory.inventoryItems.allTextContents();
        const sortedNamesZA = [...productNamesBeforeSort].sort().reverse();
        expect(sortedNamesZA).toEqual(productNamesAfterSortZA);
    });
    test('Sorting products prices Low - High', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);

        const productPriceBeforeSort = await app.inventory.inventoryItemsPrice.allTextContents();
        
        await app.inventory.sortProductPriceLoHi();
        const productPriceAfterSortLoHi = await app.inventory.inventoryItemsPrice.allTextContents();
        const cleanedProductPriceAfterSortLoHi = productPriceAfterSortLoHi.map(price => parseFloat(price.replace(/\$/g, '')));
        const sortedPricesLoHi = [...productPriceBeforeSort].map(price => parseFloat(price.replace(/\$/g, ''))).sort((a, b) => a - b);
        expect(sortedPricesLoHi).toEqual(cleanedProductPriceAfterSortLoHi);
    });
    test('Sorting products prices High - Low', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        await app.login.navigate();
        await app.login.performLogin('standard_user', 'secret_sauce');

        expect(await app.inventory.inventoryItems.count()).toBeGreaterThanOrEqual(1);

        const productPriceBeforeSort = await app.inventory.inventoryItemsPrice.allTextContents();
        
        await app.inventory.sortProductPriceHiLo();
        const productPriceAfterSortHiLo = await app.inventory.inventoryItemsPrice.allTextContents();
        const cleanedProductPriceAfterSortHiLo = productPriceAfterSortHiLo.map(price => parseFloat(price.replace(/\$/g, '')));
        const sortedPricesHiLo = [...productPriceBeforeSort].map(price => parseFloat(price.replace(/\$/g, ''))).sort((a, b) => b - a);
        expect(sortedPricesHiLo).toEqual(cleanedProductPriceAfterSortHiLo);
    });
});
