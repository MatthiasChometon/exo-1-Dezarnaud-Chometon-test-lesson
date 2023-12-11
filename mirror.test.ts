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
    jest.spyOn(Date.prototype, 'getHours').mockImplementation(() => 10)
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => { });
    mirror('reer');
    expect(mockConsoleLog.mock.calls[0][0]).toBe('Bonjour! Bienvenue dans l\'application miroir et palindrome.');
  });
});
