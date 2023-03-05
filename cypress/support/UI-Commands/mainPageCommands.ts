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
      openStellenangebotePage(): Chainable<void>;
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
    .should("have.attr", "src", mainPage.imageDE)
    .click({ force: true });
  cy.url().should("include", url);
});

Cypress.Commands.add("clickAutomatisiertesTesten", () => {
  cy.get(mainPage.tabPortfolio)
    .eq(0)
    .should("include.text", "PORTFOLIO")
    .invoke("show")
    .trigger("mouseover");
  cy.get(mainPage.automatisiertesTesten)
    .eq(0)
    .should("contain.text", "Automatisiertes Testen")
    .invoke("show")
    .trigger("mouseover")
    .click({ force: true });
  cy.url().should("include", "/automatisiertes-testen/");
});

Cypress.Commands.add("clickTestAutomation", () => {
  cy.get(mainPage.tabServices)
    .eq(0)
    .should("include.text", "SERVICES")
    .invoke("show")
    .trigger("mouseover");
  cy.get(mainPage.testAutomation)
    .eq(0)
    .should("contain.text", "Test Automation")
    .invoke("show")
    .trigger("mouseover")
    .click({ force: true });
  cy.url().should("include", "/test-automation/");
});

Cypress.Commands.add("hoverOnAbboutUsAndOpenEventsTab", (url) => {
  cy.get(mainPage.containerNavTop)
    .find(mainPage.tabAboutUs)
    .eq(0)
    .invoke("show")
    .trigger("mouseover")
    .should("be.visible")
    .and("contain.text", "ABOUT US");
  cy.get(mainPage.tabEvents)
    .eq(0)
    .invoke("show")
    .trigger("mouseover")
    .should("contain.text", "Events")
    .click();
  cy.url().should("contain", url);
});

Cypress.Commands.add("openStellenangebotePage", () => {
  cy.visit("/de/karriere/stellenangebote/");
  cy.title().should("eq", "QualityMinds | Stellenangebote");
  cy.get("body").then((body) => {
    if (body.find(mainPage.cookies)) {
      cy.get(mainPage.buttonAllowCookies).click({ force: true });
    }
  });
});
