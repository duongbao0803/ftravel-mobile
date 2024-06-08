import {SectionComponent, SpaceComponent} from '@/components/custom';
import {appInfo} from '@/constants/appInfoStyles';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {appColors} from '@/constants/appColors';
import 'firebase/storage';
import {Coin} from 'iconsax-react-native';
import CarouselComponent from '@/components/custom/CarouselComponent';

const HomeScreen: React.FC = React.memo(() => {
  return (
    <View style={styles.container}>
      <SectionComponent styles={styles.header_container}>
        <View
          style={{
            backgroundColor: appColors.blue,
            flex: 1.3,
            borderBottomRightRadius: 55,
            borderBottomLeftRadius: 55,
            zIndex: 1,
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 5,
              marginBottom: 15,
            }}>
            <View style={{borderRadius: 100}}>
              <Image
                source={require('@/assets/images/logo/logo_user.jpg')}
                style={{
                  width: 40,
                  height: 40,
                  objectFit: 'contain',
                  borderRadius: 100,
                }}
              />
            </View>
            <View>
              <Text style={{fontSize: 14, color: '#fff'}}>Xin chào,</Text>
              <Text style={{fontSize: 16, color: '#fff'}}>Dương Bảo</Text>
            </View>
          </View>
          <View style={{marginBottom: 15}}>
            <Image
              source={require('@/assets/images/logo/logo_app_v2.png')}
              style={{
                width: 80,
                objectFit: 'contain',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 35,
            borderRadius: 20,
            marginTop: -35,
            backgroundColor: 'white',
            zIndex: 99,
            shadowColor: '#000000',
            elevation: 5,
          }}>
          <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
            <View>
              <Text style={{color: '#617382', fontSize: 16}}>FToken</Text>
              <View style={{flexDirection: 'row'}}>
                <Coin size="15" color="#1CC8DC" />
                <Text style={{fontSize: 15, fontWeight: 900, color: '#007F92'}}>
                  999.999
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SectionComponent>

      <SectionComponent styles={styles.main_container}>
        <Text>hihi</Text>
      </SectionComponent>
      <SectionComponent styles={styles.route_container}>
        {/* <Carousel
          loop
          width={appInfo.sizes.WIDTH}
          height={appInfo.sizes.WIDTH / 2}
          autoPlay={true}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={1000}
          onSnapToItem={index => console.log('current index:', index)}
          renderItem={({index}) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: appInfo.sizes.WIDTH * 0.8,
                marginRight: 500,
              }}>
              <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
            </View>
          )}
        /> */}

        <CarouselComponent />
      </SectionComponent>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header_container: {
    flex: 2.5,
    // backgroundColor: appColors.blue,
    borderBottomRightRadius: 55,
    borderBottomLeftRadius: 55,
  },
  main_container: {
    flex: 3.5,
  },
  route_container: {
    flex: 2,
    marginBottom: 20,
    backgroundColor: 'red',
  },
  container_section: {
    height: appInfo.sizes.HEIGHT * 0.8,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 50,
  },
  container_footer: {
    height: appInfo.sizes.HEIGHT * 0.1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom: 25,
    paddingLeft: 50,
    paddingRight: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  avatar: {
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: 'gray',
  },
  button_text_confirm: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  button_confirm: {
    backgroundColor: '#1CBCD4',
    height: 50,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  container_form: {
    flexDirection: 'row',
    padding: 25,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 25,
  },
  content: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
  },
  inputContent: {
    flex: 2,
    flexDirection: 'row',
    fontSize: 16,
    margin: -4,
  },
});

export default HomeScreen;
