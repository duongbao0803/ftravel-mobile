import {View, Text, StyleProp, TextStyle, Platform} from 'react-native';
import React from 'react';
import {globalStyles} from '@/constants/globalStyles';
import {fontFamilies} from '@/constants/fontFamilies';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numberOfLine?: number;
}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, styles, title, numberOfLine} = props;

  const fontSizeDefault = Platform.OS === 'ios' ? 16 : 14;

  return (
    <Text
      numberOfLines={numberOfLine}
      style={[
        globalStyles.text,
        {
          color: color ?? 'red',
          flex: flex ?? 0,
          fontSize: size ? size : title ? 24 : fontSizeDefault,
          fontFamily: font
            ? font
            : title
              ? fontFamilies.medium
              : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
