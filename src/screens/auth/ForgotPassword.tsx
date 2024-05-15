import {View, Text, StyleSheet} from 'react-native';
import {Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  ImageBackgroundComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components';
import {appInfo} from '@/constants/appInfoStyles';

const ForgotPassword = () => {
  const [, setUserName] = useState<string>('');

  return (
    <View style={styles.container}>
      <ImageBackgroundComponent
        imageBackground={styles.splash_background}
        source={require('@/assets/images/splash_login_screen.png')}>
        <SectionComponent styles={styles.title_background}>
          <Text style={styles.text_title}>Reset Password</Text>
          <SpaceComponent height={8} />
          <Text style={styles.text_title_child}>
            Please enter your email address to request a password reset
          </Text>
        </SectionComponent>
        <SpaceComponent height={8} />
        <SectionComponent>
          <InputComponent
            text="Usename"
            placeholder="Email"
            onChange={val => setUserName(val)}
            affix={<Sms size={22} color="gray" />}
          />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="SEND"
            buttonStyle={styles.button_login}
            textStyle={styles.button_text_login}
          />
        </SectionComponent>
      </ImageBackgroundComponent>
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
  splash_background: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  title_background: {
    maxWidth: appInfo.sizes.WIDTH * 0.6,
    marginVertical: 20,
  },
  text_title: {
    fontSize: 30,
    color: '#000000',
  },
  text_title_child: {
    fontSize: 16,
    color: '#000000',
  },
  button_login: {
    backgroundColor: '#ff7800',
    padding: 10,
    borderRadius: 10,
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

export default ForgotPassword;
