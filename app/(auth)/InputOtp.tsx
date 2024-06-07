import {SectionComponent, SpaceComponent} from '@/components/custom';
import TextComponent from '@/components/custom/TextComponent';
import {appColors} from '@/constants/appColors';
import {appInfo} from '@/constants/appInfoStyles';
import {Link} from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';

const InputOtp = () => {
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
            numberOfDigits={4}
            focusColor="green"
            focusStickBlinkingDuration={500}
            onTextChange={text => console.log(text)}
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
          <Link href="/Home" asChild style={styles.button_login}>
            <TouchableOpacity>
              <Text style={styles.button_text_login}>Tiếp tục</Text>
            </TouchableOpacity>
          </Link>
        </SectionComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: appInfo.sizes.HEIGHT,
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
