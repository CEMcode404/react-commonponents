import { test, expect } from "@playwright/experimental-ct-react";

test.describe("InView", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("inview");
  });

  test("should trigger and turn the box blue if the target element is out of the root component", async ({
    page,
  }) => {
    const blue = "rgb(0, 0, 255)";
    const box = page.getByTestId("box");
    const scrollHeight = await page
      .locator("#root")
      .evaluate((e) => e.scrollHeight);

    await page.mouse.wheel(0, scrollHeight);

    await expect(box).toHaveCSS("background-color", blue);
  });

  test("should trigger and turn the box red if the target element is inside the root component", async ({
    page,
  }) => {
    const red = "rgb(255, 0, 0)";
    const box = page.getByTestId("box");
    const scrollHeight = await page
      .locator("#root")
      .evaluate((e) => e.scrollHeight);

    await page.mouse.wheel(0, scrollHeight);
    await page.mouse.wheel(0, -scrollHeight);

    await expect(box).toHaveCSS("background-color", red);
  });
});
