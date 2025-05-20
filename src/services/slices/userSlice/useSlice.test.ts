import reducer, {
  initialState,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  getOrdersAll,
  userLogout,
  resetError
} from './userSlice';

describe('Тестирование редьюсера userSlice', () => {
  test('проверка корректности инициализации', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  test('проверка выхода из системы', () => {
    const prevState = { ...initialState, userData: { email: 'test@test.com', name: 'Имярек' } };
    const nextState = reducer(prevState, userLogout());
    expect(nextState.userData).toBeNull();
  });

  test('проверка сбрасывания ошибки', () => {
    const prevState = { ...initialState, error: 'Ошибка' };
    const nextState = reducer(prevState, resetError());
    expect(nextState.error).toBeNull();
  });

  describe('Тестирование экшена registerUser', () => {
    test('проверка состояния pending', () => {
      const action = { type: registerUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: true,
        error: null,
        isAuthChecked: true,
        isAuthenticated: false
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: false,
        error: 'Ошибка регистрации',
        isAuthChecked: false
      });
    });

    test('проверка состояния fulfilled', () => {
      const user = { email: 'test@test.com', name: 'Имярек' };
      const action = {
        type: registerUser.fulfilled.type,
        payload: { user }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: false,
        error: null,
        response: user,
        userData: user,
        isAuthChecked: false,
        isAuthenticated: true
      });
    });
  });

  describe('Тестирование экшена loginUser', () => {
    test('проверка состояния pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        loginUserRequest: true,
        error: null,
        isAuthChecked: true,
        isAuthenticated: false
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        loginUserRequest: false,
        isAuthChecked: false,
        error: 'Ошибка входа'
      });
    });

    test('проверка состояния fulfilled', () => {
      const user = { email: 'test@test.com', name: 'Имярек' };
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        error: null,
        loginUserRequest: false,
        isAuthChecked: false,
        isAuthenticated: true,
        userData: user
      });
    });
  });

  describe('Тестирование экшена getUser', () => {
    test('проверка состояния pending', () => {
      const action = { type: getUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        isAuthenticated: true,
        isAuthChecked: true,
        loginUserRequest: true
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: getUser.rejected.type,
        error: { message: 'Пользователь не авторизован' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        isAuthenticated: false,
        isAuthChecked: false,
        loginUserRequest: false
      });
    });

    test('проверка состояния fulfilled', () => {
      const user = { email: 'test@test.com', name: 'Имярек' };
      const action = {
        type: getUser.fulfilled.type,
        payload: { user }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        isAuthenticated: true,
        userData: user,
        isAuthChecked: false,
        loginUserRequest: false
      });
    });
  });

  describe('Тестирование экшена updateUser', () => {
    test('проверка состояния pending', () => {
      const action = { type: updateUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: true,
        error: null
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: false,
        error: 'Ошибка обновления'
      });
    });

    test('проверка состояния fulfilled', () => {
      const user = { email: 'test@test.com', name: 'Имярек' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: { user }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        request: false,
        error: null,
        response: user
      });
    });
  });

  describe('Тестирование экшена logoutUser', () => {
    test('проверка состояния pending', () => {
      const action = { type: logoutUser.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        isAuthenticated: true,
        isAuthChecked: true,
        error: null,
        request: true
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: logoutUser.rejected.type,
        error: { message: 'Ошибка выхода из системы' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        isAuthenticated: true,
        isAuthChecked: false,
        error: 'Ошибка выхода из системы',
        request: false
      });
    });

    test('проверка состояния fulfilled', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = reducer({ ...initialState, isAuthenticated: true, userData: { email: 'a@a.com', name: 'a' } }, action);
      expect(state).toMatchObject({
        isAuthenticated: false,
        isAuthChecked: false,
        error: null,
        request: false,
        userData: null
      });
    });
  });

  describe('Тестирование экшена getOrdersAll', () => {
    test('проверка состояния pending', () => {
      const action = { type: getOrdersAll.pending.type };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        error: null,
        request: true
      });
    });

    test('проверка состояния rejected', () => {
      const action = {
        type: getOrdersAll.rejected.type,
        error: { message: 'Ошибка загрузки заказов' }
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        error: 'Ошибка загрузки заказов',
        request: false
      });
    });

    test('проверка состояния fulfilled', () => {
      const orders = [
        { _id: '1', status: 'done', name: 'test-order', createdAt: '', updatedAt: '', number: 1, ingredients: [] }
      ];
      const action = {
        type: getOrdersAll.fulfilled.type,
        payload: orders
      };
      const state = reducer(initialState, action);
      expect(state).toMatchObject({
        error: null,
        request: false,
        userOrders: orders
      });
    });
  });
});
