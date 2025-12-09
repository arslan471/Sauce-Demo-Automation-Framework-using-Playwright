exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  async verifyProductInCart(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    return await item.count() > 0;
  }

  async removeProduct(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    const removeButton = item.locator('button'); // automatic remove button
    await removeButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
};
