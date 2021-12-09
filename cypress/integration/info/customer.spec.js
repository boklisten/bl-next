describe("as a customer i can", () => {
  it("find our contact details", () => {
    cy.visit("/");
    cy.getBySel("infoBtnNav").click();
    cy.getBySel("link-tab").eq(8).click();
    cy.getBySel("contact-info").should("be.visible");
  });
});
