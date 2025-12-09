exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.completeMessage = page.locator('.complete-header');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async finishCheckout() {
    await this.finishButton.click();
    await this.completeMessage.waitFor({ state: 'visible' });
  }

  async getCompletionMessage() {
    return await this.completeMessage.textContent();
  }
}
