import {SectionComponent} from '@/components/custom';
import {Coin} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {router} from 'expo-router';
import {ArrowRight} from 'iconsax-react-native';
import {formatDate, formateTime} from '@/utils/formatDate';
import useTicketService from '@/services/ticketService';
import useTicketStore from '@/hooks/useTicketStore';

const TicketList: React.FC = () => {
  const [isSelected, setIsSelected] = useState<boolean>(true);
  const {tickets, isFetching, refetch} = useTicketService();
  const {isLoadingNewTicket, setIsLoadingNewTicket} = useTicketStore();

  useEffect(() => {
    const loadTickets = async () => {
      if (!isLoadingNewTicket) {
        refetch();
      }
    };

    loadTickets();
  }, [isLoadingNewTicket]);

  const renderItem = ({item, index}: {item: any; index: number}) => {
    const estimatedStartDate = new Date(item['estimate-start-date']);
    const currentDate = new Date();
    const isUpcoming = estimatedStartDate > currentDate;

    if ((isSelected && isUpcoming) || (!isSelected && !isUpcoming)) {
      return (
        <TouchableOpacity
          key={index}
          onPress={() =>
            router.push({
              pathname: 'TicketDetail',
              params: {ticketId: item['ticket-id']},
            })
          }
          style={styles.tripContainer}>
          <View style={styles.tripContainerChild}>
            <View style={styles.trip}>
              <View style={styles.tripChild}>
                <View style={styles.tripChildren}>
                  <SectionComponent>
                    <Text style={styles.tripText}>
                      {formateTime(item['estimate-start-date'])}
                    </Text>
                    <Text style={styles.fontLocation}>
                      {item['start-point-name']}
                    </Text>
                  </SectionComponent>
                  <SectionComponent>
                    <ArrowRight size={40} color="#1CBCD4" />
                  </SectionComponent>
                  <SectionComponent styles={{marginRight: 30}}>
                    <Text style={styles.tripText}>
                      {formateTime(item['estimate-end-date'])}
                    </Text>
                    <Text style={styles.fontLocation}>
                      {item['end-point-name']}
                    </Text>
                  </SectionComponent>
                </View>
                <SectionComponent styles={styles.sectionComponent}>
                  <Image
                    source={
                      item && item['buscompany-img']
                        ? {uri: item['buscompany-img']}
                        : require('@/assets/images/logo/logo_app.png')
                    }
                    style={styles.busCompanyImage}
                  />
                  <View>
                    <Text style={styles.tripText}>
                      {item['buscompany-name']}
                    </Text>
                    <Text style={styles.datetext}>
                      {formatDate(item['estimate-start-date'])} -{' '}
                      {formatDate(item['estimate-end-date'])}
                    </Text>
                  </View>
                </SectionComponent>
              </View>
              <View style={styles.price}>
                <SectionComponent styles={{right: 0}}>
                  <Text style={styles.tripText}>
                    {item['total-price']}{' '}
                    <Coin size="15" color="#1CC8DC" variant="Bulk" />
                  </Text>
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
      return null;
    }
  };

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
      {isFetching && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#1CBCD4" />
        </View>
      )}

      {!isFetching && (
        <FlatList
          data={tickets}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Không tìm thấy chuyến xe nào</Text>
            </View>
          }
          contentContainerStyle={{flexGrow: 1}}
        />
      )}
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
    height: 130,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  tripContainerChild: {
    backgroundColor: '#fff',
    height: 130,
    borderRadius: 10,
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
