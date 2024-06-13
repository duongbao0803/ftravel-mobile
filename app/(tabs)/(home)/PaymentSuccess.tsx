import {SectionComponent} from '@/components/custom';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const PaymentSuccess: React.FC = () => {
  return (
    <div>
      {' '}
      <SafeAreaView>
        <SectionComponent>
          <Text>Thông tin tài khoản</Text>
        </SectionComponent>
      </SafeAreaView>
    </div>
  );
};

export default PaymentSuccess;
