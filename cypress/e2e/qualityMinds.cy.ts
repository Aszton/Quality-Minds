describe("Quality Minds", () => {
  it("test case 1", () => {
    cy.openMainPage();
    cy.changeLanguageToGerman("/qualityminds.com/de/");
    cy.clickAutomatisiertesTesten();
    cy.verifyKontaktiereUnsButton();
    cy.openMainPage();
    cy.clickTestAutomation();
    cy.changeLanguageToGerman("/automatisiertes-testen/");
    cy.verifyKontaktiereUnsButton();
  });
});
