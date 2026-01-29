import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useAppStore } from './src/store';
import socketService from './src/services/socket';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import "./global.css";

// Notification imports
import { setupNotificationNavigation } from './src/navigation/linking';
import { handleNotificationReceived } from './src/utils/notificationHandlers';
import {
  addNotificationReceivedListener,
  getLastNotificationResponse,
  removeNotificationListener,
} from './src/services/pushNotifications';

// Enable error logging to console (visible in Metro bundler)
if (__DEV__) {
  // Log all errors to console
  const originalError = console.error;
  console.error = (...args) => {
    originalError(...args);
    // Errors will appear in Metro bundler terminal
  };

  // Show warnings in console but don't break the app
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

export default function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    // Connect to socket when app starts
    socketService.connect();

    // Set up notification navigation handler
    const notificationCleanup = setupNotificationNavigation();

    // Listen for notifications received while app is foregrounded
    const subscription = addNotificationReceivedListener(handleNotificationReceived);

    // Check if app was launched from a notification
    getLastNotificationResponse().then((response) => {
      if (response) {
        console.log('App launched from notification:', response);
      }
    });

    // Cleanup on unmount
    return () => {
      socketService.disconnect();
      notificationCleanup();
      removeNotificationListener(subscription);
    };
  }, []);

  return (
    <ErrorBoundary>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <AppNavigator />
    </ErrorBoundary>
  );
}
