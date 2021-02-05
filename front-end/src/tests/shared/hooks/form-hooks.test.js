import { act, renderHook } from '@testing-library/react-hooks';
import useForm from '../../../shared/hooks/form-hooks';

test('it should update value in object', () => {
  const initailInputs = {
    title: {
      value: '',
      isValid: false,
    },
  };
  const { result } = renderHook(() => useForm(initailInputs, false));
  const [formState, inputHandler] = result.current;
  expect(formState.inputs.title.value).toBe('');
  act(() => {
    inputHandler('title', 'value', true);
  });
  expect(result.current[0].inputs.title.value).toEqual('value');
});
