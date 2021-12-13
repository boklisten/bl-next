describe("Login", () => {
  it("displays all important elements", () => {
    cy.visit("/");
    cy.getBySel("MenuIcon").click();
    cy.get(".MuiListItem-button").eq(8).click();

    cy.getBySel("facebook-button").should("be.visible");
    cy.getBySel("google-button").should("be.visible");
    cy.getBySel("error-message").should("not.exist");
    cy.getBySel("email-field").should("be.visible");
    cy.getBySel("password-field").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
    cy.getBySel("forgot-password").should("be.visible");
  });

  it("accepts a legal email and password", () => {
    cy.getBySel("email-field").type("petter@hansen.no");
    cy.getBySel("error-message").should("not.exist");

    cy.getBySel("password-field").type("password");
    cy.getBySel("error-message").should("not.exist");

    cy.getBySel("login-submit").should("not.be.disabled");
  });

  it("rejects badly formatted emails and passwords", () => {
    cy.getBySel("email-field").clear();
    cy.getBySel("error-message").should("contain", "Du må fylle inn epost");
    cy.getBySel("login-submit").should("be.disabled");

    cy.getBySel("email-field").type("petter@");
    cy.getBySel("error-message").should(
      "contain",
      "Du må fylle inn en gyldig epost"
    );
    cy.getBySel("login-submit").should("be.disabled");

    cy.getBySel("email-field").type("hansen.no");
    cy.getBySel("error-message").should("not.exist");
    cy.getBySel("login-submit").should("not.be.disabled");

    cy.getBySel("password-field").clear();

    cy.getBySel("error-message").should("contain", "Du må fylle inn passord");
    cy.getBySel("login-submit").should("be.disabled");

    cy.getBySel("password-field").type("password");
    cy.getBySel("error-message").should("not.exist");
    cy.getBySel("login-submit").should("not.be.disabled");
  });
});
