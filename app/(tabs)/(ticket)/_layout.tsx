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
      <Stack.Screen
        name="TicketDetail"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Chi tiết vé',
        }}
      />
      <Stack.Screen
        name="ElectronicTicket"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Vé điện tử',
        }}
      />
    </Stack>
  );
};

export default TicketLayout;
