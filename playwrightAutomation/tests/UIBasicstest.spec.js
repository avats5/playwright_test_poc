const {test, expect} = require('@playwright/test');

test('Browser context Playwright Test', async ({browser},testInfo)=>
{
 // ✅ Add Jira Test Case ID
  testInfo.annotations.push({
    type: 'jira',
    description: 'CI-7489'
  });      
const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/#");
console.log(await page.title());
const userName = page.locator('#username');
const signIn = page.locator('#signInBtn');
const cardTitles = page.locator(".card-body a");
await page.locator('#username').fill("rahulshetty");
await page.locator("[name='password']").fill("Learning@830$3mK2");
await page.locator('#signInBtn').click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText('Incorrect');
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);
})

// test('Page Playwright Test', async ({page})=>
// {
// await page.goto("http://10.244.9.158/#/login");
// await expect(page).toHaveTitle("BI4H");
// })

test('UI Controls',async ({page},testInfo)=>
{
 // ✅ Add Jira Test Case ID
  testInfo.annotations.push({
    type: 'jira',
    description: 'CI-7490'
  });      
await page.goto("https://rahulshettyacademy.com/loginpagePractise/#");
const userName = page.locator('#username');
const signIn = page.locator('#signInBtn');
const dropdown = page.locator('select.form-control');
const documentURL = page.locator("[href*='documents-request']");
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();
await page.locator("#okayBtn").click();
console.log(await page.locator(".radiotextsty").last().isChecked());
await expect(page.locator(".radiotextsty").last()).toBeChecked();
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentURL).toHaveAttribute('class', 'blinkingText');
})

test('Child window handle', async ({browser},testInfo)=>
{
// ✅ Add Jira Test Case ID
  testInfo.annotations.push({
    type: 'jira',
    description: 'CI-7491'
  });      
const context = await browser.newContext();
const page =await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/#");
const documentURL = page.locator("[href*='documents-request']");
const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      documentURL.click(),
])

const text=await newPage.locator(".red").textContent();
const arraytext = text.split("@");
const domain =arraytext[1].split(" ")[0];
console.log(domain);
await page.locator('#username').fill(domain);
console.log(await page.locator('#username').inputValue());

})