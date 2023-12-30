import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../store/store';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import CoffeeData from '../data/CoffeeData';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {HeaderBar} from '../components/HeaderBar';
import {GradientBGIcon} from '../components/GradientBGIcon';
import CustomIcon from '../components/CustomIcon';
import CoffeType from '../components/CoffeType';
import CoffeeCard from '../components/CoffeeCard';

// Function to extract and count categories from input data
const getCategoriesFormData = (data: any) => {
  // Create an empty object 'temp' to store the occurrence count of each category
  let temp: any = {};

  for (let i = 0; i < data.length; i++) {
    // If the 'temp' object does not have the category, initialize it to 1 (first occurrence)
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      // If the category already exists in 'temp', increment its occurrence count
      temp[data[i].name]++;
    }
  }

  // Get the names of all categories, i.e., the keys of the 'temp' object
  let categories = Object.keys(temp);

  // Insert an "All" option at the beginning of the array
  categories.unshift('All');

  // Return the final array of categories
  return categories;
};
// console.log(getCategoriesFormData(CoffeeData));

// Function to filter data based on category
const getCoffeeByCategory = (category: string, data: any) => {
  // If the category is "All", return all the data
  if (category === 'All') {
    return data;
  }
  // Otherwise, return the data filtered by the category
  return data.filter((item: any) => item.name === category);
};

console.log('====================================');
console.log('test');
console.log('====================================');

console.log('happy day');

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFormData(CoffeeList),
  );
  // console.log(categories);

  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  //console.log(categoryIndex);

  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeByCategory(categoryIndex.category, CoffeeList),
  );
  console.log(sortedCoffee);

  const [searchText, setSearchText] = useState('');
  const handleSearch = (text: any) => {
    setSearchText(text);
  };
  //console.log(searchText);

  const handleCategoryPress = (selectedCategory: any, index: number) => {
    setCategoryIndex({
      index: index,
      category: categories[index],
    });
    setSortedCoffee([...getCoffeeByCategory(categories[index], CoffeeList)]);
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar title="panda coffee" />
        <Text style={styles.ScreenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        {/* Search Input */}
        <View style={styles.Searchcontainer}>
          <TouchableOpacity>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              style={styles.SearchIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your Coffee..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.SearchInput}
          />
        </View>

        {/* Coffee Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollView}>
          {/* another method */}
          {/* {categories.map((category, index) => (
            <View key={index} style={styles.CategoryContainer}>
              <TouchableOpacity onPress={() => handleCategoryPress(category)}>
                <Text style={styles.CategoryText}>{category}</Text>
              </TouchableOpacity>
            </View>
          ))} */}
          {categories.map((category, index) => (
            <CoffeType
              key={index.toString()}
              category={category}
              onPress={() => handleCategoryPress(category, index)}
              isActive={categoryIndex.index == index}
            />
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={[
            styles.FlatListContainer,
            // {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <CoffeeCard
                  id={item.id}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={undefined}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>

        {/* Bean Flatlist */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.FlatListContainer,
            // {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity>
                <CoffeeCard
                  id={item.id}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={undefined}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1, //ensures the container expands to fill the available space.
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    paddingLeft: SPACING.space_30,
  },
  Searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: SPACING.space_20,
    margin: SPACING.space_30,
    padding: SPACING.space_8,
  },
  SearchIcon: {
    marginHorizontal: SPACING.space_20,
  },
  SearchInput: {
    flex: 1,
    height: SPACING.space_20 * 2,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    paddingLeft: SPACING.space_20,
  },
  CategoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_4,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    // marginTop: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});
