describe("Info pages", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Branch selection", () => {
    it("displays placeholder when branch is not present", () => {
      cy.getBySel("branchSelect").should("be.visible");
      cy.getBySel("branchSelectLabel").should("contain", "Velg skole");
    });

    it("can select a branch", () => {
      cy.getBySel("branchSelect").click();
      cy.getBySel("branchOption").should("have.length", 4);
      cy.getBySel("branchOption")
        .eq(0)
        .click()
        .should(() => {
          expect(localStorage.getItem("bl-current-branch-id")).to.eq(
            "60074e293309ff001a51b244"
          );
        });

      cy.visit("/");
      cy.getBySel("branchSelect").should(() => {
        expect(localStorage.getItem("bl-current-branch-id")).to.eq(
          "60074e293309ff001a51b244"
        );
      });

      cy.getBySel("branchSelect").click();
      cy.getBySel("branchOption")
        .eq(1)
        .click()
        .should(() => {
          expect(localStorage.getItem("bl-current-branch-id")).to.eq(
            "5dfa263e8eeee5001c83eacf"
          );
        });
    });
  });
});
