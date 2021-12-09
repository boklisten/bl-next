import React from "react";
import SignIn from "../src/components/SignIn";
import { render } from "../utils/test-utils";

test("displays the correct number of questions", async () => {
  const component = render(<SignIn />);

  const facebookLogin = await component.findByText("Logg inn med Facebook");
  expect(facebookLogin).toBeDefined();

  const googleLogin = await component.findByText("Logg inn med Google");
  expect(googleLogin).toBeDefined();

  const forgottenPassword = await component.findByText("Glemt passord?");
  expect(forgottenPassword).toBeDefined();

  const registerLink = await component.findByText(
    "Har du ikke konto? Registrer deg"
  );
  expect(registerLink).toBeDefined();

  const emailField = document.querySelector("#email");
  expect(emailField).toBeDefined();

  const passwordField = document.querySelector("#password");
  expect(passwordField).toBeDefined();

  const submitButton = component.getByTestId("login-submit");
  expect(submitButton).toBeDefined();
});
