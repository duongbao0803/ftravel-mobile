import {useRouter} from 'expo-router';
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
import {ArrowRight, Coin} from 'iconsax-react-native';
import {SectionComponent} from '@/components/custom';
import useTripStore from '@/hooks/useTripStore';
import {formatDate, formateTime} from '@/utils/formatDate';
import useRouteService from '@/services/useRouteService';

const ListTrip = () => {
  const {fetchRouteDetail} = useRouteService();
  const [routeDetails, setRouteDetails] = useState([]);
  const {listTrip, selectedDeparture, selectedDestination} = useTripStore();

  useEffect(() => {
    const fetchData = async () => {
      if (listTrip && listTrip.length > 0) {
        try {
          const routeDetails = await Promise.all(
            listTrip.map(async (trip: {[x: string]: number}) => {
              const res = await fetchRouteDetail(trip['route-id']);
              return res;
            }),
          );
          setRouteDetails(routeDetails);
        } catch (error) {}
      }
    };

    fetchData();
  }, []);

  const router = useRouter();
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{selectedDeparture}</Text>
          <ArrowRight size={30} color="#1CBCD4" />
          <Text style={styles.headerText}>{selectedDestination}</Text>
        </View>
      </View>

      <ScrollView style={{flex: 4}}>
        {listTrip && listTrip.length > 0 ? (
          listTrip.map((trip, index: number) => {
            const routeDetail = routeDetails?.find(
              detail => detail['bus-company']?.id === trip['bus-company-id'],
            );
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: 'ChooseSeat',
                    params: {tripId: trip.id},
                  })
                }
                style={styles.tripContainer}>
                <View style={styles.tripContainerChild}>
                  <View style={styles.trip}>
                    <View style={styles.tripChild}>
                      <View style={styles.tripChildren}>
                        <SectionComponent>
                          <Text style={styles.tripText}>
                            {formateTime(trip?.['estimated-start-date'])}
                          </Text>
                          <Text style={styles.fontLocation}>
                            {selectedDeparture}
                          </Text>
                        </SectionComponent>
                        <SectionComponent>
                          <ArrowRight size={40} color="#1CBCD4" />
                        </SectionComponent>
                        <SectionComponent styles={{marginRight: 30}}>
                          <Text style={styles.tripText}>
                            {formateTime(trip?.['estimated-end-date'])}
                          </Text>
                          <Text style={styles.fontLocation}>
                            {selectedDestination}
                          </Text>
                        </SectionComponent>
                      </View>
                      <SectionComponent styles={styles.sectionComponent}>
                        <Image
                          source={
                            routeDetail && routeDetail['bus-company-img']
                              ? {uri: routeDetail['bus-company-img']}
                              : require('@/assets/images/logo/logo_app.png')
                          }
                          style={styles.busCompanyImage}
                        />
                        <View>
                          <Text style={styles.tripText}>
                            {routeDetail?.['bus-company-name']}
                          </Text>
                          <Text style={styles.datetext}>
                            {formatDate(trip?.['estimated-start-date'])}
                          </Text>
                        </View>
                      </SectionComponent>
                    </View>
                    <View style={styles.price}>
                      <SectionComponent styles={{right: 0}}>
                        <Text style={styles.tripText}>
                          {trip['lowest-price']}
                          <Coin size="15" color="#1CC8DC" variant="Bulk" />
                        </Text>
                        {/* <Text style={{fontSize: 13}}>Còn 1 chỗ</Text> */}
                      </SectionComponent>
                      <SectionComponent>
                        <Text style={styles.detailText}>Chi tiết</Text>
                      </SectionComponent>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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

export default ListTrip;
