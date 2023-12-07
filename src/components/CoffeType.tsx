import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface CoffeTypeProps {
  category: string;
  onPress: () => void;
  isActive: boolean;
}

const CoffeType: React.FC<CoffeTypeProps> = ({category, onPress, isActive}) => (
  <View style={styles.CategoryContainer}>
    <TouchableOpacity style={styles.CategoryItem} onPress={onPress}>
      <Text
        style={[
          styles.CategoryText,
          isActive ? {color: COLORS.primaryOrangeHex} : {},
        ]}>
        {category}
      </Text>
      {isActive ? <View style={styles.ActiveCategory} /> : <></>}
    </TouchableOpacity>
  </View>
);
export default CoffeType;

const styles = StyleSheet.create({
  CategoryContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
  },
  ActiveText: {
    color: COLORS.primaryOrangeHex,
  },
});
