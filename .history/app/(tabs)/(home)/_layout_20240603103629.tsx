import {Link, Stack} from 'expo-router';
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
      <Link href={{pathname: '/ListTrip'}} style={{color: 'blue'}}>
        Tab
      </Link>
    </Stack>
  );
};

export default HomeLayout;
