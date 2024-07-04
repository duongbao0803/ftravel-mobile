import SplashScreen from '@/components/custom/SplashScreen';
import React, {useEffect, useState} from 'react';
import {Alert, StatusBar} from 'react-native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import InputEmail from './(auth)/InputEmail';

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
        console.error('Error checking token:', error);
        setIsShowSplash(false);
      }
    };

    const timeout = setTimeout(() => {
      checkTokenAndNavigate();
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
