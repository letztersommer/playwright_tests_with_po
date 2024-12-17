import { LoginPage } from './Login.page';
import { InventoryPage } from './Inventory.page';
import { ShoppingCartPage } from './ShoppingCart.page';
import { BaseSwagLabPage } from './BaseSwagLab.page';
import { CheckoutStepOne } from './CheckoutStepOne';
import { CheckoutStepTwo } from './CheckoutStepTwo';

/**
 * Represents a Playwright page.
 */
class Page {
    /**
     * Creates an instance of PlaywrightPage.
     * @param {import("playwright-core").Page} page - The Playwright page instance.
     */
    constructor(page) {
        this.page = page;
    }
}

/**
 * Represents the application under test.
 * @extends Page
 */
export class Application extends Page {
    /**
     * @type {LoginPage}
     */
    login = new LoginPage(this.page);

    /**
     * @type {InventoryPage}
     */
    inventory = new InventoryPage(this.page);

    /**
     * @type {ShoppingCartPage}
     */
    shoppingCart = new ShoppingCartPage(this.page);

    /**
     * @type {BaseSwagLabPage}
     */
    baseSwagLab = new BaseSwagLabPage(this.page);

    /**
     * @type {CheckoutStepOne}
     */
    CheckoutStepOne = new CheckoutStepOne(this.page);

    /**
     * @type {CheckoutStepTwo}
     */
    CheckoutStepTwo = new CheckoutStepTwo(this.page);
}
