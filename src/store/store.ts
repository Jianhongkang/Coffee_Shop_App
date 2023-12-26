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
            // initialize the cart price to 0
            state.CartPrice = state.CartList.reduce(
              (totalPrice: any, item: {prices: any[]; ItemPrice: any}) => {
                // calculate the price of each item
                const itemPrice = item.prices.reduce(
                  (total: number, price: {price: string; quantity: number}) =>
                    total + parseFloat(price.price) * price.quantity,
                  0,
                );
                // set the price of the item
                item.ItemPrice = itemPrice.toFixed(2).toString();
                // add the price of the item to the total price
                return totalPrice + itemPrice;
              },
              0,
            )
              .toFixed(2)
              .toString();
          }),
        ),
      ToggleFavourite: (favourite: boolean, type: string, id: string) =>
        set(
          produce(state => {
            const targetList =
              type === 'Coffee' ? state.CoffeeList : state.BeanList;

            // find the index of the target element
            const targetItem = targetList.findIndex(
              (item: {id: string}) => item.id === id,
            );

            // if the target element exists
            if (targetItem) {
              // toggle the favourite status of the target item
              targetItem.favourite = !targetItem.favourite;

              // if the target element is now a favourite
              if (targetItem.favourite) {
                // add the target element to the favourite list
                state.FavoritesList.unshift(targetItem);
              } else {
                // remove the target element from the favourite list
                const favoriteIndex = state.FavoritesList.findIndex(
                  (item: {id: string}) => item.id === id,
                );
                if (favoriteIndex !== -1) {
                  state.FavoritesList.splice(favoriteIndex, 1);
                }
              }
            }
          }),
        ),
    }),
    {
      name: 'Panda-Coffee', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
