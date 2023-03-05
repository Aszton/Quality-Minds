describe("Quality Minds Tests", () => {
  it("test case 1", () => {
    cy.openMainPage();
    cy.changeLanguageToGerman("/de");
    cy.clickAutomatisiertesTesten();
    cy.verifyKontaktiereUnsButton();
    cy.openMainPage();
    cy.clickTestAutomation();
    cy.changeLanguageToGerman("/automatisiertes-testen");
    cy.verifyKontaktiereUnsButton();
  });

  it("test case 2", () => {
    cy.openMainPage();
    cy.hoverOnAbboutUsAndOpenEventsTab("/events");
    cy.searchEvent("2021");
    cy.verifyThereAreNoEvents("2021");
  });

  it("test case 3", () => {
    cy.openStellenangebotePage();
  });
});
