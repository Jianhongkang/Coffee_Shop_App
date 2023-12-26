import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Imagebackgroundinfo from '../components/ImageBackgroundInfo';
import {useStore} from '../store/store';
import PaymentFooter from '../components/PaymentFooter';

const DetailsScreen = ({navigation, route}: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type === 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  //console.log(ItemOfIndex);
  const BackHandler = () => {
    // navigation.goBack();
    navigation.pop();
  };

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  //  console.log(ItemOfIndex.type);

  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState(ItemOfIndex.prices[0]);

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    spcial_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      spcial_ingredient,
      type,
      prices: [{...price, quantity: 1}], // Creating an array of prices with quantity
    });

    calculateCartPrice();
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <Imagebackgroundinfo
          EnableBackHandler={true}
          id={ItemOfIndex.id}
          type={ItemOfIndex.type}
          imagelink_portrait={ItemOfIndex.imagelink_portrait}
          name={ItemOfIndex.name}
          special_ingredient={ItemOfIndex.special_ingredient}
          ingredients={ItemOfIndex.ingredients}
          average_rating={ItemOfIndex.average_rating}
          ratings_count={ItemOfIndex.ratings_count}
          roasted={ItemOfIndex.roasted}
          favourite={ItemOfIndex.favourite}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />
        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoText}>Description </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              // prev=>!prev is used to toggle the state of fullDesc
              setFullDesc(prev => !prev);
            }}>
            <Text
              style={styles.DescriptionText}
              // Use undefined/0 for unlimited lines
              numberOfLines={fullDesc ? 0 : 3}>
              {ItemOfIndex.description}
            </Text>
          </TouchableWithoutFeedback>

          <Text style={styles.InfoText}>Size </Text>
          <View style={styles.sizeContainer}>
            {ItemOfIndex.prices.map((item: any) => {
              return (
                <TouchableOpacity
                  key={item.size}
                  onPress={() => {
                    setPrice(item);
                  }}
                  style={[
                    styles.SizeBox,
                    {
                      // borderColor:
                      backgroundColor:
                        item.size == price.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}>
                  <Text style={styles.SizeText}>{item.size}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <PaymentFooter
          price={price}
          buttonPressHandler={addToCartHandler}
          buttonTitle="Add to Card"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  FooterInfoArea: {
    padding: SPACING.space_20,
  },
  InfoText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_20,
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    height: SPACING.space_24 * 2,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
});
