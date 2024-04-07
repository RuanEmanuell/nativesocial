import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from './src/screens/post';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import PostNavbar from './src/components/postnavbar';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen} 
          options = {{headerShown: false}}
          />
        <Stack.Screen
          name="Register"
          component={RegisterScreen} 
          options = {{headerShown: false}}
        />
        <Stack.Screen
          name="Posts"
          component={PostScreen}
          options = {{header: PostNavbar}}
        >
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
