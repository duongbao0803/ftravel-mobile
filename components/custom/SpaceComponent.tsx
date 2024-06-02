import React from 'react';
import {View} from 'react-native';

interface SpaceProps {
  width?: number;
  height?: number;
}

const Space: React.FC<SpaceProps> = ({width, height}) => {
  return <View style={{width, height}} />;
};

export default Space;
