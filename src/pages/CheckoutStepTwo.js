import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepTwo extends BaseSwagLabPage {
    url = '/checkout-step-two.html';

    cartItems = this.page.getByTestId('inventory-item');

    checkoutProductNames = this.page.getByTestId('inventory-item-name');

    checkoutProductDescriptions = this.page.getByTestId('inventory-item-desc');

    checkoutProductPrices = this.page.getByTestId('inventory-item-price');

    subtotalPrice = this.page.getByTestId('subtotal-label');

    tax = this.page.getByTestId('tax-label');

    totalPrice = this.page.getByTestId('total-label');
}

// count total from received prod (= countPrice)
// check if countPrice = summarySubtotal ('subtotal-label')
// check if summaryTotal = summaryTax + summarySubtotal