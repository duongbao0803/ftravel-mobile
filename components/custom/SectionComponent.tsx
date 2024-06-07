import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {globalStyles} from '@/constants/globalStyles';

interface SectionProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const SectionComponent: React.FC<SectionProps> = props => {
  const {children, styles} = props;
  return <View style={(globalStyles.section, styles)}>{children}</View>;
};

export default SectionComponent;
