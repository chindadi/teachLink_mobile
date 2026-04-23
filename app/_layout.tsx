import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import "../global.css"; // NativeWind CSS
import { ErrorBoundary } from '../src/components/common/ErrorBoundary';
import { AnalyticsProvider } from '../src/components/mobile/AnalyticsProvider';
import { SwipeableNavigation } from '../src/components/mobile/SwipeableNavigation';

export default function RootLayout() {
  return (
    <ErrorBoundary boundaryName="RootLayout">
      <AnalyticsProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SwipeableNavigation />
        </GestureHandlerRootView>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}
