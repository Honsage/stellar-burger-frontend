const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const BUN_ID = '643d69a5c3f7b9001cfa093c';
const BUN_NAME = "Краторная булка N-200i";

const BUN2_ID = '643d69a5c3f7b9001cfa093d';
const BUN2_NAME = 'Флюоресцентная булка R2-D3';

const MAIN_ID = '643d69a5c3f7b9001cfa0941';
const MAIN_NAME = 'Биокотлета из марсианской Магнолии';

const bunSelector = `[data-cy='${BUN_ID}']`;
const bun2Selector = `[data-cy='${BUN2_ID}']`;
const mainSelector = `[data-cy='${MAIN_ID}']`;

describe('Тестирование работы конструктора бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get(`[data-cy='constructor']`).as('constructor');
  });

  it('добавление ингредиентов в конструктор', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(bunSelector).find('.counter__num').should('contain', '2');
    cy.get('@constructor').find('.constructor-element__text').should('contain.text', BUN_NAME);
    cy.get(mainSelector).children('button').click();
    cy.get(mainSelector).find('.counter__num').should('contain', '1');
    cy.get('@constructor').find('.constructor-element__text').should('contain.text', MAIN_NAME);
    cy.get('@constructor').find('li').should('have.length', 1);
  });

  it('проверка взаимного исключения булок', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(bun2Selector).children('button').click();
    cy.get(bunSelector).find('.counter__num').should('not.exist');
    cy.get(bun2Selector).find('.counter__num').should('contain', '2');
    cy.get('@constructor').find('.constructor-element__text').should('contain.text', BUN2_NAME);
    cy.get('@constructor').find('.constructor-element__text').should('not.contain.text', BUN_NAME);
  });
});

describe('Тестирование работы модальных окон', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('#modals').as('modal');
    cy.viewport(1440, 800);
    cy.wait(1000);
  });

  it('открытие модального окна', () => {
    cy.get('@modal').should('be.empty');
    cy.get(bunSelector).first().click();
    cy.get('@modal').should('exist');
    cy.get('@modal').should('be.not.empty');
    cy.url().should('include', BUN_ID);
    cy.get('@modal').find('h3').should('contain.text', BUN_NAME);
  });

  it('закрытие модального окна по клику на крестик', () => {
    cy.get(bunSelector).first().click();
    cy.get('@modal').should('be.not.empty');
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });

  it('закрытие модального окна при клике на оверлей', () => {
    cy.get(mainSelector).first().click();
    cy.get('@modal').should('exist');
    cy.get(`[data-cy='modal-overlay']`).click({ force: true });
    cy.get('@modal').should('be.empty');
  });

  it('закрытие модального окна при нажатии клавиши Escape', () => {
    cy.get(bun2Selector).first().click();
    cy.get('@modal').should('exist');
    cy.get('body').type('{esc}');
    cy.get('@modal').should('be.empty');
  });
});

describe('Тестирование создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BURGER_API_URL}/ingredients`, { fixture: 'ingredients.json' });
    cy.intercept('POST', `${BURGER_API_URL}/auth/login`, { fixture: 'user.json' });
    cy.intercept('GET', `${BURGER_API_URL}/auth/user`, { fixture: 'user.json' });
    cy.intercept('POST', `${BURGER_API_URL}/orders`, { fixture: 'order.json' });
    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');
    cy.get('[data-cy="order-btn"]').as('orderButton');
    cy.get(`[data-cy='constructor']`).as('constructor');

    window.localStorage.setItem('refreshToken', 'refreshtoken');
    cy.setCookie('accessToken', 'accesstoken');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
  })

  it('проверка невозможности оформления пустого заказа', () => {
    cy.get('@orderButton').click();
    cy.get('@modal').should('be.empty');
  });

  it('проверка невозможности оформления заказа без булок', () => {
    cy.get(mainSelector).children('button').click();
    cy.get('@orderButton').click();
    cy.get('@modal').should('be.empty');
  });

  it('проверка возможности оформления собранного заказа', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(mainSelector).children('button').click();
    cy.get('@orderButton').should('not.be.disabled').click();
    cy.get('@modal').should('not.be.empty');
  });

  it('проверка корректности оформления заказа', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(mainSelector).children('button').click();
    cy.get('@orderButton').should('not.be.disabled').click();
    cy.get('@modal').should('not.be.empty');
    cy.get('@modal').find('h2').contains('77740');
  });

  it('проверка очищения конструктора после оформления заказа', () => {
    cy.get(bunSelector).children('button').click();
    cy.get(mainSelector).children('button').click();
    cy.get('@orderButton').should('not.be.disabled').click();
    cy.get('@modal').should('not.be.empty');
    cy.get('@modal').find('h2').contains('77740');
    cy.get('body').type('{esc}');
    cy.get('@modal').should('be.empty');
    cy.get(bunSelector).find('.counter__num').should('not.exist');
    cy.get(mainSelector).find('.counter__num').should('not.exist');
    cy.get('@constructor').find('li').should('have.length', 0); 
  });
})
