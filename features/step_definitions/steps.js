const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

  const loginPage = this.poManager.getLoginPage()
  await loginPage.goTo()
  await loginPage.validLogin(username, password)
  this.username = username;
});

When('Add {string} to Cart', async function (productName) {
  this.dashBoardPage = this.poManager.getDashboardPage()
  await this.dashBoardPage.searchProductAddCart(productName)
  await this.dashBoardPage.navigateToCart();
});

Then('Verify {string} is present in the Cart', async function (productName) {
  await this.page.locator("div li").first().waitFor();
  const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
  expect(bool).toBeTruthy()
  await this.page.locator("text=Checkout").click()
});

When('Enter valid details and Place the Order', async function () {
  await this.page.locator("[placeholder*='Country']").type("ind", { delay: 100 })
  const dropdown = this.page.locator(".ta-results")
  await dropdown.waitFor()
  const optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break
    }
  }

  await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(this.username)
  await this.page.locator(".action__submit").click()
  await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
  this.orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  console.log(this.orderId)
});

Then('Verify order is present in the OrderHistory', async function () {
  await this.page.locator("button[routerlink*='myorders']").click()
  await this.page.locator("tbody").waitFor()

  const rows = await this.page.locator("tbody tr")
  await console.log(await rows.count())
  for (let i = 0; i < await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent()
    if (this.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click()
      break
    }
  }
  const orderIdDetails = await this.page.locator(".col-text").textContent()
  await expect(this.orderId.includes(orderIdDetails)).toBeTruthy()
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await this.page.locator("#username").type(username);
  await this.page.locator("[type='password']").type(password);
  await this.page.locator("#signInBtn").click();
});

Then('Verify Error message is displayed', async function () {
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect')
});

