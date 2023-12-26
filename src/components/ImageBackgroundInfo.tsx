import {
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {GradientBGIcon} from './GradientBGIcon';
import {COLORS, FONTSIZE} from '../theme/theme';

interface ImagebBackgroundInfoProps {
  EnableBackHandler: boolean;
  id: string;
  type: string;
  imagelink_portrait: ImageProps;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  favourite: boolean;
  BackHandler?: any;
  navigation?: any;
  ToggleFavourite: any;
}
const ImagebBackgroundInfo: React.FC<ImagebBackgroundInfoProps> = ({
  EnableBackHandler,
  id,
  type,
  imagelink_portrait,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  favourite,
  BackHandler,
  navigation,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ImageContainer}
      />
      {EnableBackHandler ? (
        <View style={styles.ImageHeaderBarWithBack}>
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
          <TouchableOpacity
            onPress={() => {
              ToggleFavourite(favourite, type, id);
            }}>
            <GradientBGIcon
              name="like"
              size={FONTSIZE.size_16}
              color={
                favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.ImageHeaderBarWithoutBack}>
          <TouchableOpacity
            onPress={() => {
              ToggleFavourite(favourite, type, id);
            }}>
            <GradientBGIcon
              name="like"
              color={
                favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
              }
              size={FONTSIZE.size_16}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default ImagebBackgroundInfo;

const styles = StyleSheet.create({
  ImageContainer: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  ImageHeaderBarWithBack: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
  },
  ImageHeaderBarWithoutBack: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
  },
});
