import { test, expect } from "@playwright/experimental-ct-react";
import { Slider } from "./Slider";
import { Locator } from "playwright-core";

test.describe("Slider", () => {
  test.describe("component test", () => {
    test("empty slider should render", async ({ mount }) => {
      const slider = await mount(<Slider></Slider>);

      await expect(slider).toBeInViewport();
    });

    test("slider should inject default styling to slider children elements", async ({
      mount,
    }) => {
      const slider = await mount(
        <Slider>
          <div
            id="itemSample"
            style={{ width: 100, height: 100, background: "red" }}
          ></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
        </Slider>
      );
      const itemSample = slider.locator("#itemSample");

      await expect(itemSample).toHaveCSS("flex-shrink", "0");
      await expect(itemSample).toHaveCSS("flex-grow", "0");
      await expect(itemSample).toHaveCSS("margin-right", "16px");
    });

    test("user applied styles to children elements should override slider applied styles", async ({
      mount,
    }) => {
      const slider = await mount(
        <Slider gap="16px">
          <div
            id="itemSample"
            style={{
              width: 100,
              height: 100,
              background: "red",
              marginRight: "50px",
            }}
          ></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
        </Slider>
      );
      const itemSample = slider.locator("#itemSample");

      await expect(itemSample).toHaveCSS("margin-right", "50px");
    });

    test("gap attribute should change default gap", async ({ mount }) => {
      const slider = await mount(
        <Slider gap="50px">
          <div
            id="firstItem"
            style={{ width: 100, height: 100, background: "red" }}
          ></div>
          <div
            id="secondItem"
            style={{ width: 100, height: 100, background: "red" }}
          ></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
        </Slider>
      );

      await expect(slider.locator("#firstItem")).toHaveCSS(
        "margin-right",
        "50px"
      );
      await expect(slider.locator("#secondItem")).toHaveCSS(
        "margin-right",
        "50px"
      );
    });

    test("edge items(first and last items) should have no outer margin", async ({
      mount,
    }) => {
      const slider = await mount(
        <Slider gap="50px">
          <div
            id="firstItem"
            style={{ width: 100, height: 100, background: "red" }}
          ></div>
          <div style={{ width: 100, height: 100, background: "red" }}></div>
          <div
            id="lastItem"
            style={{ width: 100, height: 100, background: "red" }}
          ></div>
        </Slider>
      );

      await expect(slider.locator("#firstItem")).toHaveCSS(
        "margin-left",
        "0px"
      );
      await expect(slider.locator("#lastItem")).toHaveCSS(
        "margin-right",
        "0px"
      );
    });
  });

  test.describe("demo page test", () => {
    let firstElementOnList: Locator;
    test.beforeEach(async ({ page }) => {
      firstElementOnList = page.getByTestId("slider1FirstItem");

      await page.goto("/slider");
    });

    test("next button should move items to left", async ({ page }) => {
      await page.getByLabel("next button").first().click();

      await expect(firstElementOnList).not.toBeInViewport();
    });

    test("previous button should move items to right", async ({ page }) => {
      await page.getByLabel("next button").first().click();
      await page.waitForTimeout(1000);
      await page.getByLabel("previous button").first().click();

      await expect(firstElementOnList).toBeInViewport();
    });

    test("component without style prop should still set default style to children elements", async ({
      page,
    }) => {
      const firstElementOnListSlider2 = page
        .getByTestId("slider2Items")
        .first();

      await expect(firstElementOnListSlider2).toHaveCSS("flex-shrink", "0");
      await expect(firstElementOnListSlider2).toHaveCSS("flex-grow", "0");
      await expect(firstElementOnListSlider2).toHaveCSS("margin-right", "16px");
    });
  });
});
