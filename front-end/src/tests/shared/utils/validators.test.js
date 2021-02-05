import {
  validate,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_MIN,
  VALIDATOR_MAX,
  VALIDATOR_EMAIL,
  VALIDATOR_FILE,
} from '../../../shared/utils/validators';

describe('Test validate method for all validations', () => {
  it('Should validate function when value is empty', () => {
    const validators = [VALIDATOR_REQUIRE()];
    const result = validate('', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for min length', () => {
    const validators = [VALIDATOR_MINLENGTH(6)];
    const result = validate('three', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for max length', () => {
    const validators = [VALIDATOR_MAXLENGTH(6)];
    const result = validate('fourtest', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for min value', () => {
    const validators = [VALIDATOR_MIN(5)];
    const result = validate('4', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for max value', () => {
    const validators = [VALIDATOR_MAX(5)];
    const result = validate('6', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for typed email', () => {
    const validators = [VALIDATOR_EMAIL()];
    const result = validate('testgmail.com', validators);
    expect(result).toBeFalsy();
  });

  it('Should validate function for file', () => {
    const validators = [VALIDATOR_FILE()];
    const result = validate('testgmail.com', validators);
    expect(result).toBeTruthy();
  });
});
