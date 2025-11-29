import '@testing-library/jest-dom';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import constructorSlice from './slices/constructorSlice';

describe('rootReducer', () => {
  const rootReducer = combineReducers({
    allIngredients: ingredientsSlice,
    orders: ordersSlice,
    user: userSlice,
    burger: constructorSlice
  });

  it('should initialize correctly with all reducers', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state).toHaveProperty('allIngredients');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('burger');
  });

  it('should have correct initial state for allIngredients', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state.allIngredients).toEqual({
      allIngredients: [],
      isLoading: false,
      error: null
    });
  });

  it('should have correct initial state for orders', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state.orders).toEqual({
      feeds: [],
      userOrders: [],
      orderRequest: false,
      currentOrder: null,
      isLoading: false,
      error: null,
      total: 0,
      totalToday: 0
    });
  });

  it('should have correct initial state for user', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state.user).toEqual({
      user: null,
      authResolved: false,
      error: null
    });
  });

  it('should have correct initial state for burger', () => {
    const state = rootReducer(undefined, { type: 'unknown' });

    expect(state.burger).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
