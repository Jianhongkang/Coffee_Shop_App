import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {HeaderBar} from '../components/HeaderBar';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {GradientBGIcon} from '../components/GradientBGIcon';
import PaymentFooter from '../components/PaymentFooter';
import PaymentMethod from '../components/PaymentMethod';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import {useStore} from '../store/store';
import PopUpAnimation from '../components/PopUpAnimation';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Goolge Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation, route}: any) => {
  const BackHandler = () => {
    navigation.pop();
  };
  const [paymentMode, setPaymentMode] = React.useState('Credit Card');
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* Cart Header */}
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => {
              BackHandler();
            }}>
            <GradientBGIcon
              name="left"
              size={FONTSIZE.size_16}
              color={COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyView} />
        </View>

        <View style={styles.ScrollViewInnerView}>
          {/* Payment Options */}
          <View style={styles.PaymentOptionsContainer}>
            <TouchableOpacity
              onPress={() => {
                setPaymentMode('Credit Card');
              }}>
              <View
                style={[
                  styles.CreditCardContainer,
                  {
                    borderColor:
                      paymentMode == 'Credit Card'
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryGreyHex,
                  },
                ]}>
                <Text style={styles.CreditCardTitle}>Credit Card</Text>

                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.CreditCardBG}>
                  <View style={styles.CreditCardRow}>
                    <CustomIcon
                      name={'chip'}
                      color={COLORS.primaryOrangeHex}
                      size={FONTSIZE.size_20 * 2}
                    />
                    <CustomIcon
                      name={'visa'}
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_30 * 2}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>8923</Text>
                    <Text style={styles.CreditCardNumber}>6745</Text>
                    <Text style={styles.CreditCardNumber}>4638</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>
                        Robert Evans
                      </Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.CreditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>

            {/* Payment Options */}
            {PaymentList.map((data: any) => (
              <TouchableOpacity
                key={data.name}
                onPress={() => setPaymentMode(data.name)}>
                <View style={styles.PaymentOptionsContainer}>
                  <PaymentMethod
                    paymentMode={paymentMode}
                    name={data.name}
                    icon={data.icon}
                    isIcon={data.isIcon}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* Payment Footer */}
        <PaymentFooter
          price={{price: route.params.price, currency: '$'}}
          buttonPressHandler={buttonPressHandler}
          buttonTitle={`Pay with ${paymentMode}`}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  ScrollViewInnerView: {
    flex: 1,
    paddingHorizontal: SPACING.space_20,
  },
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_20,
  },
  HeaderText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  EmptyView: {
    width: SPACING.space_36,
    height: SPACING.space_36,
  },
  PaymentOptionsContainer: {
    gap: SPACING.space_10,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  CreditCardTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  CreditCardBG: {
    borderRadius: BORDERRADIUS.radius_25,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_10,
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    padding: SPACING.space_10,
  },
  CreditCardNumber: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    letterSpacing: 6,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
  LottieAnimation: {
    flex: 1,
  },
});
