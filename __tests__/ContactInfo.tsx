import React from "react";
import ContactInfo from "../src/components/ContactInfo";
import { contactInfo } from "../src/constants";
import { render } from "../utils/test-utils";

test("displays the correct number of questions", async () => {
  const component = render(<ContactInfo />);
  const phone = component.getByText(contactInfo.phone);
  const email = component.getByText(contactInfo.email);
  const address = component.getByText(contactInfo.address);
  expect(phone).toBeDefined();
  expect(email).toBeDefined();
  expect(address).toBeDefined();
});
