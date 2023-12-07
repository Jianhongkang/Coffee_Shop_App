import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, FONTSIZE} from '../theme/theme';

interface BGIconProps {
  name: string;
  color: string;
  size: number;
  BGColor: string;
}
const BGIcon: React.FC<BGIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
      <CustomIcon name={name} color={color} size={size} />
    </View>
  );
};

export default BGIcon;

const styles = StyleSheet.create({
  IconBG: {
    width: FONTSIZE.size_30,
    height: FONTSIZE.size_30,
    borderRadius: BORDERRADIUS.radius_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
