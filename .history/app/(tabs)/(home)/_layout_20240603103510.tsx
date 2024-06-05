import {Stack} from 'expo-router';
import React from 'react';

const HomeLayout = () => {
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
      <Stack.Screen name="List" />
      <Stack.Screen name="Search" />
      <Stack.Screen name="(trip)" options={{headerShown: false}} />
    </Stack>
  );
};

export default HomeLayout;
