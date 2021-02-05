import 'whatwg-fetch';
import { act, renderHook } from '@testing-library/react-hooks';

import { useHttpClient } from '../../../shared/hooks/http-hooks';

test('it should validate sucess', async () => {
  const { result } = renderHook(() => useHttpClient());
  const expected = { users: [{ name: 'test' }] };
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      ok: true,
      json: () => Promise.resolve(expected),
    };
    return Promise.resolve(fetchResponse);
  });
  let output;
  await act(async () => {
    output = await result.current.sendRequest('http://localhost/users');
    expect(output).toMatchObject(expected);
  });

  expect(window.fetch).toHaveBeenCalledWith('http://localhost/users', {
    body: null,
    headers: {},
    method: 'GET',
  });

  expect(window.fetch).toHaveBeenCalledTimes(1);
});

test('it should validate fail', async () => {
  const { result } = renderHook(() => useHttpClient());
  jest
    .spyOn(window, 'fetch')
    // eslint-disable-next-line prefer-promise-reject-errors
    .mockImplementation(() => Promise.reject('something bad happened'));
  await act(async () => {
    await result.current
      .sendRequest('http://localhost/users')
      .catch((e) => expect(e).toMatch('something bad happened'));
  });

  expect(window.fetch).toHaveBeenCalledWith('http://localhost/users', {
    body: null,
    headers: {},
    method: 'GET',
  });

  expect(window.fetch).toHaveBeenCalledTimes(1);
  expect(result.current.error).toEqual(
    'Something went wrong, please try again.',
  );

  act(() => {
    result.current.clearError();
  });
  expect(result.current.error).toBeNull();
});

test('it should validate when response is not ok', async () => {
  const { result } = renderHook(() => useHttpClient());
  const expected = { message: 'fail' };
  jest.spyOn(window, 'fetch').mockImplementation(() => {
    const fetchResponse = {
      ok: false,
      json: () => Promise.resolve(expected),
    };
    return Promise.resolve(fetchResponse);
  });
  await act(async () => {
    await result.current
      .sendRequest('http://localhost/users')
      .catch((e) => expect(e).toMatchObject(expected));
  });
});
