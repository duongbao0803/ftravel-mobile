import {SectionComponent} from '@/components/custom';
import {router} from 'expo-router';
import {
  ArrowRight,
  ArrowRight2,
  Bus,
  Logout,
  SecurityUser,
  Coin,
} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

const ChooseSeat = () => {
  const [selectedSeat, setSelectedSeat] = useState('A11');
  const [totalAmount, setTotalAmount] = useState(511);

  const renderSeat = (seatNumber: number | string, isAvailable: boolean) => (
    <TouchableOpacity
      key={seatNumber}
      style={{
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        backgroundColor:
          selectedSeat === seatNumber
            ? '#1CBCD4'
            : isAvailable
              ? '#fff'
              : '#D9D9D9',
        borderColor: isAvailable ? '#1CBCD4' : 'transparent',
        borderWidth: isAvailable ? 2 : 0,
        borderRadius: 4,
      }}
      onPress={() => isAvailable && setSelectedSeat(seatNumber)}>
      <Text
        style={{
          fontSize: 12,
          color: selectedSeat === seatNumber ? 'white' : '#808080',
        }}>
        {seatNumber}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            margin: 15,
            paddingHorizontal: 15,
            paddingVertical: 20,
            gap: 20,
            borderRadius: 10,
          }}>
          <View
            style={{borderWidth: 1, borderColor: '#f1f1f1', borderRadius: 4}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <SecurityUser
                size="30"
                color="#1CBCD4"
                variant="Bold"
                style={{marginLeft: 20}}
              />
              <Logout size="25" color="#1CBCD4" />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 5,
              }}>
              <View style={{flexDirection: 'row', marginRight: 20}}>
                <View style={{flexDirection: 'column', gap: 10}}>
                  {renderSeat('18', true)}
                  {renderSeat('19', true)}
                  {renderSeat('20', false)}
                  {renderSeat('21', true)}
                  {renderSeat('39', true)}
                  {renderSeat('40', true)}
                </View>
                <View style={{flexDirection: 'column', gap: 10}}>
                  {renderSeat('22', true)}
                  {renderSeat('23', false)}
                  {renderSeat('24', true)}
                  {renderSeat('25', true)}
                  {renderSeat('41', true)}
                  {renderSeat('42', true)}
                </View>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 10}}>
                <View style={{flexDirection: 'column', gap: 10}}>
                  {renderSeat('26', true)}
                  {renderSeat('27', true)}
                  {renderSeat('28', true)}
                  {renderSeat('29', true)}
                  {renderSeat('43', true)}
                  {renderSeat('44', true)}
                </View>
                <View style={{flexDirection: 'column', gap: 10}}>
                  {renderSeat('30', true)}
                  {renderSeat('31', true)}
                  {renderSeat('32', true)}
                  {renderSeat('33', true)}
                  {renderSeat('45', true)}
                  {renderSeat('46', true)}
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 20,
              width: '100%',
              marginBottom: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  borderRadius: 4,
                  backgroundColor: '#1CBCD4',
                }}
              />
              <Text style={{fontSize: 14}}>Ghế bạn chọn</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  borderRadius: 4,
                  backgroundColor: '#D9D9D9',
                }}
              />
              <Text style={{fontSize: 14}}>Ghế đã bán</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: '#1CBCD4',
                }}
              />
              <Text style={{fontSize: 14}}>Ghế thường</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            // alignItems: 'center',
            borderRadius: 10,
            marginHorizontal: 15,
            paddingHorizontal: 10,
            paddingVertical: 15,
            marginBottom: 20,
            backgroundColor: '#fff',
          }}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>FTravel Bus</Text>
            <Text
              style={{
                fontSize: 16,
                borderBottomWidth: 0.5,
                borderColor: '#808080',
                paddingBottom: 10,
              }}>
              Giường nằm
            </Text>
          </View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 10,
              }}>
              <Text style={{fontSize: 16}}>Thông tin nhà xe</Text>
              <ArrowRight2 size={18} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{backgroundColor: '#fff', flex: 4}}>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <View
            style={{
              backgroundColor: '#f9f9f9',
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{gap: 15}}>
              <Text style={{color: '#404040', fontSize: 16}}>Ghế đã chọn</Text>
              <Text style={{color: '#404040', fontSize: 16}}>Tổng tiền</Text>
            </View>
            <View style={{gap: 15}}>
              <Text style={{color: '#1CBCD4', fontSize: 16}}>A11</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 5,
                }}>
                <Text
                  style={{color: '#404040', fontWeight: 'bold', fontSize: 16}}>
                  511
                </Text>
                <Coin size="13" color="#1CBCD4" variant="Bulk" />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 25,
            padding: 10,
          }}>
          <SectionComponent
            styles={{
              width: '100%',
              backgroundColor: '#1CBCD4',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => router.push('ChooseService')}
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 18, color: '#fff'}}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </View>
    </View>
  );
};

export default ChooseSeat;
