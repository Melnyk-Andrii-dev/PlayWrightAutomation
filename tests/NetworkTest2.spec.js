const { test, expect } = require('@playwright/test');

test('Security test request intercept', async ({ page }) => {

    const email = "xxx";
    const productName = "zara coat 3"
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill(email)
    await page.locator("#userPassword").fill("xxx")
    await page.locator("[value='Login']").click()
    await page.waitForLoadState('networkidle')
    const titles = await page.locator(".card-body b").allTextContents();
    await page.locator("button[routerlink*='myorders']").click()

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})