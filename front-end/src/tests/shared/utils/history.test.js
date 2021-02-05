import history from '../../../shared/utils/history';

describe('Test history method', () => {
  it('Should check push method is available or not', () => {
    const output = history;
    expect(output.push).toBeTruthy();
  });
});
