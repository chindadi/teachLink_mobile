import { io, Socket } from 'socket.io-client';

import { getEnv } from '../../config';
import { appLogger } from '../../utils/logger';

// ─── Reconnection config ──────────────────────────────────────────────────────

const RECONNECTION_ATTEMPTS = 10;
const RECONNECTION_DELAY_MS = 1_000; // initial delay
const RECONNECTION_DELAY_MAX_MS = 30_000; // cap at 30 s

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;

    if (!this.socket) {
      const socketUrl = getEnv('EXPO_PUBLIC_SOCKET_URL');

      this.socket = io(socketUrl, {
        transports: ['websocket'],
        autoConnect: true,
        // ── Reconnection ──────────────────────────────────────────────────
        reconnection: true,
        reconnectionAttempts: RECONNECTION_ATTEMPTS,
        reconnectionDelay: RECONNECTION_DELAY_MS,
        reconnectionDelayMax: RECONNECTION_DELAY_MAX_MS,
        randomizationFactor: 0.5, // jitter to avoid thundering herd
        // ── Compression ───────────────────────────────────────────────────
        perMessageDeflate: true, // Enable transport-level deflate/gzip compression
      });

      // ── Connection lifecycle ──────────────────────────────────────────

      this.socket.on('connect', () => {
        appLogger.info('Socket connected:', this.socket?.id);
        // Verify transport headers and extensions in development mode
        const transport = (this.socket as any).io?.engine?.transport;
        if (transport) {
          appLogger.debug(`Socket active transport: ${transport.name}`);
        }
      });

      this.socket.on('disconnect', (reason: string) => {
        appLogger.warn('Socket disconnected:', reason);
        // socket.io auto-reconnects unless the server explicitly closed it
        if (reason === 'io server disconnect') {
          // Server forced disconnect — reconnect manually
          this.socket?.connect();
        }
      });

      this.socket.on('error', (error: unknown) => {
        appLogger.error('Socket error:', error);
      });

      // ── Reconnection listeners ────────────────────────────────────────

      this.socket.on('reconnect_attempt', (attempt: number) => {
        appLogger.info(`Socket reconnection attempt #${attempt}`);
      });

      this.socket.on('reconnect', (attempt: number) => {
        appLogger.info(`Socket reconnected after ${attempt} attempt(s)`);
      });

      this.socket.on('reconnect_error', (error: unknown) => {
        appLogger.warn('Socket reconnection error:', error);
      });

      this.socket.on('reconnect_failed', () => {
        appLogger.error(`Socket failed to reconnect after ${RECONNECTION_ATTEMPTS} attempts`);
      });

      // ── Real-time event handlers ──────────────────────────────────────

      this.socket.on('notification_created', (notification: any) => {
        const start = performance.now();
        const rawString = JSON.stringify(notification);
        const sizeBytes = rawString.length;
        appLogger.info(
          `[Socket In] Event: notification_created, size: ${(sizeBytes / 1024).toFixed(2)} KB`
        );

        // TODO: Handle notification display/storage
        // This could trigger a notification banner, update notification count, etc.

        const end = performance.now();
        appLogger.debug(
          `[Socket In] Processed notification_created in ${(end - start).toFixed(2)}ms`
        );
      });

      this.socket.on('course_updated', (courseData: any) => {
        const start = performance.now();
        const rawString = JSON.stringify(courseData);
        const sizeBytes = rawString.length;
        appLogger.info(
          `[Socket In] Event: course_updated, size: ${(sizeBytes / 1024).toFixed(2)} KB`
        );

        // TODO: Handle course data refresh
        // This could update cached course data, refresh UI components, etc.

        const end = performance.now();
        appLogger.debug(`[Socket In] Processed course_updated in ${(end - start).toFixed(2)}ms`);
      });

      this.socket.on('message_received', (message: any) => {
        const start = performance.now();
        const rawString = JSON.stringify(message);
        const sizeBytes = rawString.length;
        appLogger.info(
          `[Socket In] Event: message_received, size: ${(sizeBytes / 1024).toFixed(2)} KB`
        );

        // TODO: Handle new message
        // This could update chat UI, show message notification, etc.

        const end = performance.now();
        appLogger.debug(`[Socket In] Processed message_received in ${(end - start).toFixed(2)}ms`);
      });
    }

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      const start = performance.now();
      const payloadString = typeof data === 'string' ? data : JSON.stringify(data);
      const sizeBytes = payloadString.length;

      // Emit the event via Socket.IO
      this.socket.emit(event, data);

      const end = performance.now();
      appLogger.info(
        `[Socket Out] Event: ${event}, size: ${(sizeBytes / 1024).toFixed(2)} KB, dispatch time: ${(end - start).toFixed(2)}ms`
      );
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, (data: any) => {
        const start = performance.now();
        const rawString = JSON.stringify(data);
        const sizeBytes = rawString.length;

        callback(data);

        const end = performance.now();
        appLogger.info(
          `[Socket In] Event: ${event}, size: ${(sizeBytes / 1024).toFixed(2)} KB, callback process time: ${(end - start).toFixed(2)}ms`
        );
      });
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  /** Returns true when the underlying socket is currently connected. */
  get isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export default new SocketService();
