import * as Notifications from 'expo-notifications';

// Get mocked functions - cast to any to avoid TypeScript issues with mocks
const mockGetPermissionsAsync = Notifications.getPermissionsAsync as jest.Mock;
const mockRequestPermissionsAsync = Notifications.requestPermissionsAsync as jest.Mock;
const mockGetExpoPushTokenAsync = Notifications.getExpoPushTokenAsync as jest.Mock;

describe('useNotificationPermission - Permission Mapping', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPermissionsAsync mock', () => {
    it('should return undetermined by default', async () => {
      const result = await mockGetPermissionsAsync();
      expect(result.status).toBe('undetermined');
    });

    it('should return granted when mocked', async () => {
      mockGetPermissionsAsync.mockResolvedValueOnce({
        status: 'granted',
      });

      const result = await mockGetPermissionsAsync();
      expect(result.status).toBe('granted');
    });

    it('should return denied when mocked', async () => {
      mockGetPermissionsAsync.mockResolvedValueOnce({
        status: 'denied',
      });

      const result = await mockGetPermissionsAsync();
      expect(result.status).toBe('denied');
    });
  });

  describe('requestPermissionsAsync mock', () => {
    it('should return granted by default', async () => {
      const result = await mockRequestPermissionsAsync();
      expect(result.status).toBe('granted');
    });

    it('should be callable', () => {
      expect(typeof mockRequestPermissionsAsync).toBe('function');
    });
  });

  describe('getExpoPushTokenAsync mock', () => {
    it('should return a push token', async () => {
      const result = await mockGetExpoPushTokenAsync();
      expect(result.data).toBe('ExponentPushToken[test-token-123]');
    });

    it('should be callable with projectId', async () => {
      const result = await mockGetExpoPushTokenAsync({ projectId: 'test-project' });
      expect(result.data).toBeDefined();
    });
  });

  describe('notification listeners', () => {
    it('should add notification received listener', () => {
      const callback = jest.fn();
      const subscription = Notifications.addNotificationReceivedListener(callback);
      expect(subscription).toHaveProperty('remove');
    });

    it('should add notification response listener', () => {
      const callback = jest.fn();
      const subscription = Notifications.addNotificationResponseReceivedListener(callback);
      expect(subscription).toHaveProperty('remove');
    });
  });
});
