import {Stack} from 'expo-router';
import React from 'react';

const AccountLayout = () => {
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
        name="AccountOptions"
        options={{
          title: 'Tài khoản',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
        }}
      />
      <Stack.Screen
        name="InfoUser"
        options={{
          title: 'Thông tin tài khoản',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
        }}
      />
    </Stack>
  );
};

export default AccountLayout;
