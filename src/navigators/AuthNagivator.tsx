import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPasswordScreen, LoginScreen, SignupScreen} from '@/screens';

const AuthNagivator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNagivator;
