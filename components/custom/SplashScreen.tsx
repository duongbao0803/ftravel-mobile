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
          style={styles.animateContainer}>
          <Image
            source={require('@/assets/images/logo/logo_app.png')}
            style={styles.image}
          />
          {isShowLoading && (
            <ActivityIndicator
              color={'#1CBCD4'}
              size={'large'}
              style={styles.loading}
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
  animateContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: appInfo.sizes.WIDTH * 0.7,
    height: appInfo.sizes.HEIGHT * 0.6,
    resizeMode: 'contain',
  },
  loading: {
    position: 'absolute',
    bottom: 100,
  },
});

export default SplashScreen;
