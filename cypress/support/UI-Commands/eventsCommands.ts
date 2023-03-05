import { events } from "../selectors";

export {};
declare global {
  namespace Cypress {
    interface Chainable {
      searchEvent(event: string): Chainable<void>;
      verifyThereAreNoEvents(event: string): Chainable<void>;
      openCalendarInEvents(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("searchEvent", (event) => {
  cy.get(events.inputEvent).type(event).should("have.value", event);
  cy.get(events.buttonSearch).click({ force: true });
});

Cypress.Commands.add("verifyThereAreNoEvents", (event) => {
  cy.get(events.containerMessage)
    .should("be.visible")
    .and("contain.text", "There were no results found for")
    .find("strong")
    .should("contain.text", event);
});

Cypress.Commands.add("openCalendarInEvents", () => {
  cy.get(events.openCalendar).click();
  cy.get(events.calendar).should("be.visible");
});
