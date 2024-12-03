import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

const cleanPrices = (prices) => prices.map(price => parseFloat(String(price).replace(/$/g, '')));

const sortPrices = (prices, order) => {
    const cleanedPrices = cleanPrices(prices);
    return order === 'asc' ? cleanedPrices.sort((a, b) => a - b) : cleanedPrices.sort((a, b) => b - a);
};

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
        const cleanedProductPriceBefore = cleanPrices(productPriceBeforeSort);

        await app.inventory.sortProductPriceLoHi();

        const productPriceAfterSortLoHi = await app.inventory.inventoryItemsPrice.allTextContents();
        const cleanedProductPriceAfter = cleanPrices(productPriceAfterSortLoHi);

        const sortedPrices = sortPrices(cleanedProductPriceBefore, 'asc');
        expect(cleanedProductPriceAfter).toEqual(sortedPrices);
    });
    test('Sorting products prices High - Low', async (
        /** @type {{ app: import('../pages/Application').Application }} */{ app },
    ) => {
        const productPriceBeforeSort = await app.inventory.inventoryItemsPrice.allTextContents();
        const cleanedProductPriceBefore = cleanPrices(productPriceBeforeSort);

        await app.inventory.sortProductPriceHiLo();

        const productPriceAfterSortHiLo = await app.inventory.inventoryItemsPrice.allTextContents();
        const cleanedProductPriceAfter = cleanPrices(productPriceAfterSortHiLo);

        const sortedPrices = sortPrices(cleanedProductPriceBefore, 'desc');
        expect(cleanedProductPriceAfter).toEqual(sortedPrices);
    });
});
