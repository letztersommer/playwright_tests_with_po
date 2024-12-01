import { BaseSwagLabPage } from './BaseSwagLab.page';

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

    async cleanProductPrice() {
        const productPriceAfterSort = await this.inventoryItemsPrice.allTextContents();
        const cleanedProductPrice = productPriceAfterSort.map(price => parseFloat(price.replace(/\$/g, '')));
        return (cleanedProductPrice);
    }
}
