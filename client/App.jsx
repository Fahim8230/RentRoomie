import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={HomeScreen} />
        <Stack.Screen name={"LOGIN"} component={LoginScreen}/>
        <Stack.Screen name={"SIGNUP"} component={SignupScreen}/>
        <Stack.Screen name={"PROFILECREATION"} component={ProfileCreationScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;