import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce(state => {
            // check if the item already exists in the cart
            const existingItem = state.CartList.find(
              (item: {id: any}) => item.id === cartItem.id,
            );

            if (existingItem) {
              // if the item exists, check if the item has the same price size
              const existingSize = existingItem.prices.findIndex(
                (price: {size: any}) => price.size === cartItem.prices[0].size,
              );

              if (existingSize !== -1) {
                // if the price size exists, increase the quantity
                existingItem.prices[existingSize].quantity++;
              } else {
                // add the price size to the item
                existingItem.prices.push(cartItem.prices[0]);
              }

              // sort the price sizes by size
              existingItem.prices.sort((a: {size: any}, b: {size: string}) =>
                b.size.localeCompare(a.size),
              );
            } else {
              // if the item doesn't exist, add it to the cart
              state.CartList.push(cartItem);
            }
          }),
        ),
      removeFromCart: (cartItem: any) =>
        set(
          produce(state => {
            // check if the item already exists in the cart
            const existingItem = state.CartList.find(
              (item: {id: any}) => item.id === cartItem.id,
            );

            if (existingItem) {
              // if the item exists, check if the item has the same price size
              const existingSize = existingItem.prices.findIndex(
                (price: {size: any}) => price.size === cartItem.prices[0].size,
              );

              if (existingSize !== -1) {
                // if the price size exists, decrease the quantity
                existingItem.prices[existingSize].quantity--;

                // if the quantity is 0, remove the item from the cart
                if (existingItem.prices[existingSize].quantity === 0) {
                  existingItem.prices.splice(existingSize, 1);
                }
              }
            }
          }),
        ),
      clearCart: () =>
        set(
          produce(state => {
            state.CartList = [];
          }),
        ),
      calculateCartPrice: () =>
        set(
          produce(state => {
            // Initialize the cart price to 0
            state.CartPrice = state.CartList.reduce(
              (
                totalPrice: any,
                item: {prices: any[]; id: any; ItemPrice: any},
              ) => {
                // Calculate the price of each item
                const itemPrice = item.prices.reduce(
                  (
                    itemTotal: number,
                    price: {price: string; quantity: any},
                  ) => {
                    const priceValue = parseFloat(price.price);
                    const quantityValue = price.quantity;

                    if (isNaN(priceValue) || isNaN(quantityValue)) {
                      console.error(
                        `Invalid price or quantity for item with id ${item.id}`,
                      );
                      return itemTotal; // Skip this item if price or quantity is not a number
                    }

                    // Calculate the item price and add it to the total
                    return itemTotal + priceValue * quantityValue;
                  },
                  0,
                );

                // Round the item price to 2 decimal places
                item.ItemPrice = itemPrice.toFixed(2);

                // Add the rounded item price to the total price
                return totalPrice + itemPrice;
              },
              0,
            );

            // Round the total cart price to 2 decimal places
            state.CartPrice = state.CartPrice.toFixed(2);
          }),
        ),
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            const targetList =
              type === 'Coffee' ? state.CoffeeList : state.BeanList;
            // Find the target item in the list
            const targetItem = targetList.find(
              (item: {id: string}) => item.id === id,
            );
            // If the target item exists and is not already a favorite
            if (targetItem && !targetItem.favourite) {
              targetItem.favourite = true;
              // Add the item to the beginning of the favorites list
              state.FavoritesList.unshift(targetItem);
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce(state => {
            const targetList =
              type === 'Coffee' ? state.CoffeeList : state.BeanList;

            const targetItem = targetList.find(
              (item: {id: string}) => item.id === id,
            );

            // If the target item exists
            if (targetItem) {
              targetItem.favourite = false;
              // Find the index of the item in the favorites list
              const favoriteIndex = state.FavoritesList.findIndex(
                (item: {id: string}) => item.id === id,
              );
              // If the item is in the favorites list, remove it
              if (favoriteIndex !== -1) {
                state.FavoritesList.splice(favoriteIndex, 1);
              }
            }
          }),
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            // Find the cart item with the specified id
            const cartItem = state.CartList.find(
              (item: {id: string}) => item.id === id,
            );

            // Check if the cart item is found
            if (cartItem) {
              // Find the price with the specified size within the cart item
              const price = cartItem.prices.find(
                (p: {size: string}) => p.size === size,
              );

              // Check if the price is found
              if (price) {
                // Increment the quantity of the found price
                price.quantity++;
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce(state => {
            // Find the index of the cart item with the specified id
            const cartItemIndex = state.CartList.findIndex(
              (item: {id: string}) => item.id === id,
            );

            // Check if the cart item is found
            if (cartItemIndex !== -1) {
              // Find the price with the specified size within the cart item
              const priceIndex = state.CartList[cartItemIndex].prices.findIndex(
                (p: {size: string}) => p.size === size,
              );

              // Check if the price is found
              if (priceIndex !== -1) {
                // Decrement the quantity of the found price
                state.CartList[cartItemIndex].prices[priceIndex].quantity--;

                // Check if the quantity is now zero, and remove the item from CartList
                if (
                  state.CartList[cartItemIndex].prices[priceIndex].quantity ===
                  0
                ) {
                  // Remove the price from the prices array
                  state.CartList[cartItemIndex].prices.splice(priceIndex, 1);

                  // Check if the prices array is now empty, and remove the cart item
                  if (state.CartList[cartItemIndex].prices.length === 0) {
                    state.CartList.splice(cartItemIndex, 1);
                  }
                }
              }
            }
          }),
        ),

      addToOrderHistoryListFromCart: () =>
        set(
          produce(state => {
            // Calculate the total price of items in the cart
            const cartListPrice = state.CartList.reduce(
              (accumulator: number, currentValue: {ItemPrice: string}) =>
                accumulator + parseFloat(currentValue.ItemPrice),
              0,
            );

            // Create a new order with current date, time, cart list, and total price
            const newOrder = {
              OrderDate: `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`,
              CartList: state.CartList,
              CartListPrice: cartListPrice.toFixed(2).toString(),
            };

            // Add the new order to the beginning of the order history list
            state.OrderHistoryList.unshift(newOrder);

            // Clear the cart list
            state.CartList = [];
          }),
        ),
    }),
    {
      name: 'Panda-Coffee', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
