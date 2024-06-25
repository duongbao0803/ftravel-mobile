import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {ArrowRight, Coin} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';

const TicketList: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            flex: 1,
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: isSelected ? '#1CBCD4' : 'transparent',
          }}
          onPress={() => setIsSelected(true)}>
          <Text style={{textAlign: 'center'}}>Sắp tới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            flex: 1,
            padding: 10,
            borderBottomWidth: 2,
            borderBottomColor: !isSelected ? '#1CBCD4' : 'transparent',
          }}
          onPress={() => setIsSelected(false)}>
          <Text style={{textAlign: 'center'}}>Đã đi</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 4}}>
        {isSelected ? (
          <View style={{margin: 16}}>
            <TouchableOpacity
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
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        05:00
                      </Text>
                      <Text style={{fontSize: 13}}>HCM</Text>
                    </SectionComponent>

                    <SectionComponent>
                      <ArrowRight size={40} color="#1CBCD4" />
                    </SectionComponent>
                    <SectionComponent styles={{marginRight: 30}}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        11:00
                      </Text>
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
        ) : (
          <View style={{margin: 16}}>
            <TouchableOpacity
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
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        05:00
                      </Text>
                      <Text style={{fontSize: 13}}>HCM</Text>
                    </SectionComponent>

                    <SectionComponent>
                      <ArrowRight size={40} color="#1CBCD4" />
                    </SectionComponent>
                    <SectionComponent styles={{marginRight: 30}}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        11:00
                      </Text>
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
            <TouchableOpacity
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
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        05:00
                      </Text>
                      <Text style={{fontSize: 13}}>HCM</Text>
                    </SectionComponent>

                    <SectionComponent>
                      <ArrowRight size={40} color="#1CBCD4" />
                    </SectionComponent>
                    <SectionComponent styles={{marginRight: 30}}>
                      <Text style={{fontWeight: '800', fontSize: 17}}>
                        11:00
                      </Text>
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
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
export default TicketList;
