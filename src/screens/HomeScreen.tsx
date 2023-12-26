import {
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import {HeaderBar} from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import CoffeType from '../components/CoffeType';
import CoffeeCard from '../components/CoffeeCard';
import _ from 'lodash';

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

const HomeScreen = ({navigation}: any) => {
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
  //console.log(sortedCoffee);

  const [searchText, setSearchText] = useState('');

  const handleCategoryPress = (index: number) => {
    ListRef.current.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({
      index: index,
      category: categories[index],
    });
    setSortedCoffee([...getCoffeeByCategory(categories[index], CoffeeList)]);
  };

  const tabBarHeight = useBottomTabBarHeight();
  // console.log('tabBarHeight', tabBarHeight);

  const ListRef: any = useRef<FlatList>();

  // This function is typically used in response to user input events(when the user types in the search box)

  // const searchCoffee = (text: string) => {
  //     if (text.length > 0) {
  //       ListRef?.current?.scrollToOffset({
  //         animated: true,
  //         offset: 0,
  //       });
  //       setSortedCoffee([
  //         CoffeeList.filter((item: any) =>
  //           item.name.toLowerCase().includes(text.toLowerCase()),
  //         ),
  //       ]);
  //     }
  // };

  // This function is typically used in response to user input events
  // triggering a delayed search (300 seconds) to avoid unnecessary API calls
  const delayedSearch = _.debounce((text: string) => {
    if (text != '') {
      // Scroll the FlatList to the top
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      // Set the category index to the first category
      setCategoryIndex({
        index: 0,
        category: categories[0],
      });
      // Perform a search and set the filtered coffee list
      setSortedCoffee(
        CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }
  }, 300);

  const clearSearch = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({
      index: 0,
      category: categories[0],
    });
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
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
        {/* App Header */}
        <HeaderBar title="panda coffee" />
        <Text style={styles.ScreenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        {/* Search Input */}
        <View style={styles.Searchcontainer}>
          <TouchableOpacity
            onPress={() => {
              setSearchText(searchText);
            }}>
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
            onChangeText={text => {
              setSearchText(text);
              delayedSearch(text);
              // searchCoffee(text);
            }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.SearchInput}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                clearSearch();
              }}>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
                style={styles.SearchIcon}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
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
              onPress={() => handleCategoryPress(index)}
              isActive={categoryIndex.index == index}
            />
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.EmptyContainer}>
              <Text style={styles.CoffeeBeansTitle}>No Coffee Found</Text>
            </View>
          )}
          data={sortedCoffee}
          contentContainerStyle={[styles.FlatListContainer]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCartHandler}
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
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={addToCartHandler}
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
    fontSize: FONTSIZE.size_16,
    paddingLeft: SPACING.space_20,
  },
  CategoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_4,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    paddingVertical: SPACING.space_20,
  },
  EmptyContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});
