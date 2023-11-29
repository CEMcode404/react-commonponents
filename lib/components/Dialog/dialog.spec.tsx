import { test, expect } from "@playwright/experimental-ct-react";
import { Dialog } from "./Dialog";
import { Locator } from "playwright-core";

test.describe("dialog", () => {
  const sampleNode = "random text";
  test.describe("component test", () => {
    test("'isOpen = false' dialog should be hidden", async ({ mount }) => {
      const dialog = await mount(<Dialog isOpen={false}>{sampleNode}</Dialog>);

      await expect(dialog).toBeHidden();
    });

    test("'isOpen = true' dialog should be visible", async ({ mount }) => {
      const dialog = await mount(<Dialog isOpen>{sampleNode}</Dialog>);

      await expect(dialog).toBeVisible();
    });

    test("passed chiid node/s should show", async ({ mount }) => {
      const dialog = await mount(<Dialog isOpen>{sampleNode}</Dialog>);

      await expect(dialog).toContainText(sampleNode);
    });
  });

  test.describe("demo page test", () => {
    let dialog: Locator;
    test.beforeEach(async ({ page }) => {
      dialog = page.getByRole("dialog");

      await page.goto("/dialog");
    });

    test("'Open Dialog' button should open dialog", async ({ page }) => {
      await page.getByRole("button", { name: "Open Dialog" }).click();

      await expect(dialog).toBeVisible();
    });

    test("backdropClickCallBack should trigger and close dialog", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Open Dialog" }).click();
      await page.locator("#root").click({ position: { x: 5, y: 5 } });

      await expect(dialog).toBeHidden();
    });
  });
});
