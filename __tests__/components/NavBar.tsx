import React from "react";
import NavBar from "../../src/components/NavBar";
import { render } from "../../utils/test-utils";
import { screen, within } from "@testing-library/react";

test("displays the navigation links", async () => {
  render(<NavBar />);
  const nav = screen.getByTestId("nav-bar");
  const logo = within(nav).getByText(/Boklisten.no/);
  const info = within(nav).getByText(/Info/);
  const order = within(nav).getByText(/Bestill bøker/);

  expect(logo).toBeDefined();
  expect(info).toBeDefined();
  expect(order).toBeDefined();
});
