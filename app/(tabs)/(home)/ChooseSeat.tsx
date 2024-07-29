import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from 'expo-router';
import {ArrowRight2, Logout, SecurityUser, Coin} from 'iconsax-react-native';
import {getTripDetail} from '@/api/tripApi';
import {SectionComponent} from '@/components/custom';
import useRouteStore from '@/hooks/useRouteStore';
import useServiceStore from '@/hooks/useServiceStore';
import useTicketStore from '@/hooks/useTicketStore';
import useTripStore from '@/hooks/useTripStore';
import {useRoute} from '@react-navigation/native';

const ChooseSeat: React.FC = React.memo(() => {
  const [seats, setSeats] = useState([]);
  const route = useRoute();
  const {tripId} = route.params as {tripId: number};
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const seatCode = useServiceStore(state => state.seatCode);
  const total = useServiceStore(state => state.total);
  const setSeatCode = useServiceStore(state => state.setSeatCode);
  const setTotal = useServiceStore(state => state.setTotal);
  const setRouteId = useRouteStore(state => state.setRouteId);
  const resetQuantities = useServiceStore(state => state.resetQuantities);
  const setBusCompanyName = useTripStore(state => state.setBusCompanyName);
  const busCompany = useTripStore(state => state.busCompany);
  const setTicketId = useTicketStore(state => state.setTicketId);
  const setStartDate = useTripStore(state => state.setStartDate);
  const setEndDate = useTripStore(state => state.setEndDate);
  const [listServiceByTrip, setListServiceByTrip] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      if (tripId) {
        try {
          setIsLoading(true);
          const res = await getTripDetail(tripId);
          if (res && res.status === 200) {
            setListServiceByTrip(res?.data?.services);
            setStartDate(res?.data['estimated-start-date']);
            setEndDate(res?.data['estimated-end-date']);
            setBusCompanyName(res?.data['bus-company-name']);
            setRouteId(res?.data?.['route-id']);
            setSeats(res?.data?.tickets);
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [tripId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setSeatCode('');
      setTotal(0);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    resetQuantities();
  }, []);

  const filteredSeatsA = seats?.filter(seat =>
    seat['seat-code'].startsWith('A'),
  );
  const filteredSeatsB = seats?.filter(seat =>
    seat['seat-code'].startsWith('B'),
  );

  const renderSeat = useCallback(
    (
      id: number,
      seatNumber: number | string,
      isAvailable: boolean,
      price: number,
      isVip: boolean = false,
    ) => (
      <TouchableOpacity
        key={seatNumber}
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          margin: 5,
          backgroundColor:
            seatCode === seatNumber
              ? isVip
                ? '#FFD700'
                : '#1CBCD4'
              : isAvailable
                ? '#fff'
                : '#D9D9D9',
          borderColor: isAvailable
            ? isVip
              ? '#FFD700'
              : '#1CBCD4'
            : 'transparent',
          borderWidth: isAvailable ? 2 : 0,
          borderRadius: 4,
        }}
        onPress={() => {
          if (isAvailable) {
            setSeatCode(seatNumber.toString());
            setTotal(price);
            setTicketId(id);
          }
        }}>
        <Text
          style={{
            fontSize: 12,
            color: seatCode === seatNumber ? 'white' : '#808080',
          }}>
          {seatNumber}
        </Text>
      </TouchableOpacity>
    ),
    [seatCode, setSeatCode, setTotal, setTicketId],
  );

  const handleSeat = useCallback(() => {
    if (!seatCode) {
      ToastAndroid.show('Vui lòng chọn ghế', ToastAndroid.CENTER);
      return;
    }
    navigation.navigate('ChooseService', {
      services: listServiceByTrip,
    });
  }, [navigation, seatCode, listServiceByTrip]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.chooseSeatContainer}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#1CBCD4" />
            </View>
          ) : (
            <View style={styles.chooseSeatField}>
              <View style={styles.chooseSeatContainerRow}>
                <View style={styles.seatFieldA}>
                  <SecurityUser
                    size="30"
                    color="#1CBCD4"
                    variant="Bold"
                    style={styles.securityIcon}
                  />
                  <View style={styles.seatContainer}>
                    <View style={styles.chooseSeatContainerRowChild}>
                      {filteredSeatsA.slice(0, 7).map((seat: any) => (
                        <View
                          key={seat.id}
                          style={styles.chooseSeatContainerRowChild1}>
                          {renderSeat(
                            seat?.id,
                            seat['seat-code'],
                            seat.status === 'AVAILABLE',
                            seat.price,
                            seat['ticket-type-name'] === 'VIP',
                          )}
                        </View>
                      ))}
                    </View>
                    <View style={styles.chooseSeatContainerRowChild}>
                      {filteredSeatsA.slice(7, 14).map((seat: any) => (
                        <View
                          key={seat.id}
                          style={styles.chooseSeatContainerRowChild1}>
                          {renderSeat(
                            seat?.id,
                            seat['seat-code'],
                            seat.status === 'AVAILABLE',
                            seat.price,
                            seat['ticket-type-name'] === 'VIP',
                          )}
                        </View>
                      ))}
                      {Array.from({
                        length: 7 - filteredSeatsA.slice(7, 14).length,
                      }).map((_, index) => (
                        <View
                          key={`empty-${index}`}
                          style={styles.chooseSeatContainerRowChild1}
                        />
                      ))}
                    </View>
                  </View>
                </View>
                <View style={styles.seatFieldB}>
                  <Logout size="30" color="#1CBCD4" />
                  <View style={styles.seatContainer}>
                    <View style={styles.chooseSeatContainerRowChild}>
                      {filteredSeatsB.slice(0, 7).map((seat: any) => (
                        <View
                          key={seat.id}
                          style={styles.chooseSeatContainerRowChild1}>
                          {renderSeat(
                            seat?.id,
                            seat['seat-code'],
                            seat.status === 'AVAILABLE',
                            seat.price,
                            seat['ticket-type-name'] === 'VIP',
                          )}
                        </View>
                      ))}
                    </View>
                    <View style={styles.chooseSeatContainerRowChild}>
                      {filteredSeatsB.slice(7, 14).map((seat: any) => (
                        <View
                          key={seat.id}
                          style={styles.chooseSeatContainerRowChild1}>
                          {renderSeat(
                            seat?.id,
                            seat['seat-code'],
                            seat.status === 'AVAILABLE',
                            seat.price,
                            seat['ticket-type-name'] === 'VIP',
                          )}
                        </View>
                      ))}
                      {Array.from({
                        length: 7 - filteredSeatsA.slice(7, 14).length,
                      }).map((_, index) => (
                        <View
                          key={`empty-${index}`}
                          style={styles.chooseSeatContainerRowChild1}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={styles.noteSeatContainer}>
            <View style={styles.noteSeatContainerChild}>
              <View style={styles.vipChosenSeat} />
              <Text style={styles.vipChosenSeatText}>Ghế bạn chọn</Text>
            </View>
            <View style={styles.noteSeatContainerChild}>
              <View style={styles.normalChosenSeat} />
              <Text style={styles.vipChosenSeatText}>Ghế bạn chọn</Text>
            </View>
            <View style={styles.noteSeatContainerChild}>
              <View style={styles.normalSeat} />
              <Text style={styles.vipChosenSeatText}>Ghế thường</Text>
            </View>
            <View style={styles.noteSeatContainerChild}>
              <View style={styles.vipSeat} />
              <Text style={styles.vipChosenSeatText}>Ghế VIP</Text>
            </View>
            <View style={styles.noteSeatContainerChild}>
              <View style={styles.soldSeat} />
              <Text style={styles.vipChosenSeatText}>Ghế đã bán</Text>
            </View>
          </View>
        </View>
        <View style={styles.inforBusCompany}>
          <View>
            <Text style={styles.busCompanyName}>{busCompany}</Text>
            <Text style={styles.typeBus}>Giường nằm</Text>
          </View>
          <TouchableOpacity>
            <View style={styles.detailBusCompany}>
              <Text style={styles.detailBusCompanyText}>Thông tin nhà xe</Text>
              <ArrowRight2 size={18} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerText}>
            <Text style={styles.footerTextItem}>Ghế đã chọn</Text>
            <Text style={styles.footerTextItem}>Tổng tiền</Text>
          </View>
          <View style={styles.footerText}>
            <Text style={styles.footerTextValue}>{seatCode}</Text>
            <View style={styles.footerTotal}>
              <Text style={styles.footerTextTotal}>{total}</Text>
              <Coin size="13" color="#1CBCD4" variant="Bulk" />
            </View>
          </View>
        </View>
        <View style={styles.footerButton}>
          <SectionComponent styles={styles.sectionComponent}>
            <TouchableOpacity onPress={handleSeat} style={styles.button}>
              <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chooseSeatContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 15,
    paddingHorizontal: 15,
    paddingVertical: 20,
    gap: 20,
    borderRadius: 10,
  },
  chooseSeatField: {
    flex: 2,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f1f1f1',
    borderRadius: 4,
    overflow: 'scroll',
    minHeight: 330,
  },

  seatFieldA: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 5,
  },

  seatFieldB: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 5,
  },
  seatFieldRight: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  securityIcon: {
    marginLeft: 20,
  },
  chooseSeatContainerRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    gap: 25,
  },
  chooseSeatContainerRowChild: {
    flexDirection: 'column',
  },
  chooseSeatContainerRowChild1: {
    flexDirection: 'column',
    gap: 10,
  },
  noteSeatContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
    marginBottom: 20,
  },
  noteSeatContainerChild: {
    flexDirection: 'row',
  },
  vipChosenSeat: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  vipChosenSeatText: {
    fontSize: 14,
  },
  normalChosenSeat: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: '#1CBCD4',
  },
  normalSeat: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#1CBCD4',
  },
  vipSeat: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  soldSeat: {
    width: 20,
    height: 20,
    marginRight: 5,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  inforBusCompany: {
    borderRadius: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  busCompanyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeBus: {
    fontSize: 16,
    borderBottomWidth: 0.5,
    borderColor: '#808080',
    paddingBottom: 10,
  },
  detailBusCompany: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  detailBusCompanyText: {
    fontSize: 16,
  },
  continuesContainer: {
    backgroundColor: '#fff',
    flex: 4,
  },
  continuesContainerChild: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  continuesContainerChild1: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gapContinues: {
    gap: 15,
  },
  infoSeat: {
    color: '#404040',
    fontSize: 16,
  },
  numberSeat: {
    color: '#1CBCD4',
    fontSize: 16,
  },
  seatPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  seatPriceText: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 25,
    padding: 10,
  },
  submitContainerChild: {
    width: '100%',
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
  },
  submitTouch: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitTouchText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  footer: {
    backgroundColor: '#fff',
  },
  footerContent: {
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    gap: 15,
  },
  footerTextItem: {
    color: '#404040',
    fontSize: 16,
  },
  footerTextValue: {
    color: '#1CBCD4',
    fontSize: 16,
    textAlign: 'right',
  },
  footerTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  footerTextTotal: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerButton: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 25,
    padding: 10,
  },
  sectionComponent: {
    width: '100%',
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  loading: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f1f1f1',
    borderRadius: 4,
    overflow: 'scroll',
    minHeight: 330,
  },
  seatContainer: {
    flexDirection: 'row',
  },
});

export default ChooseSeat;
