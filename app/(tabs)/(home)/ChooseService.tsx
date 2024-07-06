import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import useServiceStore from '@/hooks/useServiceStore';
import {router} from 'expo-router';
import {Coin} from 'iconsax-react-native';
import {SectionComponent} from '@/components/custom';
import useServiceService from '@/services/useServiceService';
import useRouteStore from '@/hooks/useRouteStore';
import {useRoute} from '@react-navigation/native';

const Item = ({item, onIncrement, onDecrement, quantity}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item?.['img-url']}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item?.name}</Text>
      <Text style={styles.description}>{item?.description}</Text>
      <View style={styles.priceField}>
        <Text style={styles.price}>{item?.['service-price']}</Text>
        <Coin size="13" color="#1CBCD4" variant="Bulk" />
      </View>
    </View>
    <View style={styles.counterContainer}>
      <TouchableOpacity
        onPress={() => onDecrement(item?.id, item?.['service-price'])}
        style={styles.decreaseCounter}>
        <Text style={styles.decreaseText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity || 0}</Text>
      <TouchableOpacity
        onPress={() => onIncrement(item?.id, item?.['service-price'])}
        style={styles.increaseCounter}>
        <Text style={styles.increaseText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ChooserService = () => {
  const quantities = useServiceStore(state => state.quantities);
  const total = useServiceStore(state => state.total);
  const initializeQuantities = useServiceStore(
    state => state.initializeQuantities,
  );
  const getSelectedServices = useServiceStore(
    state => state.getSelectedServices,
  );
  // const listServiceByTrip = useServiceStore(state => state.listServiceByTrip);
  const incrementService = useServiceStore(state => state.incrementService);
  const decrementService = useServiceStore(state => state.decrementService);
  const listService = useServiceStore(state => state.listService);
  // const setListService = useServiceStore(state => state.setListService);
  const setListService = useServiceStore(state => state.setListService);

  const route = useRoute();
  const {services} = route.params;

  console.log('check services', services);

  useEffect(() => {
    if (services) {
      initializeQuantities(services);
      setListService(services);
    }
  }, [initializeQuantities, services, setListService]);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({item}) => (
          <Item
            item={item}
            quantity={quantities[item.id]}
            onIncrement={incrementService}
            onDecrement={decrementService}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerText}>
            <Text style={styles.footerTextItem}>Số dịch vụ</Text>
            <Text style={styles.footerTextItem}>Tổng tiền</Text>
          </View>
          <View style={styles.footerText}>
            <Text style={styles.footerTextValue}>
              {String(Object.values(quantities).reduce((a, b) => a + b, 0))}
            </Text>
            <View style={styles.footerTotal}>
              <Text style={styles.footerTextTotal}>{total}</Text>
              <Coin size="13" color="#1CBCD4" variant="Bulk" />
            </View>
          </View>
        </View>
        <View style={styles.footerButton}>
          <SectionComponent styles={styles.sectionComponent}>
            <TouchableOpacity
              onPress={() => router.push('Checkout')}
              style={styles.button}>
              <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
          </SectionComponent>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  decreaseCounter: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 15,
  },
  increaseCounter: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#1CBCD4',
    borderRadius: 15,
  },
  increaseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1CBCD4',
  },
  decreaseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#757575',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#1CBCD4',
    fontWeight: 'bold',
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
  priceField: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
  },
});

export default ChooserService;
