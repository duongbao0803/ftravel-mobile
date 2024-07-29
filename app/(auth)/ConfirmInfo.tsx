import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import 'firebase/storage';
import {Link} from 'expo-router';
import {SectionComponent, SpaceComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {appColors} from '@/constants/appColors';
import {CloseCircle, Edit2} from 'iconsax-react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {formatDate} from '@/utils/formatDate';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import {storage} from '@/config/firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {useRoute} from '@react-navigation/native';
import {EditInfo} from '@/types/auth.types';

const ConfirmInfo: React.FC = React.memo(() => {
  const [image, setImage] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isFullNameEditable, setIsFullNameEditable] = useState(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] = useState(false);
  const [isAddressEditable, setIsAddressEditable] = useState(false);
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const route = useRoute();
  const {email} = route.params as {email: string};

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      dateOfBirth: date,
    }));
  }, [date]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      gender: selectedGender,
    }));
  }, [selectedGender]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      image: image,
    }));
  }, [image]);

  const [formData, setFormData] = useState<EditInfo>({
    'account-id': 0,
    'avatar-url': image,
    'full-name': 'Dương Tôn Bảo',
    'phone-number': '0909113114',
    dob: date,
    gender: selectedGender,
    address: 'Chưa cập nhật',
  });

  const uploadImage = async (file: any) => {
    try {
      const response = await fetch(file?.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `/FTravel/${file.fileName}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {}
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        const downloadURL = await uploadImage(file);
        setImage(downloadURL ?? '');
      }
    } catch (error) {}
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setIsShow(false);
    const adjustedDate = new Date(
      currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
    );
    setDate(adjustedDate);
  };

  const showDatepicker = () => {
    setIsShow(true);
  };

  const handleGenderChange = (newGender: string) => {
    setSelectedGender(newGender === 'male' ? 0 : 1);
  };

  const handleChange = (name: any, value: any) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SafeAreaView>
          <SectionComponent styles={styles.container_header}>
            <Text style={styles.text}>Thông tin tài khoản</Text>
          </SectionComponent>
        </SafeAreaView>
        <ScrollView>
          <SectionComponent styles={styles.container_section}>
            <TouchableOpacity onPress={pickImage}>
              <SectionComponent styles={styles.avatar}>
                {image ? (
                  <Image source={{uri: image}} style={styles.image} />
                ) : (
                  <Image
                    source={require('@/assets/images/logo/logo_user.jpg')}
                    style={styles.image}
                  />
                )}
              </SectionComponent>
            </TouchableOpacity>
            <SpaceComponent height={40} />
            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.content}>{email}</Text>
              <Edit2 size="18" color={appColors.blue} style={{opacity: 0}} />
            </SectionComponent>
            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Họ tên</Text>
              {isFullNameEditable ? (
                <>
                  <TextInput
                    style={styles.inputContent}
                    value={formData['full-name']}
                    onChangeText={value => handleChange('fullName', value)}
                    placeholder="Nhập họ và tên"
                  />
                  <TouchableOpacity
                    onPress={() => setIsFullNameEditable(false)}>
                    <CloseCircle size="18" color="red" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.content}>{formData['full-name']}</Text>
                  <TouchableOpacity onPress={() => setIsFullNameEditable(true)}>
                    <Edit2 size={18} color={appColors.blue} />
                  </TouchableOpacity>
                </>
              )}
            </SectionComponent>
            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Số điện thoại</Text>
              {isPhoneNumberEditable ? (
                <>
                  <TextInput
                    style={styles.inputContent}
                    value={formData['phone-number']}
                    onChangeText={value => handleChange('phoneNumber', value)}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPhoneNumberEditable(false)}>
                    <CloseCircle size="18" color="red" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.content}>{formData['phone-number']}</Text>
                  <TouchableOpacity
                    onPress={() => setIsPhoneNumberEditable(true)}>
                    <Edit2 size={18} color={appColors.blue} />
                  </TouchableOpacity>
                </>
              )}
            </SectionComponent>
            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Ngày sinh</Text>
              <Text style={styles.content}>{formatDate(date)}</Text>

              <TouchableOpacity onPress={showDatepicker}>
                {isShow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
                <Edit2 size="18" color={appColors.blue} />
              </TouchableOpacity>
            </SectionComponent>
            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Giới tính</Text>
              <View style={styles.content}>
                <RadioGroup
                  initialValue={selectedGender === 0 ? 'male' : 'female'}
                  onValueChange={handleGenderChange}
                  style={{flexDirection: 'row'}}>
                  <RadioButton
                    value={'male'}
                    label={'Nam'}
                    color={appColors.blue}
                  />
                  <SpaceComponent width={30} />
                  <RadioButton
                    value={'female'}
                    label={'Nữ'}
                    color={appColors.blue}
                  />
                </RadioGroup>
              </View>
            </SectionComponent>

            <SectionComponent styles={styles.container_form}>
              <Text style={styles.label}>Địa chỉ</Text>
              {isAddressEditable ? (
                <>
                  <TextInput
                    style={styles.inputContent}
                    value={formData.address}
                    onChangeText={value => handleChange('address', value)}
                  />
                  <TouchableOpacity onPress={() => setIsAddressEditable(false)}>
                    <CloseCircle size="18" color="red" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.content}>{formData.address}</Text>
                  <TouchableOpacity onPress={() => setIsAddressEditable(true)}>
                    <Edit2 size={18} color={appColors.blue} />
                  </TouchableOpacity>
                </>
              )}
            </SectionComponent>
          </SectionComponent>
          <SectionComponent styles={styles.container_footer}>
            <Link href="/InputOtp" asChild style={styles.button_confirm}>
              <TouchableOpacity>
                <Text style={styles.button_text_confirm}>
                  Xác nhận thông tin
                </Text>
              </TouchableOpacity>
            </Link>
          </SectionComponent>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    height: appInfo.sizes.HEIGHT * 1,
    backgroundColor: '#fff',
  },
  container_header: {
    height: appInfo.sizes.HEIGHT * 0.1,
    backgroundColor: appColors.blue,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  container_section: {
    height: appInfo.sizes.HEIGHT * 0.8,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 50,
  },
  container_footer: {
    height: appInfo.sizes.HEIGHT * 0.1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'gray',
  },
  button_text_confirm: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  button_confirm: {
    backgroundColor: '#1CBCD4',
    height: 50,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  container_form: {
    flexDirection: 'row',
    padding: 25,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 25,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
  },
  inputContent: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
    margin: -4,
  },
});

export default ConfirmInfo;
