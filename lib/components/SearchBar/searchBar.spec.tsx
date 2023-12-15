import { test, expect } from "@playwright/experimental-ct-react";
import { SearchBar } from "./SearchBar.tsx";
import { Locator } from "playwright-core";

interface Book {
  author: string;
  title: string;
}

const books = [
  { author: "John Denver", title: "The Ultimate Book" },
  { author: "John Depores", title: "The Useless One" },
];

test.describe("Search Bar", () => {
  test.describe("component test", () => {
    test("input should be disabled if disabled attribute is set", async ({
      mount,
    }) => {
      const searchBar = await mount(
        <SearchBar<Book>
          disabled={true}
          formatFunc={({ author, title }) => <p>{`${title} by ${author}`}</p>}
          id="searchbar"
          onChange={() => books}
        />
      );
      const input = searchBar.locator("#searchbar");

      await expect(input).toBeDisabled();
    });

    test("findIconColor should set the find icon color", async ({ mount }) => {
      const colorBlack = "rgb(0, 0, 0)";
      const searchBar = await mount(
        <SearchBar<Book>
          formatFunc={({ author, title }) => <p>{`${title} by ${author}`}</p>}
          findIconColor="black"
          id="searchbar"
          onChange={() => books}
        />
      );
      const findIcon = searchBar.getByAltText("search icon");

      await expect(findIcon).toHaveCSS("background-color", colorBlack);
    });

    test("find icon should be hidden if hideFindIcon is set", async ({
      mount,
    }) => {
      const searchBar = await mount(
        <SearchBar<Book>
          formatFunc={({ author, title }) => <p>{`${title} by ${author}`}</p>}
          hideFindIcon
          id="searchbar"
          onChange={() => books}
        />
      );
      const findIcon = searchBar.getByAltText("search icon");

      await expect(findIcon).not.toBeVisible();
    });

    test("setting placeholder should replace the default placeholder", async ({
      mount,
    }) => {
      const searchBar = await mount(
        <SearchBar<Book>
          formatFunc={({ author, title }) => <p>{`${title} by ${author}`}</p>}
          id="searchbar"
          onChange={() => books}
          placeholder="find"
        />
      );
      const input = searchBar.getByPlaceholder("find");

      await expect(input).toHaveAttribute("placeholder", "find");
    });
  });

  test.describe("demo page test", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/search-bar");
    });

    test.describe("typing notification", () => {
      let typingNotification: Locator;
      let searchBarInput: Locator;

      test.beforeEach(async ({ page }) => {
        typingNotification = page.getByText("typing");
        searchBarInput = page.getByPlaceholder("search . . .");
      });

      test("should be visible while typing", async () => {
        await searchBarInput.fill("random");

        await expect(typingNotification).toBeVisible();
      });

      test("should still be visible while typing even with spaces as input", async () => {
        await searchBarInput.fill("   ");

        await expect(typingNotification).toBeVisible();
      });

      test("should immediately be hidden if emptied using backspace", async () => {
        await searchBarInput.fill("random");
        await searchBarInput.fill("");

        await expect(typingNotification).not.toBeVisible();
      });

      test("should be hidden on onblur", async ({ page }) => {
        await page.getByLabel("Empty search results").check();
        await searchBarInput.fill("random");
        await searchBarInput.blur();

        // this is needed because there is timeout delay on onblur to allow
        // onclicks events to be executed inside the search results popup
        await typingNotification.waitFor({ state: "hidden" });

        await expect(typingNotification).not.toBeVisible();
      });

      test("should be hidden after the set defaultOnChangeDelay", async ({
        page,
      }) => {
        await page.getByLabel("Empty search results").check();
        await searchBarInput.fill("random");

        await expect(typingNotification).not.toBeVisible();
      });
    });

    test.describe("search result", () => {
      let searchResult: Locator;
      let searchBarInput: Locator;

      test.beforeEach(async ({ page }) => {
        searchResult = page.getByTestId("search results");
        searchBarInput = page.getByPlaceholder("search . . .");
      });

      test("should show after typing notification", async () => {
        await searchBarInput.fill("random");

        await expect(searchResult).toBeVisible();
      });

      test("should be hidden if input are empty spaces", async ({ page }) => {
        const defaultOnChangeDelay = 1000;

        await searchBarInput.fill("   ");
        await page.waitForTimeout(defaultOnChangeDelay);

        await expect(searchResult).not.toBeVisible();
      });

      test("should be hidden if input is emptied", async () => {
        await searchBarInput.fill("random");
        await searchBarInput.fill("");

        await expect(searchResult).not.toBeVisible();
      });

      test("child elements onClick events should trigger", async ({ page }) => {
        const clickedTitle = page
          .getByTestId("search results")
          .getByText("The Ultimate Book by John");
        const displayedTitle = page.getByText("Selected:");

        await searchBarInput.fill("random");
        await clickedTitle.click();
        const clickedTitleTextContent = await clickedTitle.evaluate(
          (e) => e.textContent
        );

        await expect(displayedTitle).toContainText(
          clickedTitleTextContent as string
        );
      });

      test("should show if WaitForCallback and ResolveCallback functions are used for async operations ", async ({
        page,
      }) => {
        await page.getByLabel("Async").check();
        await searchBarInput.fill("random");
        await searchResult.waitFor({ state: "visible" });

        await expect(searchResult).toBeVisible();
      });

      test("should reset to default if onChangeDelay is less than 0", async ({
        page,
      }) => {
        await page
          .getByLabel("onChangeDelay")
          .selectOption({ label: "Invalid" });
        await searchBarInput.fill("random");

        // the list should show between 500 - 1500ms
        // put a range to give a delay margin
        await page.waitForTimeout(500);
        await expect(searchResult).not.toBeVisible();
        await expect(searchResult).toBeVisible({
          timeout: 1000,
        });
      });

      test("should change onChangeDelay if it's set greater than -1", async ({
        page,
      }) => {
        await page.getByLabel("onChangeDelay").selectOption({ label: "3000" });
        await searchBarInput.fill("random");

        await page.waitForTimeout(2500);
        await expect(searchResult).not.toBeVisible();
        await expect(searchResult).toBeVisible({
          timeout: 1000,
        });
      });
    });
  });
});
