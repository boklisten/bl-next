Cypress.Commands.add("logout", () => {
  cy.visit("/");
  cy.getBySel("MenuIcon").click();
  cy.get(".MuiListItemButton-root")
    .eq(5)
    .invoke("text")
    .then((btn) => {
      if (!btn.includes("Logg inn")) {
        cy.get(".MuiListItemButton-root").eq(7).click();
      } else {
        cy.get("html").click("topLeft");
      }
    });
});

Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
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
