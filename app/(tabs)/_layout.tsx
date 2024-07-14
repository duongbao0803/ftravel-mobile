import {Tabs, usePathname} from 'expo-router';
import React from 'react';
import {TabBarIcon} from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  const pathname = usePathname();

  const shouldHideTabBar =
    pathname === '/ChooseSeat' ||
    pathname === '/ChooseService' ||
    pathname === '/Checkout' ||
    pathname === '/ElectronicTicket' ||
    pathname === '/InfoUser';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1CBCD4',
        headerShown: false,
        tabBarStyle: shouldHideTabBar ? {display: 'none'} : {},
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'Trang chủ',
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
          title: 'Vé của tôi',
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
          title: 'Thông báo',
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
          title: 'Tài khoản',
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
