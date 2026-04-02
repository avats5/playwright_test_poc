import { test, expect } from "@playwright/test";
import fs from "fs";

test.setTimeout(120000);

/**
 * Normalize SQL to avoid formatting differences
 */
function normalizeSQL(sql) {
  return sql.replace(/\s+/g, " ").trim();
}

/**
 * Load all module configurations
 */
const gridConfig = JSON.parse(
  fs.readFileSync("./config/GridmoduleConfigMap.json", "utf-8")
);

const chartConfig = JSON.parse(
  fs.readFileSync("./config/ChartmoduleConfigMap.json", "utf-8")
);

const filterConfig = JSON.parse(
  fs.readFileSync("./config/FiltermoduleConfigMap.json", "utf-8")
);

// Merge all configs
const moduleConfigMap = {
  ...gridConfig,
  ...chartConfig,
  ...filterConfig
};

// ---------------- LOGIN ----------------
async function login(page) {
  await page.goto("http://10.244.9.158/#/login");

  await expect(page).toHaveTitle("BI4H");

  await page.locator("[name='username']").fill("Aakash");
  await page.locator("[name='password']").fill("123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/home/);
}

// ---------------- PROJECT SELECTION ----------------
async function selectProject(page) {
  const projectName = "bi4h-aakash";

  await page.locator(".title", { hasText: "BI4H - VISUAL" }).click();

  await page.locator(".list-box").filter({ hasText: projectName }).click();
  await expect(page).toHaveURL(new RegExp(projectName));
}

// ---------------- REUSABLE NAVIGATION ----------------
async function navigateDashboard(page, navigation) {
  const { type, category, pageName } = navigation;

  console.log(`🧭 Navigating → ${category} ${pageName || ""}`);

  // Click category (left sidebar specific)
  const categoryLocator = page
    .locator("span")
    .filter({ hasText: category })
    .first();

  await expect(categoryLocator).toBeVisible();
  await categoryLocator.click();

  if (type === "TWO_LEVEL") {
    if (!pageName) {
      throw new Error(`❌ pageName required for TWO_LEVEL navigation`);
    }

    const pageLocator = page
      .locator("span")
      .filter({ hasText: pageName })
      .first();

    await expect(pageLocator).toBeVisible();
    await pageLocator.click();

    await expect(page.locator("body")).toContainText(pageName);
  }

  if (type === "DIRECT") {
    await expect(page.locator("body")).toContainText(category);
  }

  console.log("✅ Navigation successful");
}

// ---------------- OPEN COMPOSER ----------------
async function openComposer(page) {
  await page.locator("//span[text()='Edit']").click();
  await expect(page).toHaveURL(/composer/);

  await page.locator("//span[text()='Pages Composer']").waitFor();
}

// ---------------- CLOSE EDITOR PANEL ----------------
async function closeEditorPanel(page) {
  const closeBtn = page
    .locator("button")
    .filter({ has: page.locator(".fa-times") })
    .last();

  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  } else {
    console.warn("⚠️ Close button not found");
  }
}

// ---------------- VALIDATE MODULE ----------------
async function validateModule(page, config) {
  const { moduleName, sql, json, validateSQL, validateJSON } = config;

  console.log(`\n🔹 Validating module: ${moduleName}`);

  await page
    .locator(".module-item-wrapper")
    .filter({ hasText: moduleName })
    .getByLabel("edit")
    .click();

  const header = page.locator(".edit-header.center-y");
  await expect(header).toBeVisible();

  // ---------------- SQL ----------------
  if (validateSQL && sql) {
    console.log("➡️ Validating SQL");

    const sqlIcon = header.locator(".fa-terminal").first();

    if (await sqlIcon.isVisible()) {
      await sqlIcon.click();

      await page.waitForFunction(() =>
        window.monaco?.editor?.getEditors()?.length > 0
      );

      const actualQuery = await page.evaluate(() => {
        const editors = window.monaco.editor.getEditors();
        return editors[editors.length - 1].getModel().getValue();
      });

      const expectedQuery = fs.readFileSync(
        `./queries/SQLQuery/${sql}`,
        "utf-8"
      );

      expect(normalizeSQL(actualQuery)).toBe(
        normalizeSQL(expectedQuery)
      );

      console.log("✅ SQL matched");

      await closeEditorPanel(page);
    } else {
      throw new Error(`❌ SQL not found for ${moduleName}`);
    }
  }

  // ---------------- JSON ----------------
  if (validateJSON && json) {
    console.log("➡️ Validating JSON");

    const jsonIcon = header.locator(".fa-code").first();

    if (await jsonIcon.isVisible()) {
      await jsonIcon.click();

      await page.waitForFunction(() =>
        window.monaco?.editor?.getEditors()?.length > 0
      );

      const actualJsonText = await page.evaluate(() => {
        const editors = window.monaco.editor.getEditors();
        return editors[editors.length - 1].getModel().getValue();
      });

      const actualJson = JSON.parse(actualJsonText);

      const expectedJson = JSON.parse(
        fs.readFileSync(`./queries/JSONQuery/${json}`, "utf-8")
      );

      expect(actualJson).toEqual(expectedJson);

      console.log("✅ JSON matched");

      await closeEditorPanel(page);
    } else {
      throw new Error(`❌ JSON not found for ${moduleName}`);
    }
  }

  if (!validateSQL && !validateJSON) {
    console.warn(`⚠️ No validation for ${moduleName}`);
  }

  // Close module
  await page.keyboard.press("Escape");
  await expect(header).toBeHidden();
}

// ---------------- TESTS ----------------
test.describe("BI4H Automation", () => {
  test("Login Test", async ({ page }) => {
    await login(page);
  });

  test("Validate Modules (Grid + Chart + Filter)", async ({ page }) => {
    await login(page);
    await selectProject(page);

    for (const [key, config] of Object.entries(moduleConfigMap)) {
      console.log(`\n🚀 Running: ${key}`);

      await navigateDashboard(page, config.navigation);
      await openComposer(page);
      await validateModule(page, config);
    }
  });
});