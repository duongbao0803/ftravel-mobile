import SplashScreen from '@/components/custom/SplashScreen';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import InputEmail from './(auth)/InputEmail';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';

const index = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

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
      console.log('check img', imageUrl);

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
