const {test, expect} = require('@playwright/test');

test('Browser context Playwright Test', async ({browser},testInfo)=>
{
 // ✅ Add Jira Test Case ID
  testInfo.annotations.push({
    type: 'jira',
    description: 'CI-8000'
  });

const context = await browser.newContext();
const page =await context.newPage();
  await page.goto('https://t4c-gravity-test.t4c.dedalus.com/auth/realms/T4C/protocol/openid-connect/auth?client_id=T4C&redirect_uri=https%3A%2F%2Fportal-t4c-gravity-test.t4c.dedalus.com%2Fcohort&response_type=code&grant_types=code&scope=openid&ui_locales=en-GB&nonce=aInmoBbZTK8oqZemHx7DnUAIOMvnAJoPNGJpzgjtzE62MWoooee0MYcKC6A9NPiI2ShUHA50GA2Cwyghlv6J9chWx54EbMPE&state=gpJIdFdHHhoQ07SC1I167Dqu9Q4TF6qbUxLkuWc7QOieNHRYTitAyCYzuyYcvjzhbmcggTEmNkYN6ylyn3IcXJZHSW9DvguS&code_challenge=x4MPcRHRC0XpSY663JDJMNfIDScWiZUHWgboFBWn6-w&code_challenge_method=S256');
  await page.getByRole('textbox', { name: 'Username or email' }).click();
  await page.getByRole('textbox', { name: 'Username or email' }).fill('abhishekvats_researcher');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('qK@9bUgnhLyu');
  await page.getByRole('button', { name: 'Sign In' }).click();
  //await page.waitForTimeout(30000);
  await page.getByLabel('Home').locator('a').click();
  await page.getByLabel('project.labels.title.myResearches').locator('a').click();
  await page.getByLabel('Cohort Builder').locator('a').click();
  await page.getByLabel('project.labels.title.myResearches').locator('a').click();
  await page.waitForTimeout(10000);
  await page.getByLabel('Cohort Builder').click();
  //await page.getByText('Procedure').waitFor({ state: 'visible' });
  await page.getByText('Procedure', { exact: true }).click();

const source = page.getByText('Procedure', { exact: true });
const target = page.getByText('Drag and Drop Criteria Here');

// Get positions
const sourceBox = await source.boundingBox();
const targetBox = await target.boundingBox();

if (!sourceBox || !targetBox) {
  throw new Error('Source or target not visible');
}

// Perform drag
await page.mouse.move(
  sourceBox.x + sourceBox.width / 2,
  sourceBox.y + sourceBox.height / 2
);
await page.mouse.down();

await page.mouse.move(
  targetBox.x + targetBox.width / 2,
  targetBox.y + targetBox.height / 2,
  { steps: 10 } // smoother movement
);

await page.mouse.up();

await page.locator('.p-element.p-0').click();
  await page.getByRole('spinbutton', { name: 'Min' }).first().click();
  await page.getByRole('spinbutton', { name: 'Min' }).first().fill('10');
  await page.getByRole('spinbutton', { name: 'Max' }).first().click();
  await page.getByRole('spinbutton', { name: 'Max' }).first().fill('95');

  await page.getByRole('combobox', { name: 'From' }).click();
  await page.getByRole('button', { name: 'Choose Year' }).click();
  await page.getByText('2025').click();
  await page.getByText('Jan').click();
  await page.getByText('1', { exact: true }).first().click();
  await page.getByRole('combobox', { name: 'To' }).click();
  await page.getByRole('button', { name: 'Choose Year' }).click();
  await page.getByText('2026').click();
  await page.getByText('Mar').click();
  await page.getByText('25', { exact: true }).click();
  //await page.locator('span').filter({ hasText: /^25$/ }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  //await page.locator('div').filter({ hasText: 'Save' }).nth(2).click();
  //await page.locator('.p-ripple.p-element.ng-tns-c4042076560-17').click();
  await page.getByRole('button', { name: 'View Query' }).click();
  await expect(page.getByText('NLP: ON')).toBeVisible();
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Launch query' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('textbox', { name: 'Cohort name' }).click();
  await page.getByRole('textbox', { name: 'Cohort name' }).fill('Abhishek_TestPW_1');
  await page.getByRole('button', { name: 'Save & Submit' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('A');
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('B');
  await page.waitForTimeout(10000);
  //await page.getByRole('button', { name: 'Send for approval' }).click();
  //await page.getByRole('button', { name: 'Send', exact: true }).click();
});