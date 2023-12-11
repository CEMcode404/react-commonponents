import { test, expect } from "@playwright/experimental-ct-react";
import { Pagination } from "./Pagination";
import { paginate } from "./paginate";

test.describe("Pagination", () => {
  test.describe("component test", () => {
    test("should render even if empty", async ({ mount }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={2}></Pagination>
      );
      const pagenumber = pagination.getByText("1");

      await expect(pagenumber).not.toBeVisible();
    });

    test("page number should not be visible if child elements are less than max items", async ({
      mount,
    }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={2}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );
      const pagenumber = pagination.getByText("1");

      await expect(pagenumber).not.toBeVisible();
    });

    test("page number should be visible if child elements are more than max items", async ({
      mount,
    }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={2}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );
      const pagenumber = pagination.getByText("2");

      await expect(pagenumber).toBeVisible();
    });

    test("should throw error and not load if 'maxItemsPerPage is less than 1", async ({
      mount,
    }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={0}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );

      await expect(pagination).not.toBeVisible();
    });

    test("child displayed should be less than maxItemsPerPage", async ({
      mount,
    }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={2}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );
      const children = await pagination.evaluate((e) => e.children.length);

      expect(children).not.toBe(2);
    });

    test("should render and noOfPageVisible should reset to default if it's less than the 3", async ({
      mount,
    }) => {
      const pagination = await mount(
        <Pagination maxItemsPerPage={2} noOfPageVisible={0}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );

      await expect(pagination).toBeVisible();
    });

    test("setting activeColor should change background color of current page number", async ({
      mount,
    }) => {
      const red = "rgb(255, 0, 0)";
      const pagination = await mount(
        <Pagination maxItemsPerPage={2} activeColor={red}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio,
            explicabo.
          </p>
        </Pagination>
      );
      const activePageNumber = pagination.getByText("1");

      await expect(activePageNumber).toHaveCSS("background-color", red);
    });
  });

  test.describe("demo page test", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/pagination");
    });

    test("inserted footer element should render", async ({ page }) => {
      const footerElement = page.getByTestId("insertedFooterElement");

      await expect(footerElement).toBeVisible();
    });

    test("inserted footer element should be visible across pages", async ({
      page,
    }) => {
      const footerElement = page.getByTestId("insertedFooterElement");

      await expect(footerElement).toBeVisible();

      await page.getByText("2").click();

      await expect(footerElement).toBeVisible();
    });

    test("dynamically adding content should rerender Pagination and add the element", async ({
      page,
    }) => {
      const addedContent = page.getByText("new text");

      await page.getByRole("button", { name: "Add Content" }).click();

      await expect(addedContent).toBeVisible();
    });

    test("dynamically removing content should rerender Pagignation and remove the element", async ({
      page,
    }) => {
      const addedContent = page.getByText("new text");

      await page.getByRole("button", { name: "Add Content" }).click();
      await page.getByRole("button", { name: "Clear Added Content" }).click();

      await expect(addedContent).not.toBeVisible();
    });
  });

  test.describe("paginate function", () => {
    let currentPage: number;
    let itemsCount: number;
    let maxItemPerPage: number;
    let noOfPageVisible: number;
    let error: string;

    test.beforeEach(() => {
      currentPage = 1;
      itemsCount = 30;
      maxItemPerPage = 2;
      noOfPageVisible = 3;
    });

    test("noOfPageVisible should be overridden if it's less than the minimum 3", () => {
      noOfPageVisible = 0;
      const minNoOfPageVisible = 3;

      const pages = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pages.length).toBe(minNoOfPageVisible);
    });

    test("should throw an error if currentPage is out of bounds of total page number", () => {
      currentPage = 1000;

      try {
        paginate(currentPage, itemsCount, maxItemPerPage, noOfPageVisible);
      } catch (err) {
        error = (err as Error).message;
      }

      expect(error as string).toMatch(/out of bounds/);
    });

    test("should throw an error if maxItemPerPage is not a counting number (1 - infinity)", () => {
      maxItemPerPage = 0;

      try {
        paginate(currentPage, itemsCount, maxItemPerPage, noOfPageVisible);
      } catch (err) {
        error = (err as Error).message;
      }

      expect(error as string).toMatch(/must be a counting number/);
    });

    test("should throw an error if itemCount is not a whole number (0 - infinity)", () => {
      itemsCount = -1;

      try {
        paginate(currentPage, itemsCount, maxItemPerPage, noOfPageVisible);
      } catch (err) {
        error = (err as Error).message;
      }

      expect(error as string).toMatch(/must be a whole number/);
    });

    test("if noOfPageVisible is odd the currentPage should always be at the center", () => {
      currentPage = 10;
      noOfPageVisible = 3;

      const pagesSet1 = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pagesSet1).toStrictEqual([9, currentPage, 11]);

      currentPage = 5;

      const pagesSet2 = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pagesSet2).toStrictEqual([4, currentPage, 6]);
    });

    test("if noOfPageVisible is even the currentPage should be on the second index", () => {
      currentPage = 10;
      noOfPageVisible = 4;

      const pagesSet1 = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pagesSet1).toStrictEqual([9, currentPage, 11, 12]);

      currentPage = 5;

      const pagesSet2 = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pagesSet2).toStrictEqual([4, currentPage, 6, 7]);
    });

    test("if currentPage is the last page the current page should be at the last index", () => {
      currentPage = 15;

      const pages = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pages).toStrictEqual([13, 14, currentPage]);
    });

    test("if currentPage is the first page the current page should be at the first index", () => {
      currentPage = 1;

      const pages = paginate(
        currentPage,
        itemsCount,
        maxItemPerPage,
        noOfPageVisible
      );

      expect(pages).toStrictEqual([currentPage, 2, 3]);
    });
  });
});
