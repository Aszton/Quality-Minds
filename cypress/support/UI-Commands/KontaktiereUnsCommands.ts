import { kontaktiereUns } from "../selectors";
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      verifyKontaktiereUnsButton(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("verifyKontaktiereUnsButton", () => {
  cy.get(kontaktiereUns.buttonKontaktiereUns)
    .should("exist")
    .and("contain.text", "KONTAKTIERE UNS")
    .and("have.attr", "href")
    .and("contain", "testing@qualityminds.de");
});
