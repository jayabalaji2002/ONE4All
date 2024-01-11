import React, { createContext, useState } from "react";

import all_product from "../Components/Assets/all_product";
import CartItems from "../Components/CartItems/CartItems";

export const ShopContext = createContext(null);

// Add to cart Logic
const getDefaultCart = () => {
  let cart = {};

  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    // console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };


  // this fun is totall number of products in cart page
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        )
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };


  // this fn is in navbar carticon 
  const getTotalCartItems = ()=>{

    let totalItem = 0;
    for(const item in cartItems){
      if(CartItems[item]>0){
          totalItem += cartItems[item];
      }
    }
    return totalItem;
  }



  const contextValue = {
    getTotalCartItems,getTotalCartAmount,all_product,
    cartItems,
    addToCart,
    removeFromCart
  };

  
  // console.log(cartItems);
  // if (!props) {
  //     return null; // or handle the scenario accordingly
  // }
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
