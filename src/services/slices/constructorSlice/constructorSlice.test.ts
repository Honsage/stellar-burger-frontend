import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  initialState
} from './constructorSlice';

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const testSauce = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

const testMain = {
  _id: '643d69a5c3f7b9001cfa0946',
  name: 'Хрустящие минеральные кольца',
  type: 'main',
  proteins: 808,
  fat: 689,
  carbohydrates: 609,
  calories: 986,
  price: 300,
  image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
};

describe('Тестирование редьюсера constructorSlice', () => {
  test('проверка корректности инициализации', () => {
    expect(constructorReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('проверка добавления начинки (экшен addIngredient)', () => {
    const action = addIngredient(testMain);
    const state = constructorReducer(initialState, action);

    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0]).toMatchObject(testMain);
    expect(state.constructorItems.ingredients[0].id).toBeDefined();
  });

  test('проверка добавления булки (экшен addIngredient)', () => {
    const action = addIngredient(testBun);
    const state = constructorReducer(initialState, action);

    expect(state.constructorItems.bun).toMatchObject(testBun);
    expect(state.constructorItems.bun?.id).toBeDefined();
  });

  test('проверка экшена removeIngredient', () => {
    const add1 = addIngredient(testSauce);
    const add2 = addIngredient(testMain);
    const addedState = [add1, add2].reduce(constructorReducer, initialState);
    const idToRemove = addedState.constructorItems.ingredients[0].id;

    const state = constructorReducer(addedState, removeIngredient(idToRemove));

    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0].id).not.toBe(idToRemove);
  });

  test('проверка экшена moveIngredientUp', () => {
    const ing1 = addIngredient(testMain);
    const ing2 = addIngredient(testSauce);
    const state = [ing1, ing2].reduce(constructorReducer, initialState);

    const moved = constructorReducer(state, moveIngredientUp(1));
    const ids = moved.constructorItems.ingredients.map((i) => i.id);

    expect(ids[0]).toBe(state.constructorItems.ingredients[1].id);
    expect(ids[1]).toBe(state.constructorItems.ingredients[0].id);
  });

  test('проверка экшена moveIngredientDown', () => {
    const ing1 = addIngredient(testSauce);
    const ing2 = addIngredient(testMain);
    const state = [ing1, ing2].reduce(constructorReducer, initialState);

    const moved = constructorReducer(state, moveIngredientDown(0));
    const ids = moved.constructorItems.ingredients.map((i) => i.id);

    expect(ids[0]).toBe(state.constructorItems.ingredients[1].id);
    expect(ids[1]).toBe(state.constructorItems.ingredients[0].id);
  });
});
