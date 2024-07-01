import React, {useEffect} from 'react';
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

const serviceData = [
  {
    id: '1',
    title: 'Bánh mì',
    description: 'Bánh mì Sài Gòn',
    price: 10,
    image:
      'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2023/2/20/viet-populaire-copy-e1659353432539-1024x681-16594235658881650374369-1676888750526893807756-41-0-423-730-crop-16768887676751617090180.jpg',
  },
  {
    id: '2',
    title: 'Nước suối lavie',
    description: 'Nước uống đóng chai ',
    price: 20,
    image:
      'https://concung.com/2022/05/57495-88418-large_mobile/nuoc-khoang-la-vie-0-5l.jpg',
  },
  {
    id: '3',
    title: 'Cơm tấm sà bì chưởng',
    description: 'Đặc sản Sài Gòn',
    price: 30,
    image:
      'https://nhaphonet.vn/wp-content/uploads/2023/04/com-tam-sa-bi-chuong-da-lat-2.jpg',
  },
  {
    id: '4',
    title: 'Nem nướng Cái Răng',
    description: 'Đặc sản Cần Thơ',
    price: 40,
    image:
      'https://mia.vn/media/uploads/blog-du-lich/nem-nuong-cai-rang-huong-vi-dam-da-cua-can-tho-3-1649231593.jpg',
  },
];

const Item = ({item, onIncrement, onDecrement, quantity}) => (
  <View style={styles.itemContainer}>
    <Image source={{uri: item.image}} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
    <View style={styles.counterContainer}>
      <TouchableOpacity
        onPress={() => onDecrement(item.id, item.price)}
        style={styles.decreaseCounter}>
        <Text style={styles.decreaseText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        onPress={() => onIncrement(item.id, item.price)}
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
    color: '#00A4EF',
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
});

export default ChooserService;
