const BURGER_API_URL = 'https://norma.nomoreparties.space/api';
const BUN_ID = '643d69a5c3f7b9001cfa093c';
const BUN2_ID = '643d69a5c3f7b9001cfa093d';
const MAIN_ID = '643d69a5c3f7b9001cfa0941';

const bunSelector = `[data-cy='${BUN_ID}']`;
const bun2Selector = `[data-cy='${BUN2_ID}']`;
const mainSelector = `[data-cy='${MAIN_ID}']`;

describe('Тестирование работы конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, { fixture: 'ingredients.json' });

    cy.visit('/');
    cy.viewport(1440, 800);
  });

  it('добавление ингредиентов в конструктор', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(bunSelector).find('.counter__num').should('contain', '2');
    cy.get(mainSelector).children('button').click();
    cy.get(mainSelector).find('.counter__num').should('contain', '1');
  });

  it('проверка взаимного исключения булок', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(bun2Selector).children('button').click();
    cy.get(bunSelector).find('.counter__num').should('not.exist');
    cy.get(bun2Selector).find('.counter__num').should('contain', '2');
  });
});
