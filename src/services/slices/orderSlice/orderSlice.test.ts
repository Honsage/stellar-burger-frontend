import orderReducer, { getOrderByNumber, initialState } from './orderSlice';

describe('Тестирование редьюсера orderSlice', () => {
  test('проверка корректности инициализации', () => {
    expect(orderReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('проверка экшена getOrderByNumber.pending', () => {
    const action = { type: getOrderByNumber.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.request).toBe(true);
    expect(state.error).toBeNull();
  });

  test('проверка экшена getOrderByNumber.fulfilled', () => {
    const payload = {
      orders: [
        {
            "_id":"643da03d45c6f2001be6ae12",
            "ingredients":["643d69a5c3f7b9001cfa093d","643d69a5c3f7b9001cfa0943","643d69a5c3f7b9001cfa0941","643d69a5c3f7b9001cfa0940","643d69a5c3f7b9001cfa093d"],
            "owner":"643d70a445c6f2001be6ad37",
            "status":"done",
            "name":"Био-марсианский space метеоритный флюоресцентный бургер",
            "createdAt":"2023-04-17T19:38:37.635Z",
            "updatedAt":"2023-04-17T19:38:37.654Z",
            "number":498,
        }
      ]
    };

    const action = { type: getOrderByNumber.fulfilled.type, payload };
    const state = orderReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBeNull();
    expect(state.orderByNumberResponse).toEqual(payload.orders[0]);
  });

  test('проверка экшена getOrderByNumber.rejected', () => {
    const errorMessage = 'Ошибка загрузки заказа';
    const action = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };

    const state = orderReducer(initialState, action);

    expect(state.request).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
