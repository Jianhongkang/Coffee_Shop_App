import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {HeaderBar} from '../components/HeaderBar';
import {COLORS} from '../theme/theme';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/store';
import PaymentFooter from '../components/PaymentFooter';
import EmptyListAnimation from '../components/EmptyListAnimation';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation}: any) => {
  // ensure that the tab bar is not overlapping the content
  const tabBarHeight = useBottomTabBarHeight();
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  // console.log(CartList.length);
  const incrementCartItemQuantityHandler = useStore(
    (state: any) => state.incrementCartItemQuantityHandler,
  );
  const decrementCartItemQuantityHandler = useStore(
    (state: any) => state.decrementCartItemQuantityHandler,
  );
  console.log(CartPrice.length);

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* Cart Header */}
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <HeaderBar title="Cart" />
          {/* Cart Items */}
          {CartList.length == 0 ? (
            <EmptyListAnimation title={'Cart is Empty'} />
          ) : (
            <View>
              {CartList.map((data: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                  key={data.id}>
                  <CartItem
                    id={data.id}
                    name={data.name}
                    imagelink_square={data.imagelink_square}
                    special_ingredient={data.special_ingredient}
                    roasted={data.roasted}
                    prices={data.prices}
                    type={data.type}
                    incrementCartItemQuantityHandler={
                      incrementCartItemQuantityHandler
                    }
                    decrementCartItemQuantityHandler={
                      decrementCartItemQuantityHandler
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* <PaymentFooter /> */}
          {CartList.length > 0 ? (
            <PaymentFooter
              price={{price: CartPrice, currency: '$'}}
              buttonPressHandler={() => {}}
              buttonTitle="Pay"
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
