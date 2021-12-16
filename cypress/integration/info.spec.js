describe("Info pages", () => {
  before(() => {
    cy.visit("/");
    cy.getBySel("infoBtnNav").click();
  });

  it("displays editor info", () => {
    cy.getBySel("editor").should("be.visible");
  });

  it("displays qna", () => {
    cy.get(".MuiNativeSelect-select").select("/info/faq");
    cy.getBySel("qna-title").should("be.visible");
    cy.getBySel("qna-entry").should("have.length", 22);
    cy.getBySel("qna-entry")
      .eq(0)
      .should(
        "contain.text",
        "Hva betyr det at Boklisten alltid leverer riktig bok?"
      );
    cy.getBySel("qna-entry-answer").eq(0).should("not.be.visible");
    cy.getBySel("qna-entry").eq(0).click();
    cy.getBySel("qna-entry-answer").eq(0).should("be.visible");

    cy.getBySel("qna-entry").eq(1).click();
    cy.getBySel("qna-entry-answer").eq(0).should("not.be.visible");
    cy.getBySel("qna-entry-answer").eq(1).should("be.visible");
  });

  it("displays contact info", () => {
    cy.get(".MuiNativeSelect-select").select("/info/contact");
    cy.getBySel("contact-phone").should("be.visible");
    cy.getBySel("contact-email").should("be.visible");
    cy.getBySel("contact-address").should("be.visible");
  });
});
