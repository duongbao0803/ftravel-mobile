import {Stack} from 'expo-router';
import React from 'react';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'red',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="InputEmail"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="InputName" options={{headerShown: false}} />
      <Stack.Screen name="InputPassword" options={{headerShown: false}} />
      <Stack.Screen name="ConfirmPassword" options={{headerShown: false}} />
      <Stack.Screen name="ConfirmInfo" options={{headerShown: false}} />
      <Stack.Screen name="InputOtp" options={{headerShown: false}} />
    </Stack>
  );
};

export default AuthLayout;
