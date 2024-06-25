import {Link, useNavigation, useRouter} from 'expo-router';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowRight, Coin} from 'iconsax-react-native';
import {SectionComponent} from '@/components/custom';

const ListTrip = () => {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handlePress = (index: number) => {
    setSelectedIdx(index === selectedIdx ? null : index);
  };

  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18}}>Hồ Chí Minh</Text>
          <ArrowRight size={30} color="#1CBCD4" />
          <Text style={{fontSize: 18}}>Cần Thơ</Text>
        </View>
        <ScrollView horizontal style={{marginVertical: 10}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            {[...Array(7).keys()].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(index)}
                style={{
                  borderBottomColor:
                    index === selectedIdx ? '#000000' : 'transparent',
                  borderBottomWidth: index === selectedIdx ? 1 : 0,
                  paddingBottom: index === selectedIdx ? 5 : 0,
                }}>
                <View>
                  <Text>T2 - 27/05</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={{flex: 4}}>
        <View style={{margin: 16}}>
          <TouchableOpacity
            onPress={() => router.push('ListTrip/[id]')}
            style={{
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              height: 130,
              borderRadius: 10,
              marginBottom: 16,
            }}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 2.5,
                  flexDirection: 'column',
                  borderStyle: 'dashed',
                  justifyContent: 'space-between',
                  borderRightWidth: 1,
                  height: 100,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <SectionComponent>
                    <Text style={{fontWeight: '800', fontSize: 17}}>05:00</Text>
                    <Text style={{fontSize: 13}}>HCM</Text>
                  </SectionComponent>

                  <SectionComponent>
                    <ArrowRight size={40} color="#1CBCD4" />
                  </SectionComponent>
                  <SectionComponent styles={{marginRight: 30}}>
                    <Text style={{fontWeight: '800', fontSize: 17}}>11:00</Text>
                    <Text style={{fontSize: 13}}>Cần Thơ</Text>
                  </SectionComponent>
                </View>
                <SectionComponent
                  styles={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    gap: 10,
                  }}>
                  <Image
                    source={require('@/assets/images/logo/logo_ftravel.png')}
                    style={{
                      width: 30,
                      height: 30,
                      objectFit: 'cover',
                      borderWidth: 1,
                    }}
                  />
                  <Text style={{fontWeight: '800', fontSize: 17}}>
                    Phương Trang
                  </Text>
                </SectionComponent>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <SectionComponent>
                  <Text style={{fontWeight: '800', fontSize: 17}}>
                    1.000đ <Coin size="15" color="#1CC8DC" variant="Bulk" />
                  </Text>
                  <Text style={{fontSize: 13}}>Còn 1 chỗ</Text>
                </SectionComponent>
                <SectionComponent>
                  <Text
                    style={{
                      fontWeight: '800',
                      fontSize: 13,
                      textDecorationLine: 'underline',
                      color: '#1CBCD4',
                    }}>
                    Chi tiết
                  </Text>
                </SectionComponent>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ListTrip;
