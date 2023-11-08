const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base')
const { POManager } = require('../pageobjects/POManager');
//Json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")))
for (const data of dataset) {

    test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {

        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage()
        await loginPage.goTo()
        await loginPage.validLogin(data.username, data.password)
        const dashBoardPage = poManager.getDashboardPage()
        await dashBoardPage.searchProductAddCart(data.productName)
        await dashBoardPage.navigateToCart();



        await page.locator("div li").first().waitFor();
        const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
        expect(bool).toBeTruthy()
        await page.locator("text=Checkout").click()
        await page.locator("[placeholder*='Country']").type("ind", { delay: 100 })
        const dropdown = page.locator(".ta-results")
        await dropdown.waitFor()
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await dropdown.locator("button").nth(i).click();
                break
            }
        }

        await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username)
        await page.locator(".action__submit").click()
        await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
        console.log(orderId)
        await page.locator("button[routerlink*='myorders']").click()
        await page.locator("tbody").waitFor()

        const rows = await page.locator("tbody tr")
        await console.log(await rows.count())
        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent()
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click()
                break
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent()
        await expect(orderId.includes(orderIdDetails)).toBeTruthy()
    });


}

customtest(`Client App Login`, async ({ page, testDataForOrder }) => {

    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)
    const dashBoardPage = poManager.getDashboardPage()
    await dashBoardPage.searchProductAddCart(testDataForOrder.productName)
    await dashBoardPage.navigateToCart();



    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy()
    await page.locator("text=Checkout").click()
    await page.locator("[placeholder*='Country']").type("ind", { delay: 100 })
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username)
    await page.locator(".action__submit").click()
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
})