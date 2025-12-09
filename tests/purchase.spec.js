const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const data = require('../utils/testData');

test('Full checkout flow on Sauce Demo', async ({ page }) => {
  const login = new LoginPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Step 1: Login
  await login.goto();
  await login.login(data.validUser.username, data.validUser.password);

  // Step 2: Add products to cart
  for (const product of data.productsToBuy) {
    await products.addProductToCart(product);
  }

  // Step 3: Go to cart
  await products.goToCart();

  // Step 4: Verify products in cart
  for (const product of data.productsToBuy) {
    const exists = await cart.verifyProductInCart(product);
    expect(exists).toBe(true);
  }

  // Step 5: Proceed to checkout
  await cart.proceedToCheckout();

  // Step 6: Fill checkout info
  await checkout.fillCheckoutInfo(
    data.checkoutInfo.firstName,
    data.checkoutInfo.lastName,
    data.checkoutInfo.postalCode
  );

  // Step 7: Finish checkout
  await checkout.finishCheckout();

  // Step 8: Verify completion
  const message = await checkout.getCompletionMessage();
  console.log("Completion Message:", message);
  expect(message).toContain("THANK YOU FOR YOUR ORDER");
});
