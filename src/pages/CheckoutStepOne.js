import { BaseSwagLabPage } from './BaseSwagLab.page';

export class CheckoutStepOne extends BaseSwagLabPage {
    url = '/checkout-step-one.html';

    firstNameField = this.page.getByTestId('firstName');

    lastNameField = this.page.getByTestId('lastName');

    zipCodeField = this.page.getByTestId('postalCode');

    continueButton = this.page.getByTestId('continue');

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async fillCheckoutData(firstName, lastName, zipCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
        await this.continueButton.click();
    }
}
