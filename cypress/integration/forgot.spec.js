describe("Login", () => {
  it("can navidate to and from forgot page", () => {
    cy.visit("/");
    cy.getBySel("MenuIcon").click();
    cy.get(".MuiListItem-button").eq(8).click();
    cy.getBySel("forgot-password").click();
    cy.url().should("include", "forgot");
    cy.getBySel("login").click();
    cy.url().should("include", "login");
    cy.getBySel("forgot-password").click();
  });

  it("accepts a legal email", () => {
    cy.getBySel("email-field").type("petter@hansen.no");
    cy.getBySel("error-message").should("not.exist");
    cy.getBySel("forgot-submit").should("not.be.disabled");
  });

  it("rejects a badly formatted email", () => {
    cy.getBySel("email-field").clear();
    cy.getBySel("forgot-submit").click();
    cy.getBySel("error-message").should("contain", "Du må fylle inn epost");
    cy.getBySel("forgot-submit").should("be.disabled");

    cy.getBySel("email-field").type("petter@");
    cy.getBySel("error-message").should(
      "contain",
      "Du må fylle inn en gyldig epost"
    );
    cy.getBySel("forgot-submit").should("be.disabled");

    cy.getBySel("email-field").type("hansen.no");
    cy.getBySel("error-message").should("not.exist");
    cy.getBySel("forgot-submit").should("not.be.disabled");
  });
});
