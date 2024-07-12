import {orderedTicket} from '@/api/orderApi';
import {SectionComponent} from '@/components/custom';
import {Coin} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {router} from 'expo-router';
import {ArrowRight} from 'iconsax-react-native';
import useWalletService from '@/services/useWalletService';
import {formatDate, formateTime} from '@/utils/formatDate';

const TicketList: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const {balanceData} = useWalletService('');
  const [ticketData, setTicketData] = useState<any[]>([]);
  const customerId = balanceData['customer-id'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (customerId) {
          const res = await orderedTicket(customerId);
          setTicketData(res.data);
        }
      } catch (err) {
        console.error('Error fetching ticket data:', err);
      }
    };
    fetchData();
  }, [customerId]);

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
      {/* <ScrollView style={{flex: 1}}>
        {ticketData.map((ticket, index) => {
          const estimatedStartDate = new Date(ticket['estimated-start-date']);
          const currentDate = new Date();
          const isUpcoming = estimatedStartDate > currentDate;

          if ((isSelected && isUpcoming) || (!isSelected && !isUpcoming)) {
            return (
              <View key={index} style={{margin: 16}}>
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
                  }}
                  onPress={() => router.push('TicketDetail')}>
                  <View style={{padding: 10, flexDirection: 'row'}}>
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
                          <Text style={{fontSize: 13}}>
                            {ticket['start-point-name']}
                          </Text>
                        </SectionComponent>

                        <SectionComponent>
                          <ArrowRight size={40} color="#1CBCD4" />
                        </SectionComponent>
                        <SectionComponent styles={{marginRight: 30}}>
                          <Text style={{fontWeight: '800', fontSize: 17}}>
                            11:00
                          </Text>
                          <Text style={{fontSize: 13}}>
                            {ticket['end-point-name']}
                          </Text>
                        </SectionComponent>
                      </View>
                      <SectionComponent
                        styles={{
                          flexDirection: 'row',
                          alignItems: 'flex-end',
                          gap: 10,
                        }}>
                        <Image
                          source={{uri: ticket['img-url']}}
                          style={{
                            width: 30,
                            height: 30,
                            objectFit: 'cover',
                            resizeMode: 'cover',
                            borderWidth: 1,
                          }}
                        />
                        <View>
                          <Text style={{fontWeight: '800', fontSize: 17}}>
                            {ticket['buscompany-name']}
                          </Text>
                          <Text style={styles.datetext}>
                            {formatDate(ticket?.['estimated-start-date'])}
                          </Text>
                        </View>
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
                          {ticket['total-price']}đ{' '}
                          <Coin size="15" color="#1CC8DC" variant="Bulk" />
                        </Text>
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
            );
          } else {
            return null; // Render nothing if the ticket should not be displayed
          }
        })}
      </ScrollView> */}
      <ScrollView style={{flex: 4}}>
        {ticketData.length > 0 ? (
          ticketData.map((ticket, index) => {
            const estimatedStartDate = new Date(ticket['estimated-start-date']);
            const currentDate = new Date();
            const isUpcoming = estimatedStartDate > currentDate;

            if ((isSelected && isUpcoming) || (!isSelected && !isUpcoming)) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    router.push({
                      pathname: 'TicketDetail',
                      params: {ticketId: ticket['order-id']},
                    })
                  }
                  style={styles.tripContainer}>
                  <View style={styles.tripContainerChild}>
                    <View style={styles.trip}>
                      <View style={styles.tripChild}>
                        <View style={styles.tripChildren}>
                          <SectionComponent>
                            <Text style={styles.tripText}>
                              {formateTime(ticket['estimated-start-date'])}
                            </Text>
                            <Text style={styles.fontLocation}>
                              {ticket['start-point-name']}
                            </Text>
                          </SectionComponent>
                          <SectionComponent>
                            <ArrowRight size={40} color="#1CBCD4" />
                          </SectionComponent>
                          <SectionComponent styles={{marginRight: 30}}>
                            <Text style={styles.tripText}>
                              {formateTime(ticket['estimated-end-date'])}
                            </Text>
                            <Text style={styles.fontLocation}>
                              {ticket['end-point-name']}
                            </Text>
                          </SectionComponent>
                        </View>
                        <SectionComponent styles={styles.sectionComponent}>
                          <Image
                            source={
                              ticket && ticket['img-url']
                                ? {uri: ticket['img-url']}
                                : require('@/assets/images/logo/logo_app.png')
                            }
                            style={styles.busCompanyImage}
                          />
                          <View>
                            <Text style={styles.tripText}>
                              {ticket['buscompany-name']}
                            </Text>
                            <Text style={styles.datetext}>
                              {formatDate(ticket['estimated-start-date'])} -{' '}
                              {formatDate(ticket['estimated-end-date'])}
                            </Text>
                          </View>
                        </SectionComponent>
                      </View>
                      <View style={styles.price}>
                        <SectionComponent styles={{right: 0}}>
                          <Text style={styles.tripText}>
                            {ticket['total-price']}{' '}
                            <Coin size="15" color="#1CC8DC" variant="Bulk" />
                          </Text>
                          {/* <Text style={{ fontSize: 13 }}>Còn 1 chỗ</Text> */}
                        </SectionComponent>
                        <SectionComponent>
                          <Text style={styles.detailText}>Chi tiết</Text>
                        </SectionComponent>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return null; // Render nothing if the ticket should not be displayed
            }
          })
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Không tìm thấy chuyến xe nào</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
  },
  scrollView: {
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 5,
    height: 130,
    borderRadius: 10,
    marginBottom: 16,
  },
  cardContent: {
    padding: 10,
    flexDirection: 'row',
  },
  timeContainer: {
    flex: 2.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderStyle: 'dashed',
    height: 100,
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontWeight: '800',
    fontSize: 17,
  },
  placeText: {
    fontSize: 13,
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  logoImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
    borderWidth: 1,
  },
  companyText: {
    fontWeight: '800',
    fontSize: 17,
  },
  priceSection: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontWeight: '800',
    fontSize: 17,
  },
  availabilityText: {
    fontSize: 13,
  },
  tripContainer: {
    margin: 16,
  },
  tripContainerChild: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    height: 130,
    borderRadius: 10,
    marginBottom: 16,
  },
  trip: {
    padding: 10,
    flexDirection: 'row',
  },
  tripChild: {
    flex: 2.5,
    flexDirection: 'column',
    borderStyle: 'dashed',
    justifyContent: 'space-between',
    borderRightWidth: 1,
    height: 100,
  },
  tripChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripText: {
    fontWeight: '800',
    fontSize: 17,
  },
  datetext: {
    fontSize: 13,
  },
  sectionComponent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  fontLocation: {
    fontSize: 13,
  },
  busCompanyImage: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderWidth: 1,
    borderRadius: 100,
  },
  detailText: {
    fontWeight: '800',
    fontSize: 13,
    textDecorationLine: 'underline',
    color: '#1CBCD4',
  },
  price: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});

export default TicketList;
