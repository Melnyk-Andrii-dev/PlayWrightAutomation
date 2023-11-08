const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils')
const loginPayLoad = {userEmail:"xxx",userPassword:"xxx"}
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
let response;

test.beforeAll(async ()=>{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)
  

});

test.beforeEach(()=>{

});

test('@API Place the order', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    const email = "xxx";
    const productName = "xxx"
     await page.goto("https://rahulshettyacademy.com/client")


    await page.locator("button[routerlink*='myorders']").click()
   await page.locator("tbody").waitFor()
    
    const rows = await page.locator("tbody tr")
    await console.log(await rows.count())
    for(let i=0; i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click()
            break
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent()
    page.pause()
    await expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
});