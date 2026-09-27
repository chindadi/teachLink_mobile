import { useAppStore } from '../../store';
import { checkAuthStatus, login, logout } from '../auth';
import authService from '../mobileAuth';

jest.mock('../mobileAuth', () => ({
  __esModule: true,
  default: {
    login: jest.fn(),
    logout: jest.fn(),
    restoreSession: jest.fn(),
  },
}));

jest.mock('../api/axios.config', () => ({
  clearRefreshQueue: jest.fn(),
}));

jest.mock('../../utils/logger', () => ({
  __esModule: true,
  default: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock('../pushNotifications', () => ({
  unregisterTokenFromBackend: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('../sentryContext', () => ({
  sentryContextService: {
    setUser: jest.fn(),
    clearUser: jest.fn(),
    resetSession: jest.fn(),
  },
}));

const mockMobileAuth = authService as jest.Mocked<typeof authService>;

const user = { id: 'user-1', name: 'Ada Lovelace', email: 'ada@example.com' };
const tokens = {
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  expiresAt: Date.now() + 60_000,
};
const session = { user, tokens };

describe('auth service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAppStore.setState({
      user: null,
      isAuthenticated: false,
      isAuthLoading: false,
      authError: null,
      accessToken: null,
      refreshToken: null,
      sessionExpiresAt: null,
    });
  });

  it('validates, normalizes, and stores a successful login', async () => {
    mockMobileAuth.login.mockResolvedValueOnce(session);

    await login({ email: ' ADA@Example.com ', password: 'secret123', rememberMe: true });

    expect(mockMobileAuth.login).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'secret123',
      rememberMe: true,
    });
    expect(useAppStore.getState().user).toEqual(user);
    expect(useAppStore.getState().accessToken).toBe(tokens.accessToken);
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('rejects invalid login input before calling the auth service', async () => {
    await expect(login({ email: 'not-an-email', password: 'secret123' })).rejects.toThrow(
      'valid email address'
    );

    expect(mockMobileAuth.login).not.toHaveBeenCalled();
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('sets the login error and clears loading when authentication fails', async () => {
    mockMobileAuth.login.mockRejectedValueOnce(new Error('Invalid credentials'));

    await expect(login({ email: 'ada@example.com', password: 'wrongpass' })).rejects.toThrow(
      'Invalid credentials'
    );

    expect(useAppStore.getState().authError).toBe('Invalid credentials');
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('logs out and clears local auth state', async () => {
    useAppStore.setState({ user, isAuthenticated: true, accessToken: tokens.accessToken });
    mockMobileAuth.logout.mockResolvedValueOnce(undefined);

    await logout();

    expect(useAppStore.getState().user).toBeNull();
    expect(useAppStore.getState().isAuthenticated).toBe(false);
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('still clears local state if remote logout fails', async () => {
    useAppStore.setState({ user, isAuthenticated: true, accessToken: tokens.accessToken });
    mockMobileAuth.logout.mockRejectedValueOnce(new Error('Network unavailable'));

    await expect(logout()).resolves.toBeUndefined();

    expect(useAppStore.getState().user).toBeNull();
    expect(useAppStore.getState().isAuthenticated).toBe(false);
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('restores a valid session', async () => {
    mockMobileAuth.restoreSession.mockResolvedValueOnce(session);

    await expect(checkAuthStatus()).resolves.toBe(true);

    expect(useAppStore.getState().user).toEqual(user);
    expect(useAppStore.getState().accessToken).toBe(tokens.accessToken);
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });

  it('returns false and clears state when no session can be restored', async () => {
    mockMobileAuth.restoreSession.mockResolvedValueOnce(null);

    await expect(checkAuthStatus()).resolves.toBe(false);

    expect(useAppStore.getState().isAuthenticated).toBe(false);
    expect(useAppStore.getState().user).toBeNull();
    expect(useAppStore.getState().isAuthLoading).toBe(false);
  });
});
