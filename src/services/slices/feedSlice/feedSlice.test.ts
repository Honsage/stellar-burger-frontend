import feedReducer, { getFeeds, initialState } from './feedSlice';

describe('Тестирование редьюсера feedSlice', () => {
  test('проверка корректности инициализации', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('проверка экшена getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка экшена getFeeds.fulfilled', () => {
    const payload = {
      orders: [{ _id: '1', status: 'done', name: 'order1', createdAt: '', updatedAt: '', number: 1, ingredients: [] }],
      total: 10,
      totalToday: 5
    };
    const action = { type: getFeeds.fulfilled.type, payload };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(payload.total);
    expect(state.totalToday).toBe(payload.totalToday);
  });

  test('проверка экшена getFeeds.rejected', () => {
    const errorMessage = 'Ошибка запроса';
    const action = { type: getFeeds.rejected.type, error: { message: errorMessage } };
    const state = feedReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
