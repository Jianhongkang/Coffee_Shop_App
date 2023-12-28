import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: string;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}) => {
  return (
    <View>
      {prices.length > 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CartItemLinearGradient}>
          <View>
            <Text>{name}</Text>
            <Text>{special_ingredient}</Text>
            <Text>{roasted}</Text>
          </View>
        </LinearGradient>
      ) : (
        <></>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  CartItemLinearGradient: {
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
