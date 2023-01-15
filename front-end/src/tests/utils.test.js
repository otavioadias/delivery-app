import getDateNow from '../utils/formatDate';
import removeComma from '../utils/removeComma';
import validateEmail from '../utils/validate';

describe('1 - Testa os utils', () => {
  it('getDateNow', () => {
    // arrange
    const now = new Date('2021-12-31');
    jest.spyOn(global, 'Date').mockImplementation(() => now);

    const date = getDateNow();

    expect(date).toBe('2021-12-31T00:00:00.000Z');
    // restore time
    global.Date.mockRestore();
    // act
    // assert
  });
  it('removeComma caso 1', () => {
    const value = '10.5';
    const result = removeComma(value);

    expect(result).toBe('10,5');
  });

  it('removeComma caso 2', () => {
    const result = removeComma();

    expect(result).toBeNull();
  });

  it('removeComma caso 3', () => {
    const value = '10,5';
    const result = removeComma(value);

    expect(result).toBe(value);
  });

  it('valido email', () => {
    const email = 'test@example.com';
    const result = validateEmail(email);

    expect(result).toBe(true);
  });

  it('invalido email', () => {
    const email = 'testexample.com';
    const result = validateEmail(email);

    expect(result).toBe(false);
  });
});
