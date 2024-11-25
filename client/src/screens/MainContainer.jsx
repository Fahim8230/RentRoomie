import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiscoverScreen from './DiscoverScreen';
import LikeScreen from './LikeScreen';
import ProfileScreen from './ProfileScreen';
import ChatScreen from './ChatScreen';
import { colors } from '../utils/colors';

const Tab = createBottomTabNavigator();

const MainContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="DISCOVER"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'DISCOVER') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'LIKE') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'PROFILE') {
            iconName = focused ? 'create' : 'create-outline';
          } else if (route.name === 'CHAT') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="DISCOVER" component={DiscoverScreen} />
      <Tab.Screen name="LIKE" component={LikeScreen} />
      <Tab.Screen name="CHAT" component={ChatScreen}/>
      <Tab.Screen name="PROFILE" component={ProfileScreen}/>

    </Tab.Navigator>
  );
};

export default MainContainer;
