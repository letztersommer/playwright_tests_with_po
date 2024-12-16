import { test } from '@playwright/test';
import { getRandomProducts } from '../utils/getRandomElements';
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { randomIntFromInterval } from '../utils/randomIntFromInterval';

export class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    headerTitle = this.page.locator('.title');

    inventoryItems = this.page.locator('.inventory_item');

    addItemToCartButton = this.page.locator('[id^="add-to-cart"]');

    sortProductButton = this.page.getByTestId('product-sort-container');

    inventoryItemsPrice = this.page.getByTestId('inventory-item-price');

    async addItemToCartById(id) {
        await this.addItemToCartButton.nth(id).click();
    }

    async sortProductNameAZ() {
        await this.sortProductButton.selectOption('az');
    }

    async sortProductNameZA() {
        await this.sortProductButton.selectOption('za');
    }

    async sortProductPriceLoHi() {
        await this.sortProductButton.selectOption('lohi');
    }

    async sortProductPriceHiLo() {
        await this.sortProductButton.selectOption('hilo');
    }

    async addRandomProductsToCart() {
        const allProductsCount = await this.inventoryItems.count();
        const randomInt = randomIntFromInterval(1, allProductsCount);

        this.randomInt = randomInt;

        const allProducts = await this.inventoryItems.all();
        const randomElements = await getRandomProducts(allProducts, randomInt);

        const products = [];

        for (const product of randomElements) {
        const name = await product.getByTestId('inventory-item-name').textContent();
        const description = await product.getByTestId('inventory-item-desc').textContent();
        const price = await product.getByTestId('inventory-item-price').textContent();

        products.push({ name, description, price });

        await product.locator('[id^="add-to-cart"]').click();

        }
        // console.log(products);
        await test.info().attach('Added random products', { contentType: 'application/json', body: JSON.stringify(products, null, 2), });

        return products;
    }
}
