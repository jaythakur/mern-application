import { act, renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../../../shared/hooks/auth-hook';

test('default user id and token should be null', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.userId).toBeNull();
  expect(result.current.token).toBeNull();
});

test('set userId and token', () => {
  const { result } = renderHook(() => useAuth());
  act(() => {
    result.current.login('123456', 'token');
  });
  expect(result.current.userId).toEqual('123456');
  expect(result.current.token).toEqual('token');
});

test('should call logout function and remove userId and token', () => {
  const { result } = renderHook(() => useAuth());
  act(() => {
    result.current.login('123456', 'token');
  });
  expect(result.current.userId).toEqual('123456');
  expect(result.current.token).toEqual('token');
  act(() => {
    result.current.logout();
  });
  expect(result.current.userId).toBeNull();
  expect(result.current.token).toBeNull();
});
