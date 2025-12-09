exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutButton = page.locator('#checkout');
    this.cartItems = page.locator('.cart_item .inventory_item_name');
  }

  async verifyProductInCart(productName) {
    await this.cartItems.first().waitFor({ state: 'visible' });
    const items = await this.cartItems.allInnerTexts();
    return items.includes(productName);
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
