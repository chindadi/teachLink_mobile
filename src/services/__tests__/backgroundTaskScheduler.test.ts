import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { InteractionManager } from 'react-native';

import { logger } from '../../utils/logger';
import { backgroundScheduler } from '../backgroundTaskScheduler';

jest.mock('../../utils/logger', () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

async function waitUntil(predicate: () => boolean, maxWaitMs = 2000, stepMs = 10): Promise<void> {
  const start = Date.now();
  while (!predicate() && Date.now() - start < maxWaitMs) {
    await new Promise(resolve => setTimeout(resolve, stepMs));
  }
}

describe('BackgroundTaskScheduler (src/services/backgroundTaskScheduler.ts)', () => {
  let scheduler: typeof backgroundScheduler;

  beforeEach(() => {
    jest.clearAllMocks();

    // Default InteractionManager behavior: synchronously run callbacks
    (InteractionManager.runAfterInteractions as jest.Mock).mockImplementation((cb: () => void) => {
      if (typeof cb === 'function') {
        cb();
      }
      return { cancel: jest.fn(), done: jest.fn(), then: jest.fn() };
    });

    // Provide a fresh isolated instance for each test to avoid queue pollution
    jest.isolateModules(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require('../backgroundTaskScheduler');
      scheduler = mod.backgroundScheduler;
    });
  });

  describe('module exports and API shape', () => {
    it('exports backgroundScheduler singleton instance', () => {
      expect(backgroundScheduler).toBeDefined();
      expect(typeof backgroundScheduler).toBe('object');
    });

    it('exposes runAfterUI method', () => {
      expect(typeof backgroundScheduler.runAfterUI).toBe('function');
    });

    it('exposes enqueueLowPriorityTask method', () => {
      expect(typeof backgroundScheduler.enqueueLowPriorityTask).toBe('function');
    });
  });

  describe('runAfterUI', () => {
    it('schedules task via InteractionManager.runAfterInteractions and executes it', () => {
      const task = jest.fn();

      scheduler.runAfterUI(task);

      expect(InteractionManager.runAfterInteractions).toHaveBeenCalledTimes(1);
      expect(InteractionManager.runAfterInteractions).toHaveBeenCalledWith(expect.any(Function));
      expect(task).toHaveBeenCalledTimes(1);
    });

    it('defers task execution until InteractionManager interactions are completed', () => {
      let deferredCallback: (() => void) | null = null;
      (InteractionManager.runAfterInteractions as jest.Mock).mockImplementation(
        (cb: () => void) => {
          deferredCallback = cb;
          return { cancel: jest.fn(), done: jest.fn(), then: jest.fn() };
        }
      );

      const task = jest.fn();
      scheduler.runAfterUI(task);

      expect(task).not.toHaveBeenCalled();
      expect(deferredCallback).not.toBeNull();

      // Trigger interactions completion
      deferredCallback!();
      expect(task).toHaveBeenCalledTimes(1);
    });

    it('handles multiple tasks scheduled through runAfterUI', () => {
      const task1 = jest.fn();
      const task2 = jest.fn();

      scheduler.runAfterUI(task1);
      scheduler.runAfterUI(task2);

      expect(task1).toHaveBeenCalledTimes(1);
      expect(task2).toHaveBeenCalledTimes(1);
      expect(InteractionManager.runAfterInteractions).toHaveBeenCalledTimes(2);
    });

    it('propagates error when scheduled UI task throws synchronously', () => {
      const failingTask = jest.fn(() => {
        throw new Error('UI task execution failed');
      });

      expect(() => {
        scheduler.runAfterUI(failingTask);
      }).toThrow('UI task execution failed');
    });
  });

  describe('enqueueLowPriorityTask', () => {
    it('enqueues and executes a single low-priority async task', async () => {
      let executed = false;
      const task = jest.fn(async () => {
        executed = true;
      });

      scheduler.enqueueLowPriorityTask(task);

      await waitUntil(() => executed);

      expect(task).toHaveBeenCalledTimes(1);
      expect(executed).toBe(true);
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('processes multiple tasks sequentially in FIFO order', async () => {
      const executionOrder: string[] = [];

      const task1 = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        executionOrder.push('task1');
      });

      const task2 = jest.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 5));
        executionOrder.push('task2');
      });

      const task3 = jest.fn(async () => {
        executionOrder.push('task3');
      });

      scheduler.enqueueLowPriorityTask(task1);
      scheduler.enqueueLowPriorityTask(task2);
      scheduler.enqueueLowPriorityTask(task3);

      await waitUntil(() => executionOrder.length === 3, 3000);

      expect(executionOrder).toEqual(['task1', 'task2', 'task3']);
      expect(task1).toHaveBeenCalledTimes(1);
      expect(task2).toHaveBeenCalledTimes(1);
      expect(task3).toHaveBeenCalledTimes(1);
    });

    it('catches task rejection and logs error via logger.error', async () => {
      const failureError = new Error('Async network failure');
      const failingTask = jest.fn(async () => {
        throw failureError;
      });

      scheduler.enqueueLowPriorityTask(failingTask);

      await waitUntil(() => (logger.error as jest.Mock).mock.calls.length > 0);

      expect(failingTask).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('Background Task Failed', {
        error: failureError,
      });
    });

    it('continues processing remaining tasks when a prior task fails', async () => {
      const completedTasks: string[] = [];
      const error = new Error('Database write failure');

      const failingTask = jest.fn(async () => {
        throw error;
      });

      const successfulTask = jest.fn(async () => {
        completedTasks.push('successfulTask');
      });

      scheduler.enqueueLowPriorityTask(failingTask);
      scheduler.enqueueLowPriorityTask(successfulTask);

      await waitUntil(() => completedTasks.length === 1);

      expect(failingTask).toHaveBeenCalledTimes(1);
      expect(successfulTask).toHaveBeenCalledTimes(1);
      expect(completedTasks).toEqual(['successfulTask']);
      expect(logger.error).toHaveBeenCalledWith('Background Task Failed', { error });
    });

    it('handles non-Error thrown values gracefully', async () => {
      const stringError = 'String rejection reason';
      const failingTask = jest.fn(async () => {
        return Promise.reject(stringError);
      });

      scheduler.enqueueLowPriorityTask(failingTask);

      await waitUntil(() => (logger.error as jest.Mock).mock.calls.length > 0);

      expect(failingTask).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('Background Task Failed', {
        error: stringError,
      });
    });

    it('prevents concurrent processing when isProcessing is active', async () => {
      let resolveFirstTask!: () => void;
      const firstTaskPromise = new Promise<void>(res => {
        resolveFirstTask = res;
      });

      let firstTaskStarted = false;
      let secondTaskStarted = false;

      const task1 = jest.fn(async () => {
        firstTaskStarted = true;
        await firstTaskPromise;
      });

      const task2 = jest.fn(async () => {
        secondTaskStarted = true;
      });

      scheduler.enqueueLowPriorityTask(task1);
      scheduler.enqueueLowPriorityTask(task2);

      await waitUntil(() => firstTaskStarted);

      expect(firstTaskStarted).toBe(true);
      expect(secondTaskStarted).toBe(false);

      // Finish first task
      resolveFirstTask();

      // Allow second task to execute
      await waitUntil(() => secondTaskStarted);

      expect(secondTaskStarted).toBe(true);
    });

    it('schedules next queue iteration via InteractionManager.runAfterInteractions after each task', async () => {
      const interactionCallbacks: (() => void)[] = [];
      (InteractionManager.runAfterInteractions as jest.Mock).mockImplementation(
        (cb: () => void) => {
          interactionCallbacks.push(cb);
          return { cancel: jest.fn(), done: jest.fn(), then: jest.fn() };
        }
      );

      const task1 = jest.fn(async () => {});
      const task2 = jest.fn(async () => {});

      scheduler.enqueueLowPriorityTask(task1);
      scheduler.enqueueLowPriorityTask(task2);

      // Task 1 runs initially via enqueueLowPriorityTask -> processQueue
      await waitUntil(() => task1.mock.calls.length === 1);
      expect(task1).toHaveBeenCalledTimes(1);
      expect(task2).not.toHaveBeenCalled();

      // After task 1 finishes, runAfterInteractions is called to process the next item
      await waitUntil(() => interactionCallbacks.length > 0);
      const nextIteration = interactionCallbacks.shift()!;
      nextIteration();

      await waitUntil(() => task2.mock.calls.length === 1);
      expect(task2).toHaveBeenCalledTimes(1);

      // If queue is now empty, triggering subsequent runAfterInteractions returns early
      if (interactionCallbacks.length > 0) {
        const emptyQueueRun = interactionCallbacks.shift()!;
        expect(() => emptyQueueRun()).not.toThrow();
      }
    });

    it('safely handles mock AsyncStorage operations inside an enqueued task', async () => {
      const task = jest.fn(async () => {
        await AsyncStorage.setItem('background_sync_key', JSON.stringify({ synced: true }));
        await AsyncStorage.getItem('background_sync_key');
      });

      scheduler.enqueueLowPriorityTask(task);

      await waitUntil(() => task.mock.calls.length === 1);

      expect(task).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'background_sync_key',
        JSON.stringify({ synced: true })
      );
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('background_sync_key');
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('safely handles mock Network operations inside an enqueued task', async () => {
      const task = jest.fn(async () => {
        const state = await Network.getNetworkStateAsync();
        if (!state.isConnected) {
          throw new Error('Offline');
        }
      });

      scheduler.enqueueLowPriorityTask(task);

      await waitUntil(() => task.mock.calls.length === 1);

      expect(task).toHaveBeenCalledTimes(1);
      expect(Network.getNetworkStateAsync).toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });

    it('catches and logs errors thrown during AsyncStorage failure', async () => {
      const storageError = new Error('AsyncStorage quota exceeded');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(storageError);

      const task = jest.fn(async () => {
        await AsyncStorage.setItem('fail_key', 'data');
      });

      scheduler.enqueueLowPriorityTask(task);

      await waitUntil(() => (logger.error as jest.Mock).mock.calls.length > 0);

      expect(task).toHaveBeenCalledTimes(1);
      expect(logger.error).toHaveBeenCalledWith('Background Task Failed', {
        error: storageError,
      });
    });

    it('handles undefined task in queue gracefully', async () => {
      // @ts-expect-error testing edge case where undefined task is enqueued
      scheduler.enqueueLowPriorityTask(undefined);

      await waitUntil(
        () => (InteractionManager.runAfterInteractions as jest.Mock).mock.calls.length > 0
      );

      expect(logger.error).not.toHaveBeenCalled();
    });
  });
});
