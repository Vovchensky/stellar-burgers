describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  describe('Adding ingredients', () => {
    it('should add bun to constructor', () => {
      cy.contains('Краторная булка N-200i')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Краторная булка N-200i (верх)').should('exist');
      cy.contains('Краторная булка N-200i (низ)').should('exist');
    });

    it('should add main ingredient to constructor', () => {
      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[class*=constructor]').should('contain', 'Биокотлета из марсианской Магнолии');
    });

    it('should add sauce to constructor', () => {
      cy.contains('Соус Spicy-X')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.get('[class*=constructor]').should('contain', 'Соус Spicy-X');
    });
  });

  describe('Modal windows', () => {
    it('should open ingredient modal on click', () => {
      cy.contains('Краторная булка N-200i').first().click();
      
      cy.url().should('include', '/ingredients/');
      
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Калории, ккал').should('be.visible');
      cy.contains('420').should('be.visible');
      cy.contains('Белки, г').should('be.visible');
      cy.contains('80').should('be.visible');
    });

    it('should close modal on close button click', () => {
      cy.contains('Краторная булка N-200i').first().click();
      cy.url().should('include', '/ingredients/');
      
      cy.contains('Детали ингредиента').should('be.visible');
      
      cy.get('#modals button').first().click();
      
      cy.url().should('eq', 'http://localhost:4000/');
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should close modal on overlay click', () => {
      cy.contains('Краторная булка N-200i').first().click();
      cy.url().should('include', '/ingredients/');
      
      cy.contains('Детали ингредиента').should('be.visible');
      
      cy.get('body').click(0, 0);
      
      cy.url().should('eq', 'http://localhost:4000/');
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Order creation', () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      });
      cy.setCookie('accessToken', 'Bearer test-access-token');
    });

    afterEach(() => {
      cy.window().then((win) => {
        win.localStorage.removeItem('refreshToken');
      });
      cy.clearCookie('accessToken');
    });

    it('should create order successfully', () => {
      cy.contains('Краторная булка N-200i')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Биокотлета из марсианской Магнолии')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('Соус Spicy-X')
        .parent()
        .parent()
        .find('button')
        .contains('Добавить')
        .click();

      cy.contains('button', 'Оформить заказ').click();
      
      cy.wait('@createOrder');

      cy.contains('12345', { timeout: 15000 }).should('be.visible');

      cy.get('#modals button').first().click();

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
});