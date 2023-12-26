import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import Imagebackgroundinfo from '../components/ImageBackgroundInfo';
import {useStore} from '../store/store';
import {ImageBackgroundBase} from 'react-native';
import {add, remove} from 'lodash';

const DetailsScreen = ({navigation, route}: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type === 'coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  //console.log(ItemOfIndex);
  const BackHandler = () => {
    // navigation.goBack();
    navigation.pop();
  };
  const ToggleFavourite = useStore((state: any) => state.ToggleFavourite);
  // const removeFromFavoriteList = useStore(
  //   (state: any) => state.removeFromFavoriteList,
  // );
  // const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
  //   favourite ? removeFromFavoriteList(type, id) : addToFavoriteList(type, id);
  // };

  const handleToggleFavourite = () => {
    console.log('ToggleFavourite is called');
    ToggleFavourite(ItemOfIndex.favourite, ItemOfIndex.type, ItemOfIndex.id);
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
          ToggleFavourite={ToggleFavourite()}
        />
        {/* <Text style={{color: COLORS.primaryWhiteHex, fontSize: 20}}>
          {ItemOfIndex.type}
     
        </Text> */}
        {/* <Image source={ItemOfIndex.imagelink_square} /> */}
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
  },
});
