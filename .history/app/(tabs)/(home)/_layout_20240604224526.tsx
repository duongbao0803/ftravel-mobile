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
      <Stack.Screen
        name="ListTrip"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Route',
        }}
      />
      <Stack.Screen
        name="TripDetail"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Chi tiết tuyến xe',
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
