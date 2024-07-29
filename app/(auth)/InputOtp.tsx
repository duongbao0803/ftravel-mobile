import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import {confirmOtp} from '@/api/authApi';
import {
  LoadingScreen,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';
import {OtpInput} from 'react-native-otp-entry';
import {appColors} from '@/constants/appColors';
import {appInfo} from '@/constants/appInfoStyles';
import useAuthen from '@/hooks/useAuthen';
import {CustomError} from '@/types/error.types';

const InputOtp = () => {
  const [otp, setOtp] = useState<string>('');
  const route = useRoute();
  const {email} = route.params as {email: string};

  const handleOtp = useCallback(async () => {
    if (!otp) {
      ToastAndroid.show('Vui lòng nhập OTP', ToastAndroid.CENTER);
      return;
    }
    if (otp.length < 6) {
      ToastAndroid.show('Vui lòng nhập đầy đủ OTP', ToastAndroid.CENTER);
      return;
    }
    const authStore = useAuthen.getState();
    authStore.setIsLoading(true);
    try {
      const formValues = {email, 'otp-code': otp};
      const res = await confirmOtp(formValues);
      if (res && res.status === 200) {
        await Promise.all([
          AsyncStorage.setItem('accessToken', res.data['access-token']),
          AsyncStorage.setItem('refreshToken', res.data['refresh-token']),
        ]);
        useAuthen.getState().login('normal');
        authStore.setIsLoading(false);
      }
    } catch (error) {
      const err = error as CustomError;
      if (err.response && err.response.data && err.response.data) {
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.CENTER);
      }
      authStore.setIsLoading(false);
    }
  }, [email, otp]);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.textHeader}>Xác thực OTP</Text>

          <Text style={styles.text}>
            Chúng tôi đã gửi mã xác thực vào email của bạn. Vui lòng kiểm tra
          </Text>
        </SafeAreaView>
        <SectionComponent styles={styles.container_form}>
          <OtpInput
            numberOfDigits={6}
            focusColor="green"
            focusStickBlinkingDuration={400}
            onTextChange={text => setOtp(text)}
            onFilled={text => console.log(`OTP is ${text}`)}
            textInputProps={{
              accessibilityLabel: 'One-Time Password',
            }}
            theme={{
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
        </SectionComponent>
        <SpaceComponent height={45} />

        <SectionComponent>
          <TouchableOpacity style={styles.button_login} onPress={handleOtp}>
            <Text style={styles.button_text_login}>Tiếp tục</Text>
          </TouchableOpacity>
        </SectionComponent>
      </View>
      <LoadingScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: appInfo.sizes.HEIGHT,
    backgroundColor: 'white',
    padding: 30,
    justifyContent: 'center',
  },

  container_form: {
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 40,
  },
  activePinCodeContainer: {
    color: appColors.blue,
    borderColor: appColors.blue,
  },
  focusStick: {
    color: appColors.blue,
    borderColor: appColors.blue,
    backgroundColor: appColors.blue,
  },
  textHeader: {
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    color: 'gray',
    fontSize: 14,
    width: appInfo.sizes.WIDTH * 0.7,
  },
  button_login: {
    backgroundColor: appColors.blue,
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dfe2e6',
  },
  button_text_login: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5,
  },
});

export default InputOtp;
