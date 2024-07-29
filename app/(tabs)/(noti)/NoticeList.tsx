import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {SectionComponent} from '@/components/custom';
import useNotificationService from '@/services/notificationService';
import {formatDate, formateTime} from '@/utils/formatDate';

const NoticeList = () => {
  const {noticeData} = useNotificationService();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {noticeData &&
          noticeData.length > 0 &&
          noticeData.map((notice: any, index: number) => (
            <View style={styles.noticeContainer} key={index}>
              <SectionComponent styles={styles.sectionComponent}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('@/assets/images/logo/logo_ftravel.png')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{notice?.title}</Text>
                  </View>

                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>
                      {notice?.message}
                    </Text>
                  </View>
                  <View style={styles.footerContainer}>
                    <Text>{formateTime(notice?.['create-date'])}</Text>
                    <Text style={styles.dateText}>
                      {formatDate(notice?.['create-date'])}
                    </Text>
                  </View>
                </View>
              </SectionComponent>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingVertical: 10,
  },
  noticeContainer: {
    margin: 10,
  },
  sectionComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    gap: 15,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    elevation: 5,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 0.9,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain', // Chỉnh sửa 'objectFit' thành 'resizeMode'
    borderWidth: 1,
  },
  textContainer: {
    flex: 3,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    flexDirection: 'column',
    marginTop: 5,
  },
  descriptionText: {
    fontSize: 13,
    paddingRight: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: 13,
  },
});

export default NoticeList;
