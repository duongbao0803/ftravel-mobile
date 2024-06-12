import {Stack} from 'expo-router';
import React from 'react';

const NotiLayout = () => {
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
        name="NoticeList"
        options={{
          title: 'Thông báo',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
        }}
      />
    </Stack>
  );
};

export default NotiLayout;
