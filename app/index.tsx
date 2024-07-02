import SplashScreen from '@/components/custom/SplashScreen';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import InputEmail from './(auth)/InputEmail';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import useAuthen from '@/hooks/useAuthen';

const index = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);
  const isAuthenticated = useAuthen(state => state.isAuthenticated);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      const {imageUrl} = remoteMessage.notification?.android;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: body,
          data: imageUrl,
        },
        trigger: null,
      });
    });
  }, []);

  console.log('check isAuthenticated', isAuthenticated);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {isShowSplash ? <SplashScreen /> : <InputEmail />}
    </>
  );
};

export default index;
