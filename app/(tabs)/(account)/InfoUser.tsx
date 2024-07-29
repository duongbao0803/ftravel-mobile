import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import {Camera, CloseCircle, Edit2} from 'iconsax-react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {RadioButton, RadioGroup} from 'react-native-ui-lib';
import {
  LoadingScreen,
  SectionComponent,
  SpaceComponent,
} from '@/components/custom';
import {appColors} from '@/constants/appColors';
import {formatDate} from '@/utils/formatDate';
import {storage} from '@/config/firebase';
import useAuthService from '@/services/authService';
import useAuthen from '@/hooks/useAuthen';

const InfoUser: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date());
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isFullNameEditable, setIsFullNameEditable] = useState<boolean>(false);
  const [isPhoneNumberEditable, setIsPhoneNumberEditable] =
    useState<boolean>(false);
  const [isAddressEditable, setIsAddressEditable] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const {userInfo} = useAuthService();
  const {updateUserItem} = useAuthService();

  const [formData, setFormData] = useState({
    'account-id': userInfo?.id ?? 0,
    'avatar-url': '',
    'full-name': '',
    'phone-number': '',
    dob: new Date(),
    gender: 0,
    address: '',
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        'account-id': userInfo?.id,
        'avatar-url': userInfo['avatar-url'] || '',
        'full-name': userInfo['full-name'] || '',
        'phone-number': userInfo['phone-number'] || 'Chưa cập nhật',
        dob: userInfo?.dob ? new Date() : new Date(),
        gender: userInfo.gender || 0,
        address: userInfo.address || 'Chưa cập nhật',
      });
      setImage(userInfo['avatar-url'] || '');
      setDate(userInfo.dob ? new Date(userInfo.dob) : new Date());
      setSelectedGender(userInfo.gender || 0);
    }
  }, [userInfo]);

  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      dob: date,
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
      'avatar-url': image,
    }));
  }, [image]);

  const uploadImage = async (file: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(file?.uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `/FTravel/${file.fileName}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
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
        setImage(downloadURL);
      }
    } catch (error) {}
  };

  const onChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setIsShow(false);
    if (currentDate) {
      const adjustedDate = new Date(
        currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
      );
      setDate(adjustedDate);
    }
  };

  const showDatepicker = () => {
    setIsShow(true);
  };

  const handleGenderChange = (newGender: string) => {
    setSelectedGender(newGender === 'male' ? 0 : 1);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (isLoading) {
      ToastAndroid.show(
        'Vui lòng đợi cập nhật ảnh đại diện',
        ToastAndroid.CENTER,
      );
      return;
    }
    if (formData?.['phone-number']?.length !== 10) {
      ToastAndroid.show(
        'Số điện thoại phải có đúng 10 số',
        ToastAndroid.CENTER,
      );
      return;
    }
    const authStore = useAuthen.getState();
    authStore.setIsLoading(true);
    try {
      await updateUserItem(formData);
      authStore.setIsLoading(false);
    } catch (err) {
      authStore.setIsLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <ScrollView>
            <SectionComponent styles={styles.container_section}>
              <SectionComponent styles={styles.avatar}>
                <TouchableOpacity onPress={pickImage}>
                  {isLoading ? (
                    <View style={styles.imageContainer}>
                      <ActivityIndicator size="large" color="#1CBCD4" />
                    </View>
                  ) : (
                    <>
                      {formData?.['avatar-url'] ? (
                        <View style={styles.imageContainer}>
                          <Camera
                            size="28"
                            variant="Bold"
                            color="#1CBCD4"
                            style={styles.icon}
                          />
                          <Image
                            source={{uri: formData?.['avatar-url']}}
                            style={styles.image}
                          />
                        </View>
                      ) : (
                        <View style={styles.imageContainer}>
                          <Camera
                            size="28"
                            variant="Bold"
                            color="#1CBCD4"
                            style={styles.icon}
                          />
                          <Image
                            source={require('@/assets/images/logo/logo_user.jpg')}
                            style={styles.image}
                          />
                        </View>
                      )}
                    </>
                  )}
                </TouchableOpacity>
              </SectionComponent>
              <SpaceComponent height={40} />
              <SectionComponent styles={styles.container_form}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.content}>{userInfo?.email}</Text>
                <Edit2 size={18} color={appColors.blue} style={{opacity: 0}} />
              </SectionComponent>
              <SectionComponent styles={styles.container_form}>
                <Text style={styles.label}>Họ tên</Text>
                {isFullNameEditable ? (
                  <>
                    <TextInput
                      style={styles.inputContent}
                      onChangeText={value => handleChange('full-name', value)}
                      placeholder="Nhập họ và tên"
                    />
                    <TouchableOpacity
                      onPress={() => setIsFullNameEditable(false)}>
                      <CloseCircle size={18} color="red" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.content}>
                      {userInfo?.['full-name']}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsFullNameEditable(true)}>
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
                      onChangeText={value =>
                        handleChange('phone-number', value)
                      }
                    />
                    <TouchableOpacity
                      onPress={() => setIsPhoneNumberEditable(false)}>
                      <CloseCircle size={18} color="red" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.content}>
                      {userInfo?.['phone-number']}
                    </Text>
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
                  <Edit2 size={18} color={appColors.blue} />
                </TouchableOpacity>
                {isShow && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    maximumDate={new Date()}
                  />
                )}
              </SectionComponent>
              <SectionComponent styles={styles.container_form}>
                <Text style={styles.label}>Giới tính</Text>
                <View style={styles.content}>
                  <RadioGroup
                    initialValue={selectedGender === 0 ? 'male' : 'female'}
                    onValueChange={handleGenderChange}
                    style={{flexDirection: 'row'}}>
                    <RadioButton
                      value="male"
                      label="Nam"
                      color={appColors.blue}
                    />
                    <SpaceComponent width={30} />
                    <RadioButton
                      value="female"
                      label="Nữ"
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
                    <TouchableOpacity
                      onPress={() => setIsAddressEditable(false)}>
                      <CloseCircle size={18} color="red" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.content}>{formData.address}</Text>
                    <TouchableOpacity
                      onPress={() => setIsAddressEditable(true)}>
                      <Edit2 size={18} color={appColors.blue} />
                    </TouchableOpacity>
                  </>
                )}
              </SectionComponent>
            </SectionComponent>
            <SectionComponent styles={styles.container_footer}>
              <TouchableOpacity
                onPress={handleSave}
                style={styles.button_confirm}>
                <Text style={styles.button_text_confirm}>
                  Xác nhận thông tin
                </Text>
              </TouchableOpacity>
            </SectionComponent>
          </ScrollView>
        </View>
      </SafeAreaView>
      <LoadingScreen />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container_header: {
    backgroundColor: appColors.blue,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  container_section: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 50,
  },
  container_footer: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  avatar: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: '#1CBCD4',
    borderRadius: 100,
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
  icon: {
    position: 'absolute',
    zIndex: 999,
    right: 0,
    bottom: 5,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },
});

export default InfoUser;
