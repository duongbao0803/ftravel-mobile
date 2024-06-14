import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {Sms} from 'iconsax-react-native';
import * as Animatable from 'react-native-animatable';
import {appInfo} from '@/constants/appInfoStyles';
import {
  ButtonComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';
import {globalStyles} from '@/constants/globalStyles';
import messaging from '@react-native-firebase/messaging';
import {Link} from 'expo-router';

const InputEmail: React.FC = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    console.log('check message', remoteMessage);
  });

  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  };

  requestUserPermission();
  getToken();

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInRight">
        <SectionComponent styles={styles.container_logo}>
          <Image
            source={require('@/assets/images/logo/logo_app.png')}
            style={styles.logo}
          />
        </SectionComponent>
        <SectionComponent styles={styles.container_form}>
          <SectionComponent>
            <Text style={styles.text}>CHÀO MỪNG ĐÃ TRỞ LẠI</Text>
          </SectionComponent>
          <SpaceComponent height={45} />
          <SectionComponent>
            <Text style={styles.email}>
              <Text style={{color: 'red'}}>*</Text> Email của bạn
            </Text>
            <SpaceComponent height={10} />
            <InputComponent
              text="Usename"
              placeholder="Email"
              // onChange={val => setUserName(val)}
              affix={<Sms size={22} color="gray" />}
            />
          </SectionComponent>
          <Link href="/InputName" asChild style={styles.button_login}>
            <TouchableOpacity>
              <Text style={styles.button_text_login}>Tiếp tục</Text>
            </TouchableOpacity>
          </Link>
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
              // onPress={handleLoginWithGoogle}
            />
          </SectionComponent>
        </SectionComponent>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  email: {
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

export default InputEmail;
