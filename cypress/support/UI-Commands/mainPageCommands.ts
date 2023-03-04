import { mainPage } from "../selectors";

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      openMainPage(): Chainable<void>;
      changeLanguageToGerman(url: string): Chainable<void>;
      clickAutomatisiertesTesten(): Chainable<void>;
      clickTestAutomation(): Chainable<void>;
      hoverOnAbboutUsAndOpenEventsTab(url: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("openMainPage", () => {
  cy.visit("/");
  cy.title().should("eq", "QualityMinds | Homepage");
  cy.get(mainPage.flagEN).should("be.visible").and("have.attr", "alt", "EN");
  cy.get("body").then((body) => {
    if (body.find(mainPage.cookies)) {
      cy.get(mainPage.buttonAllowCookies).click({ force: true });
    }
  });
});

Cypress.Commands.add("changeLanguageToGerman", (url) => {
  cy.get(mainPage.containerNavTop)
    .find(".sub-menu")
    .find('[alt="DE"]')
    .eq(0)
    .invoke("show")
    .realHover()
    .should("have.attr", "src", mainPage.imageDE)
    .click({ force: true });
  cy.url().should("include", url);
});

Cypress.Commands.add("clickAutomatisiertesTesten", () => {
  cy.get(mainPage.tabPortfolio)
    .should("include.text", "PORTFOLIO")
    .invoke("show")
    .realHover();
  cy.get(mainPage.automatisiertesTesten)
    .eq(0)
    .should("contain.text", "Automatisiertes Testen")
    .invoke("show")
    .realHover()
    .click({ force: true });
  cy.url().should("include", "/automatisiertes-testen/");
});

Cypress.Commands.add("clickTestAutomation", () => {
  cy.get(mainPage.tabServices)
    .should("include.text", "SERVICES")
    .invoke("show")
    .realHover();
  cy.get(mainPage.testAutomation)
    .eq(0)
    .should("contain.text", "Test Automation")
    .invoke("show")
    .realHover()
    .click({ force: true });
  cy.url().should("include", "/test-automation/");
});

Cypress.Commands.add("hoverOnAbboutUsAndOpenEventsTab", (url) => {
  cy.get(mainPage.containerNavTop)
    .find(mainPage.tabAboutUs)
    .should("be.visible")
    .and("contain.text", "ABOUT US")
    .realHover();
  cy.get(mainPage.tabEvents)
    .eq(0)
    .should("be.visible")
    .and("contain.text", "Events")
    .click();
  cy.url().should("contain", url);
});
