import '@testing-library/jest-dom';
import constructorReducer, {
  addIngredient,
  deleteIngredient,
  reorderIngredient,
  resetConstructor
} from './constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid-123'
}));

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
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
  };

  const mockIngredient: TIngredient = {
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
  };

  const mockSauce: TIngredient = {
    _id: '3',
    name: 'Соус',
    type: 'sauce',
    proteins: 5,
    fat: 5,
    carbohydrates: 5,
    calories: 50,
    price: 50,
    image: 'image',
    image_mobile: 'image_mobile',
    image_large: 'image_large'
  };

  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle addIngredient for bun', () => {
    const result = constructorReducer(initialState, addIngredient(mockBun));

    expect(result.bun).toEqual({
      ...mockBun,
      id: 'test-uuid-123'
    });
    expect(result.ingredients).toHaveLength(0);
  });

  it('should handle addIngredient for main ingredient', () => {
    const result = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual({
      ...mockIngredient,
      id: 'test-uuid-123'
    });
  });

  it('should handle deleteIngredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [
        { ...mockIngredient, id: 'test-id-to-delete' } as TConstructorIngredient
      ]
    };

    const result = constructorReducer(
      stateWithIngredient,
      deleteIngredient('test-id-to-delete')
    );

    expect(result.ingredients).toHaveLength(0);
  });

  it('should handle reorderIngredient', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        {
          ...mockIngredient,
          id: 'id-1',
          name: 'Первый'
        } as TConstructorIngredient,
        { ...mockSauce, id: 'id-2', name: 'Второй' } as TConstructorIngredient,
        {
          ...mockIngredient,
          id: 'id-3',
          name: 'Третий'
        } as TConstructorIngredient
      ]
    };

    const result = constructorReducer(
      stateWithIngredients,
      reorderIngredient({ from: 0, to: 2 })
    );

    expect(result.ingredients[0].name).toBe('Второй');
    expect(result.ingredients[1].name).toBe('Третий');
    expect(result.ingredients[2].name).toBe('Первый');
  });

  it('should handle resetConstructor', () => {
    const stateWithData = {
      bun: { ...mockBun, id: 'bun-id' } as TConstructorIngredient,
      ingredients: [
        { ...mockIngredient, id: 'ing-id' } as TConstructorIngredient
      ]
    };

    const result = constructorReducer(stateWithData, resetConstructor());

    expect(result.bun).toBeNull();
    expect(result.ingredients).toHaveLength(0);
  });
});
