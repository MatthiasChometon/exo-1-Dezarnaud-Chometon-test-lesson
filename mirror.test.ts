import { getMomentOfDay, reverseString, mirror } from './mirror';

describe('getMomentOfDay', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2020, 3, 1));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns "Bonjour" in the morning', () => {
    expect(getMomentOfDay()).toBe('Bonjour');
  });

  it('returns "Bon après-midi" in the afternoon', () => {
    expect(getMomentOfDay()).toBe('Bon après-midi');
  });

  it('returns "Bonsoir" in the evening', () => {
    expect(getMomentOfDay()).toBe('Bonsoir');
  });
});

describe('reverseString', () => {
  it('reverses a string correctly', () => {
    expect(reverseString('hello')).toBe('olleh');
  });
});

describe('main', () => {
  // You can add more its for different scenarios in the main function
  it('prints the correct greeting', () => {
    // Mocking console.log to capture the output
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementationOnce(() => { });

    mirror('reer');

    // Check if the correct greeting is printed
    expect(mockConsoleLog).toHaveBeenCalledWith('Bonjour! Bienvenue dans l\'application miroir et palindrome.');
  });
});
