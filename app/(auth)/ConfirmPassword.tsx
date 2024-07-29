import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {router} from 'expo-router';
import React, {useCallback, useState} from 'react';
import {PasswordCheck} from 'iconsax-react-native';
import {appInfo} from '@/constants/appInfoStyles';
import {
  ButtonComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globalStyles} from '@/constants/globalStyles';
import {GoogleSignInResponse, SigninValues} from '@/types/auth.types';
import {GoogleSignin, User} from '@react-native-google-signin/google-signin';
import {loginGoogle, signUp} from '@/api/authApi';
import useAuthen from '@/hooks/useAuthen';
import {CustomError} from '@/types/error.types';

GoogleSignin.configure({
  webClientId:
    '47109893633-6fdvrq36r3om3b3f9qmt0vni2ogag6fb.apps.googleusercontent.com',
});

const ConfirmPassword: React.FC = React.memo(() => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [, setUserInfo] = useState<GoogleSignInResponse | null>(null);

  const [formValues, setFormValues] = useState<SigninValues>();

  const navigation = useNavigation();

  const route = useRoute();
  const {email, name} = route.params as {email: string; name: string};

  const handleLoginWithGoogle = useCallback(async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: User = await GoogleSignin.signIn();
      const googleSignInResponse: GoogleSignInResponse = {
        idToken: userInfo.idToken ?? undefined,
        user: {
          id: userInfo.user.id,
          name: userInfo.user.name ?? '',
          email: userInfo.user.email,
          photo: userInfo.user.photo ?? '',
          familyName: userInfo.user.familyName ?? '',
          givenName: userInfo.user.givenName ?? '',
        },
        scopes: userInfo.scopes,
        serverAuthCode: userInfo.serverAuthCode ?? undefined,
      };

      setUserInfo(googleSignInResponse);
      if (userInfo && userInfo.idToken) {
        await sendUserInfoToServer(userInfo.idToken);
      }
    } catch (err) {}
  }, []);

  const sendUserInfoToServer = async (idToken: string) => {
    try {
      const res = await loginGoogle(idToken);
      if (res && res.status === 200) {
        await Promise.all([
          AsyncStorage.setItem('accessToken', res.data['access-token']),
          AsyncStorage.setItem('refreshToken', res.data['refresh-token']),
        ]);
        useAuthen.getState().login('google');
      } else {
        const authStore = useAuthen.getState();
        authStore.logoutGoogle();
      }
    } catch (error) {
      const err = error as CustomError;
      if (err.response && err.response.data && err.response.data) {
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.CENTER);
      }
      const authStore = useAuthen.getState();
      authStore.logoutGoogle();
    }
  };

  const handleSignUp = useCallback(async () => {
    if (!password) {
      ToastAndroid.show('Vui lòng nhập mật khẩu', ToastAndroid.CENTER);
      return;
    }
    if (!confirmPassword) {
      ToastAndroid.show('Vui lòng xác nhận mật khẩu', ToastAndroid.CENTER);
      return;
    }
    if (!password || password !== confirmPassword) {
      ToastAndroid.show(
        'Mật khẩu và mật khẩu xác nhận phải trùng nhau',
        ToastAndroid.CENTER,
      );
      return;
    }
    try {
      const formValues = {
        email: email,
        'full-name': name,
        password,
        'confirm-password': confirmPassword,
        role: 0,
      };
      const res = await signUp(formValues);
      if (res && res.status === 200) {
        router.push({
          pathname: 'InputOtp',
          params: {email},
        });
      }
    } catch (error) {
      const err = error as CustomError;
      if (err.response && err.response.data && err.response.data) {
        ToastAndroid.show(`${err.response.data.message}`, ToastAndroid.CENTER);
      }
    }
  }, [password, confirmPassword]);

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
          <Text style={styles.text}>ĐĂNG KÝ</Text>
        </SectionComponent>
        <SpaceComponent height={45} />
        <SectionComponent>
          <Text style={styles.password}>
            <Text style={{color: 'red'}}>*</Text> Nhập mật khẩu
          </Text>
          <SpaceComponent height={10} />
          <InputComponent
            text="Password"
            placeholder="Mật khẩu"
            onChange={val => setPassword(val)}
            isPassword
            allowClear
            affix={<PasswordCheck size={22} color="gray" />}
          />
        </SectionComponent>
        <SpaceComponent height={20} />
        <SectionComponent>
          <Text style={styles.password}>
            <Text style={{color: 'red'}}>*</Text> Xác nhận mật khẩu
          </Text>
          <SpaceComponent height={10} />
          <InputComponent
            text="Password"
            placeholder="Xác nhận mật khẩu"
            onChange={val => setConfirmPassword(val)}
            isPassword
            allowClear
            affix={<PasswordCheck size={22} color="gray" />}
          />
        </SectionComponent>
        <TouchableOpacity style={styles.button_login} onPress={handleSignUp}>
          <Text style={styles.button_text_login}>Tiếp tục</Text>
        </TouchableOpacity>
        <SectionComponent styles={styles.section_or}>
          <Text style={globalStyles.text}>hoặc</Text>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="Tiếp tục với Google"
            source={require('@/assets/images/logo/logo_google.png')}
            imageStyle={styles.image_google}
            buttonStyle={styles.button_google}
            textStyle={styles.button_text_google}
            onPress={handleLoginWithGoogle}
          />
        </SectionComponent>
      </SectionComponent>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    height: appInfo.sizes.HEIGHT,
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

export default ConfirmPassword;
