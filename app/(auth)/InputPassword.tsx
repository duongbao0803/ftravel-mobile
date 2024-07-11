import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {PasswordCheck} from 'iconsax-react-native';
import {appInfo} from '@/constants/appInfoStyles';
import {
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';
import {router} from 'expo-router';
import {useRoute} from '@react-navigation/native';
import {login} from '@/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthen from '@/hooks/useAuthen';
import {jwtDecode} from 'jwt-decode';
import {CustomError} from '@/types/error.types';

const InputPassword: React.FC = () => {
  const [password, setPassowrd] = useState<string>('');
  const route = useRoute();
  const {email} = route.params as {email: string};

  const handleLogin = async () => {
    if (!password) {
      ToastAndroid.show('Vui lòng nhập mật khẩu', ToastAndroid.CENTER);
      return;
    }
    try {
      const formValues = {email, password};
      const res = await login(formValues);
      if (res && res.status === 200) {
        await Promise.all([
          AsyncStorage.setItem('accessToken', res.data['access-token']),
          AsyncStorage.setItem('refreshToken', res.data['refresh-token']),
        ]);
        const jwtToken = await AsyncStorage.getItem('accessToken');
        if (jwtToken) {
          const decoded: any = jwtDecode(jwtToken);
          const role =
            decoded[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          if (role !== 'CUSTOMER') {
            ToastAndroid.show(
              'Bạn không có quyền truy cập vào ứng dụng này',
              ToastAndroid.CENTER,
            );
            const authStore = useAuthen.getState();
            authStore.logoutGoogle();
            return;
          } else {
            const authStore = useAuthen.getState();
            authStore.setRole(role);
            authStore.login();
          }
        }
      }
    } catch (error) {
      const err = error as CustomError;
      if (err.response && err.response.data && err.response.data.message) {
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.LONG);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SectionComponent styles={styles.container_logo}>
        <Image
          source={require('@/assets/images/logo/logo_app.png')}
          style={styles.logo}
        />
      </SectionComponent>
      <SectionComponent styles={styles.container_form}>
        <SectionComponent>
          <Text style={styles.text}>ĐĂNG NHẬP</Text>
        </SectionComponent>
        <SpaceComponent height={45} />
        <SectionComponent>
          <Text style={styles.password}>
            <Text style={{color: 'red'}}>*</Text> Nhập mật khẩu
          </Text>
          <SpaceComponent height={15} />

          <InputComponent
            text="Password"
            placeholder="Mật khẩu"
            onChange={val => setPassowrd(val)}
            isPassword
            allowClear
            affix={<PasswordCheck size={22} color="gray" />}
          />
        </SectionComponent>
        <TouchableOpacity onPress={handleLogin} style={styles.button_login}>
          <Text style={styles.button_text_login}>Tiếp tục</Text>
        </TouchableOpacity>
      </SectionComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  container_form: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 0,
    paddingLeft: 30,
    paddingRight: 30,
  },
  splash_background: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  password: {
    color: 'black',
    fontSize: 15,
  },
  container_logo: {
    alignItems: 'center',
  },
  logo: {
    width: appInfo.sizes.WIDTH * 0.6,
    height: appInfo.sizes.HEIGHT * 0.1,
    resizeMode: 'contain',
  },
  background_color: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
  },
  button_login: {
    backgroundColor: '#1CBCD4',
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
  section_or: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  image_google: {
    width: 20,
    height: 20,
  },
  button_google: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#101010',
  },
  button_text_google: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    padding: 5,
  },
  section_signup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  section_signup_text: {
    color: '#3094ff',
  },
  section_welcome: {
    marginBottom: 5,
  },
});

export default InputPassword;
