import store, { rootReducer } from './store';
import constructorSlice from './slices/constructorSlice/constructorSlice';
import orderSlice from './slices/orderSlice/orderSlice';
import feedSlice from './slices/feedSlice/feedSlice';
import userSlice from './slices/userSlice/userSlice';
import ingredientSlice from './slices/ingredientSlice/ingredientSlice';

describe('Тестирование Redux Store', () => {
  test('проверка инициализации rootReducer', () => {
    const expectedKeys = [
      'ingredient',
      'order',
      'constructorBurger',
      'feed',
      'user'
    ];

    const rootState = rootReducer(undefined, { type: '@@INIT' });

    expect(Object.keys(rootState)).toEqual(expect.arrayContaining(expectedKeys));
  });

  test('проверка подключения слайсов к store ', () => {
    const state = store.getState();

    expect(state.ingredient).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.constructorBurger).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.user).toBeDefined();
  });

  test('проверка на корректность определения dispatch', () => {
    expect(typeof store.dispatch).toBe('function');
  });
});
