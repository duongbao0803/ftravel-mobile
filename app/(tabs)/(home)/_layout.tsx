import React from 'react';
import {Stack} from 'expo-router';

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
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerShown: false,
        }}
      />
      <Stack.Screen name="List" />
      <Stack.Screen
        name="ListTrip"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Tuyến xe',
        }}
      />

      <Stack.Screen
        name="ListTrip/[id]"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Chi tiết tuyến xe',
        }}
      />

      <Stack.Screen
        name="Wallet"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Ví của tôi',
        }}
      />

      <Stack.Screen
        name="ChargeMoney"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Nạp tiền vào FTravel Pay',
        }}
      />

      <Stack.Screen
        name="ChooseSeat"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Chọn chỗ ngồi',
        }}
      />

      <Stack.Screen
        name="ChooseService"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Chọn dịch vụ',
        }}
      />
      <Stack.Screen
        name="Checkout"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Thông tin chuyến đi',
        }}
      />

      <Stack.Screen
        name="OrderSuccess"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Thông tin thanh toán',
        }}
      />

      <Stack.Screen
        name="OrderFailure"
        options={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1CBCD4'},
          headerTitle: 'Thông tin thanh toán',
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
