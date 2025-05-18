import ingredientReducer, { getIngredients, initialState } from './ingredientSlice';
import { TIngredient } from '@utils-types';

describe('Тестирование редьюсера ingredientSlice', () => {
  test('проверка корректности инициализации', () => {
    expect(ingredientReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('проверка экшена getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка экшена getIngredients.fulfilled', () => {
    const payload: TIngredient[] = [
      {
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
      }
    ];

    const action = { type: getIngredients.fulfilled.type, payload };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual(payload);
  });

  test('проверка экшена getIngredients.rejected', () => {
    const errorMessage = 'Не удалось загрузить ингредиенты';
    const action = { type: getIngredients.rejected.type, error: { message: errorMessage } };
    const state = ingredientReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
