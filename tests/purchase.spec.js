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
  await page.waitForTimeout(1000);

  // Step 2: Add products to cart
  for (const product of data.productsToBuy) {
    await products.addProductToCart(product);
    await page.waitForTimeout(800);
  }

  // Step 3: Go to cart
  await products.goToCart();
  await page.waitForTimeout(1000);

  // Step 4: Verify products in cart
  for (const product of data.productsToBuy) {
    const exists = await cart.verifyProductInCart(product);
    expect(exists).toBe(true);
  }

  // Step 5: Proceed to checkout
  await cart.proceedToCheckout();
  await page.waitForTimeout(1000);

  // Step 6: Fill checkout info
  await checkout.fillCheckoutInfo(
    data.checkoutInfo.firstName,
    data.checkoutInfo.lastName,
    data.checkoutInfo.postalCode
  );
  await page.waitForTimeout(800);

  // Step 7: Finish checkout
  await checkout.finishCheckout();
  await page.waitForTimeout(1000);

  // Step 8: Verify completion
  const message = await checkout.getCompletionMessage();
  expect(message.toUpperCase()).toContain("THANK YOU FOR YOUR ORDER");

  // Step 9: Back to Home
  await checkout.clickBackHome();
  await page.waitForTimeout(1000);
});
