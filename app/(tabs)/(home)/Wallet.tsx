import {SectionComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import {router, useRouter} from 'expo-router';
import {Money4, EyeSlash, Eye, Coin} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Wallet = () => {
  const [isShowBalance, setIsShowBalance] = useState<boolean>(false);

  const toggleBalanceVisibility = () => {
    setIsShowBalance(!isShowBalance);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginTop: 20,
        }}>
        <View>
          <View style={{borderRadius: 10}}>
            <View
              style={{
                backgroundColor: '#1CBCD4',
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('@/assets/images/logo/logo_ftravel.png')}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'contain',
                    borderWidth: 1,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                  }}
                />
                <View style={{marginLeft: 10, gap: 5}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'semibold',
                      fontSize: 18,
                    }}>
                    FTravel Pay
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Coin size="18" color="#FFC700" variant="Bulk" />
                    {isShowBalance ? (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'semibold',
                          fontSize: 18,
                        }}>
                        100
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 18,
                        }}>
                        *****
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                {isShowBalance ? (
                  <EyeSlash size={22} color="#fff" variant="Bold" />
                ) : (
                  <Eye size={22} color="#fff" variant="Bold" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  borderWidth: 1,
                  borderTopWidth: 0,
                  borderColor: '#dadada',
                }}>
                <TouchableOpacity onPress={() => router.push('ChargeMoney')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 5,
                    }}>
                    <Money4 size="18" color="#1CBCD4" variant="Bold" />
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#1CBCD4',
                        fontWeight: 'bold',
                      }}>
                      Nạp tiền
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: 15}}>
          <View>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#404040'}}>
              Lịch sử giao dịch
            </Text>
            <Text
              style={{
                color: '#1CBCD4',
                borderBottomWidth: 2,
                borderColor: '#1CBCD4',
                fontWeight: 'semibold',
                textAlign: 'center',
                width: 80,
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                marginTop: 10,
              }}>
              Tất cả
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet_payment.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet_payment.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
          <View style={{marginTop: 15, marginBottom: 10}}>
            <View style={{borderRadius: 10}}>
              <View
                style={{
                  borderTopRightRadius: 15,
                  borderTopLeftRadius: 15,

                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      borderWidth: 2,
                      borderRadius: 100,
                      borderColor: '#e7e7e7',
                    }}>
                    <Image
                      source={require('@/assets/images/logo/logo_wallet_payment.png')}
                      style={{
                        width: 55,
                        height: 55,
                        resizeMode: 'contain',
                        borderWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 100,
                      }}
                    />
                  </View>

                  <View style={{marginLeft: 10, gap: 15}}>
                    <Text
                      style={{
                        color: '#404040',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Nạp tiền vào ví từ VNPAY
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: 14, color: '#757575'}}>
                        18: 16 - 23/06/2024
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontWeight: 'bold'}}>+ 100 </Text>
                  <Coin size="18" color="#FFC700" variant="Bulk" />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
