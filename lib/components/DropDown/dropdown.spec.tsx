import { test, expect } from "@playwright/experimental-ct-react";
import { Dropdown } from "./Dropdown.tsx";

test.describe("Dropdown", () => {
  test.describe("component test", () => {
    test("should render even if there are no child elements", async ({
      mount,
    }) => {
      const dropdown = await mount(<Dropdown></Dropdown>);

      await expect(dropdown).toBeInViewport();
    });

    test("'isHidden = true' should hide the content", async ({ mount }) => {
      const dropdown = await mount(
        <Dropdown isHidden>
          <p data-testid="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
            vitae.
          </p>
        </Dropdown>
      );
      const content = dropdown.getByTestId("content");

      await expect(content).not.toBeInViewport();
    });

    test("'isHidden = false' should show the content", async ({ mount }) => {
      const dropdown = await mount(
        <Dropdown isHidden={false}>
          <p data-testid="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,s
            vitae.
          </p>
        </Dropdown>
      );
      const content = dropdown.getByTestId("content");

      await expect(content).toBeInViewport();
    });

    test("height must never be less than minimum height", async ({ mount }) => {
      const dropwdown = await mount(
        <Dropdown minHeight="200px" isHidden={false}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,s
            vitae.
          </p>
        </Dropdown>
      );
      const minHeight = await dropwdown.evaluate((e) => e.scrollHeight);

      expect(minHeight).toBeGreaterThanOrEqual(200);
    });
  });

  test.describe("demo page test", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/dropdown");
    });

    test("dynamically adding content should resize the the dropdown if it's open", async ({
      page,
    }) => {
      const addedContent = page.getByTestId("added content").first();

      await page.getByRole("button", { name: "Add Content" }).click();

      await expect(addedContent).toBeInViewport();
    });

    test("all contents should still be visible after window resize", async ({
      page,
    }) => {
      const contentEdge = page.getByTestId("content edge");

      await page.setViewportSize({ width: 640, height: 1000 });

      await expect(contentEdge).toBeInViewport();
    });
  });
});
