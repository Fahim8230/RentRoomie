import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';
import LikeScreen from './src/screens/LikeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import MainContainer from './src/screens/MainContainer';
import ChatScreen from './src/screens/ChatScreen';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen}/>
        <Stack.Screen name={"SIGNUP"} component={SignupScreen}/>
        <Stack.Screen name={"PROFILECREATION"} component={ProfileCreationScreen}/>
        <Stack.Screen name={"DISCOVER"} component={DiscoverScreen}/>
        <Stack.Screen name={"LIKE"} component={LikeScreen}/>
        <Stack.Screen name={"CHAT"} component={ChatScreen}/>
        <Stack.Screen name={"PROFILE"} component={ProfileScreen}/>
        <Stack.Screen name={"CONTAINER"} component={MainContainer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;