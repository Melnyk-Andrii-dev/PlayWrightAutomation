const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils')
const loginPayLoad = { userEmail: "xxx", userPassword: "xxx" }
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6262e990e26b7e1a10e89bfa" }] }
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)


});

test.beforeEach(() => {

});

test('Place the order', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    const email = "xxx";
    const productName = "zara coat 3"
    await page.goto("https://rahulshettyacademy.com/client")

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response - API response->|fake response ->|browser->render data on frontend
            const response = await page.request.fetch(route.request())
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill(
                {
                    response,
                    body,
                })
        })

    await page.locator("button[routerlink*='myorders']").click()

    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());

});