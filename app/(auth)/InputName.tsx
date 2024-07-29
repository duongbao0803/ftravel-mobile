import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {router} from 'expo-router';
import {User} from 'iconsax-react-native';
import {appInfo} from '@/constants/appInfoStyles';
import {
  InputComponent,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';

const InputName: React.FC = () => {
  const [name, setName] = useState<string>('');
  const route = useRoute();
  const {email} = route.params as {email: string};

  const handleName = () => {
    if (!name) {
      ToastAndroid.show('Vui lòng nhập tên của bạn', ToastAndroid.CENTER);
      return;
    }
    if (name.length < 8) {
      ToastAndroid.show('Tên phải có ít nhất 8 ký tự', ToastAndroid.CENTER);
      return;
    }
    router.push({pathname: 'ConfirmPassword', params: {name, email}});
  };

  return (
    <View style={styles.container}>
      <SectionComponent styles={styles.container_form}>
        <SectionComponent styles={styles.container_logo}>
          <Image
            source={require('@/assets/images/logo/logo_app.png')}
            style={styles.logo}
          />
        </SectionComponent>
        <SectionComponent>
          <Text style={styles.text}>ĐĂNG KÝ</Text>
        </SectionComponent>
        <SpaceComponent height={45} />
        <SectionComponent>
          <Text style={styles.email}>
            <Text style={{color: 'red'}}>*</Text> Bạn muốn chúng tôi gọi bạn là
            gì?
          </Text>
          <SpaceComponent height={10} />
          <InputComponent
            text="Usename"
            placeholder="Họ và tên"
            onChange={val => setName(val)}
            affix={<User size="22" color="gray" />}
          />
        </SectionComponent>
        <TouchableOpacity style={styles.button_login} onPress={handleName}>
          <Text style={styles.button_text_login}>Tiếp tục</Text>
        </TouchableOpacity>
      </SectionComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: appInfo.sizes.HEIGHT * 1,
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

export default InputName;
