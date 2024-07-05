import {SectionComponent} from '@/components/custom';
import {router} from 'expo-router';
import {ArrowRight2, Logout, SecurityUser, Coin} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const ChooseSeat = () => {
  const [selectedSeat, setSelectedSeat] = useState('A11');
  const [totalAmount, setTotalAmount] = useState(511);

  const renderSeat = (
    seatNumber: number | string,
    isAvailable: boolean,
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
          selectedSeat === seatNumber
            ? isVip
              ? '#FFD700'
              : '#1CBCD4'
            : isAvailable
              ? isVip
                ? '#fff'
                : '#fff'
              : '#D9D9D9',
        borderColor: isAvailable
          ? isVip
            ? '#FFD700'
            : '#1CBCD4'
          : 'transparent',
        borderWidth: isAvailable ? 2 : 0,
        borderRadius: 4,
      }}
      onPress={() => isAvailable && setSelectedSeat(seatNumber)}>
      <Text
        style={{
          fontSize: 12,
          color: selectedSeat === seatNumber ? 'white' : '#808080',
        }}>
        {seatNumber}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.chooseSeatContainer}>
          <View style={styles.chooseSeatField}>
            <View style={styles.chooseSeatRow}>
              <SecurityUser
                size="30"
                color="#1CBCD4"
                variant="Bold"
                style={styles.securityIcon}
              />
              <Logout size="25" color="#1CBCD4" />
            </View>

            <View style={styles.chooseSeatContainerRow}>
              <View style={styles.chooseSeatContainerRowChild}>
                <View style={styles.chooseSeatContainerRowChild1}>
                  {renderSeat('18', true)}
                  {renderSeat('19', true)}
                  {renderSeat('20', false)}
                  {renderSeat('21', true)}
                  {renderSeat('39', true)}
                  {renderSeat('40', true)}
                </View>
                <View style={styles.chooseSeatContainerRowChild1}>
                  {renderSeat('22', true)}
                  {renderSeat('23', false)}
                  {renderSeat('24', true)}
                  {renderSeat('25', true)}
                  {renderSeat('41', true)}
                  {renderSeat('42', true)}
                </View>
              </View>
              <View style={styles.chooseSeatContainerRowChild}>
                <View style={styles.chooseSeatContainerRowChild1}>
                  {renderSeat('26', true)}
                  {renderSeat('27', true)}
                  {renderSeat('28', true)}
                  {renderSeat('29', true)}
                  {renderSeat('43', true)}
                  {renderSeat('44', true)}
                </View>
                <View style={styles.chooseSeatContainerRowChild1}>
                  {renderSeat('30', true)}
                  {renderSeat('31', true, true)}
                  {renderSeat('32', false)}
                  {renderSeat('33', true)}
                  {renderSeat('45', true)}
                  {renderSeat('46', true)}
                </View>
              </View>
            </View>
          </View>

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
            <Text style={styles.busCompanyName}>FTravel Bus</Text>
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
      <View style={styles.continuesContainer}>
        <View style={styles.continuesContainerChild}>
          <View style={styles.continuesContainerChild1}>
            <View style={styles.gapContinues}>
              <Text style={styles.infoSeat}>Ghế đã chọn</Text>
              <Text style={styles.infoSeat}>Tổng tiền</Text>
            </View>
            <View style={styles.gapContinues}>
              <Text style={styles.numberSeat}>A11</Text>
              <View style={styles.seatPrice}>
                <Text style={styles.seatPriceText}>511</Text>
                <Coin size="13" color="#1CBCD4" variant="Bulk" />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.submitContainer}>
          <SectionComponent styles={styles.submitContainerChild}>
            <TouchableOpacity
              onPress={() => router.push('ChooseService')}
              style={styles.submitTouch}>
              <Text style={styles.submitTouchText}>Tiếp tục</Text>
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
    borderWidth: 1,
    borderColor: '#f1f1f1',
    borderRadius: 4,
  },
  chooseSeatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  securityIcon: {
    marginLeft: 20,
  },
  chooseSeatContainerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  chooseSeatContainerRowChild: {
    flexDirection: 'row',
    marginRight: 20,
  },
  chooseSeatContainerRowChild1: {
    flexDirection: 'column',
    gap: 10,
  },
  noteSeatContainer: {
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
});

export default ChooseSeat;
