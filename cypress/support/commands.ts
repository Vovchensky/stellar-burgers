/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to add ingredient to constructor
       * @example cy.addIngredient('Краторная булка N-200i')
       */
      addIngredient(ingredientName: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('addIngredient', (ingredientName: string) => {
  cy.contains(ingredientName)
    .parent()
    .parent()
    .within(() => {
      cy.get('button').contains('Добавить').click();
    });
});

export {};