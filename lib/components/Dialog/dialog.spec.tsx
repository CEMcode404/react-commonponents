import { test, expect } from "@playwright/experimental-ct-react";
import { Dialog } from "./Dialog";

test("should work", async ({ mount }) => {
  const component = await mount(<Dialog isOpen>test</Dialog>);

  await expect(component).toContainText("test");
});
