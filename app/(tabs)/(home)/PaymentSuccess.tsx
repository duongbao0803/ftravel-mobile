import {SectionComponent} from '@/components/custom';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';

const PaymentSuccess: React.FC = () => {
  return (
    <div>
      {' '}
      <SafeAreaView>
        <SectionComponent>
          <Text>Trạng thái</Text>
        </SectionComponent>
      </SafeAreaView>
    </div>
  );
};

export default PaymentSuccess;
