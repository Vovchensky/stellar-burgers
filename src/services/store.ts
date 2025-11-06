import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import ordersSlice from './slices/orderSlice';
import userSlice from './slices/userSlice';
import constructorSlice from './slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const reducersMap = {
  allIngredients: ingredientsSlice,
  orders: ordersSlice,
  user: userSlice,
  burger: constructorSlice
};

const rootReducer = combineReducers(reducersMap);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
