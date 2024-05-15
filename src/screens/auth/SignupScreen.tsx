import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Link} from '@react-navigation/native';
import {CallCalling, PasswordCheck, Sms, UserTag} from 'iconsax-react-native';
import {appInfo} from '@/constants/appInfoStyles';
import {
  ButtonComponent,
  ImageBackgroundComponent,
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components';
import {globalStyles} from '@/styles/globalStyles';

const SignupScreen: React.FC = () => {
  const [, setUserName] = useState<string>('');
  const [, setPassowrd] = useState<string>('');

  return (
    <View style={styles.container}>
      <ImageBackgroundComponent
        imageBackground={styles.splash_background}
        source={require('@/assets/images/splash_login_screen.png')}>
        <SectionComponent>
          <Text style={styles.text}>Sign up</Text>
        </SectionComponent>
        <SpaceComponent height={15} />
        <SectionComponent>
          <InputComponent
            text="Email"
            placeholder="Email"
            onChange={val => setUserName(val)}
            affix={<UserTag size="22" color="gray" />}
          />
        </SectionComponent>
        <SpaceComponent height={10} />

        <SectionComponent>
          <InputComponent
            text="Name"
            placeholder="Fullname"
            onChange={val => setUserName(val)}
            affix={<Sms size={22} color="gray" />}
          />
        </SectionComponent>
        <SpaceComponent height={10} />
        <SectionComponent>
          <InputComponent
            text="Phone"
            placeholder="Phone"
            onChange={val => setUserName(val)}
            affix={<CallCalling size="22" color="gray" />}
          />
        </SectionComponent>
        <SpaceComponent height={10} />
        <SectionComponent>
          <InputComponent
            text="Password"
            placeholder="Password"
            onChange={val => setPassowrd(val)}
            isPassword
            allowClear
            affix={<PasswordCheck size={22} color="gray" />}
          />
        </SectionComponent>
        <SpaceComponent height={10} />
        <SectionComponent>
          <InputComponent
            text="confirmPassword"
            placeholder="Confirm Password"
            onChange={val => setPassowrd(val)}
            isPassword
            allowClear
            affix={<PasswordCheck size={22} color="gray" />}
          />
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="SIGN UP"
            buttonStyle={styles.button_login}
            textStyle={styles.button_text_login}
          />
        </SectionComponent>
        <SectionComponent styles={styles.section_or}>
          <Text style={globalStyles.text}>OR</Text>
        </SectionComponent>
        <SectionComponent>
          <ButtonComponent
            text="Continue with Google"
            source={require('@/assets/images/logo_google.png')}
            imageStyle={styles.image_google}
            buttonStyle={styles.button_google}
            textStyle={styles.button_text_google}
          />
        </SectionComponent>
        <SpaceComponent height={10} />
        <SectionComponent styles={styles.section_signup}>
          <Text style={globalStyles.text}>Don't have an account?</Text>
          <Text> </Text>
          <Link to={{screen: 'LoginScreen'}} style={styles.section_signup_text}>
            Sign In
          </Link>
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

  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },

  container_logo: {
    alignItems: 'center',
  },

  logo: {
    width: appInfo.sizes.WIDTH * 0.6,
    height: appInfo.sizes.HEIGHT * 0.2,
    resizeMode: 'contain',
  },
  background_color: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row-reverse',
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

  section_or: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  image_google: {
    width: 20,
    height: 20,
  },

  button_google: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
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
});

export default SignupScreen;
