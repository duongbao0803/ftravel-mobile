import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  Extrapolate,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const SRC_WIDTH = Dimensions.get('window').width;
const CARD_LENGTH = SRC_WIDTH * 0.8;
const SPACING = SRC_WIDTH * 0.02;
const SIDECARD_LENGTH = (SRC_WIDTH * 0.18) / 2;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

interface itemProps {
  item: {id: string; title: string};
  index: number;
  scrollX: number;
}

function Item({item, index, scrollX}: itemProps) {
  const size = useSharedValue(0.7);

  const inputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];

  size.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP,
  );

  const opacity = useSharedValue(1);
  const opacityInputRange = [
    (index - 1) * CARD_LENGTH,
    index * CARD_LENGTH,
    (index + 1) * CARD_LENGTH,
  ];
  opacity.value = interpolate(
    scrollX,
    opacityInputRange,
    [0.5, 1, 0.5],
    Extrapolate.CLAMP,
  );

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [{scaleY: size.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        {
          marginLeft: index === 0 ? SIDECARD_LENGTH : SPACING,
          marginRight: index === 2 ? SIDECARD_LENGTH : SPACING,
          padding: 10,
        },
      ]}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>Mua vé tặng cafe</Text>
      <Text>Giá vé xe sale sập sàn cùng cafe tặng kèm nè mọi người ơi </Text>
    </Animated.View>
  );
}

export default function Carousel() {
  const [scrollX, setScrollX] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      image: require('@/assets/images/logo/logo_deer.png'),
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      image: require('@/assets/images/logo/logo_app_v2.png'),
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      image: require('@/assets/images/logo/logo_deer.png'),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const currentIndex = Math.floor(
          scrollX / (CARD_LENGTH + SPACING * 1.5),
        );
        const nextIndex = currentIndex + 1 < DATA.length ? currentIndex + 1 : 0;
        const offset = nextIndex * (CARD_LENGTH + SPACING * 1.5);
        flatListRef.current.scrollToOffset({offset, animated: true});
        setScrollX(offset);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollX]);

  return (
    <Animated.View>
      <AnimatedFlatList
        ref={flatListRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate="normal"
        snapToInterval={CARD_LENGTH + SPACING * 1.5}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        snapToAlignment="center"
        data={DATA}
        horizontal={true}
        renderItem={({item, index}) => {
          return <Item item={item} index={index} scrollX={scrollX} />;
        }}
        keyExtractor={item => item.id}
        onScroll={event => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_LENGTH,
    height: 155,
    overflow: 'hidden',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 80,
    objectFit: 'scale-down',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
