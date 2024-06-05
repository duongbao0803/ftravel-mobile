import {Stack} from 'expo-router';
import React from 'react';

const TripLayout = () => {
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
      <Stack.Screen name="ListTrip" />
    </Stack>
  );
};

export default TripLayout;
