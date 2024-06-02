import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  text?: string;
  source?: ImageSourcePropType;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const Button: React.FC<ButtonProps> = props => {
  const {text, source, buttonStyle, textStyle, imageStyle, onPress} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        {source && <Image source={source} style={imageStyle} />}
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // marginHorizontal: 30,
    justifyContent: 'center',
  },
});

export default Button;
