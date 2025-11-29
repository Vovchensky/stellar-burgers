import '@testing-library/jest-dom';
import ordersReducer, {
  clearCurrentOrder,
  fetchFeeds,
  fetchUserOrders,
  createOrder,
  fetchOrderByNumber
} from './orderSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = {
    feeds: [],
    userOrders: [],
    orderRequest: false,
    currentOrder: null,
    isLoading: false,
    error: null,
    total: 0,
    totalToday: 0
  };

  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Бургер',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 12345,
    ingredients: ['1', '2', '3']
  };

  it('should return initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearCurrentOrder', () => {
    const stateWithOrder = { ...initialState, currentOrder: mockOrder };
    const result = ordersReducer(stateWithOrder, clearCurrentOrder());

    expect(result.currentOrder).toBeNull();
  });

  it('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: {
        orders: [mockOrder],
        total: 100,
        totalToday: 10
      }
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.feeds).toEqual([mockOrder]);
    expect(result.total).toBe(100);
    expect(result.totalToday).toBe(10);
  });

  it('should handle fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка');
  });

  it('should handle fetchUserOrders.pending', () => {
    const action = { type: fetchUserOrders.pending.type };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.userOrders).toEqual([mockOrder]);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: 'Ошибка' }
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка');
  });

  it('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const result = ordersReducer(initialState, action);

    expect(result.orderRequest).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const result = ordersReducer(initialState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.currentOrder).toEqual(mockOrder);
  });

  it('should handle createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка заказа' }
    };
    const result = ordersReducer(initialState, action);

    expect(result.orderRequest).toBe(false);
    expect(result.error).toBe('Ошибка заказа');
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: { orders: [mockOrder] }
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.currentOrder).toEqual(mockOrder);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Не найден' }
    };
    const result = ordersReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Не найден');
  });
});
