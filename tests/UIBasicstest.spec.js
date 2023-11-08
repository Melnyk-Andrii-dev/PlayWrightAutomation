const {test, expect} = require('@playwright/test');

test('@Web Browser Context Playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    page.route("**/*.{jpg,png,jpeg}", route => route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a")
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("#username").type("xxx");
    await page.locator("[type='password']").type("xxx");
    await page.locator("#signInBtn").click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect')
    await userName.fill("")
    await userName.fill("xxx")
    await signIn.click();
    console.log(await cardTitlesfirst().textContent())
    console.log(await cardTitles.nth(1).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
});

test('@Web UI Controls', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a")
    const documentLink = page.locator("[href*='documents-request']")

    await page.locator("#username").type("xxx");
    await page.locator("#signInBtn").click();
    const dropdown = page.locator("select.form-control")
    await dropdown.selectOption("consult");

    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()
    console.log(await page.locator(".radiotextsty").last().isChecked())
    await expect(page.locator(".radiotextsty").last()).toBeChecked()

    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    // await page.pause()


});

test("Child windows handl", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
    ])
   const text = await newPage.locator(".impara, .red").textContent()
   const arraytext = text.split("@")
   const domain = arraytext[1].split(" ")[0]
   console.log(domain)
   await page.locator("#username").type(domain)
   console.log(await page.locator("#username").textContent())

});
