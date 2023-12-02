import { test, expect } from "@playwright/experimental-ct-react";
import { ImageViewer } from "./ImageViewer.tsx";
import { Locator } from "playwright-core";

test.describe("ImageViewer", () => {
  const sampleImgLinks = ["/book-no-image.svg", "/user.webp"];

  test.describe("component test", () => {
    test.describe("isOpen property", () => {
      test("'isOpen = false' image viewer should be hidden", async ({
        mount,
      }) => {
        const imageViewer = await mount(
          <ImageViewer isOpen={false} imgSrcs={[]} />
        );

        await expect(imageViewer).toBeHidden();
      });

      test("'isOpen = true' image viewer should be visible", async ({
        mount,
      }) => {
        const imageViewer = await mount(<ImageViewer isOpen imgSrcs={[]} />);

        await expect(imageViewer).toBeVisible();
      });
    });

    test.describe("error message", () => {
      const errorMessage = "No image/s";

      test(" should show if image links are not provided", async ({
        mount,
      }) => {
        const imageViewer = (
          await mount(<ImageViewer isOpen imgSrcs={[]} />)
        ).getByText(errorMessage);

        await expect(imageViewer).toContainText(errorMessage);
      });

      test("shouldn't show if image links are provided", async ({ mount }) => {
        const imageViewer = (
          await mount(<ImageViewer isOpen imgSrcs={sampleImgLinks} />)
        ).getByText(errorMessage);

        await expect(imageViewer).toBeHidden();
      });
    });

    test.describe("buttons", () => {
      const images = { first: sampleImgLinks[0], second: sampleImgLinks[1] };

      test("close button should trigger onClose", async ({ mount }) => {
        let isOnCloseTriggered = false;
        const imageViewer = await mount(
          <ImageViewer
            isOpen
            imgSrcs={[]}
            onClose={() => (isOnCloseTriggered = true)}
          />
        );

        await imageViewer.getByLabel("close button").click();

        expect(isOnCloseTriggered).toBeTruthy();
      });

      test("next button should display the trigger next and show the next image", async ({
        mount,
      }) => {
        const imageViewer = await mount(
          <ImageViewer isOpen imgSrcs={sampleImgLinks} />
        );

        await imageViewer.getByLabel("next button").click();
        const displayImage = await imageViewer
          .getByTestId("image on display")
          .getAttribute("src");

        expect(displayImage).not.toContain(images.first);
        expect(displayImage).toContain(images.second);
      });

      test("previous button should trigger previous and show the previous image", async ({
        mount,
      }) => {
        const imageViewer = await mount(
          <ImageViewer isOpen imgSrcs={sampleImgLinks} />
        );

        await imageViewer.getByLabel("previous button").click();
        const displayImage = await imageViewer
          .getByTestId("image on display")
          .getAttribute("src");

        expect(displayImage).not.toContain(images.first);
        expect(displayImage).toContain(images.second);
      });
    });
  });

  test.describe("demo page test", () => {
    let imageViewer: Locator;
    test.beforeEach(async ({ page }) => {
      imageViewer = page.getByRole("dialog");

      await page.goto("/image-viewer");
    });

    test("open viewer button should open the image viewer ", async ({
      page,
    }) => {
      await page.getByRole("button", { name: "Open Viewer" }).click();

      await expect(imageViewer).toBeVisible();
    });

    test("close button should close the image viewer ", async ({ page }) => {
      await page.getByRole("button", { name: "Open Viewer" }).click();
      await imageViewer.getByLabel("close button").click();

      await expect(imageViewer).toBeHidden();
    });
  });
});
