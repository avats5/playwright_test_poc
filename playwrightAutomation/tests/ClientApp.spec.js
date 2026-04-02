// Enable TypeScript type-checking in JavaScript file
// This helps detect null issues and type mistakes
// @ts-check 

// Import Playwright test runner and assertion library
import { test, expect } from '@playwright/test';

// Run only this test (others will be skipped)
test('End-to-End Order Flow Test', async ({ page }) => {

  // Test data: user email
  const email = "aakashchaudhary@gmail.com"; 
  
  // Locator for all product cards displayed on homepage
  const products = page.locator(".card-body"); 
  
  // Product we want to purchase
  const productName = "ZARA COAT 3"; 

  // Navigate to login page
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login'); 

  // Fill email field
  await page.locator('#userEmail').fill(email);

  // Fill password field
  await page.locator('#userPassword').fill("A@kki123456");

  // Click login button
  await page.locator('#login').click();

  // Print page title in console (for debugging)
  console.log(await page.title());

  // Validate page title after login
  await expect(page).toHaveTitle("Let's Shop");

  // Wait until first product title becomes visible
  await page.locator(".card-body b").first().waitFor();

  // Get all product names displayed on page
  const allTitile = await page.locator(".card-body b").allTextContents();
  console.log(allTitile);

  // Count number of products
  const count = await products.count();

  // Loop through each product to find the matching one
  for (let i = 0; i < count; i++) {

    // Check if current product name matches desired product
    if (await products.nth(i).locator("b").textContent() === productName) {

      // Click "Add To Cart" button for matched product
      await products.nth(i).locator("text= Add To Cart").click();

      break; // Stop loop after product is found
    }
  }

  // Click cart icon
  await page.locator("[routerlink*='cart']").click();

  // Wait until cart items load
  await page.locator("div li").first().waitFor();

  // Verify product is visible in cart
  const productBool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(productBool).toBeTruthy();

  // Click Checkout button
  await page.locator("text=Checkout").click();

  // Type country name slowly (simulating user typing)
  await page.locator("[placeholder*='Country']").pressSequentially("ind");

  // Wait for country dropdown suggestions
  await page.locator("section.ta-results").waitFor();

  // Get all country options
  const dropdown = page.locator("section.ta-results button");
  const dropdownCount = await dropdown.count();

  // Loop through dropdown options to select India
  for (let i = 0; i < dropdownCount; ++i) {

    const text = await dropdown.nth(i).textContent();
    console.log(text);

    if (text === ' India') {

      // Select India
      dropdown.nth(i).click();
      console.log("India Selected");

      break;
    }
  }

  // Click Place Order button
  await page.locator(".action__submit").click();

  // Validate success message after order
  await expect(page.locator(".hero-primary"))
    .toHaveText(" Thankyou for the order. ");

  // Capture generated Order ID (fallback to empty string if null)
  const orderID = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent() || "";

  console.log("orderID: " + orderID);

  // Navigate to "My Orders" page
  await page.locator("button[routerlink*='myorders']").click();

  // Wait for orders table to load
  await page.locator("tbody").waitFor();

  // Get all rows from orders table
  const allOrderTable = page.locator(".table-bordered .ng-star-inserted");
  const orderCount = await allOrderTable.count();

  console.log(orderCount);

  // Loop through orders to find matching Order ID
  for (let i = 0; i < orderCount; ++i) {

    const actualOrderID = await allOrderTable
      .nth(i)
      .locator("th")
      .textContent() || "";

    console.log(actualOrderID);

    // Check if captured orderID contains this row's order ID
    if (orderID.includes(actualOrderID)) {

      // Click View button for matching order
      await allOrderTable.nth(i).locator(".btn-primary").click();

      break;
    }
  }

  // Wait for order details page to load
  await page.locator(".email-container .email-title").waitFor();

  // Capture order ID from order details page
  const orderidDetails = await page
    .locator(".row .col-text")
    .textContent() || "";

  // Validate that order ID matches original order ID
  expect(orderID.includes(orderidDetails)).toBeTruthy();

  // Pause execution for debugging (opens Playwright Inspector)
  //await page.pause();
});