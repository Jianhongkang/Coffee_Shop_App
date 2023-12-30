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
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

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
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.ImageContainer}>
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarWithBack}>
            <TouchableOpacity
              onPress={() => {
                BackHandler();
              }}>
              <GradientBGIcon
                name="left"
                size={FONTSIZE.size_20}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}>
              <GradientBGIcon
                name="like"
                size={FONTSIZE.size_20}
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
                size={FONTSIZE.size_20}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.ImageOuterContainer}>
          <View style={styles.ImageInnerContainer}>
            <View style={styles.InfoContainerRow}>
              <View>
                <Text style={styles.ItemTitleText}>{name}</Text>
                <Text style={styles.ItemSubtitleText}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.ItemPropertiesContainer}>
                <View style={styles.ProperFirst}>
                  <CustomIcon
                    name={type === 'Bean' ? 'bean' : 'beans'}
                    size={type === 'Bean' ? FONTSIZE.size_20 : FONTSIZE.size_30}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text
                    style={[
                      styles.PropertyTextFirst,
                      {
                        marginTop:
                          type == 'Bean'
                            ? SPACING.space_4 + SPACING.space_2
                            : 0,
                      },
                    ]}>
                    {type}
                  </Text>
                </View>
                <View style={styles.ProperFirst}>
                  <CustomIcon
                    name={type === 'Bean' ? 'location' : 'drop'}
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryOrangeHex}
                  />
                  <Text style={styles.PropertyTextFirst}>{ingredients}</Text>
                </View>
              </View>
            </View>

            <View style={styles.InfoContainerRow}>
              <View style={styles.RatingContainer}>
                <CustomIcon
                  name="star"
                  size={FONTSIZE.size_20}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.RatingText}>{average_rating}</Text>
                <Text style={styles.RatingCountText}>({ratings_count})</Text>
              </View>
              <View style={styles.RoastedContainer}>
                <Text style={styles.RoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
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
    justifyContent: 'flex-end',
    width: '100%',
    padding: 30,
  },
  ImageOuterContainer: {
    position: 'absolute',
    bottom: -10,
    width: '100%',
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  ImageInnerContainer: {
    justifyContent: 'space-between',
    gap: SPACING.space_10,
  },
  InfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ItemTitleText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
  },
  ItemSubtitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_14,
  },
  ItemPropertiesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.space_20,
  },
  ProperFirst: {
    height: 65,
    width: 65,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  PropertyTextFirst: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    marginTop: SPACING.space_8,
  },
  RatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
  RatingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_18,
  },
  RatingCountText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
  },
  RoastedContainer: {
    width: 65 * 2 + SPACING.space_20,
    height: 65,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBlackHex,
  },
  RoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
});
