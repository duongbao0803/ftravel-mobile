import {Stack} from 'expo-router';
import React from 'react';

const TicketLayout = () => {
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
        name="TicketList"
        options={{
          title: 'Vé của tôi',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
        }}
      />
    </Stack>
  );
};

export default TicketLayout;
