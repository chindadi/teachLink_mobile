import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MobileTabBar } from './MobileTabBar';
import { MobileDrawer } from './MobileDrawer';
import { MobileHeader } from './MobileHeader';
import HomeScreen from '../../screens/HomeScreen';
import SearchScreen from '../../screens/SearchScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import CourseViewerScreen from '../../screens/CourseViewerScreen';
import { View, Text } from 'react-native';

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
                component={HomeScreen as any} 
                options={{ tabBarAccessibilityLabel: 'Home' }}
            />
            <Tab.Screen 
                name="Explore" 
                component={SearchScreen} 
                options={{ tabBarAccessibilityLabel: 'Explore' }}
            />
            <Tab.Screen 
                name="Create" 
                component={CreateScreen} 
                options={{ 
                    tabBarLabel: () => null,
                    tabBarAccessibilityLabel: 'Create new content'
                }} 
            />
            <Tab.Screen 
                name="Messages" 
                component={MessagesScreen} 
                options={{ tabBarAccessibilityLabel: 'Messages' }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen as any} 
                initialParams={{ userId: '1' }} 
                options={{ tabBarAccessibilityLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

export const SwipeableNavigation = () => {
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
        </Drawer.Navigator>
    );
};
