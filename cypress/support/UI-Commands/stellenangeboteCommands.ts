import { mainPage, stellenangebote } from "../selectors";

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      openStellenangebotePage(): Chainable<void>;
      verifyMoreThanOneJobOffer(): Chainable<void>;
      clickFirstJobOffer(): Chainable<void>;
      clickSendenButtonInJobOfferDetail(): Chainable<void>;
      verifyErrorsInEmptyApplyInJobOfferDetail(): Chainable<void>;
      typeNameAndSurnameInJobOffer(applicantName: string): Chainable<void>;
      typeIncorrectEmailInJobOffer(email: string): Chainable<void>;
      save10wordsOfJobDescriptionAndPasteThemInBewerbungsschreiben(): Chainable<void>;
      sendCVinJobDescription(
        filePath: string,
        fileName: string
      ): Chainable<void>;
      markCheckboxDatenschutzerklärung(): Chainable<void>;
    }
  }
}
Cypress.Commands.add("openStellenangebotePage", () => {
  cy.visit("/de/karriere/stellenangebote/");
  cy.title().should("eq", "QualityMinds | Stellenangebote");
  cy.get("body").then((body) => {
    if (body.find(mainPage.cookies)) {
      cy.get(mainPage.buttonAllowCookies).click({ force: true });
    }
  });
});

Cypress.Commands.add("verifyMoreThanOneJobOffer", () => {
  cy.get(stellenangebote.containerJob).should("have.length.above", 1);
});

Cypress.Commands.add("clickFirstJobOffer", () => {
  cy.get(stellenangebote.containerJob).eq(0).contains("Erfahre mehr").click();
  cy.get(stellenangebote.inputApplicantName).should("be.visible");
});

Cypress.Commands.add("clickSendenButtonInJobOfferDetail", () => {
  cy.get(stellenangebote.buttonSenden).click();
});

Cypress.Commands.add("verifyErrorsInEmptyApplyInJobOfferDetail", () => {
  cy.get(stellenangebote.errorApplicantName)
    .should("be.visible")
    .and("have.text", "Dies ist ein Pflichtfeld.");
  cy.get(stellenangebote.errorApplicantEmail)
    .should("be.visible")
    .and("have.text", "Dies ist ein Pflichtfeld.");
  cy.get(stellenangebote.errorApplicantPhone)
    .should("be.visible")
    .and("have.text", "Dies ist ein Pflichtfeld.");
  cy.get(stellenangebote.errorCoverLetter)
    .should("be.visible")
    .and("have.text", "Dies ist ein Pflichtfeld.");
});

Cypress.Commands.add("typeNameAndSurnameInJobOffer", (applicantName) => {
  cy.get(stellenangebote.inputApplicantName)
    .type(applicantName)
    .should("have.value", applicantName);
  cy.get(stellenangebote.errorApplicantName).should("not.be.visible");
});

Cypress.Commands.add("typeIncorrectEmailInJobOffer", (email) => {
  cy.get(stellenangebote.inputApplicantEmail)
    .type(email)
    .should("have.value", email);
  cy.get(stellenangebote.errorApplicantEmail).should(
    "have.text",
    "Bitte gebe eine gültige E-Mail-Adresse ein."
  );
});

Cypress.Commands.add(
  "save10wordsOfJobDescriptionAndPasteThemInBewerbungsschreiben",
  () => {
    cy.get(stellenangebote.jobDescription)
      .eq(0)
      .invoke("text")
      .then((jobDescription: string) => {
        const tenWords = jobDescription.split(/\s+/).slice(0, 10).join(" ");
        cy.log(tenWords);
        cy.get(stellenangebote.inputCoverLetter)
          .type(tenWords, { delay: 0 })
          .should("have.value", tenWords);
        cy.get(stellenangebote.errorCoverLetter).should("not.be.visible");
      });
  }
);

Cypress.Commands.add("sendCVinJobDescription", (filePath, fileName) => {
  cy.get(stellenangebote.cvFileSend).selectFile(filePath, { force: true });
  cy.get(stellenangebote.successSendFile)
    .should("be.visible")
    .and("contain.text", "Lade dein CV hoch ");
  cy.get(stellenangebote.cvFileName).should("have.text", fileName);
});

Cypress.Commands.add("markCheckboxDatenschutzerklärung", () => {
  cy.get(stellenangebote.checkboxPrivacyPolicy).check().should("be.checked");
});
