import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardType,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {Eye, EyeSlash} from 'iconsax-react-native';
import {AntDesign} from '@expo/vector-icons';

interface Props {
  text: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
}

const InputComponent = (props: Props) => {
  const {
    text,
    onChange,
    affix,
    suffix,
    placeholder,
    isPassword,
    allowClear,
    type,
  } = props;

  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View style={styles.inputContainer}>
      {affix ?? affix}
      <TextInput
        style={styles.input}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={'#747688'}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          isShowPassword ? (
            <EyeSlash size={22} color="gray" />
          ) : (
            <Eye size={22} color="gray" />
          )
        ) : (
          text.length > 0 &&
          allowClear && <AntDesign name="close" size={22} color={'black'} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#807A7A',
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 19,
  },

  input: {
    flex: 1,
    paddingHorizontal: 12,
    color: 'black',
  },
});
