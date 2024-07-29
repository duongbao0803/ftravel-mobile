import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import InputEmail from './(auth)/InputEmail';
import {SplashScreen} from '@/components/custom';

const index = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          router.replace('HomeScreen');
        } else {
          setIsShowSplash(false);
        }
      } catch (error) {
        setIsShowSplash(false);
      }
    };

    const timeout = setTimeout(() => {
      checkTokenAndNavigate();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      await Notifications.requestPermissionsAsync();
    };

    requestPermissions();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    messaging().onMessage(async remoteMessage => {
      const notification = remoteMessage.notification;

      const title = notification?.title ?? 'Default Title';
      const body = notification?.body ?? 'Default Body';
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
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
