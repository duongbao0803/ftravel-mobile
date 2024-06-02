import {
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface ImageBackgroundProps {
  children: React.ReactNode;
  imageBackground?: StyleProp<ViewStyle>;
  source?: ImageSourcePropType;
}

const ImageBackgroundComponent: React.FC<ImageBackgroundProps> = props => {
  const {children, imageBackground, source} = props;

  return (
    <ImageBackground source={source} style={imageBackground}>
      {children}
    </ImageBackground>
  );
};

export default ImageBackgroundComponent;
