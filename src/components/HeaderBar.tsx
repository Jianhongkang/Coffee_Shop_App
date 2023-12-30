import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GradientBGIcon} from './GradientBGIcon';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.space_30,
  },
  HeaderText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
    // textTransform: 'uppercase',
  },
});
