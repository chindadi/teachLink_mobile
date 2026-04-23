import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { RootStackParamList } from './types';

// Import screens
import CourseViewerScreen from '../screens/CourseViewerScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizScreen from '../screens/QuizScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const withErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  boundaryName: string
) => {
  const WrappedWithBoundary: React.FC<P> = (props) => (
    <ErrorBoundary boundaryName={boundaryName}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WrappedWithBoundary.displayName = `WithErrorBoundary(${boundaryName})`;
  return WrappedWithBoundary;
};

const HomeScreenWithBoundary = withErrorBoundary(HomeScreen, 'Stack.Home');
const SearchScreenWithBoundary = withErrorBoundary(SearchScreen, 'Stack.Search');
const ProfileScreenWithBoundary = withErrorBoundary(ProfileScreen, 'Stack.Profile');
const SettingsScreenWithBoundary = withErrorBoundary(SettingsScreen, 'Stack.Settings');
const CourseViewerScreenWithBoundary = withErrorBoundary(CourseViewerScreen, 'Stack.CourseViewer');
const QuizScreenWithBoundary = withErrorBoundary(QuizScreen, 'Stack.Quiz');

export default function AppNavigator() {
    return (
        <ErrorBoundary boundaryName="NavigationContainer">
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreenWithBoundary}
                            options={{ title: 'TeachLink' }}
                        />
                        <Stack.Screen
                            name="Search"
                            component={SearchScreenWithBoundary}
                            options={{ title: 'Search' }}
                        />
                        <Stack.Screen name="Profile" component={ProfileScreenWithBoundary} />
                        <Stack.Screen name="Settings" component={SettingsScreenWithBoundary} />
                        <Stack.Screen
                            name="CourseViewer"
                            component={CourseViewerScreenWithBoundary}
                            options={{ title: 'Course', headerShown: false }}
                        />
                        <Stack.Screen
                            name="Quiz"
                            component={QuizScreenWithBoundary}
                            options={{ title: 'Quiz', headerShown: false }}
                        />
                    </Stack.Navigator>
                </SafeAreaView>
            </NavigationContainer>
        </ErrorBoundary>
    );
}