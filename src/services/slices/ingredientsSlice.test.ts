import '@testing-library/jest-dom';
import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    allIngredients: [],
    isLoading: false,
    error: null
  };

  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large'
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      proteins: 20,
      fat: 20,
      carbohydrates: 20,
      calories: 200,
      price: 200,
      image: 'image',
      image_mobile: 'image_mobile',
      image_large: 'image_large'
    }
  ];

  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.allIngredients).toEqual(mockIngredients);
    expect(result.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };
    const result = ingredientsReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки');
  });
});
