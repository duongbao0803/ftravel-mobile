/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {appInfo} from '@/constants/appInfoStyles';
import ImageBackgroundComponent from './ImageBackgroundComponent';

const SplashScreen: React.FC = () => {
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowLoading(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <ImageBackgroundComponent
        source={require('@/assets/images/logo/splash_screen.png')}
        imageBackground={styles.splash_background}>
        <Animatable.View
          animation="fadeInDown"
          easing="ease-out"
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('@/assets/images/logo/logo_app.png')}
            style={{
              width: appInfo.sizes.WIDTH * 0.7,
              resizeMode: 'contain',
            }}
          />
          {isShowLoading && (
            <ActivityIndicator
              color={'gray'}
              size={'large'}
              style={{position: 'absolute', bottom: 100}}
            />
          )}
        </Animatable.View>
      </ImageBackgroundComponent>
    </>
  );
};

const styles = StyleSheet.create({
  splash_background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default SplashScreen;
