import { authService } from './authService';

describe('AuthService', () => {
  // Mock localStorage
  let localStorageMock: { [key: string]: string } = {};
  const localStorageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => localStorageMock[key]);
  const localStorageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
    localStorageMock[key] = value;
  });

  beforeEach(() => {
    // Clear mock before each test
    localStorageMock = {};
  });

  afterAll(() => {
    // Restore original implementations
    localStorageGetItemSpy.mockRestore();
    localStorageSetItemSpy.mockRestore();
  });

  describe('signInWithGoogle', () => {
    it('should set a mock user in localStorage', async () => {
      const user = await authService.signInWithGoogle();

      expect(user).toBeDefined();
      expect(user.name).toBe('Google User');
      expect(user.role).toBe('client');

      const storedUser = JSON.parse(localStorageMock['currentUser']);
      expect(storedUser).toEqual(user);
    });
  });

  describe('signInWithTelegram', () => {
    it('should set a mock user in localStorage', async () => {
      const user = await authService.signInWithTelegram();

      expect(user).toBeDefined();
      expect(user.name).toBe('Telegram User');
      expect(user.role).toBe('client');

      const storedUser = JSON.parse(localStorageMock['currentUser']);
      expect(storedUser).toEqual(user);
    });
  });
});
