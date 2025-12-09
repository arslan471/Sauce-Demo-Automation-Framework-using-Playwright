exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = page.locator('.inventory_list');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addProductToCart(productName) {
    const product = this.page.locator('.inventory_item')
      .filter({ hasText: productName });

    const button = product.locator('button');

    await product.waitFor();        // ensure product is visible
    await button.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
};
