import '@testing-library/jest-dom';
import userReducer, {
  performRegistration,
  performLogin,
  performLogout,
  fetchUserData,
  saveUserData
} from './userSlice';
import { TUser } from '@utils-types';

describe('userSlice', () => {
  const initialState = {
    user: null,
    authResolved: false,
    error: null
  };

  const mockUser: TUser = {
    email: 'test@test.com',
    name: 'Test User'
  };

  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle performRegistration.pending', () => {
    const action = { type: performRegistration.pending.type };
    const result = userReducer(initialState, action);

    expect(result.error).toBeNull();
  });

  it('should handle performRegistration.fulfilled', () => {
    const action = {
      type: performRegistration.fulfilled.type,
      payload: { user: mockUser }
    };
    const result = userReducer(initialState, action);

    expect(result.user).toEqual(mockUser);
    expect(result.authResolved).toBe(true);
  });

  it('should handle performRegistration.rejected', () => {
    const action = {
      type: performRegistration.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const result = userReducer(initialState, action);

    expect(result.error).toBe('Ошибка регистрации');
    expect(result.authResolved).toBe(true);
  });

  it('should handle performLogin.pending', () => {
    const action = { type: performLogin.pending.type };
    const result = userReducer(initialState, action);

    expect(result.error).toBeNull();
  });

  it('should handle performLogin.fulfilled', () => {
    const action = {
      type: performLogin.fulfilled.type,
      payload: { user: mockUser }
    };
    const result = userReducer(initialState, action);

    expect(result.user).toEqual(mockUser);
    expect(result.authResolved).toBe(true);
  });

  it('should handle performLogin.rejected', () => {
    const action = {
      type: performLogin.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const result = userReducer(initialState, action);

    expect(result.error).toBe('Ошибка входа');
    expect(result.authResolved).toBe(true);
  });

  it('should handle performLogout.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = { type: performLogout.fulfilled.type };
    const result = userReducer(stateWithUser, action);

    expect(result.user).toBeNull();
    expect(result.authResolved).toBe(true);
  });

  it('should handle performLogout.rejected', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = {
      type: performLogout.rejected.type,
      error: { message: 'Ошибка выхода' }
    };
    const result = userReducer(stateWithUser, action);

    expect(result.user).toBeNull();
    expect(result.authResolved).toBe(true);
    expect(result.error).toBe('Ошибка выхода');
  });

  it('should handle fetchUserData.fulfilled', () => {
    const action = {
      type: fetchUserData.fulfilled.type,
      payload: { user: mockUser }
    };
    const result = userReducer(initialState, action);

    expect(result.user).toEqual(mockUser);
    expect(result.authResolved).toBe(true);
  });

  it('should handle fetchUserData.rejected', () => {
    const action = {
      type: fetchUserData.rejected.type,
      error: { message: 'Не авторизован' }
    };
    const result = userReducer(initialState, action);

    expect(result.user).toBeNull();
    expect(result.authResolved).toBe(true);
    expect(result.error).toBe('Не авторизован');
  });

  it('should handle saveUserData.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const action = {
      type: saveUserData.fulfilled.type,
      payload: { user: updatedUser }
    };
    const result = userReducer(stateWithUser, action);

    expect(result.user).toEqual(updatedUser);
  });

  it('should handle saveUserData.rejected', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = {
      type: saveUserData.rejected.type,
      error: { message: 'Ошибка обновления' }
    };
    const result = userReducer(stateWithUser, action);

    expect(result.error).toBe('Ошибка обновления');
  });
});
