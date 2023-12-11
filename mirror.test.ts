import { getMomentOfDay, reverseString, mirror } from './mirror';

describe('getMomentOfDay', () => {
  it('returns "Bonjour" in the morning', () => {
    jest.spyOn(Date.prototype, 'getHours').mockImplementation(() => 10)
    expect(getMomentOfDay()).toBe('Bonjour');
  });

  it('returns "Bon après-midi" in the afternoon', () => {
    jest.spyOn(Date.prototype, 'getHours').mockImplementation(() => 15)
    expect(getMomentOfDay()).toBe('Bon après-midi');
  });

  it('returns "Bonsoir" in the evening', () => {
    jest.spyOn(Date.prototype, 'getHours').mockImplementation(() => 23)
    expect(getMomentOfDay()).toBe('Bonsoir');
  });
});

describe('reverseString', () => {
  it('reverses a string correctly', () => {
    expect(reverseString('hello')).toBe('olleh');
  });
});

describe('mirror', () => {
  it('prints the correct greeting', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementationOnce(() => { });
    mirror('reer');
    expect(mockConsoleLog).toHaveBeenCalledWith('Bonjour! Bienvenue dans l\'application miroir et palindrome.');
  });
});
