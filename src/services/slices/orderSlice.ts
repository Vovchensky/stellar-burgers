import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface OrdersState {
  feeds: TOrder[];
  userOrders: TOrder[];
  orderRequest: boolean;
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  totalToday: number;
}

const initialOrdersState: OrdersState = {
  feeds: [],
  userOrders: [],
  orderRequest: false,
  currentOrder: null,
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};

export const fetchFeeds = createAsyncThunk('orders/fetchFeeds', getFeedsApi);
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  getOrdersApi
);
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  orderBurgerApi
);
export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  getOrderByNumberApi
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка загрузки заказов пользователя';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка при оформлении заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload.orders[0];
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки деталей заказа';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
