import { input } from "../support/input";

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
    cy.get(".tribe-common-h3").click();
    cy.get(".datepicker").should("be.visible");
  });

  it("test case 3", () => {
    cy.openStellenangebotePage();
    cy.verifyMoreThanOneJobOffer();
    cy.clickFirstJobOffer();
    cy.clickSendenButtonInJobOfferDetail();
    cy.verifyErrorsInEmptyApplyInJobOfferDetail();
    cy.typeNameAndSurnameInJobOffer(input.applicantName);
    cy.typeIncorrectEmailInJobOffer(input.emoji);
    cy.save10wordsOfJobDescriptionAndPasteThemInBewerbungsschreiben();
    cy.sendCVinJobDescription(input.cvPath, input.cvFileName);
    cy.markCheckboxDatenschutzerklärung();
  });
});
