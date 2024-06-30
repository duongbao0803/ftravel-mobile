import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import useServiceStore from '@/hooks/useServiceStore';
import {SectionComponent} from '@/components/custom';
import {Coin} from 'iconsax-react-native';
import {router} from 'expo-router';

const serviceData = [
  {id: '1', title: 'Bánh mì', description: 'Bánh mì Sài Gòn 5k 1 ổ', price: 10},
  {id: '2', title: 'Nước suối', description: 'Nước uống đóng chai', price: 10},
  {
    id: '3',
    title: 'Hủ tiếu Sa Đéc',
    description: 'Đặc sản Đồng Tháp',
    price: 10,
  },
  {
    id: '8',
    title: 'Hủ tiếu Sa Đéc',
    description: 'Đặc sản Đồng Tháp',
    price: 10,
  },
];

const Item = ({item, onIncrement, onDecrement, quantity}) => (
  <View style={styles.itemContainer}>
    <Image
      source={{uri: 'https://via.placeholder.com/50'}}
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
    <View style={styles.counterContainer}>
      <TouchableOpacity
        onPress={() => onDecrement(item.id, item.price)}
        style={styles.counterButton}>
        <Text style={styles.counterText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        onPress={() => onIncrement(item.id, item.price)}
        style={styles.counterButton}>
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.price}>{item.price}</Text>
  </View>
);

const ChooserService = () => {
  const quantities = useServiceStore(state => state.quantities);
  const total = useServiceStore(state => state.total);
  const initializeQuantities = useServiceStore(
    state => state.initializeQuantities,
  );
  const incrementService = useServiceStore(state => state.incrementService);
  const decrementService = useServiceStore(state => state.decrementService);

  useEffect(() => {
    initializeQuantities(serviceData);
  }, [initializeQuantities]);

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceData}
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
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>Số dịch vụ</Text>
          <Text style={styles.footerText}>Tổng tiền</Text>
        </View>
        <View style={styles.footerTextContainer}>
          <Text style={styles.footerText}>
            {String(Object.values(quantities).reduce((a, b) => a + b, 0))}
          </Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>{total}</Text>
          </View>
        </View>
        <View style={styles.continueButton}>
          <TouchableOpacity
            onPress={() => router.push('ChooseService')}
            style={styles.continueButtonTouchable}>
            <Text style={styles.continueButtonText}>Tiếp tục</Text>
          </TouchableOpacity>
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
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
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
  counterButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
  },
  counterText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    color: '#00A4EF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  footerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  footerText: {
    fontSize: 16,
    color: '#404040',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  totalText: {
    color: '#404040',
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#1CBCD4',
    borderRadius: 10,
    width: '100%',
    marginTop: 15,
  },
  continueButtonTouchable: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});

export default ChooserService;
