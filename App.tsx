import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity } from 'react-native';

// Notification imports
import { linking, RootStackParamList, setupNotificationNavigation } from './src/navigation/linking';
import { setNavigationRef, handleNotificationReceived } from './src/utils/notificationHandlers';
import {
  addNotificationReceivedListener,
  getLastNotificationResponse,
  removeNotificationListener,
} from './src/services/pushNotifications';
import { NotificationPrompt } from './src/components/mobile/NotificationPrompt';
import { useNotificationStore } from './src/store/notificationStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Placeholder screens - replace with your actual screens
function HomeScreen() {
  const [showPrompt, setShowPrompt] = useState(false);
  const { hasPromptedForPermission, unreadCount } = useNotificationStore();

  useEffect(() => {
    // Show notification prompt on first launch (after a short delay)
    if (!hasPromptedForPermission) {
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasPromptedForPermission]);

  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        TeachLink Home
      </Text>
      {unreadCount > 0 && (
        <Text className="text-indigo-600 mb-4">
          You have {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setShowPrompt(true)}
        className="bg-indigo-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">Test Notification Prompt</Text>
      </TouchableOpacity>

      <NotificationPrompt
        visible={showPrompt}
        onClose={() => setShowPrompt(false)}
        onPermissionGranted={() => console.log('Permission granted!')}
        onPermissionDenied={() => console.log('Permission denied')}
      />
    </View>
  );
}

function CourseDetailScreen({ route }: { route: { params: { courseId: string } } }) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl text-gray-900 dark:text-white">
        Course: {route.params.courseId}
      </Text>
    </View>
  );
}

function ChatScreen({ route }: { route: { params: { conversationId: string } } }) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl text-gray-900 dark:text-white">
        Chat: {route.params.conversationId}
      </Text>
    </View>
  );
}

function LearningScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl text-gray-900 dark:text-white">Learning Dashboard</Text>
    </View>
  );
}

function AchievementDetailScreen({ route }: { route: { params: { achievementId: string } } }) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl text-gray-900 dark:text-white">
        Achievement: {route.params.achievementId}
      </Text>
    </View>
  );
}

function CommunityPostScreen({ route }: { route: { params: { postId: string } } }) {
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
      <Text className="text-xl text-gray-900 dark:text-white">
        Post: {route.params.postId}
      </Text>
    </View>
  );
}

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    // Set up notification navigation handler
    const cleanup = setupNotificationNavigation();

    // Listen for notifications received while app is foregrounded
    const subscription = addNotificationReceivedListener(handleNotificationReceived);

    // Check if app was launched from a notification
    getLastNotificationResponse().then((response) => {
      if (response) {
        console.log('App launched from notification:', response);
      }
    });

    return () => {
      cleanup();
      removeNotificationListener(subscription);
    };
  }, []);

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        onReady={() => {
          // Set navigation ref for notification handlers
          if (navigationRef.current) {
            setNavigationRef({
              navigate: (screen, params) => {
                navigationRef.current?.navigate(screen as keyof RootStackParamList, params as any);
              },
              isReady: () => navigationRef.current?.isReady() ?? false,
            });
          }
        }}
      >
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: '#4F46E5' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TeachLink' }} />
          <Stack.Screen
            name="CourseDetail"
            component={CourseDetailScreen}
            options={{ title: 'Course' }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
          <Stack.Screen
            name="Learning"
            component={LearningScreen}
            options={{ title: 'Learning' }}
          />
          <Stack.Screen
            name="AchievementDetail"
            component={AchievementDetailScreen}
            options={{ title: 'Achievement' }}
          />
          <Stack.Screen
            name="CommunityPost"
            component={CommunityPostScreen}
            options={{ title: 'Post' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
