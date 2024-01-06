import { test, expect } from "@playwright/experimental-ct-react";
import { Carousel } from "./carousel";
import { Locator } from "playwright-core";

test.describe("Carousel", () => {
  test.describe("component test", () => {
    test.describe("default css style", () => {
      test("should be injected to children", async ({ mount }) => {
        const injectedDefaultCssProp = {
          marginRight: "16px",
          flexShrink: "0",
          flexGrow: "0",
        };

        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const sampleChild = carousel.getByTestId("sampleChild").first();

        await expect(sampleChild).toHaveCSS(
          "margin-right",
          injectedDefaultCssProp.marginRight
        );
        await expect(sampleChild).toHaveCSS(
          "flex-grow",
          injectedDefaultCssProp.flexGrow
        );
        await expect(sampleChild).toHaveCSS(
          "flex-shrink",
          injectedDefaultCssProp.flexShrink
        );
      });

      test("first and last elements should have 0 left and right margin respectively", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="firstChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              data-testid="lastChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const firstChild = carousel.getByTestId("firstChild").first();
        const lastChild = carousel.getByTestId("lastChild").last();

        await expect(firstChild).toHaveCSS("margin-left", "0px");
        await expect(lastChild).toHaveCSS("margin-right", "0px");
      });

      test("custom attribute should be injected to children", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const sampleChild = carousel.getByTestId("sampleChild").first();

        await expect(sampleChild).toHaveAttribute("data-carousel-item", "true");
      });
    });

    test.describe("aria-hidden attribute", () => {
      test("should be present in duplicated elements", async ({ mount }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const duplicatedChild = carousel.getByTestId("sampleChild").last();

        await expect(duplicatedChild).toHaveAttribute("aria-hidden", "true");
      });

      test("shouldn't be present in the original elements", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const originalChild = carousel.getByTestId("sampleChild").first();

        await expect(originalChild).not.toHaveAttribute("aria-hidden", "true");
      });
    });

    test.describe("props", () => {
      test("blurEdges should be blur by default", async ({ mount }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );

        await expect(carousel).toHaveAttribute(
          "data-carousel-blur-edge",
          "true"
        );
      });

      test("setting blurEdges false should disable blur", async ({ mount }) => {
        const carousel = await mount(
          <Carousel width="200px" blurEdges={false}>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );

        await expect(carousel).toHaveAttribute(
          "data-carousel-blur-edge",
          "false"
        );
      });

      test("setting direction right should change the animation right ", async ({
        mount,
      }) => {
        const directions = { RIGHT: "reverse", LEFT: "none" };
        const regex = new RegExp(`${directions.RIGHT}`);
        const carousel = await mount(
          <Carousel width="200px" direction="RIGHT">
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const scroller = carousel
          .locator("css=[data-carousel-scroll=true]")
          .or(carousel.locator("css=[data-carousel-scroll=false]"));

        await expect(scroller).toHaveCSS("animation", regex);
      });

      test("setting direction left should change the animation left", async ({
        mount,
      }) => {
        const directions = { RIGHT: "reverse", LEFT: "none" };
        const regex = new RegExp(`${directions.LEFT}`);
        const carousel = await mount(
          <Carousel width="200px" direction="LEFT">
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const scroller = carousel
          .locator("css=[data-carousel-scroll=true]")
          .or(carousel.locator("css=[data-carousel-scroll=false]"));

        await expect(scroller).toHaveCSS("animation", regex);
      });

      test("setting speed should change to specified animation speed", async ({
        mount,
      }) => {
        const setSpeed = "2s";
        const regex = new RegExp(`${setSpeed}`);
        const carousel = await mount(
          <Carousel width="200px" speed={setSpeed}>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const scroller = carousel
          .locator("css=[data-carousel-scroll=true]")
          .or(carousel.locator("css=[data-carousel-scroll=false]"));

        await expect(scroller).toHaveCSS("animation", regex);
      });
    });

    test.describe("scroll animation", () => {
      test("should stop if non-duplicated children width <= carousel width", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const scroller = carousel
          .locator("css=[data-carousel-scroll=true]")
          .or(carousel.locator("css=[data-carousel-scroll=false]"));

        await expect(scroller).toHaveAttribute("data-carousel-scroll", "false");
      });

      test("should run if non-duplicated children width > carousel width", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const scroller = carousel
          .locator("css=[data-carousel-scroll=true]")
          .or(carousel.locator("css=[data-carousel-scroll=false]"));

        await expect(scroller).toHaveAttribute("data-carousel-scroll", "true");
      });

      test("is running then children should be duplicated", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
            <div
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const sampleChild = carousel.getByTestId("sampleChild");

        await expect(sampleChild).toHaveCount(2);
      });

      test("is stop then children shouldn't be duplicated", async ({
        mount,
      }) => {
        const carousel = await mount(
          <Carousel width="200px">
            <div
              data-testid="sampleChild"
              style={{
                width: "100px",
                height: "100px",
                border: "1px solid red",
              }}
            ></div>
          </Carousel>
        );
        const sampleChild = carousel.getByTestId("sampleChild");

        await expect(sampleChild).toHaveCount(1);
      });
    });
  });

  test.describe("demo page test", () => {
    let scroller: Locator;
    test.beforeEach(async ({ page }) => {
      await page.goto("/carousel");

      scroller = page
        .locator("css=[data-carousel-scroll=true]")
        .or(page.locator("css=[data-carousel-scroll=false]"));
    });

    test.describe("dynamic content width", () => {
      let removeItemButton: Locator;
      test.beforeEach(async ({ page }) => {
        removeItemButton = page.getByRole("button", { name: "Remove Item" });
      });

      test.describe("while on scroll", () => {
        test("removing child should stop scroll animation if content width <= carousel width", async () => {
          await removeItemButton.click();
          await removeItemButton.click();
          await removeItemButton.click();

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );
        });

        test("adding and removing child shouldn't stop scroll animation if content width > carousel width", async ({
          page,
        }) => {
          await page.getByRole("button", { name: "Add Item" }).click();
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );

          await removeItemButton.click();
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );
        });
      });

      test.describe("while not scrolling", () => {
        test.beforeEach(async () => {
          await removeItemButton.click();
          await removeItemButton.click();
          await removeItemButton.click();
        });

        test("adding child should start scroll animation if content width > carousel width", async ({
          page,
        }) => {
          await page.getByRole("button", { name: "Add Item" }).click();

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );
        });

        test("adding and removing child shouldn't start scroll animation if content width <= carousel width", async ({
          page,
        }) => {
          await removeItemButton.click();
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );

          await page.getByRole("button", { name: "Add Item" }).click();
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );
        });
      });
    });

    test.describe("viewport resize", () => {
      test.describe("while on scroll", () => {
        test.beforeEach(async () => {
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );
        });

        test("should stop scroll animation if content width <= carousel width", async ({
          page,
        }) => {
          await page.setViewportSize({ width: 3000, height: 1000 });

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );
        });

        test("shouldn't stop scroll animation if content width > carousel width", async ({
          page,
        }) => {
          await page.setViewportSize({ width: 2500, height: 1000 });

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );
        });
      });

      test.describe("while not scrolling", () => {
        test.beforeEach(async ({ page }) => {
          await page.setViewportSize({ width: 3000, height: 1000 });
          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );
        });

        test("should start scroll animation if content width > carousel width", async ({
          page,
        }) => {
          await page.setViewportSize({ width: 2500, height: 1000 });

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "true"
          );
        });

        test("shouldn't start scroll animation if content width <= carousel width", async ({
          page,
        }) => {
          await page.setViewportSize({ width: 2900, height: 1000 });

          await expect(scroller).toHaveAttribute(
            "data-carousel-scroll",
            "false"
          );
        });
      });
    });
  });
});
