import SplashScreen from '@/components/custom/SplashScreen';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
