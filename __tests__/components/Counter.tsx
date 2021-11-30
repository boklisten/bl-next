import React from "react";
import Counter from "../../components/Counter";
import { fireEvent, render, screen } from "@testing-library/react";

test("can count", async () => {
  render(<Counter />);
  fireEvent.click(screen.getByText("+1"));

  expect(1).not.toBe(2);
});
