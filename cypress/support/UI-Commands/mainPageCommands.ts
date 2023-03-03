import { mainPage } from "../selectors";

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      openMainPage(): Chainable<void>;
      changeLanguageToGerman(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("openMainPage", () => {
  cy.visit("/");
  cy.title().should("eq", "QualityMinds | Homepage");
  cy.get("body").then((body) => {
    if (body.find(mainPage.containerCookies)) {
      cy.get(mainPage.buttonAllowCookies).click();
    }
  });
});

Cypress.Commands.add("changeLanguageToGerman", () => {
  cy.get(mainPage.containerNavTop)
    .find(mainPage.DEflag)
    .eq(0)
    .children()
    .should(
      "have.attr",
      "src",
      "https://r9w2g9k2.rocketcdn.me/wp-content/plugins/sitepress-multilingual-cms/res/flags/de.png"
    )
    .and("have.attr", "alt", "DE")
    .click({ force: true });
  cy.url().should("eq", "https://qualityminds.com/de/");
});
