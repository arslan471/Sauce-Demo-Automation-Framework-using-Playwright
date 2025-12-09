exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.productTitles = page.locator('.inventory_item_name');
  }

  // Add a specific product by its exact name
  async addProductToCart(productName) {
    const button = this.page.locator(`.inventory_item:has-text("${productName}") button`);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getProducts() {
    return await this.productTitles.allInnerTexts();

  }
}
