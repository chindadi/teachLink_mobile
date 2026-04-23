import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import CourseViewerScreen from '../../screens/CourseViewerScreen';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import QuizScreen from '../../screens/QuizScreen';
import SearchScreen from '../../screens/SearchScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { MobileDrawer } from './MobileDrawer';
import { MobileHeader } from './MobileHeader';
import { MobileTabBar } from './MobileTabBar';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Dummy Screens for unfinished features
const CreateScreen = () => (
    <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-xl font-bold text-gray-800">Create New</Text>
        <Text className="text-gray-500 mt-2">Content goes here...</Text>
    </View>
);

const MessagesScreen = () => (
    <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-xl font-bold text-gray-800">Messages</Text>
        <Text className="text-gray-500 mt-2">Content goes here...</Text>
    </View>
);

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

const HomeScreenWithBoundary = withErrorBoundary(HomeScreen as React.ComponentType<any>, 'Tabs.Home');
const SearchScreenWithBoundary = withErrorBoundary(SearchScreen, 'Tabs.Explore');
const CreateScreenWithBoundary = withErrorBoundary(CreateScreen, 'Tabs.Create');
const MessagesScreenWithBoundary = withErrorBoundary(MessagesScreen, 'Tabs.Messages');
const ProfileScreenWithBoundary = withErrorBoundary(ProfileScreen as React.ComponentType<any>, 'Tabs.Profile');
const CourseViewerScreenWithBoundary = withErrorBoundary(CourseViewerScreen as React.ComponentType<any>, 'Drawer.CourseViewer');
const SettingsScreenWithBoundary = withErrorBoundary(SettingsScreen as React.ComponentType<any>, 'Drawer.Settings');
const QuizScreenWithBoundary = withErrorBoundary(QuizScreen as React.ComponentType<any>, 'Drawer.Quiz');

function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <MobileTabBar {...props} />}
            screenOptions={{
                headerShown: true,
                header: ({ route, options }) => (
                    <MobileHeader
                        title={options.title || route.name}
                        showBack={false}
                    />
                ),
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreenWithBoundary} 
                options={{ tabBarAccessibilityLabel: 'Home' }}
            />
            <Tab.Screen 
                name="Explore" 
                component={SearchScreenWithBoundary} 
                options={{ tabBarAccessibilityLabel: 'Explore' }}
            />
            <Tab.Screen 
                name="Create" 
                component={CreateScreenWithBoundary} 
                options={{ 
                    tabBarLabel: () => null,
                    tabBarAccessibilityLabel: 'Create new content'
                }} 
            />
            <Tab.Screen 
                name="Messages" 
                component={MessagesScreenWithBoundary} 
                options={{ tabBarAccessibilityLabel: 'Messages' }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreenWithBoundary} 
                initialParams={{ userId: '1' }} 
                options={{ tabBarAccessibilityLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

export const SwipeableNavigation = () => {
    const hiddenDrawerScreenOptions = {
        drawerItemStyle: { display: 'none' as const },
    };

    return (
        <Drawer.Navigator
            drawerContent={(props) => <MobileDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                swipeEdgeWidth: 100, // Easier to swipe open
                drawerStyle: { width: '80%' },
            }}
        >
            <Drawer.Screen name="MainTabs" component={TabNavigator} />
            <Drawer.Screen
                name="CourseViewer"
                component={CourseViewerScreenWithBoundary}
                options={hiddenDrawerScreenOptions}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreenWithBoundary}
                options={hiddenDrawerScreenOptions}
            />
            <Drawer.Screen
                name="Quiz"
                component={QuizScreenWithBoundary}
                options={hiddenDrawerScreenOptions}
            />
        </Drawer.Navigator>
    );
};
