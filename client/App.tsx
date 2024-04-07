import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from './src/screens/post';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
        name = "Login"
        component={LoginScreen}/>
      <Stack.Screen
        name = "Register"
        component={RegisterScreen}/>
        <Stack.Screen
        name = "Posts"
        component={PostScreen}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
