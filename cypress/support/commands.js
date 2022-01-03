Cypress.Commands.add("logout", () => {
  cy.getBySel("MenuIcon").click();
  cy.get(".MuiListItem-button")
    .eq(5)
    .invoke("text")
    .then((btn) => {
      if (!btn.includes("Logg inn")) {
        cy.get(".MuiListItem-button").eq(7).click();
      } else {
        cy.get("html").click("topLeft");
      }
    });
});

Cypress.Commands.add("login", (username, password) => {
  cy.logout();
  cy.visit("/auth/login");
  cy.getBySel("email-field").type(username);
  cy.getBySel("password-field").type(password);
  cy.intercept("/auth/local/login").as("login");
  cy.getBySel("login-submit").click();
  cy.wait("@login").its("response.statusCode").should("eq", 200);
});

Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
});
