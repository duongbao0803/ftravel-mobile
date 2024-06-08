import {Tabs} from 'expo-router';
import React from 'react';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(ticket)"
        options={{
          title: 'Ticket',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'ticket' : 'ticket-outline'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(noti)"
        options={{
          title: 'Notification',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'notifications' : 'notifications'}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(account)"
        options={{
          title: 'Account',
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon
              name={focused ? 'settings' : 'settings-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
