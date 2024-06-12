import SplashScreen from '@/components/custom/SplashScreen';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import InputEmail from './(auth)/InputEmail';

const index = () => {
  const [isShowSplash, setIsShowSplash] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
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
